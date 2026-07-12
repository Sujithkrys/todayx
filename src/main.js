import './styles/design-system.css';
import './styles/auth.css';

// ============================================
// Databolt — Authentication Page
// ============================================

const app = document.querySelector('#app');

// State
let activeTab = 'signup'; // 'signin' | 'signup'
let showPassword = false;
let showConfirmPassword = false;

// Google SVG icon
const googleIcon = `<svg viewBox="0 0 24 24" width="18" height="18">
  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
</svg>`;

// Arrow icon
const arrowRight = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

// Back arrow icon
const arrowLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`;

// Eye icons
const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;

const eyeOffIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;

// Database icon for brand
const databaseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`;

// Generate particles data
function generateParticles(count) {
  let html = '';
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 6;
    const size = 1 + Math.random() * 2;
    html += `<div class="particle" style="
      left: ${left}%;
      bottom: -10px;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    "></div>`;
  }
  return html;
}

function renderSignUpForm() {
  return `
    <div class="auth-form-group" id="field-fullname">
      <label class="auth-form-label" for="fullname">Full name</label>
      <input class="auth-form-input" type="text" id="fullname" placeholder="Jane Doe" autocomplete="name" />
    </div>

    <div class="auth-form-group" id="field-email">
      <label class="auth-form-label" for="email">Work email</label>
      <input class="auth-form-input" type="email" id="email" placeholder="you@company.com" autocomplete="email" />
    </div>

    <div class="auth-form-row">
      <div class="auth-form-group" id="field-password">
        <label class="auth-form-label" for="password">Password</label>
        <div class="auth-password-wrapper">
          <input class="auth-form-input" type="${showPassword ? 'text' : 'password'}" id="password" placeholder="••••••••" autocomplete="new-password" />
          <button type="button" class="auth-password-toggle" id="toggle-password" aria-label="Toggle password visibility">
            ${showPassword ? eyeOffIcon : eyeIcon}
          </button>
        </div>
      </div>
      <div class="auth-form-group" id="field-confirm-password">
        <label class="auth-form-label" for="confirm-password">Confirm password</label>
        <div class="auth-password-wrapper">
          <input class="auth-form-input" type="${showConfirmPassword ? 'text' : 'password'}" id="confirm-password" placeholder="••••••••" autocomplete="new-password" />
          <button type="button" class="auth-password-toggle" id="toggle-confirm-password" aria-label="Toggle confirm password visibility">
            ${showConfirmPassword ? eyeOffIcon : eyeIcon}
          </button>
        </div>
      </div>
    </div>

    <button class="auth-submit-btn" type="submit" id="submit-btn">
      Create account
      ${arrowRight}
    </button>
  `;
}

function renderSignInForm() {
  return `
    <div class="auth-form-group" id="field-signin-email">
      <label class="auth-form-label" for="signin-email">Email address</label>
      <input class="auth-form-input" type="email" id="signin-email" placeholder="you@company.com" autocomplete="email" />
    </div>

    <div class="auth-form-group" id="field-signin-password">
      <label class="auth-form-label" for="signin-password">Password</label>
      <div class="auth-password-wrapper">
        <input class="auth-form-input" type="${showPassword ? 'text' : 'password'}" id="signin-password" placeholder="••••••••" autocomplete="current-password" />
        <button type="button" class="auth-password-toggle" id="toggle-signin-password" aria-label="Toggle password visibility">
          ${showPassword ? eyeOffIcon : eyeIcon}
        </button>
      </div>
    </div>

    <a class="auth-forgot-link" href="#" id="forgot-link">Forgot password?</a>

    <button class="auth-submit-btn" type="submit" id="submit-btn">
      Sign in
      ${arrowRight}
    </button>
  `;
}

function render() {
  const isSignUp = activeTab === 'signup';

  app.innerHTML = `
    <div class="auth-container">
      <!-- Left Hero Panel -->
      <div class="auth-hero">
        <div class="auth-hero-grid"></div>
        <div class="auth-hero-glow"></div>
        <div class="auth-hero-particles">
          ${generateParticles(15)}
        </div>

        <div>
          <a class="auth-back-link" id="back-home-link">
            ${arrowLeft}
            Back home
          </a>
          <div class="auth-brand">
            <div class="auth-brand-icon">
              ${databaseIcon}
            </div>
            <span class="auth-brand-name">Databolt</span>
          </div>
        </div>

        <div class="auth-hero-content">
          <span class="auth-hero-label">Start free, no card</span>
          <h1 class="auth-hero-title">500 free minutes.<br>Live in under an hour.</h1>
          <p class="auth-hero-subtitle">Trusted by support teams at fintechs, marketplaces, and SaaS leaders. No credit card required to start.</p>
        </div>

        <div>
          <div class="auth-hero-stats">
            <div class="auth-stat">
              <span class="auth-stat-label">Setup Time</span>
              <span class="auth-stat-value">~12 <span>min</span></span>
            </div>
            <div class="auth-stat">
              <span class="auth-stat-label">Free Credits</span>
              <span class="auth-stat-value">500 <span>min</span></span>
            </div>
          </div>

          <div class="auth-hero-footer">
            <span>&copy; 2026 Databolt Inc.</span>
            <div class="auth-hero-footer-links">
              <a href="#" id="privacy-link">Privacy</a>
              <a href="#" id="terms-link">Terms</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Form Panel -->
      <div class="auth-form-panel">
        <div class="auth-form-wrapper">
          <h2 class="auth-form-heading">${isSignUp ? 'Create an account' : 'Welcome back'}</h2>
          <p class="auth-form-subheading">${isSignUp ? 'Get started in a couple of minutes.' : 'Sign in to your account.'}</p>

          <!-- Tabs -->
          <div class="auth-tabs" id="auth-tabs">
            <button class="auth-tab ${activeTab === 'signin' ? 'active' : ''}" data-tab="signin" id="tab-signin">Sign In</button>
            <button class="auth-tab ${activeTab === 'signup' ? 'active' : ''}" data-tab="signup" id="tab-signup">Sign Up</button>
          </div>

          <!-- Google Sign In -->
          <button class="auth-social-btn" type="button" id="google-signin-btn">
            ${googleIcon}
            Continue with Google
          </button>

          <!-- Divider -->
          <div class="auth-divider">
            <span>${isSignUp ? 'Or sign up with email' : 'Or sign in with email'}</span>
          </div>

          <!-- Form -->
          <form id="auth-form" autocomplete="on">
            ${isSignUp ? renderSignUpForm() : renderSignInForm()}
          </form>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  attachListeners();
}

function attachListeners() {
  // Tab switching
  const tabs = document.querySelectorAll('.auth-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const newTab = e.currentTarget.dataset.tab;
      if (newTab !== activeTab) {
        activeTab = newTab;
        showPassword = false;
        showConfirmPassword = false;
        render();
      }
    });
  });

  // Password toggle
  const togglePwd = document.getElementById('toggle-password');
  if (togglePwd) {
    togglePwd.addEventListener('click', () => {
      showPassword = !showPassword;
      render();
      // Refocus the password field
      const pwdField = document.getElementById('password');
      if (pwdField) pwdField.focus();
    });
  }

  const toggleConfirmPwd = document.getElementById('toggle-confirm-password');
  if (toggleConfirmPwd) {
    toggleConfirmPwd.addEventListener('click', () => {
      showConfirmPassword = !showConfirmPassword;
      render();
      const confirmPwdField = document.getElementById('confirm-password');
      if (confirmPwdField) confirmPwdField.focus();
    });
  }

  const toggleSigninPwd = document.getElementById('toggle-signin-password');
  if (toggleSigninPwd) {
    toggleSigninPwd.addEventListener('click', () => {
      showPassword = !showPassword;
      render();
      const signinPwdField = document.getElementById('signin-password');
      if (signinPwdField) signinPwdField.focus();
    });
  }

  // Form submission
  const form = document.getElementById('auth-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite;">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        ${activeTab === 'signup' ? 'Creating account...' : 'Signing in...'}
      `;
      btn.disabled = true;
      btn.style.opacity = '0.8';

      // Simulate async action
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 2000);
    });
  }
}

// Add spinner keyframe dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

// Initial render
render();
