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
    // $('.deleteButton').on(`click`, xxx, deleteTask);
    //$('.doneButton').on(`click`, xxx, doneTask);
}


function getTasks() {
    console.log(`Getting tasks!`);

    $.ajax({
        method: "GET",
        url: "/tasks"
    }).then(function (response) {
        console.log(`Tasks are:`, response);
        renderTasks(response);
    }).catch(function(err) {
        console.log(err);
    })
}


// function renderTasks() {


// }


function submitTask() {
    let newTask = {
        task: $('#inputTask').val(),
        isComplete: false
    };

    console.log(`Adding task`, newTask);

    $.ajax({
        method: "POST",
        url: "/tasks",
        data: newTask
    })
    .then(function (response) { 
        $('#inputTask').val('');
    })
    .catch(function (err) {
        console.log(`Error posting:`, err);
    })

}