// =====================================================
// CAREERTRACK
// Dashboard JavaScript
// =====================================================


// ================= API CONFIGURATION =================

const API_URL =
    "http://localhost:8080/api/dashboard";


// ================= AUTHENTICATION CHECK =================

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


// ================= PROTECT DASHBOARD =================

if (!currentUser) {

    window.location.href =
        "login.html";

}


// ================= USER PROFILE =================

const userName =
    document.getElementById("userName");

const profileName =
    document.getElementById("profileName");

const profileAvatar =
    document.getElementById("profileAvatar");


if (currentUser) {

    if (userName) {

        userName.textContent =
            currentUser.name + "!";

    }


    if (profileName) {

        profileName.textContent =
            currentUser.name;

    }


    if (profileAvatar) {

        profileAvatar.textContent =
            currentUser.name
                .charAt(0)
                .toUpperCase();

    }

}


// ================= CURRENT DATE =================

const currentDateElement =
    document.getElementById(
        "currentDate"
    );


if (currentDateElement) {

    const today =
        new Date();

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


        // ================= JOB COUNTERS =================

        updateCounter(
            "jobApplicationsCount",
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


// ================= LOAD SKILLS DATA =================

function loadSkillsData() {

    if (!currentUser) {

        return;

    }


    const skillsStorageKey =
        "careerTrackSkills_" +
        currentUser.id;


    const storedSkills =
        localStorage.getItem(
            skillsStorageKey
        );


    let skills = [];


    if (storedSkills) {

        try {

            skills =
                JSON.parse(
                    storedSkills
                );

        } catch (error) {

            console.error(
                "Invalid skills data:",
                error
            );

            skills = [];

        }

    } else {

        // Default skills used by Skills Tracker

        skills = [

            {
                id: 1,
                name: "Java",
                category: "Programming",
                progress: 85
            },

            {
                id: 2,
                name: "Python",
                category: "Programming",
                progress: 70
            },

            {
                id: 3,
                name: "C++",
                category: "Programming",
                progress: 65
            },

            {
                id: 4,
                name: "SQL",
                category: "Database",
                progress: 75
            },

            {
                id: 5,
                name: "HTML / CSS / JavaScript",
                category: "Web Development",
                progress: 80
            },

            {
                id: 6,
                name: "DSA",
                category: "Programming",
                progress: 72
            },

            {
                id: 7,
                name: "Git & GitHub",
                category: "Tools",
                progress: 65
            },

            {
                id: 8,
                name: "Spring Boot",
                category: "Programming",
                progress: 40
            }

        ];

    }


    const skillsCount =
        document.getElementById(
            "skillsCount"
        );


    if (skillsCount) {

        updateCounter(
            "skillsCount",
            skills.length
        );

    }


    console.log(
        "Skills loaded for",
        currentUser.name,
        ":",
        skills.length
    );

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
            Math.ceil(
                target / 35
            )
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


// ================= STATIC CARD COUNTERS =================

function animateStaticCounters() {

    const counters =
        document.querySelectorAll(
            ".stat-number[data-target]"
        );


    counters.forEach(
        counter => {

            // Skills count is dynamic.
            // Do not use the hardcoded data-target value.

            if (
                counter.id ===
                "skillsCount"
            ) {

                return;

            }


            const target =
                Number(
                    counter.getAttribute(
                        "data-target"
                    )
                );


            let current = 0;


            const increment =
                Math.max(
                    1,
                    Math.ceil(
                        target / 35
                    )
                );


            const update = () => {

                current +=
                    increment;


                if (
                    current >=
                    target
                ) {

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
    );

}


// ================= TASK CHECKBOXES =================

const taskItems =
    document.querySelectorAll(
        ".task-item"
    );


taskItems.forEach(
    task => {

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

                if (
                    checkbox.checked
                ) {

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

    }
);


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


navItems.forEach(
    item => {

        item.addEventListener(
            "click",
            event => {

                const href =
                    item.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                }

            }
        );

    }
);


// ================= LOAD EVERYTHING =================

loadDashboardData();

loadSkillsData();

animateStaticCounters();


// ================= CONSOLE =================

console.log(
    "📊 CareerTrack dashboard loaded successfully!"
);