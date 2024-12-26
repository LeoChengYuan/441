document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Add a submit event listener to the registration form to block the form's default submit behavior
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        if (username && password) {
            localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
            alert('Registration successful! You can now log in.');
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

            // If registered user information exists and the entered user name and password match the stored one
        if (registeredUser && registeredUser.username === username && registeredUser.password === password) {
            localStorage.setItem('isAuthenticated', 'true');
            // A dialog box is displayed informing the user that the login is successful
            alert('Login successful!');
            // Redirect the page to the shopping.html page
            window.location.href = 'shopping.html';
        } else {
            // If the user name or password does not match, a dialog box is displayed informing the user that the login fails
            alert('Invalid username or password.');
        }
    });

    // Route protection
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentPath = window.location.pathname;

    if ((currentPath === '/cart.html' || currentPath === '/contact.html') && isAuthenticated !== 'true') {
        alert('You must be logged in to access this page.');
        window.location.href = 'register.html';
    }
});

