// =====================================================
// CAREERTRACK
// Main JavaScript
// =====================================================


// ================= NAVBAR SCROLL =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

});


// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section");

const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    links.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") {

            event.preventDefault();

            return;

        }

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ================= BUTTON EFFECT =================

const primaryButtons =
    document.querySelectorAll(
        ".primary-btn, .signup-btn, .cta-button"
    );

primaryButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.style.transform =
            "scale(0.97)";

        setTimeout(() => {

            button.style.transform = "";

        }, 120);

    });

});


// ================= CONSOLE MESSAGE =================

console.log(
    "🚀 CareerTrack frontend loaded successfully!"
);