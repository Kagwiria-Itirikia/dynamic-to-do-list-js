// Ensure the script runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * addTask()
     * This function adds a new task to the list.
     */
    function addTask() {
        // Get the trimmed task text
        const taskText = taskInput.value.trim();

        // If empty, alert the user
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove functionality
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append remove button to the li
        li.appendChild(removeButton);

        // Append li to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Event: Clicking "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event: Pressing Enter in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // (They requested this step, even though it's unusual)
    // Invoke addTask on DOMContentLoaded — but we do nothing because we don’t want an empty task
    addTask();
});
