document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary DOM elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formFeedback = document.getElementById('formFeedback');

    // Hardcoded credentials
    const validEmail = 'test@example.com';
    const validPassword = 'password123';

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time validation for email
    emailInput.addEventListener('input', () => {
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required.';
            emailError.style.display = 'block';
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });

    // Real-time validation for password
    passwordInput.addEventListener('input', () => {
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Password is required.';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });

    // Handle form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Clear previous feedback
        formFeedback.textContent = '';
        
        let isValid = true;

        // Final validation checks on submit
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Password is required.';
            passwordError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Hardcoded authentication logic
            if (emailInput.value.trim() === validEmail && passwordInput.value.trim() === validPassword) {
                // Success: Redirect or show success message
                formFeedback.textContent = 'Login successful!';
                formFeedback.style.color = '#2ecc71';
                // Optional: redirect to a success page
                window.location.href = 'success.html'; 
            } else {
                // Failure: Display error message
                formFeedback.textContent = 'Invalid email or password.';
                formFeedback.style.color = '#e74c3c';
            }
        }
    });
});