// ================= DEFAULT APPLICATIONS =================

const defaultApplications = [

    {
        id: 1,
        company: "Google",
        position: "Software Engineer Intern",
        location: "Bangalore",
        date: "2026-09-10",
        status: "Applied"
    },

    {
        id: 2,
        company: "Microsoft",
        position: "Software Development Intern",
        location: "Hyderabad",
        date: "2026-09-08",
        status: "Interview"
    },

    {
        id: 3,
        company: "Amazon",
        position: "SDE Intern",
        location: "Chennai",
        date: "2026-09-05",
        status: "Applied"
    },

    {
        id: 4,
        company: "Zoho",
        position: "Java Developer Intern",
        location: "Chennai",
        date: "2026-09-01",
        status: "Rejected"
    },

    {
        id: 5,
        company: "TCS",
        position: "Graduate Engineer Trainee",
        location: "Chennai",
        date: "2026-08-28",
        status: "Selected"
    }

];


// ================= LOAD DATA =================

let applications =
    JSON.parse(
        localStorage.getItem(
            "careerTrackJobs"
        )
    ) || defaultApplications;


// ================= ELEMENTS =================

const applicationList =
    document.getElementById(
        "applicationList"
    );

const totalApplications =
    document.getElementById(
        "totalApplications"
    );

const appliedCount =
    document.getElementById(
        "appliedCount"
    );

const interviewCount =
    document.getElementById(
        "interviewCount"
    );

const selectedCount =
    document.getElementById(
        "selectedCount"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const filters =
    document.querySelectorAll(
        ".filter"
    );


// Current filter

let currentFilter = "All";


// ================= SAVE =================

function saveApplications() {

    localStorage.setItem(
        "careerTrackJobs",
        JSON.stringify(
            applications
        )
    );

}


// ================= UPDATE STATS =================

function updateStats() {

    totalApplications.textContent =
        applications.length;


    appliedCount.textContent =
        applications.filter(
            application =>
                application.status ===
                "Applied"
        ).length;


    interviewCount.textContent =
        applications.filter(
            application =>
                application.status ===
                "Interview"
        ).length;


    selectedCount.textContent =
        applications.filter(
            application =>
                application.status ===
                "Selected"
        ).length;

}


// ================= DISPLAY =================

function displayApplications() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        applications.filter(
            application => {

                const matchesSearch =
                    application.company
                        .toLowerCase()
                        .includes(searchText) ||

                    application.position
                        .toLowerCase()
                        .includes(searchText) ||

                    application.location
                        .toLowerCase()
                        .includes(searchText);


                const matchesFilter =
                    currentFilter ===
                    "All" ||

                    application.status ===
                    currentFilter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    applicationList.innerHTML = "";


    if (filtered.length === 0) {

        applicationList.innerHTML = `
            <div class="empty">
                No applications found.
            </div>
        `;

        return;

    }


    filtered.forEach(
        application => {

            const element =
                document.createElement(
                    "div"
                );


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
                    📍 ${application.location}
                </div>


                <div class="date">
                    ${formatDate(
                        application.date
                    )}
                </div>


                <span class="status ${
                    application.status
                }">

                    ${application.status}

                </span>


                <button
                    class="delete-btn"
                    onclick="deleteApplication(
                        ${application.id}
                    )">

                    🗑️

                </button>

            `;


            applicationList.appendChild(
                element
            );

        }
    );

}


// ================= FORMAT DATE =================

function formatDate(date) {

    const parts =
        date.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


// ================= DELETE =================

function deleteApplication(id) {

    const confirmDelete =
        confirm(
            "Delete this application?"
        );


    if (!confirmDelete) {

        return;

    }


    applications =
        applications.filter(
            application =>
                application.id !== id
        );


    saveApplications();

    updateStats();

    displayApplications();

}


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    displayApplications
);


// ================= FILTERS =================

filters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                filter.classList.add(
                    "active"
                );


                currentFilter =
                    filter.dataset.filter;


                displayApplications();

            }
        );

    }
);


// ================= MODAL =================

const modal =
    document.getElementById(
        "modal"
    );

const openModal =
    document.getElementById(
        "openModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );


openModal.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "show"
        );

    }
);


closeModal.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "show"
        );

    }
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


// ================= ADD APPLICATION =================

const jobForm =
    document.getElementById(
        "jobForm"
    );


jobForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const company =
            document.getElementById(
                "company"
            ).value.trim();


        const position =
            document.getElementById(
                "position"
            ).value.trim();


        const location =
            document.getElementById(
                "location"
            ).value.trim();


        const date =
            document.getElementById(
                "applicationDate"
            ).value;


        const status =
            document.getElementById(
                "status"
            ).value;


        if (
            !company ||
            !position ||
            !location ||
            !date
        ) {

            alert(
                "Please fill all fields."
            );

            return;

        }


        const newApplication = {

            id: Date.now(),

            company: company,

            position: position,

            location: location,

            date: date,

            status: status

        };


        applications.push(
            newApplication
        );


        saveApplications();

        updateStats();

        displayApplications();


        jobForm.reset();

        modal.classList.remove(
            "show"
        );

    }
);


// ================= INITIAL LOAD =================

updateStats();

displayApplications();


console.log(
    "CareerTrack Job Tracker loaded successfully!"
);