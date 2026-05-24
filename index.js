let notes = JSON.parse(localStorage.getItem("notes")) || [];
let achievedTasks = JSON.parse(localStorage.getItem("achievedTasks")) || [];

function add() {
    const noteText = document.getElementById("addedText").value;
    if (noteText === "") {
        alert("Field cannot be empty!");
        return;
    }
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(noteText);
    document.getElementById("addedText").value = "";
    alert("Task added!");
    showNotes();
}

function toggleTask(value) {
    const index = achievedTasks.indexOf(value);
    if (index !== -1) {
        achievedTasks.splice(index, 1);
    } else {
        achievedTasks.push(value);
    }
    localStorage.setItem("achievedTasks", JSON.stringify(achievedTasks));
    showNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Task deleted!");
    showNotes();
}

function showNotes() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    const saved = localStorage.getItem("notes");
    const savedNotes = JSON.parse(saved);
    const achieved = JSON.parse(localStorage.getItem("achievedTasks")) || [];
    if (!saved) return;

    savedNotes.forEach((note, index) => {
        const li = document.createElement("li");
        li.className = "list-item";
        if (achieved.includes(index)) {
            li.classList.add("achieved");
        }
        li.onclick = function() {
            toggleTask(index);
        };

        // const input = document.createElement("input");
        // input.type = "checkbox";
        // input.className = `check-list-${index}`;
        // input.checked = achieved.includes(index);
        // input.onclick = function() {
        //     toggleTask(index);
        // };
        // li.appendChild(input);

        const span = document.createElement("span");
        span.textContent = note;
        span.className = "task-text";
        li.appendChild(span);

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.className = "delete-button";
        btn.onclick = function() {
            deleteNote(index);
        };
        li.appendChild(btn);

        list.appendChild(li);
    });
}

window.onload = showNotes();