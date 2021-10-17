console.log(`HTML loaded`);

$(document).ready(function () {
    console.log(`jQ loaded`);

    //Call click listener func.
    clickListeners();

    //Getting all tasks
    getTasks();
});


function clickListeners() {
    $('#submitButton').on(`click`, submitTask);
    // $('.deleteButton').on(`click`, '#tasksDiv', deleteTask);
    // $('#tasksDiv').on(`click`, '.doneButton', doneTask);
}


function getTasks() {
    console.log(`Getting tasks`);

    $.ajax({
        method: "GET",
        url: "/tasks"
    })
        .then(function (response) {
            console.log(`Tasks are:`, response); //REMOVE BEFORE FIN
            renderTasks(response);
        })
        .catch(function (err) {
            console.log(err);
        })
}


function renderTasks(tasks) {
    console.log(`Rendering tasks`);

    $('#tasksDiv').empty();

    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;

        let completeBtn = ``;

        if (!tasks[i].isComplete) {
            completeBtn = `<button class="doneButton">Finished</button>`;
        }
        let task = $(`
        <tr data-id="${id}">
            <td>${tasks[i].task}</td>
            <td>${completeBtn}</td>
            <td><button class="deleteButton">Remove</button></td>
        </tr> `);
        $('#tasksDiv').append(task);
    }
}


function submitTask() {
    console.log(`Adding task`);

    let newTask = {
        task: $('#inputTask').val(),
    }

    console.log('New task is:', newTask);

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


// function doneTask() {
//     console.log(`Marked task as done`);

//     let finishedTaskId = $(this).closest('tr').data('id');

//     $.ajax({
//         method: "PUT",
//         url: `/tasks/${finishedTaskId}`,
//         data: true
//     })
//         .then(function (response) {
//             console.log(response);
//             getTasks();
//         })
//         .catch(function (err) {
//             console.log(`Error marking task done`, err);
//         })
// }


// function deleteTask() {
//     console.log(`Deleting task`);

//     let taskToDelete = $(this).closest('tr').data('id');

//     console.log(taskToDelete);

//     $.ajax({
//         method: "DELETE",
//         url: `/tasks/${taskToDelete}`,
//     })
//         .then(function (response) {
//             console.log();
//             getTasks();
//         })
//         .catch(function (err) {
//             console.log(`Error deleting`, err);
//         })
// }