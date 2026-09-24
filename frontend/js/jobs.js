// ================= API CONFIGURATION =================

const API_URL = "http://localhost:8080/api/jobs";

// Temporary user ID
// Real authentication will provide this later on Day 12.
const CURRENT_USER_ID = 1;


// ================= APPLICATION DATA =================

let applications = [];


// ================= ELEMENTS =================

const applicationList =
    document.getElementById("applicationList");

const totalApplications =
    document.getElementById("totalApplications");

const appliedCount =
    document.getElementById("appliedCount");

const interviewCount =
    document.getElementById("interviewCount");

const selectedCount =
    document.getElementById("selectedCount");

const searchInput =
    document.getElementById("searchInput");

const filters =
    document.querySelectorAll(".filter");


// Current filter
let currentFilter = "All";


// ================= LOAD APPLICATIONS =================

async function loadApplications() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load applications");
        }

        applications = await response.json();

        updateStats();
        displayApplications();

        console.log(
            "Applications loaded from PostgreSQL successfully!"
        );

    } catch (error) {

        console.error("Error loading applications:", error);

        applicationList.innerHTML = `
            <div class="empty">
                Unable to connect to backend.
                Please make sure Spring Boot is running.
            </div>
        `;
    }
}


// ================= UPDATE STATS =================

function updateStats() {

    totalApplications.textContent =
        applications.length;

    appliedCount.textContent =
        applications.filter(
            application =>
                application.status === "Applied"
        ).length;

    interviewCount.textContent =
        applications.filter(
            application =>
                application.status === "Interview"
        ).length;

    selectedCount.textContent =
        applications.filter(
            application =>
                application.status === "Selected"
        ).length;
}


// ================= DISPLAY APPLICATIONS =================

function displayApplications() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const filtered =
        applications.filter(application => {

            const matchesSearch =
                application.company
                    .toLowerCase()
                    .includes(searchText) ||

                application.position
                    .toLowerCase()
                    .includes(searchText) ||

                (application.location || "")
                    .toLowerCase()
                    .includes(searchText);

            const matchesFilter =
                currentFilter === "All" ||
                application.status === currentFilter;

            return (
                matchesSearch &&
                matchesFilter
            );
        });


    applicationList.innerHTML = "";


    if (filtered.length === 0) {

        applicationList.innerHTML = `
            <div class="empty">
                No applications found.
            </div>
        `;

        return;
    }


    filtered.forEach(application => {

        const element =
            document.createElement("div");

        element.className =
            "application";


        element.innerHTML = `
            <div class="company-name">
                ${application.company}
            </div>

            <div class="position">
                ${application.position}
            </div>

            <div class="location">
                📍 ${application.location || "Not specified"}
            </div>

            <div class="date">
                ${formatDate(application.applicationDate)}
            </div>

            <span class="status ${application.status}">
                ${application.status}
            </span>

            <button
                class="delete-btn"
                onclick="deleteApplication(${application.id})">
                🗑️
            </button>
        `;


        applicationList.appendChild(element);

    });
}


// ================= FORMAT DATE =================

function formatDate(date) {

    if (!date) {
        return "";
    }

    const parts =
        date.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}


// ================= DELETE APPLICATION =================

async function deleteApplication(id) {

    const confirmDelete =
        confirm(
            "Delete this application?"
        );

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete application"
            );
        }


        // Remove from frontend array
        applications =
            applications.filter(
                application =>
                    application.id !== id
            );


        updateStats();
        displayApplications();


        console.log(
            "Application deleted successfully!"
        );

    } catch (error) {

        console.error(
            "Error deleting application:",
            error
        );

        alert(
            "Unable to delete application."
        );
    }
}


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    displayApplications
);


// ================= FILTERS =================

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            filter.classList.add(
                "active"
            );


            currentFilter =
                filter.dataset.filter;


            displayApplications();

        }
    );

});


// ================= MODAL =================

const modal =
    document.getElementById("modal");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");


openModal.addEventListener(
    "click",
    () => {

        modal.classList.add("show");

    }
);


closeModal.addEventListener(
    "click",
    () => {

        modal.classList.remove("show");

    }
);


modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    }
);


// ================= ADD APPLICATION =================

const jobForm =
    document.getElementById("jobForm");


jobForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const company =
            document
                .getElementById("company")
                .value
                .trim();


        const position =
            document
                .getElementById("position")
                .value
                .trim();


        const location =
            document
                .getElementById("location")
                .value
                .trim();


        const applicationDate =
            document
                .getElementById("applicationDate")
                .value;


        const status =
            document
                .getElementById("status")
                .value;


        if (
            !company ||
            !position ||
            !location ||
            !applicationDate
        ) {

            alert(
                "Please fill all fields."
            );

            return;
        }


        // Object sent to Spring Boot
        const newApplication = {

            userId: CURRENT_USER_ID,

            company: company,

            position: position,

            location: location,

            applicationDate: applicationDate,

            status: status

        };


        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                newApplication
                            )
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to create application"
                );
            }


            // Get saved object from backend
            const savedApplication =
                await response.json();


            // Add database record to UI
            applications.push(
                savedApplication
            );


            updateStats();
            displayApplications();


            jobForm.reset();

            modal.classList.remove(
                "show"
            );


            console.log(
                "Application saved to PostgreSQL successfully!"
            );


        } catch (error) {

            console.error(
                "Error creating application:",
                error
            );

            alert(
                "Unable to save application. Please make sure the backend is running."
            );

        }

    }
);


// ================= INITIAL LOAD =================

loadApplications();


console.log(
    "CareerTrack Job Tracker connected to Spring Boot API!"
);