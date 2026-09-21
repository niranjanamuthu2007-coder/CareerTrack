// ================= DEFAULT TASKS =================

const defaultTasks = [

    {
        id: 1,
        name: "Solve 2 DSA problems",
        category: "DSA",
        priority: "High",
        date: "2026-09-21",
        completed: false
    },

    {
        id: 2,
        name: "Practice Java Collections",
        category: "Java",
        priority: "High",
        date: "2026-09-21",
        completed: true
    },

    {
        id: 3,
        name: "Practice Percentage problems",
        category: "Aptitude",
        priority: "Medium",
        date: "2026-09-21",
        completed: false
    },

    {
        id: 4,
        name: "Revise Java OOP concepts",
        category: "Java",
        priority: "Medium",
        date: "2026-09-22",
        completed: false
    },

    {
        id: 5,
        name: "Practice SQL queries",
        category: "Placement",
        priority: "Low",
        date: "2026-09-23",
        completed: false
    }

];


// ================= LOAD DATA =================

let tasks =
    JSON.parse(
        localStorage.getItem(
            "careerTrackStudy"
        )
    ) || defaultTasks;


// ================= ELEMENTS =================

const taskList =
    document.getElementById(
        "taskList"
    );

const totalTasks =
    document.getElementById(
        "totalTasks"
    );

const pendingTasks =
    document.getElementById(
        "pendingTasks"
    );

const completedTasks =
    document.getElementById(
        "completedTasks"
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

let currentFilter = "All";


// ================= SAVE =================

function saveTasks() {

    localStorage.setItem(
        "careerTrackStudy",
        JSON.stringify(tasks)
    );

}


// ================= FORMAT DATE =================

function formatDate(date) {

    const parts =
        date.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


// ================= UPDATE STATS =================

function updateStats() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const pending =
        total - completed;


    const percent =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    totalTasks.textContent =
        total;

    pendingTasks.textContent =
        pending;

    completedTasks.textContent =
        completed;

    completion.textContent =
        percent + "%";

    progressPercent.textContent =
        percent + "%";

    progressFill.style.width =
        percent + "%";

}


// ================= DISPLAY =================

function displayTasks() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        tasks.filter(
            task => {

                const matchesSearch =
                    task.name
                        .toLowerCase()
                        .includes(
                            searchText
                        ) ||

                    task.category
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                let matchesFilter = true;


                if (
                    currentFilter ===
                    "Pending"
                ) {

                    matchesFilter =
                        !task.completed;

                }
                else if (
                    currentFilter ===
                    "Completed"
                ) {

                    matchesFilter =
                        task.completed;

                }


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    taskList.innerHTML = "";


    if (filtered.length === 0) {

        taskList.innerHTML = `
            <div class="empty">
                No tasks found.
            </div>
        `;

        return;

    }


    filtered.forEach(
        task => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "task";


            element.innerHTML = `

                <button
                    class="check-btn ${
                        task.completed
                            ? "completed"
                            : ""
                    }"
                    onclick="toggleTask(
                        ${task.id}
                    )">

                    ${
                        task.completed
                            ? "✓"
                            : ""
                    }

                </button>


                <div
                    class="task-name ${
                        task.completed
                            ? "completed"
                            : ""
                    }">

                    ${task.name}

                </div>


                <div class="task-category">

                    📚 ${task.category}

                </div>


                <span
                    class="priority ${task.priority}">

                    ${task.priority}

                </span>


                <div class="task-date">

                    📅 ${formatDate(
                        task.date
                    )}

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteTask(
                        ${task.id}
                    )">

                    🗑️ Delete

                </button>

            `;


            taskList.appendChild(
                element
            );

        }
    );

}


// ================= TOGGLE TASK =================

function toggleTask(id) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveTasks();

    updateStats();

    displayTasks();

}


// ================= DELETE TASK =================

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Delete this study task?"
        );


    if (!confirmDelete) {

        return;

    }


    tasks =
        tasks.filter(
            task =>
                task.id !== id
        );


    saveTasks();

    updateStats();

    displayTasks();

}


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    displayTasks
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


                displayTasks();

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


// ================= ADD TASK =================

const taskForm =
    document.getElementById(
        "taskForm"
    );


taskForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "taskName"
            ).value.trim();


        const category =
            document.getElementById(
                "taskCategory"
            ).value;


        const priority =
            document.getElementById(
                "taskPriority"
            ).value;


        const date =
            document.getElementById(
                "taskDate"
            ).value;


        if (
            !name ||
            !date
        ) {

            alert(
                "Please fill all required fields."
            );

            return;

        }


        const newTask = {

            id: Date.now(),

            name: name,

            category: category,

            priority: priority,

            date: date,

            completed: false

        };


        tasks.push(
            newTask
        );


        saveTasks();

        updateStats();

        displayTasks();


        taskForm.reset();

        modal.classList.remove(
            "show"
        );

    }
);


// ================= INITIAL LOAD =================

updateStats();

displayTasks();


console.log(
    "CareerTrack Study Planner loaded successfully!"
);