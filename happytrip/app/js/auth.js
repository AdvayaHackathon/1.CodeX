// HappyTrip - Authentication Script

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const username = localStorage.getItem('username');
    
    // UI elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userProfileArea = document.getElementById('userProfileArea');
    const usernameDisplay = document.getElementById('username');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminLinkElement = document.querySelector('.admin-link');
    
    // Update UI based on login status
    if (userLoggedIn === 'true' && username) {
        if (loginBtn) loginBtn.classList.add('d-none');
        if (registerBtn) registerBtn.classList.add('d-none');
        if (userProfileArea) userProfileArea.classList.remove('d-none');
        if (usernameDisplay) usernameDisplay.textContent = username;
    } else {
        if (loginBtn) loginBtn.classList.remove('d-none');
        if (registerBtn) registerBtn.classList.remove('d-none');
        if (userProfileArea) userProfileArea.classList.add('d-none');
    }
    
    // Update admin link visibility based on admin status
    if (adminLinkElement) {
        const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
        
        // Uncomment the line below if you want to completely hide the admin link from non-admin users
        // if (!isAdmin) adminLinkElement.parentElement.style.display = 'none';
        
        // Alternatively, style it differently for non-admins
        if (!isAdmin) {
            adminLinkElement.classList.add('text-muted');
            adminLinkElement.addEventListener('click', function(e) {
                if (!isAdmin) {
                    e.preventDefault();
                    alert('You need administrator privileges to access this area.');
                    // Redirect to admin login
                    window.location.href = 'app/admin/login.html';
                }
            });
        }
    }
    
    // Setup login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    }
    
    // Setup register modal
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
            registerModal.show();
        });
    }
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('userToken');
            
            // Reload the page to reset UI
            window.location.reload();
        });
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            // In a real app, this would be an API call to validate credentials
            // For demo, we'll simulate a successful login
            
            // Simple demo validation (for a real app, this would be on the server)
            if (username && password) {
                // Store login info in localStorage
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userToken', 'demo-jwt-token-' + Date.now());
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
                
                // Reload the page to update UI
                window.location.reload();
            }
        });
    }
    
    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const username = document.getElementById('registerUsername').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Simple validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real app, this would be an API call to register the user
            // For demo, we'll simulate a successful registration
            
            if (fullName && email && username && password) {
                // Store user info in localStorage
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('username', username);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userFullName', fullName);
                localStorage.setItem('userToken', 'demo-jwt-token-' + Date.now());
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                modal.hide();
                
                // Reload the page to update UI
                window.location.reload();
            }
        });
    }
});

// Function to check if a user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Function to check if user is an admin
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Function to get the current user's info
function getCurrentUser() {
    if (isUserLoggedIn()) {
        return {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('userEmail'),
            fullName: localStorage.getItem('userFullName'),
            token: localStorage.getItem('userToken')
        };
    }
    return null;
}

// Function to get the current admin's info
function getCurrentAdmin() {
    if (isAdminLoggedIn()) {
        return {
            username: localStorage.getItem('adminUsername')
        };
    }
    return null;
}

// Function for pages that require authentication
function requireAuth() {
    if (!isUserLoggedIn()) {
        window.location.href = '../../index.html';
        alert('Please log in to access this page.');
        return false;
    }
    return true;
}

// Function for pages that require admin authentication
function requireAdminAuth() {
    if (!isAdminLoggedIn()) {
        window.location.href = '../admin/login.html';
        alert('Admin access required.');
        return false;
    }
    return true;
} 