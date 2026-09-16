// =====================================================
// CAREERTRACK
// Authentication UI JavaScript
// =====================================================


// ================= PASSWORD TOGGLE =================

const passwordToggles =
    document.querySelectorAll(".password-toggle");


passwordToggles.forEach(button => {

    button.addEventListener("click", () => {

        const targetId =
            button.getAttribute("data-target");

        const input =
            document.getElementById(targetId);


        if (!input) {
            return;
        }


        if (input.type === "password") {

            input.type = "text";

            button.textContent = "Hide";

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            input.type = "password";

            button.textContent = "Show";

            button.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

});


// ================= HELPER FUNCTIONS =================

function showError(elementId, message) {

    const element =
        document.getElementById(elementId);

    if (element) {

        element.textContent = message;

    }

}


function clearErrors() {

    document
        .querySelectorAll(".error-message")
        .forEach(element => {

            element.textContent = "";

        });

}


function setStatus(elementId, message, type) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className =
        `form-status ${type}`;

}


// ================= EMAIL VALIDATION =================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// ================= LOGIN =================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        clearErrors();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        let valid = true;


        // Email validation

        if (email === "") {

            showError(
                "loginEmailError",
                "Please enter your email address."
            );

            valid = false;

        } else if (!isValidEmail(email)) {

            showError(
                "loginEmailError",
                "Please enter a valid email address."
            );

            valid = false;

        }


        // Password validation

        if (password === "") {

            showError(
                "loginPasswordError",
                "Please enter your password."
            );

            valid = false;

        } else if (password.length < 6) {

            showError(
                "loginPasswordError",
                "Password must contain at least 6 characters."
            );

            valid = false;

        }


        if (!valid) {

            setStatus(
                "loginStatus",
                "Please fix the highlighted fields.",
                "error"
            );

            return;

        }


        // UI-only success message

        setStatus(
            "loginStatus",
            "Login form validated successfully. Backend coming soon!",
            "success"
        );

    });

}


// ================= REGISTER =================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            clearErrors();


            const name =
                document
                    .getElementById("registerName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            const terms =
                document
                    .getElementById("terms")
                    .checked;


            let valid = true;


            // Name

            if (name === "") {

                showError(
                    "registerNameError",
                    "Please enter your full name."
                );

                valid = false;

            } else if (name.length < 2) {

                showError(
                    "registerNameError",
                    "Name must contain at least 2 characters."
                );

                valid = false;

            }


            // Email

            if (email === "") {

                showError(
                    "registerEmailError",
                    "Please enter your email address."
                );

                valid = false;

            } else if (!isValidEmail(email)) {

                showError(
                    "registerEmailError",
                    "Please enter a valid email address."
                );

                valid = false;

            }


            // Password

            if (password === "") {

                showError(
                    "registerPasswordError",
                    "Please create a password."
                );

                valid = false;

            } else if (password.length < 8) {

                showError(
                    "registerPasswordError",
                    "Password must contain at least 8 characters."
                );

                valid = false;

            }


            // Confirm password

            if (confirmPassword === "") {

                showError(
                    "confirmPasswordError",
                    "Please confirm your password."
                );

                valid = false;

            } else if (
                password !== confirmPassword
            ) {

                showError(
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                valid = false;

            }


            // Terms

            if (!terms) {

                setStatus(
                    "registerStatus",
                    "Please accept the Terms & Conditions.",
                    "error"
                );

                valid = false;

            }


            if (!valid) {

                if (!terms) {

                    setStatus(
                        "registerStatus",
                        "Please fix the highlighted fields.",
                        "error"
                    );

                }

                return;

            }


            // UI-only success

            setStatus(
                "registerStatus",
                "Account form validated successfully. Backend coming soon!",
                "success"
            );

        }
    );

}


// ================= PASSWORD STRENGTH =================

const registerPassword =
    document.getElementById(
        "registerPassword"
    );


const strengthFill =
    document.getElementById(
        "strengthFill"
    );


const strengthText =
    document.getElementById(
        "strengthText"
    );


if (
    registerPassword &&
    strengthFill &&
    strengthText
) {

    registerPassword.addEventListener(
        "input",
        () => {

            const password =
                registerPassword.value;


            let strength = 0;


            if (password.length >= 8) {
                strength++;
            }

            if (/[A-Z]/.test(password)) {
                strength++;
            }

            if (/[0-9]/.test(password)) {
                strength++;
            }

            if (/[^A-Za-z0-9]/.test(password)) {
                strength++;
            }


            if (password.length === 0) {

                strengthFill.style.width =
                    "0%";

                strengthText.textContent =
                    "Enter a password";

                return;

            }


            if (strength === 1) {

                strengthFill.style.width =
                    "25%";

                strengthText.textContent =
                    "Weak password";

            } else if (strength === 2) {

                strengthFill.style.width =
                    "50%";

                strengthText.textContent =
                    "Fair password";

            } else if (strength === 3) {

                strengthFill.style.width =
                    "75%";

                strengthText.textContent =
                    "Good password";

            } else {

                strengthFill.style.width =
                    "100%";

                strengthText.textContent =
                    "Strong password";

            }

        }
    );

}


// ================= CONSOLE =================

console.log(
    "🔐 CareerTrack authentication UI loaded!"
);