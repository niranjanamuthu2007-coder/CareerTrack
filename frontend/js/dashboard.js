// =====================================================
// CAREERTRACK
// Dashboard JavaScript
// =====================================================


// ================= API CONFIGURATION =================

const API_URL = "http://localhost:8080/api/dashboard";


// ================= CURRENT USER =================

const storedUser =
    localStorage.getItem("careerTrackUser");

let currentUser = null;

if (storedUser) {
    currentUser = JSON.parse(storedUser);
}


// ================= CURRENT DATE =================

const currentDateElement =
    document.getElementById("currentDate");

if (currentDateElement) {

    const today = new Date();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    currentDateElement.textContent =
        today.toLocaleDateString(
            "en-US",
            options
        );
}


// ================= USER NAME =================

const userNameElement =
    document.getElementById("userName");

if (
    userNameElement &&
    currentUser
) {

    userNameElement.textContent =
        currentUser.name;
}


// ================= LOAD DASHBOARD DATA =================

async function loadDashboardData() {

    if (!currentUser) {

        console.log(
            "No logged-in user found."
        );

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/${currentUser.id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load dashboard data"
            );
        }


        const data =
            await response.json();


        console.log(
            "Dashboard data loaded:",
            data
        );


        // ================= UPDATE COUNTERS =================

        updateCounter(
            "totalApplications",
            data.totalApplications
        );

        updateCounter(
            "appliedCount",
            data.applied
        );

        updateCounter(
            "interviewCount",
            data.interview
        );

        updateCounter(
            "selectedCount",
            data.selected
        );


    } catch (error) {

        console.error(
            "Dashboard API error:",
            error
        );

    }

}


// ================= ANIMATED COUNTER =================

function updateCounter(
    elementId,
    target
) {

    const counter =
        document.getElementById(
            elementId
        );


    if (!counter) {
        return;
    }


    target =
        Number(target) || 0;


    let current = 0;


    const increment =
        Math.max(
            1,
            Math.ceil(target / 35)
        );


    const update = () => {

        current += increment;


        if (current >= target) {

            counter.textContent =
                target;

            return;
        }


        counter.textContent =
            current;


        requestAnimationFrame(
            update
        );

    };


    update();

}


// ================= MOBILE SIDEBAR =================

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


if (
    mobileMenu &&
    sidebar &&
    sidebarOverlay
) {

    mobileMenu.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

            sidebarOverlay.classList.toggle(
                "active"
            );

        }
    );


    sidebarOverlay.addEventListener(
        "click",
        () => {

            sidebar.classList.remove(
                "open"
            );

            sidebarOverlay.classList.remove(
                "active"
            );

        }
    );

}


// ================= TASK CHECKBOXES =================

const taskItems =
    document.querySelectorAll(
        ".task-item"
    );


taskItems.forEach(task => {

    const checkbox =
        task.querySelector(
            "input[type='checkbox']"
        );


    if (!checkbox) {
        return;
    }


    checkbox.addEventListener(
        "change",
        () => {

            if (checkbox.checked) {

                task.classList.add(
                    "completed"
                );

            } else {

                task.classList.remove(
                    "completed"
                );

            }


            updateTaskCount();

        }
    );

});


// ================= TASK COUNT =================

function updateTaskCount() {

    const allTasks =
        document.querySelectorAll(
            ".task-item"
        );


    const completedTasks =
        document.querySelectorAll(
            ".task-item.completed"
        );


    const taskCount =
        document.querySelector(
            ".task-count"
        );


    if (taskCount) {

        taskCount.textContent =
            `${completedTasks.length} / ${allTasks.length}`;

    }

}


updateTaskCount();


// ================= LOGOUT =================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                localStorage.removeItem(
                    "careerTrackUser"
                );


                window.location.href =
                    "login.html";

            }

        }
    );

}


// ================= NAVIGATION =================

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


navItems.forEach(item => {

    item.addEventListener(
        "click",
        event => {

            const href =
                item.getAttribute(
                    "href"
                );


            if (href === "#") {

                event.preventDefault();


                alert(
                    "This module will be available soon!"
                );

            }

        }
    );

});


// ================= LOAD DATA =================

loadDashboardData();


// ================= CONSOLE =================

console.log(
    "📊 CareerTrack dashboard loaded successfully!"
);