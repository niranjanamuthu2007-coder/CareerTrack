// =====================================================
// CAREERTRACK
// SKILLS TRACKER
// =====================================================

const storedUser = localStorage.getItem("careerTrackUser");

let currentUser = null;

if (storedUser) {
    try {
        currentUser = JSON.parse(storedUser);
    } catch (error) {
        console.error("Invalid user session.");
        localStorage.removeItem("careerTrackUser");
    }
}

if (!currentUser) {
    window.location.href = "login.html";
}


// ================= USER STORAGE =================

const skillsStorageKey =
    "careerTrackSkills_" + currentUser.id;


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
        name: "HTML/CSS/JS",
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


// ================= LOAD SKILLS =================

let skills = [];

const storedSkills =
    localStorage.getItem(skillsStorageKey);

if (storedSkills) {

    try {
        skills = JSON.parse(storedSkills);
    } catch (error) {

        console.error("Invalid skills data.");

        skills = [...defaultSkills];

        saveSkills();
    }

} else {

    skills = [...defaultSkills];

    saveSkills();
}


// ================= SAVE =================

function saveSkills() {

    localStorage.setItem(
        skillsStorageKey,
        JSON.stringify(skills)
    );

}


// ================= ELEMENTS =================

const skillList =
    document.getElementById("skillList");

const totalSkills =
    document.getElementById("totalSkills");

const advancedSkills =
    document.getElementById("advancedSkills");

const learningSkills =
    document.getElementById("learningSkills");

const overallProgress =
    document.getElementById("overallProgress");

const overallNumber =
    document.getElementById("overallNumber");

const overallFill =
    document.getElementById("overallFill");

const searchInput =
    document.getElementById("searchInput");

const filters =
    document.querySelectorAll(".filter");

const modal =
    document.getElementById("modal");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");

const skillForm =
    document.getElementById("skillForm");

const skillName =
    document.getElementById("skillName");

const skillCategory =
    document.getElementById("skillCategory");

const skillProgress =
    document.getElementById("skillProgress");

const progressValue =
    document.getElementById("progressValue");


let currentFilter = "All";


// ================= SKILL LEVEL =================

function getLevel(progress) {

    if (progress >= 80) {
        return "Advanced";
    }

    if (progress >= 50) {
        return "Intermediate";
    }

    return "Beginner";
}


// ================= SKILL ICON =================

function getSkillIcon(category) {

    if (category === "Programming") {
        return "💻";
    }

    if (category === "Web Development") {
        return "🌐";
    }

    if (category === "Database") {
        return "🗄️";
    }

    if (category === "Tools") {
        return "🛠️";
    }

    return "⭐";
}


// ================= STATS =================

function updateStats() {

    const total = skills.length;

    const advanced =
        skills.filter(
            skill =>
                getLevel(skill.progress) === "Advanced"
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
                    sum + Number(skill.progress),
                0
            );

        average =
            Math.round(
                totalProgress / total
            );
    }


    if (totalSkills) {
        totalSkills.textContent = total;
    }

    if (advancedSkills) {
        advancedSkills.textContent = advanced;
    }

    if (learningSkills) {
        learningSkills.textContent = learning;
    }

    if (overallProgress) {
        overallProgress.textContent =
            average + "%";
    }

    if (overallNumber) {
        overallNumber.textContent =
            average + "%";
    }

    if (overallFill) {
        overallFill.style.width =
            average + "%";
    }
}


// ================= DISPLAY SKILLS =================

function displaySkills() {

    if (!skillList) {
        return;
    }


    const searchTerm =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const filtered =
        skills.filter(skill => {

            const matchesSearch =
                skill.name
                    .toLowerCase()
                    .includes(searchTerm);


            const level =
                getLevel(skill.progress);


            const matchesFilter =
                currentFilter === "All" ||
                currentFilter === level;


            return (
                matchesSearch &&
                matchesFilter
            );

        });


    skillList.innerHTML = "";


    if (filtered.length === 0) {

        skillList.innerHTML = `
            <div class="empty">
                No skills found.
            </div>
        `;

        return;
    }


    filtered.forEach(skill => {

        const level =
            getLevel(skill.progress);


        const element =
            document.createElement("div");


        // IMPORTANT:
        // CSS uses .skill, not .skill-item
        element.className = "skill";


        element.innerHTML = `

            <div class="skill-top">

                <div class="skill-info">

                    <div class="skill-icon">
                        ${getSkillIcon(skill.category)}
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
                        type="button"
                        class="edit-btn"
                        onclick="editSkill(${skill.id})">

                        ✏️ Edit

                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteSkill(${skill.id})">

                        🗑️ Delete

                    </button>

                </div>

            </div>

        `;


        skillList.appendChild(element);

    });

}


// ================= SEARCH =================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displaySkills
    );

}


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


            displaySkills();

        }
    );

});


// ================= MODAL =================

if (openModal && modal) {

    openModal.addEventListener(
        "click",
        () => {

            modal.classList.add("show");

            skillForm.reset();

            skillProgress.value = 50;

            progressValue.textContent = "50";

        }
    );

}


if (closeModal && modal) {

    closeModal.addEventListener(
        "click",
        () => {

            modal.classList.remove("show");

        }
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        }
    );

}


// ================= RANGE =================

if (skillProgress && progressValue) {

    skillProgress.addEventListener(
        "input",
        () => {

            progressValue.textContent =
                skillProgress.value;

        }
    );

}


// ================= ADD SKILL =================

if (skillForm) {

    skillForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                skillName.value.trim();


            const category =
                skillCategory.value;


            const progress =
                Number(
                    skillProgress.value
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


            skills.push(newSkill);


            saveSkills();


            updateStats();


            displaySkills();


            skillForm.reset();


            skillProgress.value = 50;

            progressValue.textContent = "50";


            modal.classList.remove(
                "show"
            );

        }
    );

}


// ================= EDIT SKILL =================

function editSkill(id) {

    const skill =
        skills.find(
            item => item.id === id
        );


    if (!skill) {
        return;
    }


    const newProgress =
        prompt(
            `Enter new progress for ${skill.name} (0-100):`,
            skill.progress
        );


    if (newProgress === null) {
        return;
    }


    const value =
        Number(newProgress);


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


    skill.progress = value;


    saveSkills();

    updateStats();

    displaySkills();

}


// ================= DELETE SKILL =================

function deleteSkill(id) {

    const skill =
        skills.find(
            item => item.id === id
        );


    if (!skill) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${skill.name}"?`
        );


    if (!confirmed) {
        return;
    }


    skills =
        skills.filter(
            item => item.id !== id
        );


    saveSkills();

    updateStats();

    displaySkills();

}


// ================= PROFILE =================

const profileName =
    document.getElementById(
        "profileName"
    );

const profileAvatar =
    document.getElementById(
        "profileAvatar"
    );


if (currentUser) {

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


// ================= INITIAL LOAD =================

updateStats();

displaySkills();


console.log(
    "CareerTrack Skills Tracker loaded successfully!"
);