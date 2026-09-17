// =====================================================
// CAREERTRACK
// Dashboard JavaScript
// =====================================================


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


// ================= ANIMATED COUNTERS =================

const counters =
    document.querySelectorAll(
        ".stat-number"
    );


counters.forEach(counter => {

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
            Math.ceil(target / 35)
        );


    const updateCounter = () => {

        current += increment;


        if (current >= target) {

            counter.textContent =
                target;

            return;

        }


        counter.textContent =
            current;


        requestAnimationFrame(
            updateCounter
        );

    };


    updateCounter();

});


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

                window.location.href =
                    "index.html";

            }

        }
    );

}


// ================= NAVIGATION PLACEHOLDER =================

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


// ================= CONSOLE =================

console.log(
    "📊 CareerTrack dashboard loaded successfully!"
);