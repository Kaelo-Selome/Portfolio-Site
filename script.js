        // Initialize Lucide icons
        lucide.createIcons();

        // Typewriter effect
        const textElement = document.getElementById('typewriter-text');
        const cursorElement = document.getElementById('cursor');
        const fullText = "Full Stack Developer";
        let index = 0;

        function typeWriter() {
            if (index < fullText.length) {
                textElement.textContent += fullText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // Cursor blink effect
        function blinkCursor() {
            cursorElement.classList.toggle('hidden');
        }

        // Start effects
        typeWriter();
        setInterval(blinkCursor, 500);

        // Smooth scroll to about section
        document.getElementById('discover-button').addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');

        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            
            if (mobileMenu.classList.contains('open')) {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });

        // Scroll detection for nav
        window.addEventListener('scroll', function() {
            const nav = document.getElementById('main-nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Smooth scroll for all nav links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                        menuIcon.style.display = 'block';
                        closeIcon.style.display = 'none';
                    }
                }
            });
        });

        // Animate progress bars on scroll into view
document.addEventListener('DOMContentLoaded', function() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width; // Get width from HTML (e.g., "85%")
        bar.style.width = '0'; // Reset
        setTimeout(() => {
          bar.style.width = width; // Animate to target width
        }, parseFloat(bar.style.animationDelay || '0') * 1000); // Respect delay
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% visible
  
  progressBars.forEach(bar => observer.observe(bar));
});

//form handling
document.getElementById('contact-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            </span>
        `;

        // Try Formspree first
        try {
            const formData = new FormData(form);
            formData.append('_replyto', formData.get('email'));
            formData.append('_subject', 'New Portfolio Message');

            const formspreeResponse = await fetch('https://formspree.io/f/mbjlnvgy', { // 🔁 Replace with your Formspree form ID
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (formspreeResponse.ok) {
                showSuccess(form, submitBtn, originalContent);
                return;
            }
        } catch (error) {
            console.log('Formspree failed, trying EmailJS');
        }

        // Fallback to EmailJS
        try {
            await emailjs.sendForm(
                'your_service_id',     // 🔁 Replace with your EmailJS Service ID
                'your_template_id',    // 🔁 Replace with your EmailJS Template ID
                form
            );
            showSuccess(form, submitBtn, originalContent);
        } catch (error) {
            console.error('Both services failed:', error);
            submitBtn.innerHTML = `
                <span class="flex items-center justify-center gap-2 text-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    Failed - Please email me directly
                </span>
            `;
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }, 5000);
        }
    });

    function showSuccess(form, button, originalContent) {
        button.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Message Sent!
            </span>
        `;
        form.reset();
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalContent;
        }, 3000);
    }

    // ✅ Initialize EmailJS if you're using it
    // Put your EmailJS public key here
    emailjs.init("your_public_key"); // 🔁 Replace with your EmailJS public key