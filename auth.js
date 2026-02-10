// Authentication Service and UI Management

// Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const TOKEN_KEY = 'token';
const USER_KEY = 'user_data';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');

const loginFormElement = document.getElementById('loginFormElement');
const registerFormElement = document.getElementById('registerFormElement');
const forgotPasswordFormElement = document.getElementById('forgotPasswordFormElement');
const resetPasswordFormElement = document.getElementById('resetPasswordFormElement');

// Navigation Links
const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');

// Guest Login Button
const guestLoginBtn = document.getElementById('guestLoginBtn');

// Theme Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const navMenuBtn = document.getElementById('navMenuBtn');
const navLinks = document.querySelector('.nav-links');

// Toast
const toastEl = document.getElementById('toast');

// State Management
let currentForm = 'login';
let isLoading = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    checkForResetToken();
    
    // Check if user is already authenticated and redirect if needed
    const token = getAuthToken();
    if (token && window.location.pathname.endsWith('auth.html')) {
        // User is on auth page but already has a token, validate and redirect
        validateToken().then(isValid => {
            if (isValid) {
                showToast('Already logged in! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
});

// Event Listeners
function initializeEventListeners() {
    // Form Navigation
    showRegisterLink?.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('register');
    });

    showLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('login');
    });

    forgotPasswordLink?.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('forgot');
    });

    backToLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('login');
    });

    backToLoginFromReset?.addEventListener('click', (e) => {
        e.preventDefault();
        switchForm('login');
    });

    // Form Submissions
    loginFormElement?.addEventListener('submit', handleLogin);
    registerFormElement?.addEventListener('submit', handleRegister);
    forgotPasswordFormElement?.addEventListener('submit', handleForgotPassword);
    resetPasswordFormElement?.addEventListener('submit', handleResetPassword);

    // Guest Login
    guestLoginBtn?.addEventListener('click', handleGuestLogin);

    // Password Visibility Toggles
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', togglePasswordVisibility);
    });

    // Password Strength
    const registerPassword = document.getElementById('registerPassword');
    const newPassword = document.getElementById('newPassword');
    
    registerPassword?.addEventListener('input', (e) => checkPasswordStrength(e.target));
    newPassword?.addEventListener('input', (e) => checkPasswordStrength(e.target));

    // Real-time Validation
    setupRealtimeValidation();
}

// Form Switching
function switchForm(formName) {
    const forms = {
        login: loginForm,
        register: registerForm,
        forgot: forgotPasswordForm,
        reset: resetPasswordForm
    };

    // Hide all forms with animation
    Object.values(forms).forEach(form => {
        if (form) {
            form.classList.add('switching');
            setTimeout(() => {
                form.classList.add('hidden');
                form.classList.remove('switching');
            }, 300);
        }
    });

    // Show selected form
    setTimeout(() => {
        if (forms[formName]) {
            forms[formName].classList.remove('hidden');
            forms[formName].classList.remove('switching');
            currentForm = formName;
            
            // Focus first input
            const firstInput = forms[formName].querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }, 300);
}

// Authentication Functions
async function handleLogin(e) {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    const formData = {
        email: document.getElementById('loginEmail').value.trim(),
        password: document.getElementById('loginPassword').value
    };

    try {
        setFormLoading(true);
        const response = await apiRequest('/auth/login', 'POST', formData);
        
        if (response.success) {
            setAuthToken(response.data.token);
            setUserData(response.data.user);
            
            // Store role separately as requested
            localStorage.setItem('role', response.data.user.role || 'user');
            
            showToast('Login successful! Redirecting...', 'success');
            
            // Redirect to main page immediately
            window.location.href = 'index.html';
        } else {
            showToast(response.message || 'Login failed', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
        console.error('Login error:', error);
    } finally {
        setFormLoading(false);
    }
}

async function handleGuestLogin() {
    try {
        setFormLoading(true);
        
        // Create temporary guest session without API call
        const guestToken = 'guest-session';
        const guestUser = {
            _id: 'guest-' + Date.now(),
            name: 'Guest User',
            email: 'guest@temp.com',
            role: 'guest',
            guest: true,
            createdAt: new Date().toISOString()
        };
        
        // Store guest session locally
        localStorage.setItem('token', guestToken);
        localStorage.setItem('role', 'guest');
        setUserData(guestUser);
        
        showToast('Welcome! Continuing as guest...', 'success');
        
        // Redirect to main page immediately
        window.location.href = 'index.html';
    } catch (error) {
        showToast('Error creating guest session. Please try again.', 'error');
        console.error('Guest login error:', error);
    } finally {
        setFormLoading(false);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    const formData = {
        name: document.getElementById('registerName').value.trim(),
        email: document.getElementById('registerEmail').value.trim(),
        password: document.getElementById('registerPassword').value,
        branch: document.getElementById('registerBranch').value,
        year: document.getElementById('registerYear').value
    };

    try {
        setFormLoading(true);
        const response = await apiRequest('/auth/register', 'POST', formData);
        
        if (response.success) {
            showToast('Registration successful! Redirecting to login...', 'success');
            
            // Auto-login after successful registration
            setTimeout(async () => {
                try {
                    const loginResponse = await apiRequest('/auth/login', 'POST', {
                        email: formData.email,
                        password: formData.password
                    });
                    
                    if (loginResponse.success) {
                        setAuthToken(loginResponse.data.token);
                        setUserData(loginResponse.data.user);
                        
                        // Store role separately as requested
                        localStorage.setItem('role', loginResponse.data.user.role || 'user');
                        
                        showToast('Welcome! Redirecting to dashboard...', 'success');
                        window.location.href = 'index.html';
                    } else {
                        // Fallback to manual login
                        switchForm('login');
                        document.getElementById('loginEmail').value = formData.email;
                    }
                } catch (error) {
                    // Fallback to manual login
                    switchForm('login');
                    document.getElementById('loginEmail').value = formData.email;
                }
            }, 1500);
        } else {
            showToast(response.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
        console.error('Registration error:', error);
    } finally {
        setFormLoading(false);
    }
}

async function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value.trim();
    
    if (!validateEmail(email)) {
        showFieldError('forgotEmail', 'Please enter a valid email');
        return;
    }

    try {
        setFormLoading(true);
        const response = await apiRequest('/auth/forgot-password', 'POST', { email });
        
        if (response.success) {
            showToast('Reset instructions sent to your email!', 'success');
            switchForm('login');
        } else {
            showToast(response.message || 'Failed to send reset email', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
        console.error('Forgot password error:', error);
    } finally {
        setFormLoading(false);
    }
}

async function handleResetPassword(e) {
    e.preventDefault();
    
    if (!validateResetPasswordForm()) return;
    
    const token = document.getElementById('resetToken').value;
    const password = document.getElementById('newPassword').value;

    try {
        setFormLoading(true);
        const response = await apiRequest('/auth/reset-password', 'POST', {
            token,
            password
        });
        
        if (response.success) {
            showToast('Password reset successful! Please login.', 'success');
            switchForm('login');
        } else {
            showToast(response.message || 'Password reset failed', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
        console.error('Reset password error:', error);
    } finally {
        setFormLoading(false);
    }
}

// Validation Functions
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    let isValid = true;

    if (!validateEmail(email)) {
        showFieldError('loginEmail', 'Please enter a valid email');
        isValid = false;
    } else {
        clearFieldError('loginEmail');
    }

    if (!password) {
        showFieldError('loginPassword', 'Password is required');
        isValid = false;
    } else {
        clearFieldError('loginPassword');
    }

    return isValid;
}

function validateRegisterForm() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const branch = document.getElementById('registerBranch').value;
    const year = document.getElementById('registerYear').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    let isValid = true;

    if (name.length < 2) {
        showFieldError('registerName', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearFieldError('registerName');
    }

    if (!validateEmail(email)) {
        showFieldError('registerEmail', 'Please enter a valid email');
        isValid = false;
    } else {
        clearFieldError('registerEmail');
    }

    if (!validatePassword(password)) {
        showFieldError('registerPassword', 'Password must be at least 6 characters with uppercase, lowercase, and number');
        isValid = false;
    } else {
        clearFieldError('registerPassword');
    }

    if (password !== confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        isValid = false;
    } else {
        clearFieldError('confirmPassword');
    }

    if (!branch) {
        showFieldError('registerBranch', 'Please select your branch');
        isValid = false;
    } else {
        clearFieldError('registerBranch');
    }

    if (!year) {
        showFieldError('registerYear', 'Please select your year');
        isValid = false;
    } else {
        clearFieldError('registerYear');
    }

    if (!agreeTerms) {
        showToast('Please agree to the Terms & Conditions', 'warning');
        isValid = false;
    }

    return isValid;
}

function validateResetPasswordForm() {
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    let isValid = true;

    if (!validatePassword(password)) {
        showFieldError('newPassword', 'Password must be at least 6 characters with uppercase, lowercase, and number');
        isValid = false;
    } else {
        clearFieldError('newPassword');
    }

    if (password !== confirmPassword) {
        showFieldError('confirmNewPassword', 'Passwords do not match');
        isValid = false;
    } else {
        clearFieldError('confirmNewPassword');
    }

    return isValid;
}

// Real-time Validation
function setupRealtimeValidation() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() && !validateEmail(input.value.trim())) {
                showFieldError(input.id, 'Please enter a valid email');
            } else {
                clearFieldError(input.id);
            }
        });
    });

    // Password confirmation
    const confirmPasswordInputs = [
        { password: 'registerPassword', confirm: 'confirmPassword' },
        { password: 'newPassword', confirm: 'confirmNewPassword' }
    ];

    confirmPasswordInputs.forEach(({ password, confirm }) => {
        const confirmInput = document.getElementById(confirm);
        const passwordInput = document.getElementById(password);

        confirmInput?.addEventListener('blur', () => {
            if (confirmInput.value && passwordInput.value && confirmInput.value !== passwordInput.value) {
                showFieldError(confirm, 'Passwords do not match');
            } else {
                clearFieldError(confirm);
            }
        });
    });
}

// Utility Functions
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
}

function checkPasswordStrength(input) {
    const password = input.value;
    const strengthBar = input.parentElement.parentElement.querySelector('.strength-fill');
    const strengthText = input.parentElement.parentElement.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;

    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const strengthPercent = (strength / 6) * 100;
    strengthBar.style.width = `${strengthPercent}%`;

    if (strength <= 2) {
        strengthText.textContent = 'Weak';
        strengthBar.style.background = '#ef4444';
    } else if (strength <= 4) {
        strengthText.textContent = 'Medium';
        strengthBar.style.background = '#eab308';
    } else {
        strengthText.textContent = 'Strong';
        strengthBar.style.background = '#22c55e';
    }
}

function togglePasswordVisibility(e) {
    const button = e.currentTarget;
    const input = button.parentElement.querySelector('input');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.form-error');
    
    if (errorElement) {
        errorElement.textContent = message;
        field.style.borderColor = '#ef4444';
    }
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.form-error');
    
    if (errorElement) {
        errorElement.textContent = '';
        field.style.borderColor = '';
    }
}

function setFormLoading(loading) {
    isLoading = loading;
    const activeForm = document.querySelector('.auth-container:not(.hidden)');
    const button = activeForm?.querySelector('.auth-btn');
    
    if (button) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }
}

// Toast Notification
function showToast(message, type = 'info') {
    if (!toastEl) return;
    
    toastEl.textContent = message;
    toastEl.className = `toast ${type}`;
    toastEl.classList.add('show');
    
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

// Theme Management
// Token Management
function setAuthToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function removeAuthToken() {
    localStorage.removeItem(TOKEN_KEY);
}

function setUserData(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUserData() {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

function removeUserData() {
    localStorage.removeItem(USER_KEY);
}

function isAuthenticated() {
    return !!getAuthToken();
}

// Token Validation Function
async function validateToken() {
    const token = getAuthToken();
    if (!token) return false;
    
    try {
        const response = await apiRequest('/auth/profile');
        return response.success;
    } catch (error) {
        // Token is invalid, remove it
        removeAuthToken();
        removeUserData();
        return false;
    }
}

// Protected Page Check
function checkProtectedPage() {
    // Check if this is a protected page (not auth.html)
    if (window.location.pathname.endsWith('auth.html')) {
        return; // This is the auth page, no need to check
    }
    
    // For protected pages like index.html, check authentication
    const token = getAuthToken();
    if (!token) {
        // No token found, redirect to login
        window.location.href = 'auth.html';
        return;
    }
    
    // Validate token asynchronously
    validateToken().then(isValid => {
        if (!isValid) {
            window.location.href = 'auth.html';
        }
    });
}

// API Request Function
async function apiRequest(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (getAuthToken()) {
        config.headers.Authorization = `Bearer ${getAuthToken()}`;
    }

    if (data && method !== 'GET') {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

// Check for Reset Token in URL
function checkForResetToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
        document.getElementById('resetToken').value = token;
        switchForm('reset');
        
        // Clear token from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Logout Function (can be called from other pages)
function logout() {
    removeAuthToken();
    removeUserData();
    localStorage.removeItem('role');
    showToast('Logged out successfully', 'success');
    window.location.href = 'auth.html';
}

// Make logout available globally
window.logout = logout;
