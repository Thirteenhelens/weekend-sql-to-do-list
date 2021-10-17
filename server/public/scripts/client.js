console.log(`HTML loaded`);

$(document).ready(function () {
    console.log(`jQ loaded`);

    clickListeners();

    //Getting all tasks
    getTasks();
});


function clickListeners() {
    $('#submitButton').on(`click`, submitTask);
    $('#tasksDiv').on(`click`, '.deleteButton', deleteTask);
    $('#tasksDiv').on(`click`, '.doneButton', doneTask);
}


function getTasks() {
    console.log(`Getting tasks`);

    //Asking router to give all tasks
    $.ajax({
        method: "GET",
        url: "/tasks"
    })
        .then(function (response) {
            renderTasks(response);
        })
        .catch(function (err) {
            console.log(err);
        })
}


function renderTasks(tasks) {
    console.log(`Rendering tasks`);

    $('#tasksDiv').empty();

    //Looping through all tasks, formatting, then appending to DOM
    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;

        //If task is not completed, give it complete button
        if (!tasks[i].isComplete) {
            let completeBtn = `<button class="btn btn-outline-secondary doneButton">Finished</button>`;

            let task = $(`
            <tr data-id="${id}">
                <td>${tasks[i].task}</td>
                <td>${completeBtn}</td>
                <td><button class="deleteButton btn btn-outline-danger">Remove</button></td>
            </tr> `);

            $('#tasksDiv').append(task);
        }
        //If task is completed, change background color
        else if (tasks[i].isComplete) {
            let task = $(`
            <tr data-id="${id}">
                <td class="completedTask">${tasks[i].task}</td>
                <td></td>
                <td><button class="deleteButton btn btn-outline-danger">Remove</button></td>
            </tr> `);

            $('#tasksDiv').append(task);
        }
    }
}


function submitTask() {
    console.log(`Adding task`);

    let newTask = {
        task: $('#inputTask').val(),
    }

    //Logging for redundancy 
    console.log(`New task is:`, newTask);

    //Giving router a new task to put on DOM
    $.ajax({
        method: "POST",
        url: "/tasks",
        data: newTask
    })
        .then(function (response) {
            $('#inputTask').val('');
            getTasks();
        })
        .catch(function (err) {
            console.log(`Error posting:`, err);
        })

}


function doneTask() {
    console.log(`Marked task as done`);

    //Getting id for task to be completed
    let finishedTaskId = $(this).closest('tr').data('id');


    //Getting router to update a specific task
    $.ajax({
        method: "PUT",
        url: `/tasks/${finishedTaskId}`,
    })
        .then(function (response) {
            console.log(response);
            getTasks();
        })
        .catch(function (err) {
            console.log(`Error marking task done`, err);
        })
}


function deleteTask() {
    console.log(`Deleting task`);

    //Getting id for task to be removed
    let taskToDelete = $(this).closest('tr').data('id');

    //Asking router to delete a specific task
    $.ajax({
        method: "DELETE",
        url: `/tasks/${taskToDelete}`,
    })
        .then(function (response) {
            console.log(response);
            getTasks();
        })
        .catch(function (err) {
            console.log(`Error deleting`, err);
        })
}