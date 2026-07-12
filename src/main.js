import './styles/design-system.css';
import './styles/auth.css';

// ============================================
// Databolt — Authentication Page
// Matches Voicera reference exactly
// ============================================

const app = document.querySelector('#app');

// State
let activeTab = 'signUp'; // 'signIn' | 'signUp' | 'reset' | 'newPassword'
let errorMsg = '';
let successMsg = '';
let isLoading = false;

// --- SVG Icons ---
const googleIcon = `<svg class="w-5 h-5" viewBox="0 0 24 24">
  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
</svg>`;

const arrowLeftIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`;

const chevronRightIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;

const activityIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>`;

const alertCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;

const checkCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>`;

// --- Helpers ---
function getHeading() {
  switch (activeTab) {
    case 'signUp': return 'Create an account';
    case 'signIn': return 'Welcome back';
    case 'reset': return 'Reset password';
    case 'newPassword': return 'Set new password';
    default: return '';
  }
}

function getSubheading() {
  switch (activeTab) {
    case 'signUp': return 'Get started in a couple of minutes.';
    case 'signIn': return 'Sign in to access your dashboard.';
    case 'reset': return "We'll send a recovery link to your inbox.";
    case 'newPassword': return 'Choose a strong secure password for your account.';
    default: return '';
  }
}

// --- Render Alerts ---
function renderAlerts() {
  let html = '';
  if (errorMsg) {
    html += `<div class="auth-alert auth-alert-error">${alertCircleIcon}<span>${errorMsg}</span></div>`;
  }
  if (successMsg) {
    html += `<div class="auth-alert auth-alert-success">${checkCircleIcon}<span>${successMsg}</span></div>`;
  }
  return html;
}

// --- Render Sign Up Form ---
function renderSignUpContent() {
  return `
    <div style="display:flex;flex-direction:column;gap:1rem;">
      <button class="auth-social-btn" type="button" id="google-btn">
        ${googleIcon}
        Continue with Google
      </button>
      <div class="auth-divider">
        <div class="auth-divider-line"></div>
        <div class="auth-divider-text">Or sign up with email</div>
        <div class="auth-divider-line"></div>
      </div>
    </div>
    <form id="auth-form" autocomplete="on">
      <div class="auth-fields">
        <div class="auth-field">
          <label class="auth-label" for="signup-name">Full name</label>
          <input class="auth-input" id="signup-name" name="fullName" placeholder="Jane Doe" required />
        </div>
        <div class="auth-field">
          <label class="auth-label" for="signup-email">Work email</label>
          <input class="auth-input" id="signup-email" name="email" type="email" placeholder="jane@company.com" required />
        </div>
        <div class="auth-password-row">
          <div class="auth-field">
            <label class="auth-label" for="signup-password">Password</label>
            <input class="auth-input" id="signup-password" name="password" type="password" required />
          </div>
          <div class="auth-field">
            <label class="auth-label" for="signup-confirm">Confirm password</label>
            <input class="auth-input" id="signup-confirm" name="confirm" type="password" required />
          </div>
        </div>
        <button class="auth-primary-btn" type="submit" id="submit-btn" ${isLoading ? 'disabled' : ''}>
          ${isLoading ? 'Creating account...' : 'Create account'}
          ${!isLoading ? chevronRightIcon : ''}
        </button>
      </div>
    </form>
  `;
}

// --- Render Sign In Form ---
function renderSignInContent() {
  return `
    <div style="display:flex;flex-direction:column;gap:1rem;">
      <button class="auth-social-btn" type="button" id="google-btn">
        ${googleIcon}
        Continue with Google
      </button>
      <div class="auth-divider">
        <div class="auth-divider-line"></div>
        <div class="auth-divider-text">Or sign in with email</div>
        <div class="auth-divider-line"></div>
      </div>
    </div>
    <form id="auth-form" autocomplete="on">
      <div class="auth-fields">
        <div class="auth-field">
          <label class="auth-label" for="signin-email">Work email</label>
          <input class="auth-input" id="signin-email" name="email" type="email" placeholder="jane@company.com" required />
        </div>
        <div class="auth-field">
          <div class="auth-label-row">
            <label class="auth-label" for="signin-password">Password</label>
            <button type="button" class="auth-forgot-btn" id="forgot-btn">Forgot password?</button>
          </div>
          <input class="auth-input" id="signin-password" name="password" type="password" required />
        </div>
        <button class="auth-primary-btn" type="submit" id="submit-btn" ${isLoading ? 'disabled' : ''}>
          ${isLoading ? 'Signing in...' : 'Sign In'}
          ${!isLoading ? chevronRightIcon : ''}
        </button>
      </div>
    </form>
  `;
}

// --- Render Reset Form ---
function renderResetContent() {
  return `
    <form id="auth-form" autocomplete="on">
      <div class="auth-fields">
        <div class="auth-field">
          <label class="auth-label" for="reset-email">Work email</label>
          <input class="auth-input" id="reset-email" name="email" type="email" placeholder="name@company.com" required />
        </div>
        <button class="auth-primary-btn" type="submit" id="submit-btn" ${isLoading ? 'disabled' : ''}>
          ${isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
    <button class="auth-back-link-btn" id="back-to-signin-btn">Back to sign in</button>
  `;
}

// --- Render New Password Form ---
function renderNewPasswordContent() {
  return `
    <form id="auth-form" autocomplete="on">
      <div class="auth-fields">
        <div class="auth-field">
          <label class="auth-label" for="new-password">New password</label>
          <input class="auth-input" id="new-password" name="password" type="password" required />
        </div>
        <div class="auth-field">
          <label class="auth-label" for="new-confirm">Confirm new password</label>
          <input class="auth-input" id="new-confirm" name="confirm" type="password" required />
        </div>
        <button class="auth-primary-btn" type="submit" id="submit-btn" ${isLoading ? 'disabled' : ''}>
          ${isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </form>
  `;
}

// --- Main Render ---
function render() {
  const showTabs = activeTab === 'signIn' || activeTab === 'signUp';

  let formContent = '';
  if (activeTab === 'signUp') formContent = renderSignUpContent();
  else if (activeTab === 'signIn') formContent = renderSignInContent();
  else if (activeTab === 'reset') formContent = renderResetContent();
  else if (activeTab === 'newPassword') formContent = renderNewPasswordContent();

  app.innerHTML = `
    <div class="auth-container">
      <!-- Left Brand Pane -->
      <div class="auth-hero">
        <div class="auth-hero-overlay"></div>
        <div class="auth-hero-dots"></div>

        <div class="auth-hero-top">
          <button class="auth-back-btn" id="back-home-btn">
            ${arrowLeftIcon}
            Back home
          </button>
          <div class="auth-brand">
            <div class="auth-brand-icon">${activityIcon}</div>
            <span class="auth-brand-name">Databolt</span>
          </div>
        </div>

        <div class="auth-hero-content">
          <div class="auth-hero-badge">Start free, no card</div>
          <h1 class="auth-hero-title">
            500 free minutes.<br>
            <span class="text-muted">Live in under an hour.</span>
          </h1>
          <p class="auth-hero-subtitle">Trusted by support teams at fintechs, marketplaces, and SaaS leaders. No credit card required to start.</p>
          <div class="auth-hero-stats">
            <div class="auth-stat">
              <span class="auth-stat-label">Setup time</span>
              <span class="auth-stat-value">~12 <span class="unit">min</span></span>
            </div>
            <div class="auth-stat">
              <span class="auth-stat-label">Free credits</span>
              <span class="auth-stat-value">500 <span class="unit">min</span></span>
            </div>
          </div>
        </div>

        <div class="auth-hero-footer">
          <span>&copy; ${new Date().getFullYear()} Databolt Inc.</span>
          <div class="auth-hero-footer-links">
            <span id="privacy-link">Privacy</span>
            <span id="terms-link">Terms</span>
          </div>
        </div>
      </div>

      <!-- Right Form Pane -->
      <div class="auth-form-panel">
        <div class="auth-form-wrapper">
          <div>
            <h2 class="auth-form-heading">${getHeading()}</h2>
            <p class="auth-form-subheading">${getSubheading()}</p>
          </div>

          ${renderAlerts()}

          ${showTabs ? `
            <div class="auth-tabs" id="auth-tabs">
              <button class="auth-tab" data-tab="signIn" data-state="${activeTab === 'signIn' ? 'active' : 'inactive'}" id="tab-signin">Sign In</button>
              <button class="auth-tab" data-tab="signUp" data-state="${activeTab === 'signUp' ? 'active' : 'inactive'}" id="tab-signup">Sign Up</button>
            </div>
          ` : ''}

          ${formContent}
        </div>
      </div>
    </div>
  `;

  attachListeners();
}

// --- Event Listeners ---
function attachListeners() {
  // Tab switching
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const newTab = e.currentTarget.dataset.tab;
      if (newTab !== activeTab) {
        activeTab = newTab;
        errorMsg = '';
        successMsg = '';
        render();
      }
    });
  });

  // Forgot password
  const forgotBtn = document.getElementById('forgot-btn');
  if (forgotBtn) {
    forgotBtn.addEventListener('click', () => {
      activeTab = 'reset';
      errorMsg = '';
      successMsg = '';
      render();
    });
  }

  // Back to sign in
  const backToSignin = document.getElementById('back-to-signin-btn');
  if (backToSignin) {
    backToSignin.addEventListener('click', () => {
      activeTab = 'signIn';
      errorMsg = '';
      successMsg = '';
      render();
    });
  }

  // Form submission
  const form = document.getElementById('auth-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(e);
    });
  }

  // Google button
  const googleBtn = document.getElementById('google-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      // Placeholder — integrate with your auth provider
      successMsg = 'Google sign-in initiated...';
      errorMsg = '';
      render();
    });
  }
}

// --- Form Handlers ---
function handleFormSubmit(e) {
  const formData = new FormData(e.target);
  errorMsg = '';
  successMsg = '';

  if (activeTab === 'signUp') {
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    if (password !== confirm) {
      errorMsg = 'Passwords do not match.';
      render();
      return;
    }
    // Simulate sign up
    isLoading = true;
    render();
    setTimeout(() => {
      isLoading = false;
      successMsg = '✓ Account created! Please check your email to activate your account.';
      e.target.reset();
      render();
    }, 1500);

  } else if (activeTab === 'signIn') {
    isLoading = true;
    render();
    setTimeout(() => {
      isLoading = false;
      successMsg = '✓ Signed in successfully! Redirecting...';
      render();
    }, 1500);

  } else if (activeTab === 'reset') {
    const email = formData.get('email');
    if (!email) {
      errorMsg = 'Please enter your work email.';
      render();
      return;
    }
    isLoading = true;
    render();
    setTimeout(() => {
      isLoading = false;
      successMsg = 'Password reset email sent. Check your inbox.';
      render();
    }, 1500);

  } else if (activeTab === 'newPassword') {
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    if (password !== confirm) {
      errorMsg = 'Passwords do not match.';
      render();
      return;
    }
    isLoading = true;
    render();
    setTimeout(() => {
      isLoading = false;
      successMsg = '✓ Password updated successfully! You can now sign in.';
      activeTab = 'signIn';
      render();
    }, 1500);
  }
}

// Initial render
render();
