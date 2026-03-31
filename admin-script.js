document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('adminLoginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const loginButton = document.querySelector('.login-button');


    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModal = document.getElementById('closeModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetCodeForm = document.getElementById('resetCodeForm');
    const sendResetBtn = document.getElementById('sendResetBtn');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const backToEmailBtn = document.getElementById('backToEmailBtn');
    const forgotErrorMessage = document.getElementById('forgotErrorMessage');
    const forgotSuccessMessage = document.getElementById('forgotSuccessMessage');
    const resetErrorMessage = document.getElementById('resetErrorMessage');
    const resetSuccessMessage = document.getElementById('resetSuccessMessage');
    const resetEmail = document.getElementById('resetEmail');
    const resetCode = document.getElementById('resetCode');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPassword = document.getElementById('confirmNewPassword');

    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'reeves001!'
    };
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        loginButton.disabled = false;
        loginButton.innerHTML = '<span>Login</span>';
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function showLoading() {
        loginButton.disabled = true;
        loginButton.innerHTML = '<span>Logging in...</span>';
    }

    function validateForm(username, password) {
        if (!username.trim()) {
            showError('Please enter your username');
            return false;
        }

        if (!password.trim()) {
            showError('Please enter your password');
            return false;
        }

        return true;
    }

    function authenticate(username, password) {
        return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
    }

    function handleLogin(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        hideError();

        if (!validateForm(username, password)) {
            return;
        }

        showLoading();

        
        setTimeout(() => {
            if (authenticate(username, password)) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminLoginTime', new Date().toISOString());
                window.location.href = 'admin-dashboard.html';
            } else {
                showError('Invalid username or password. Please try again.');
            }
        }, 1000);
    }
    loginForm.addEventListener('submit', handleLogin);
    usernameInput.addEventListener('input', hideError);
    passwordInput.addEventListener('input', hideError);
    forgotPasswordLink.addEventListener('click', openForgotPasswordModal);
    closeModal.addEventListener('click', closeForgotPasswordModal);
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    resetCodeForm.addEventListener('submit', handleResetPassword);
    backToEmailBtn.addEventListener('click', showEmailForm);

    window.addEventListener('click', function(event) {
        if (event.target === forgotPasswordModal) {
            closeForgotPasswordModal();
        }
    });
    usernameInput.focus();
    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
});

function openForgotPasswordModal(event) {
    event.preventDefault();
    forgotPasswordModal.style.display = 'block';
    resetEmail.focus();
}

function closeForgotPasswordModal() {
    forgotPasswordModal.style.display = 'none';
    forgotPasswordForm.reset();
    resetCodeForm.reset();
    forgotPasswordForm.style.display = 'block';
    resetCodeForm.style.display = 'none';
    hideForgotMessages();
    hideResetMessages();
}

function showEmailForm() {
    forgotPasswordForm.style.display = 'block';
    resetCodeForm.style.display = 'none';
    hideResetMessages();
}

function hideForgotMessages() {
    forgotErrorMessage.style.display = 'none';
    forgotSuccessMessage.style.display = 'none';
}

function hideResetMessages() {
    resetErrorMessage.style.display = 'none';
    resetSuccessMessage.style.display = 'none';
}

function showForgotError(message) {
    forgotErrorMessage.textContent = message;
    forgotErrorMessage.style.display = 'block';
    forgotSuccessMessage.style.display = 'none';
    sendResetBtn.disabled = false;
    sendResetBtn.innerHTML = '<span>Send Reset Code</span>';
}

function showForgotSuccess(message) {
    forgotSuccessMessage.textContent = message;
    forgotSuccessMessage.style.display = 'block';
    forgotErrorMessage.style.display = 'none';
    sendResetBtn.disabled = false;
    sendResetBtn.innerHTML = '<span>Send Reset Code</span>';
}

function showResetError(message) {
    resetErrorMessage.textContent = message;
    resetErrorMessage.style.display = 'block';
    resetSuccessMessage.style.display = 'none';
    resetPasswordBtn.disabled = false;
    resetPasswordBtn.innerHTML = '<span>Reset Password</span>';
}

function showResetSuccess(message) {
    resetSuccessMessage.textContent = message;
    resetSuccessMessage.style.display = 'block';
    resetErrorMessage.style.display = 'none';
    resetPasswordBtn.disabled = false;
    resetPasswordBtn.innerHTML = '<span>Reset Password</span>';
}

function handleForgotPassword(event) {
    event.preventDefault();

    const email = resetEmail.value.trim();
    hideForgotMessages();

    if (!email) {
        showForgotError('Please enter your email address');
        return;
    }

    if (!isValidEmail(email)) {
        showForgotError('Please enter a valid email address');
        return;
    }

    if (!email.includes('@reevesboutique.com') && !email.includes('@admin.com')) {
        showForgotError('Email address not found in our system');
        return;
    }

    sendResetBtn.disabled = true;
    sendResetBtn.innerHTML = '<span>Sending...</span>';

    setTimeout(() => {
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('resetCode', resetCode);
        localStorage.setItem('resetEmail', email);
        localStorage.setItem('resetCodeExpiry', Date.now() + 300000); // 5 minutes

        showForgotSuccess(`Reset code sent to ${email}. Please check your email.`);

        setTimeout(() => {
            forgotPasswordForm.style.display = 'none';
            resetCodeForm.style.display = 'block';
            resetCode.focus();
        }, 2000);
    }, 1500);
}

function handleResetPassword(event) {
    event.preventDefault();

    const code = resetCode.value.trim();
    const newPass = newPasswordInput.value.trim();
    const confirmPass = confirmNewPassword.value.trim();

    hideResetMessages();

    if (!code) {
        showResetError('Please enter the reset code');
        return;
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
        showResetError('Please enter a valid 6-digit reset code');
        return;
    }

    if (!newPass) {
        showResetError('Please enter a new password');
        return;
    }

    if (newPass.length < 6) {
        showResetError('Password must be at least 6 characters long');
        return;
    }

    if (newPass !== confirmPass) {
        showResetError('Passwords do not match');
        return;
    }

    // Check if reset code is valid
    const storedCode = localStorage.getItem('resetCode');
    const storedEmail = localStorage.getItem('resetEmail');
    const expiry = localStorage.getItem('resetCodeExpiry');

    if (!storedCode || !storedEmail || !expiry) {
        showResetError('Reset code has expired. Please request a new one.');
        return;
    }

    if (Date.now() > parseInt(expiry)) {
        showResetError('Reset code has expired. Please request a new one.');
        return;
    }

    if (code !== storedCode) {
        showResetError('Invalid reset code. Please try again.');
        return;
    }

    resetPasswordBtn.disabled = true;
    resetPasswordBtn.innerHTML = '<span>Resetting...</span>';

    setTimeout(() => {
        ADMIN_CREDENTIALS.password = newPass;
        localStorage.removeItem('resetCode');
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetCodeExpiry');

        showResetSuccess('Password reset successfully! You can now login with your new password.');

        setTimeout(() => {
            closeForgotPasswordModal();
        }, 3000);
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}