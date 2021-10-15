console.log(`HTML loaded`);

$(document).ready(function () {
    console.log(`jQ loaded`);

    //Click listeners
    $('#submitButton').on(`click`, submitTask);
    // $('.deleteButton').on(`click`, xxx, deleteTask);
    //$('.doneButton').on(`click`, xxx, doneTask);

});

function submitTask() {
    console.log(`Adding task`);


}