document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION =====
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    // Update active nav link on scroll
    function updateActiveNavLink() {
        const scrollPos = window.scrollY;
        
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section.offsetTop - 100 <= scrollPos && 
                section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
        
        // Header background on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Add click events to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !hamburger.contains(e.target)) {
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ===== SCROLL TO TOP =====
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== BOOKING FORM =====
    const bookingForm = document.getElementById('bookingForm');
    const confirmationMsg = document.getElementById('confirmationMsg');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const guests = document.getElementById('guests').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            if (!name || !email || !phone || !guests || !date || !time) {
                alert('Please fill all fields correctly!');
                return;
            }
            
            confirmationMsg.innerHTML = `Thank you, <strong>${name}</strong>! <br>
                Your table for <strong>${guests}</strong> guests is booked on 
                <strong>${date}</strong> at <strong>${time}</strong>.`;
            
            bookingForm.reset();
            
            // Scroll to confirmation message
            setTimeout(() => {
                confirmationMsg.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }
    
    // ===== GALLERY MODAL =====
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const galleryImages = document.querySelectorAll('.g-img');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src;
            });
        });
        
        // Close modal
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close when clicking outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // ===== LOGIN/SIGNUP TOGGLE =====
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignUp = document.getElementById('showSignUp');
    const showLogin = document.getElementById('showLogin');
    
    if (showSignUp && showLogin) {
        showSignUp.addEventListener('click', function() {
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });
        
        showLogin.addEventListener('click', function() {
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });
        
        // Login Validation
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let email = document.getElementById('loginEmail').value;
            let password = document.getElementById('loginPassword').value;
            
            if (email === '' || password === '') {
                alert('All fields are required!');
            } else {
                alert('Login successful!');
                loginForm.reset();
            }
        });
        
        // Sign Up Validation
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let name = document.getElementById('signupName').value;
            let email = document.getElementById('signupEmail').value;
            let password = document.getElementById('signupPassword').value;
            
            if (name === '' || email === '' || password === '') {
                alert('All fields are required!');
            } else {
                alert('Sign Up Successful! You can login now.');
                signupForm.reset();
                signupForm.classList.remove('active');
                loginForm.classList.add('active');
            }
        });
    }
    
    // ===== MENU FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                menuCards.forEach(card => {
                    if (category === 'all' || card.classList.contains(category)) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }
    
    // ===== TOUCH EXPERIENCE IMPROVEMENT =====
    const buttons = document.querySelectorAll('.btn, .btn2, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Initial call to set active nav link
    updateActiveNavLink();
});