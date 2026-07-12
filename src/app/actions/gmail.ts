'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

export type GmailCategory = 'important' | 'spam' | 'others';

export interface EmailData {
  id: string;
  category: GmailCategory;
  sender: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  isRead: boolean;
}

export async function fetchEmails(category: GmailCategory): Promise<EmailData[]> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Not authenticated');

    const client = await clerkClient();
    const tokenResponse = await client.users.getUserOauthAccessToken(userId, 'oauth_google');
    const token = tokenResponse.data[0]?.token;

    if (!token) {
      throw new Error('No Google OAuth token found. Did you connect your Google account with Gmail scope?');
    }

    let labelIds = '';
    if (category === 'important') {
      labelIds = 'IMPORTANT';
    } else if (category === 'spam') {
      labelIds = 'SPAM';
    } else {
      labelIds = 'INBOX';
    }

    // 1. Fetch message list
    const listRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=15&labelIds=${labelIds}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!listRes.ok) {
      const errorText = await listRes.text();
      console.error('Gmail API Error (list):', errorText);
      throw new Error(`Gmail API error: ${listRes.status}`);
    }

    const listData = await listRes.json();
    const messages = listData.messages || [];

    if (messages.length === 0) return [];

    // 2. Fetch full details for each message
    const messagePromises = messages.map(async (msg: any) => {
      const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!detailRes.ok) return null;
      return detailRes.json();
    });

    const detailedMessages = (await Promise.all(messagePromises)).filter(Boolean);

    // 3. Map to our UI format
    return detailedMessages.map((msg: any) => {
      const headers = msg.payload.headers;
      
      const subjectHeader = headers.find((h: any) => h.name.toLowerCase() === 'subject');
      const fromHeader = headers.find((h: any) => h.name.toLowerCase() === 'from');
      const dateHeader = headers.find((h: any) => h.name.toLowerCase() === 'date');

      let sender = 'Unknown';
      let senderEmail = 'unknown@example.com';
      
      if (fromHeader) {
        const fromMatch = fromHeader.value.match(/(.*)<(.*)>/);
        if (fromMatch) {
          sender = fromMatch[1].trim().replace(/"/g, '');
          senderEmail = fromMatch[2].trim();
        } else {
          sender = fromHeader.value;
          senderEmail = fromHeader.value;
        }
      }

      // Decode Base64 body
      let bodyText = '';
      if (msg.payload.parts) {
        const textPart = msg.payload.parts.find((p: any) => p.mimeType === 'text/plain' || p.mimeType === 'text/html');
        if (textPart && textPart.body && textPart.body.data) {
          const base64Str = textPart.body.data.replace(/-/g, '+').replace(/_/g, '/');
          bodyText = Buffer.from(base64Str, 'base64').toString('utf-8');
        }
      } else if (msg.payload.body && msg.payload.body.data) {
        const base64Str = msg.payload.body.data.replace(/-/g, '+').replace(/_/g, '/');
        bodyText = Buffer.from(base64Str, 'base64').toString('utf-8');
      }

      // If category is "others" but has IMPORTANT, skip it so we don't duplicate emails in "Others" tab
      if (category === 'others' && msg.labelIds?.includes('IMPORTANT')) {
         return null; 
      }

      const isRead = !msg.labelIds?.includes('UNREAD');
      
      let dateStr = 'Unknown';
      if (dateHeader) {
        const dateObj = new Date(dateHeader.value);
        if (!isNaN(dateObj.getTime())) {
          dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
      }

      return {
        id: msg.id,
        category,
        sender,
        senderEmail,
        subject: subjectHeader ? subjectHeader.value : '(No Subject)',
        snippet: msg.snippet || '',
        body: bodyText,
        date: dateStr,
        isRead,
      };
    }).filter(Boolean);

  } catch (error) {
    console.error('Error fetching Gmail:', error);
    throw error;
  }
}
