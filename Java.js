var studentID = document.getElementById("StudentID");
var studentType = document.getElementsByName("StudentType");
var firstName = document.getElementById("FirstName");
var lastName = document.getElementById("LastName");
var residency = document.getElementsByName("Residency");
var numberOfCreditsTaking = document.getElementById("NumberofCreditsTaking");

let students = [];

function getCheckedValue(radios) {
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function uncheckRadio(radios) {
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
}
function editStudentDetails(id) {
    console.log(`edit clicked with ${id}`);

    let details = localStorage.getItem(id).split(" ");
    studentID.value = details[0];
    firstName.value = details[2];
    lastName.value = details[3];
    numberOfCreditsTaking.value = details[5];
    for (var i = 0; i < studentType.length; i++) {
        if (studentType[i].value === details[1]) {
            studentType[i].checked = true;
        } else {
            studentType[i].checked = false;
        }
    }
    
    for (var i = 0; i < residency.length; i++) {
        if (residency[i].value === details[4]) {
            residency[i].checked = true;
        } else {
            residency[i].checked = false;
        }
    }
    
    console.log(details);
}

function deleteStudentDetails(id) {
    localStorage.removeItem(id);
    displayStudents();
    location.reload();
}

function displayStudents() {
    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
        var id = localStorage.getItem(localStorage.key(i)).split(" ")[0];
        let a = localStorage.getItem(localStorage.key(i)).split(" ");
        let b = a.slice(1, 5).join(" ");
        let credits = a.length > 5 ? a[5] + " credits" : "Unknown credits";
        let list = document.createElement('li');
        let text = document.createElement('label');
        text.textContent = b + ", " + credits;
        text.className = 'label-text'; // Apply the CSS class
        let editBtn = document.createElement("button");
        editBtn.textContent = 'Edit';
        editBtn.className = 'button';
        editBtn.id = id;
        editBtn.setAttribute("onclick", `editStudentDetails(${id})`);
        let delBtn = document.createElement("button");
        delBtn.textContent = 'Delete';
        delBtn.className = 'button';
        delBtn.id = id;
        delBtn.setAttribute("onclick", `deleteStudentDetails(${id})`);
        list.appendChild(text);
        list.appendChild(editBtn);
        list.appendChild(delBtn);
        document.getElementById('outputContainer').appendChild(list);
    }
}


function clearAllStudents() {
    localStorage.clear();
    displayStudents();
    location.reload();
}

function saveStudent() {
    location.reload();
    var a = '';
    console.log(document.getElementById("StudentID").value);
    a = document.getElementById("StudentID").value + " " + getCheckedValue(studentType) + " " + document.getElementById("FirstName").value + " " + document.getElementById("LastName").value + " " + getCheckedValue(residency) + " " + document.getElementById("NumberofCreditsTaking").value;

    localStorage.setItem(document.getElementById("StudentID").value, a);

    displayStudents();

    studentID.value = "";
    firstName.value = "";
    lastName.value = "";
    numberOfCreditsTaking.value = "";
    uncheckRadio(studentType);
    uncheckRadio(residency);
}

displayStudents();
