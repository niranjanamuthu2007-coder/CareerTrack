// ================= DEFAULT SKILLS =================

const defaultSkills = [

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


// ================= LOAD DATA =================

let skills =
    JSON.parse(
        localStorage.getItem(
            "careerTrackSkills"
        )
    ) || defaultSkills;


// ================= ELEMENTS =================

const skillList =
    document.getElementById(
        "skillList"
    );

const totalSkills =
    document.getElementById(
        "totalSkills"
    );

const advancedSkills =
    document.getElementById(
        "advancedSkills"
    );

const learningSkills =
    document.getElementById(
        "learningSkills"
    );

const overallProgress =
    document.getElementById(
        "overallProgress"
    );

const overallNumber =
    document.getElementById(
        "overallNumber"
    );

const overallFill =
    document.getElementById(
        "overallFill"
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


// ================= LEVEL =================

function getLevel(progress) {

    if (progress >= 80) {

        return "Advanced";

    }

    if (progress >= 50) {

        return "Intermediate";

    }

    return "Beginner";

}


// ================= SAVE =================

function saveSkills() {

    localStorage.setItem(
        "careerTrackSkills",
        JSON.stringify(skills)
    );

}


// ================= UPDATE STATS =================

function updateStats() {

    const total =
        skills.length;


    const advanced =
        skills.filter(
            skill =>
                getLevel(
                    skill.progress
                ) === "Advanced"
        ).length;


    const learning =
        skills.filter(
            skill =>
                skill.progress < 80
        ).length;


    let average = 0;


    if (total > 0) {

        const totalProgress =
            skills.reduce(
                (sum, skill) =>
                    sum + skill.progress,
                0
            );

        average =
            Math.round(
                totalProgress / total
            );

    }


    totalSkills.textContent =
        total;

    advancedSkills.textContent =
        advanced;

    learningSkills.textContent =
        learning;

    overallProgress.textContent =
        average + "%";

    overallNumber.textContent =
        average + "%";

    overallFill.style.width =
        average + "%";

}


// ================= ICON =================

function getSkillIcon(
    category
) {

    if (
        category ===
        "Programming"
    ) {

        return "💻";

    }

    if (
        category ===
        "Web Development"
    ) {

        return "🌐";

    }

    if (
        category ===
        "Database"
    ) {

        return "🗄️";

    }

    if (
        category ===
        "Tools"
    ) {

        return "🛠️";

    }

    return "📚";

}


// ================= DISPLAY =================

function displaySkills() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        skills.filter(
            skill => {

                const level =
                    getLevel(
                        skill.progress
                    );


                const matchesSearch =
                    skill.name
                        .toLowerCase()
                        .includes(
                            searchText
                        ) ||

                    skill.category
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                const matchesFilter =
                    currentFilter ===
                    "All" ||

                    level ===
                    currentFilter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    skillList.innerHTML = "";


    if (filtered.length === 0) {

        skillList.innerHTML = `
            <div class="empty">
                No skills found.
            </div>
        `;

        return;

    }


    filtered.forEach(
        skill => {

            const level =
                getLevel(
                    skill.progress
                );


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "skill";


            element.innerHTML = `

                <div class="skill-top">

                    <div class="skill-info">

                        <div class="skill-icon">
                            ${getSkillIcon(
                                skill.category
                            )}
                        </div>

                        <div>

                            <div class="skill-name">
                                ${skill.name}
                            </div>

                            <div class="skill-category">
                                ${skill.category}
                            </div>

                        </div>

                    </div>


                    <div class="skill-percentage">
                        ${skill.progress}%
                    </div>

                </div>


                <div class="skill-progress">

                    <div
                        class="skill-progress-fill"
                        style="width:${skill.progress}%">
                    </div>

                </div>


                <div class="skill-bottom">

                    <span class="level ${level}">
                        ${level}
                    </span>


                    <div class="skill-actions">

                        <button
                            class="edit-btn"
                            onclick="editSkill(
                                ${skill.id}
                            )">

                            ✏️ Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteSkill(
                                ${skill.id}
                            )">

                            🗑️ Delete

                        </button>

                    </div>

                </div>

            `;


            skillList.appendChild(
                element
            );

        }
    );

}


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    displaySkills
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


                displaySkills();

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


// ================= RANGE =================

const skillProgress =
    document.getElementById(
        "skillProgress"
    );

const progressValue =
    document.getElementById(
        "progressValue"
    );


skillProgress.addEventListener(
    "input",
    () => {

        progressValue.textContent =
            skillProgress.value;

    }
);


// ================= ADD SKILL =================

const skillForm =
    document.getElementById(
        "skillForm"
    );


skillForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "skillName"
            ).value.trim();


        const category =
            document.getElementById(
                "skillCategory"
            ).value;


        const progress =
            Number(
                document.getElementById(
                    "skillProgress"
                ).value
            );


        if (!name) {

            alert(
                "Please enter a skill name."
            );

            return;

        }


        const newSkill = {

            id: Date.now(),

            name: name,

            category: category,

            progress: progress

        };


        skills.push(
            newSkill
        );


        saveSkills();

        updateStats();

        displaySkills();


        skillForm.reset();

        progressValue.textContent =
            "50";


        modal.classList.remove(
            "show"
        );

    }
);


// ================= EDIT SKILL =================

function editSkill(id) {

    const skill =
        skills.find(
            item =>
                item.id === id
        );


    if (!skill) return;


    const newProgress =
        prompt(
            `Enter new progress for ${skill.name} (0-100):`,
            skill.progress
        );


    if (
        newProgress === null
    ) {

        return;

    }


    const value =
        Number(
            newProgress
        );


    if (
        isNaN(value) ||
        value < 0 ||
        value > 100
    ) {

        alert(
            "Please enter a number between 0 and 100."
        );

        return;

    }


    skill.progress =
        value;


    saveSkills();

    updateStats();

    displaySkills();

}


// ================= DELETE SKILL =================

function deleteSkill(id) {

    const confirmDelete =
        confirm(
            "Delete this skill?"
        );


    if (!confirmDelete) {

        return;

    }


    skills =
        skills.filter(
            skill =>
                skill.id !== id
        );


    saveSkills();

    updateStats();

    displaySkills();

}


// ================= INITIAL LOAD =================

updateStats();

displaySkills();


console.log(
    "CareerTrack Skills Tracker loaded successfully!"
);