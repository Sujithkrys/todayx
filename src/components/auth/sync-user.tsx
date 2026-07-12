'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function SyncUser() {
  const { isLoaded, isSignedIn } = useAuth();
  const storeUser = useMutation(api.users.store);
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !hasSynced) {
      storeUser()
        .then(() => setHasSynced(true))
        .catch(console.error);
    }
  }, [isLoaded, isSignedIn, hasSynced, storeUser]);

  return null;
}
