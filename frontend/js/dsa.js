// ================= DEFAULT PROBLEMS =================

const defaultProblems = [

    {
        id: 1,
        name: "Two Sum",
        topic: "Arrays",
        difficulty: "Easy",
        solved: true
    },

    {
        id: 2,
        name: "Best Time to Buy and Sell Stock",
        topic: "Arrays",
        difficulty: "Easy",
        solved: true
    },

    {
        id: 3,
        name: "Maximum Subarray",
        topic: "Arrays",
        difficulty: "Medium",
        solved: true
    },

    {
        id: 4,
        name: "Merge Intervals",
        topic: "Arrays",
        difficulty: "Medium",
        solved: false
    },

    {
        id: 5,
        name: "Binary Search",
        topic: "Searching",
        difficulty: "Easy",
        solved: false
    },

    {
        id: 6,
        name: "Reverse Linked List",
        topic: "Linked List",
        difficulty: "Easy",
        solved: false
    },

    {
        id: 7,
        name: "Valid Parentheses",
        topic: "Stack",
        difficulty: "Easy",
        solved: true
    },

    {
        id: 8,
        name: "3Sum",
        topic: "Arrays",
        difficulty: "Medium",
        solved: false
    },

    {
        id: 9,
        name: "Longest Substring Without Repeating Characters",
        topic: "Strings",
        difficulty: "Medium",
        solved: false
    },

    {
        id: 10,
        name: "Trapping Rain Water",
        topic: "Arrays",
        difficulty: "Hard",
        solved: false
    }

];


// ================= LOAD DATA =================

let problems =
    JSON.parse(
        localStorage.getItem("careerTrackDSA")
    ) || defaultProblems;


// ================= ELEMENTS =================

const problemList =
    document.getElementById(
        "problemList"
    );

const totalProblems =
    document.getElementById(
        "totalProblems"
    );

const solvedProblems =
    document.getElementById(
        "solvedProblems"
    );

const progressProblems =
    document.getElementById(
        "progressProblems"
    );

const completion =
    document.getElementById(
        "completion"
    );

const progressPercent =
    document.getElementById(
        "progressPercent"
    );

const progressFill =
    document.getElementById(
        "progressFill"
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

let currentFilter = "all";


// ================= SAVE DATA =================

function saveProblems() {

    localStorage.setItem(
        "careerTrackDSA",
        JSON.stringify(problems)
    );

}


// ================= UPDATE STATS =================

function updateStats() {

    const total =
        problems.length;

    const solved =
        problems.filter(
            problem => problem.solved
        ).length;

    const inProgress =
        total - solved;

    const percent =
        total === 0
            ? 0
            : Math.round(
                (solved / total) * 100
            );


    totalProblems.textContent =
        total;

    solvedProblems.textContent =
        solved;

    progressProblems.textContent =
        inProgress;

    completion.textContent =
        percent + "%";

    progressPercent.textContent =
        percent + "%";

    progressFill.style.width =
        percent + "%";

}


// ================= DISPLAY PROBLEMS =================

function displayProblems() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered =
        problems.filter(problem => {

            const matchesSearch =
                problem.name
                    .toLowerCase()
                    .includes(searchText) ||
                problem.topic
                    .toLowerCase()
                    .includes(searchText);


            let matchesFilter = true;


            if (currentFilter === "Solved") {

                matchesFilter =
                    problem.solved;

            }
            else if (
                currentFilter !== "all"
            ) {

                matchesFilter =
                    problem.difficulty ===
                    currentFilter;

            }


            return (
                matchesSearch &&
                matchesFilter
            );

        });


    problemList.innerHTML = "";


    if (filtered.length === 0) {

        problemList.innerHTML = `
            <div class="empty">
                No problems found.
            </div>
        `;

        return;

    }


    filtered.forEach(problem => {

        const problemElement =
            document.createElement("div");

        problemElement.className =
            "problem";


        problemElement.innerHTML = `

            <div>

                <div class="problem-name">
                    ${problem.name}
                </div>

                <div class="problem-topic">
                    ${problem.topic}
                </div>

            </div>


            <span class="difficulty ${problem.difficulty}">
                ${problem.difficulty}
            </span>


            <button
                class="status-btn ${
                    problem.solved
                        ? "solved"
                        : ""
                }"
                onclick="toggleSolved(${problem.id})">

                ${
                    problem.solved
                        ? "✓ Solved"
                        : "Mark Solved"
                }

            </button>


            <button
                class="delete-btn"
                onclick="deleteProblem(${problem.id})">

                🗑️

            </button>

        `;


        problemList.appendChild(
            problemElement
        );

    });

}


// ================= TOGGLE SOLVED =================

function toggleSolved(id) {

    const problem =
        problems.find(
            item => item.id === id
        );


    if (!problem) return;


    problem.solved =
        !problem.solved;


    saveProblems();

    updateStats();

    displayProblems();

}


// ================= DELETE =================

function deleteProblem(id) {

    const confirmDelete =
        confirm(
            "Delete this problem?"
        );


    if (!confirmDelete) return;


    problems =
        problems.filter(
            problem =>
                problem.id !== id
        );


    saveProblems();

    updateStats();

    displayProblems();

}


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    displayProblems
);


// ================= FILTER =================

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


            displayProblems();

        }
    );

});


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


// ================= ADD PROBLEM =================

const problemForm =
    document.getElementById(
        "problemForm"
    );


problemForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "problemName"
            ).value.trim();


        const topic =
            document.getElementById(
                "problemTopic"
            ).value.trim();


        const difficulty =
            document.getElementById(
                "problemDifficulty"
            ).value;


        if (!name || !topic) {

            alert(
                "Please fill all fields."
            );

            return;

        }


        const newProblem = {

            id: Date.now(),

            name: name,

            topic: topic,

            difficulty: difficulty,

            solved: false

        };


        problems.push(
            newProblem
        );


        saveProblems();

        updateStats();

        displayProblems();


        problemForm.reset();

        modal.classList.remove(
            "show"
        );

    }
);


// ================= INITIAL LOAD =================

updateStats();

displayProblems();


console.log(
    "CareerTrack DSA Tracker loaded successfully!"
);