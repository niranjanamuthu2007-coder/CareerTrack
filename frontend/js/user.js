// =====================================================
// CAREERTRACK
// CURRENT USER DISPLAY
// =====================================================

const storedUser =
    localStorage.getItem("careerTrackUser");

let currentUser = null;

if (storedUser) {

    try {

        currentUser =
            JSON.parse(storedUser);

    } catch (error) {

        console.error(
            "Invalid user session."
        );

        localStorage.removeItem(
            "careerTrackUser"
        );

    }

}


// ================= AUTH PROTECTION =================

if (!currentUser) {

    window.location.href =
        "login.html";

}


// ================= DISPLAY USER =================

if (currentUser) {

    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );

    const loggedInUserName =
        document.getElementById(
            "loggedInUserName"
        );

    const userName =
        document.getElementById(
            "userName"
        );


    // Profile name

    if (profileName) {

        profileName.textContent =
            currentUser.name;

    }


    // Jobs page profile

    if (loggedInUserName) {

        loggedInUserName.textContent =
            currentUser.name;

    }


    // Dashboard greeting

    if (userName) {

        userName.textContent =
            currentUser.name + "!";

    }


    // Avatar

    if (profileAvatar) {

        profileAvatar.textContent =
            currentUser.name
                .charAt(0)
                .toUpperCase();

    }

}