// scripts.js

$(document).ready(function () {
    $(".task-list").sortable({
        connectWith: ".task-list",
        update: function (event, ui) {
            saveTasks();
        }
    });

    loadTasks();
    applyDarkMode(); // Apply dark mode if enabled
});

function addNewTask() {
    var taskText = $("#new-task-input").val();
    if (taskText.trim() !== "") {
        var newTask = $("<li class='task'>" +
            "<span>" + taskText + "</span>" +
            "<button class='edit-button' onclick='editTask(this)'>Edit</button>" +
            "<button class='delete-button' onclick='deleteTask(this)'>Delete</button></li>");
        $("#not-complete-list").append(newTask);
        $("#new-task-input").val("");
        saveTasks();
    }
}

function editTask(button) {
    var taskTextElement = $(button).siblings('span');
    var taskText = taskTextElement.text();
    var updatedText = prompt("Edit Task", taskText);
    if (updatedText !== null) {
        taskTextElement.text(updatedText);
        saveTasks();
    }
}

function deleteTask(button) {
    $(button).parent().remove();
    saveTasks();
}

function resetAllData() {
    if (confirm("Are you sure you want to reset all data?")) {
        localStorage.clear();
        location.reload();
    }
}

function saveTasks() {
    var notCompleteTasks = $("#not-complete-list").html();
    var inProgressTasks = $("#in-progress-list").html();
    var completedTasks = $("#completed-list").html();

    localStorage.setItem("notCompleteTasks", notCompleteTasks);
    localStorage.setItem("inProgressTasks", inProgressTasks);
    localStorage.setItem("completedTasks", completedTasks);
}

function loadTasks() {
    var notCompleteTasks = localStorage.getItem("notCompleteTasks");
    var inProgressTasks = localStorage.getItem("inProgressTasks");
    var completedTasks = localStorage.getItem("completedTasks");

    if (notCompleteTasks) $("#not-complete-list").html(notCompleteTasks);
    if (inProgressTasks) $("#in-progress-list").html(inProgressTasks);
    if (completedTasks) $("#completed-list").html(completedTasks);
}

function toggleDarkMode() {
    var body = $("body");
    var darkModeSwitch = $(".switch input");

    body.toggleClass("dark-mode");
    darkModeSwitch.prop("checked", body.hasClass("dark-mode"));

    saveDarkModeState(body.hasClass("dark-mode"));
}

function applyDarkMode() {
    var darkModeEnabled = getDarkModeState();
    var body = $("body");
    var darkModeSwitch = $(".switch input");

    if (darkModeEnabled) {
        body.addClass("dark-mode");
        darkModeSwitch.prop("checked", true);
    }
}

function saveDarkModeState(enabled) {
    localStorage.setItem("darkModeEnabled", enabled);
}

function getDarkModeState() {
    return localStorage.getItem("darkModeEnabled") === "true";
}
