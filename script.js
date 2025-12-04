// Wait until the HTML document is fully loaded before running JS
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and render them
    loadTasks();

    // Add event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    /**
     * addTask
     * Adds a task to the list and optionally saves it to localStorage.
     * If called with a taskText parameter, it will add that text (used by loadTasks).
     * If no parameter provided, it reads the value from the input field.
     *
     * @param {string} [taskTextParam] - optional task text to add (skip reading input)
     * @param {boolean} [save=true] - whether to save the new task to localStorage
     */
    function addTask(taskTextParam = undefined, save = true) {
        // Determine the task text (either provided or from the input)
        const taskText = (typeof taskTextParam === 'string')
            ? taskTextParam.trim()
            : taskInput.value.trim();

        // If empty, alert the user and do nothing
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Attach onclick to remove the item from the DOM and from localStorage
        removeButton.onclick = () => {
            // Remove from DOM
            taskList.removeChild(li);

            // Update localStorage: remove first matching occurrence
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const idx = storedTasks.indexOf(taskText);
            if (idx > -1) {
                storedTasks.splice(idx, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append remove button to li and li to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input if we used the input field
        if (typeof taskTextParam !== 'string') {
            taskInput.value = '';
        }

        // Save to localStorage if requested
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    /**
     * loadTasks
     * Reads saved tasks from localStorage and renders them to the DOM.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            // When loading from storage, pass save=false to avoid re-saving duplicates
            addTask(taskText, false);
        });
    }
});
