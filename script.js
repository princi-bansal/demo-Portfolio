
// =========================================
// 1. MOBILE NAVIGATION
// =========================================

// Get the menu button and navigation links.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close the mobile navigation menu.
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    // Update accessibility information.
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the menu after clicking a navigation link.
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Close the menu if the user clicks outside it.
document.addEventListener("click", function (event) {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});

// If the screen becomes wider, reset the mobile menu.
window.addEventListener("resize", function () {
    if (window.innerWidth > 650) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});


// =========================================
// 2. UPDATE THE COPYRIGHT YEAR
// =========================================

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


// =========================================
// 3. SCROLL REVEAL ANIMATIONS
// =========================================

// Animate sections and cards as they enter the screen.
// If IntersectionObserver is unavailable, leave everything visible.

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    const revealElements = document.querySelectorAll(
        ".section-heading, .about-content, .skill-card, " +
        ".project-card, .contact-layout"
    );

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");

                    // Stop observing an element once it appears.
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        element.classList.add("js-reveal");
        revealObserver.observe(element);
    });
}


// =========================================
// 4. CONTACT FORM VALIDATION
// =========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Listen for form submission.
contactForm.addEventListener("submit", function (event) {
    // Prevent the browser from reloading the page.
    event.preventDefault();

    // Clear the previous status message.
    formStatus.textContent = "";
    formStatus.className = "form-status";

    // Read and clean the user's input.
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Check that the name has at least two characters.
    if (name.length < 2) {
        showFormMessage(
            "Please enter a name with at least 2 characters.",
            "error"
        );

        document.getElementById("name").focus();
        return;
    }

    // Check the email using the browser's built-in validation.
    const emailInput = document.getElementById("email");

    if (!emailInput.validity.valid) {
        showFormMessage(
            "Please enter a valid email address.",
            "error"
        );

        emailInput.focus();
        return;
    }

    // Check that the message is long enough.
    if (message.length < 10) {
        showFormMessage(
            "Your message must contain at least 10 characters.",
            "error"
        );

        document.getElementById("message").focus();
        return;
    }

    // All validation checks have passed.
    // This is a demo: no email is sent and no data is uploaded.
    showFormMessage(
        "Validation successful, " + name +
        "! Your message passed all checks. " +
        "This demo has not sent or saved your message.",
        "success"
    );

    // Reset the form after successful validation.
    contactForm.reset();
});


// Display a message below the form.
function showFormMessage(message, type) {
    formStatus.textContent = message;
    formStatus.className = "form-status " + type;
}
