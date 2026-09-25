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

    loginForm.addEventListener(
        "submit",
        async event => {

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


            // ================= EMAIL VALIDATION =================

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


            // ================= PASSWORD VALIDATION =================

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


            // ================= VALIDATION FAILED =================

            if (!valid) {

                setStatus(
                    "loginStatus",
                    "Please fix the highlighted fields.",
                    "error"
                );

                return;
            }


            // ================= LOGIN API =================

            try {

                setStatus(
                    "loginStatus",
                    "Logging in...",
                    "success"
                );


                const response =
                    await fetch(
                        "http://localhost:8080/api/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                // ================= LOGIN FAILED =================

                if (!response.ok) {

                    const errorMessage =
                        await response.text();

                    throw new Error(
                        errorMessage ||
                        "Invalid email or password"
                    );
                }


                // ================= LOGIN SUCCESS =================

                const user =
                    await response.json();


                // Store logged-in user
                localStorage.setItem(
                    "careerTrackUser",
                    JSON.stringify(user)
                );


                setStatus(
                    "loginStatus",
                    "Login successful! Redirecting...",
                    "success"
                );


                // Redirect to dashboard

                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 800);


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                setStatus(
                    "loginStatus",
                    error.message ||
                    "Unable to connect to the server.",
                    "error"
                );
            }

        }
    );

}

// ================= REGISTER =================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async event => {

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


            // ================= NAME =================

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


            // ================= EMAIL =================

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


            // ================= PASSWORD =================

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


            // ================= CONFIRM PASSWORD =================

            if (confirmPassword === "") {

                showError(
                    "confirmPasswordError",
                    "Please confirm your password."
                );

                valid = false;

            } else if (password !== confirmPassword) {

                showError(
                    "confirmPasswordError",
                    "Passwords do not match."
                );

                valid = false;
            }


            // ================= TERMS =================

            if (!terms) {

                setStatus(
                    "registerStatus",
                    "Please accept the Terms & Conditions.",
                    "error"
                );

                valid = false;
            }


            // ================= VALIDATION FAILED =================

            if (!valid) {

                setStatus(
                    "registerStatus",
                    "Please fix the highlighted fields.",
                    "error"
                );

                return;
            }


            // ================= REGISTER API =================

            try {

                setStatus(
                    "registerStatus",
                    "Creating your account...",
                    "success"
                );


                const response =
                    await fetch(
                        "http://localhost:8080/api/auth/register",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name: name,
                                email: email,
                                password: password
                            })
                        }
                    );


                // ================= REGISTER FAILED =================

                if (!response.ok) {

                    const errorMessage =
                        await response.text();

                    throw new Error(
                        errorMessage ||
                        "Registration failed"
                    );
                }


                // ================= REGISTER SUCCESS =================

                setStatus(
                    "registerStatus",
                    "Account created successfully! Redirecting to login...",
                    "success"
                );


                // Redirect to login

                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1200);


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                setStatus(
                    "registerStatus",
                    error.message ||
                    "Unable to connect to the server.",
                    "error"
                );
            }

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


            // At least 8 characters

            if (password.length >= 8) {
                strength++;
            }


            // Uppercase

            if (/[A-Z]/.test(password)) {
                strength++;
            }


            // Number

            if (/[0-9]/.test(password)) {
                strength++;
            }


            // Special character

            if (/[^A-Za-z0-9]/.test(password)) {
                strength++;
            }


            // Empty password

            if (password.length === 0) {

                strengthFill.style.width =
                    "0%";

                strengthText.textContent =
                    "Enter a password";

                return;

            }


            // Weak

            if (strength === 1) {

                strengthFill.style.width =
                    "25%";

                strengthText.textContent =
                    "Weak password";

            }


            // Fair

            else if (strength === 2) {

                strengthFill.style.width =
                    "50%";

                strengthText.textContent =
                    "Fair password";

            }


            // Good

            else if (strength === 3) {

                strengthFill.style.width =
                    "75%";

                strengthText.textContent =
                    "Good password";

            }


            // Strong

            else {

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