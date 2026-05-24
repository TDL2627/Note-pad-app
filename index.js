let notes = JSON.parse(localStorage.getItem("notes")) || [];

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
    if (!saved) return;
    savedNotes.forEach((note,index) => {
        const li = document.createElement("li");
        li.textContent = note + " ";
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = function () {
            deleteNote(index);
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}
window.onload = showNotes();