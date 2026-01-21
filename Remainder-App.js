let reminders = [
  {
    id: 1,
    title: "Pay Electricity Bill",
    category: "Finance",
    priority: "High",
    date: "2026-01-21",
    time: "17:30",
    repeat: "Monthly",
    done: false,
  },
  {
    id: 2,
    title: "Buy Groceries",
    category: "Personal",
    priority: "Medium",
    date: "2026-01-19",
    time: "17:30",
    repeat: "None",
    done: false,
  },
  {
    id: 3,
    title: "Doctor Appointment",
    category: "Health",
    priority: "High",
    date: "2026-01-19",
    time: "17:30",
    repeat: "Yearly",
    done: false,
  },
  {
    id: 4,
    title: "Call Mom",
    category: "Personal",
    priority: "Low",
    date: "2026-01-13",
    time: "17:30",
    repeat: "Daily",
    done: true,
  },
  {
    id: 5,
    title: "Project Submission",
    category: "Work",
    priority: "High",
    date: "2026-01-13",
    time: "17:30",
    repeat: "None",
    done: false,
  },
  {
    id: 6,
    title: "Morning Jog",
    category: "Personal",
    priority: "Medium",
    date: "2026-01-21",
    time: "06:30",
    repeat: "Daily",
    done: false,
  },
  {
    id: 7,
    title: "Team Meeting",
    category: "Work",
    priority: "High",
    date: "2026-01-15",
    time: "10:00",
    repeat: "Weekly",
    done: false,
  },
  {
    id: 8,
    title: "Pay Internet Bill",
    category: "Finance",
    priority: "High",
    date: "2026-01-19",
    time: "12:00",
    repeat: "Monthly",
    done: false,
  },
  {
    id: 9,
    title: "Read a Book",
    category: "Personal",
    priority: "Low",
    date: "2026-01-21",
    time: "21:00",
    repeat: "Daily",
    done: false,
  },
  {
    id: 10,
    title: "Car Service",
    category: "Finance",
    priority: "Medium",
    date: "2026-01-18",
    time: "09:30",
    repeat: "Yearly",
    done: false,
  },
  {
    id: 11,
    title: "Submit Expense Report",
    category: "Work",
    priority: "Medium",
    date: "2026-01-17",
    time: "16:00",
    repeat: "None",
    done: false,
  },
  {
    id: 12,
    title: "Online Course Session",
    category: "Personal",
    priority: "High",
    date: "2026-01-20",
    time: "19:00",
    repeat: "Weekly",
    done: false,
  },
  {
    id: 13,
    title: "Clean House",
    category: "Personal",
    priority: "Low",
    date: "2026-01-15",
    time: "11:00",
    repeat: "Weekly",
    done: false,
  },
  {
    id: 14,
    title: "Birthday Reminder",
    category: "Personal",
    priority: "High",
    date: "2026-01-20",
    time: "08:00",
    repeat: "Yearly",
    done: false,
  },
  {
    id: 15,
    title: "Meditation",
    category: "Health",
    priority: "Medium",
    date: "2026-01-13",
    time: "07:00",
    repeat: "Daily",
    done: true,
  }
];

const form = document.getElementById("form");
const listView = document.getElementById("listView");
const listCard = document.getElementById("listCard");
const table = document.getElementById("tableView");
const date = document.getElementById("datetab");
const todayReminderbtn = document.getElementById('todayReminderbtn')
const searchInput = document.getElementById('search');
const tableBody = document.getElementById("tableBody");
const debSearch = debounce(search, 1000);
let curDate = new Date();
let time = curDate.getTime();
let todayDate = curDate.getDate();
let month = curDate.getMonth();
let year = curDate.getFullYear();
let showTodaysReminder = false;
let isEdit = false
let input;

function hideAll() {
  form.className = "d-none";
  listView.className = "d-none";
  table.className = "d-none";
  date.className = "d-none";
  todayReminderbtn.style.display = "none";
  searchInput.style.display = "none";
}

navAdd.onclick = () => {
  hideAll();
  if (isEdit) {
    document.getElementById('submitBtn').innerHTML = "Add";
    isEdit = false;
  }
  document.getElementById('reminderForm').reset();
  form.className = "card";
};


navList.onclick = () => {
  hideAll();
  listView.className = 'd-grid';
  todayReminderbtn.style.display = "block";
  searchInput.style.display = "flex";
  showTodaysReminderBtn();
  displayReminders();
};

navTable.onclick = () => {
  hideAll();
  table.className = 'd-table';
  todayReminderbtn.style.display = "block";
  searchInput.style.display = "flex";
  showTodaysReminderBtn();
  displayReminders();
};

function showTodaysReminderBtn() {
  if (showTodaysReminder) {
    todayReminderbtn.innerHTML = "Today's Reminder";
    showTodaysReminder = false;
  }
}

function displayReminders() {
  listCard.innerHTML = ""
  tableBody.innerHTML = ""
  let searchedInput = localStorage.getItem('searchInput');
  if (searchedInput) {
    search(searchedInput)
  }
  else if (showTodaysReminder) {
    getTodayReminder();
  }
  else {
    renderList();
    renderTable();
  }
}

function renderList() {
  reminders.forEach((r) => {
    renderReminderAsList(r);
  })
}

function renderTable() {
  reminders.forEach((r) => {
    renderReminderAsTable(r);
  })
}

function renderReminderAsList(r) {
  const div = document.createElement("div");
  div.style.minWidth = '30%';
  div.className = `card pb-4 col-md-3 mb-2 border-success min-w-40 p  b-3 ${r.priority.toLowerCase()} ${r.done ? "done" : ""
    }`;
  div.innerHTML = `
  <strong class="card-title mt-3">${r.title}</strong>
  <span>${r.category}</span>
  <span>${r.date} ${r.time}</span>
  <span>${r.repeat}</span>
  <span class="pb-3">Status: ${r.done ? "Done" : "Pending"}</span>
  <div class = "list-btn-cont" >
  
  <button class = "btn btn-primary" onclick="toggle(${r.id})">Done/Undo</button>
  <button class = "btn btn-danger" onclick="removeItem(${r.id})">Delete</button>
  ${r.done ? `<button class = "btn btn-outline-dark" onclick="edit(${r.id})" disabled>Edit</button>`
      : `<button class = "btn btn-outline-dark" onclick="edit(${r.id})">Edit</button>`}
    </div>`;
  listCard.appendChild(div);
}

function renderReminderAsTable(r) {
  const row = document.createElement("tr");
  row.class = "";
  row.innerHTML = `
  <td>${r.title}</td><td>${r.category}</td><td>${r.date}</td>
  <td>${r.time}</td><td>${r.priority}</td><td>${r.repeat}</td>
  <td>${r.done ? "Done" : "Pending"}</td>
  <td>
  <button class="btn btn-primary" onclick="toggle(${r.id})">Done/Undo</button>
    <button class = "btn btn-danger" onclick="removeItem(${r.id})">Delete</button>
    ${r.done ? `<button class = "btn btn-outline-dark" onclick="edit(${r.id})" disabled>Edit</button>`
      : `<button class = "btn btn-outline-dark" onclick="edit(${r.id})">Edit</button>`}
    </td>`;
  tableBody.appendChild(row);
}

function validateFrom() {
  let isFormValid = true;
  if (title.value == "") {
    title.classList.add("is-invalid");
    isFormValid = false;
    return
  }
  else {
    title.classList.remove("is-invalid");
  }

  let reminderDate = new Date(document.getElementById('date').value); let currentDate = new Date(); let curDate = currentDate.getDate(); let remDate = reminderDate.getDate(); let curYear = currentDate.getFullYear(); let remYear = reminderDate.getFullYear(); let curMonth = currentDate.getMonth(); let remMonth = reminderDate.getMonth();

  if (document.getElementById('date').value == "") {
    document.getElementById("date").classList.add("is-invalid");
    isFormValid = false;
    return
  }
  else if (remDate < curDate || remMonth < curMonth || remYear < curYear) {
    document.getElementById("date").classList.add("is-invalid");
    isFormValid = false;
    return
  }
  else {
    document.getElementById("date").classList.remove("is-invalid");
  }

  if (time.value == "") {
    time.classList.add("is-invalid");
    isFormValid = false;
    return
  }
  else {
    document.getElementById("time").classList.remove("is-invalid");
  }
  return true;
}

submitBtn.onclick = () => {
  if (isEdit) {
    if (validateFrom()) {
      let id = localStorage.getItem('reminderIdToSearch');
      reminders.forEach((r) => {
        if (r.id == id) {
          r.title = document.getElementById('title').value;
          r.category = document.getElementById('category').value;
          r.priority = document.getElementById('priority').value;
          r.date = document.getElementById('date').value;
          r.time = document.getElementById('time').value;
          r.repeat = document.getElementById('repeat').value;
        }
      })
      document.getElementById('reminderForm').reset();
      window.alert('Reminder Details Edited')
      document.getElementById('submitBtn').innerHTML = "Add";
      isEdit = false;
    }
  }

  else {
    if (validateFrom()) {
      document.getElementById('reminderForm').reset();
      window.alert("Reminder Added");
      reminders.push({
        id: reminders.length + 1,
        title: title.value,
        category: category.value,
        priority: priority.value,
        date: document.getElementById("date").value,
        time: time.value,
        repeat: repeat.value,
        done: false,
      });
      // console.log(reminders);
    }
  }
}

function edit(id) {
  isEdit = true;
  document.getElementById("time").classList.remove("is-invalid");
  document.getElementById("date").classList.remove("is-invalid");
  title.classList.remove("is-invalid");
  hideAll();
  reminders.forEach((r) => {
    if (r.id == id) {
      reminderToEdit = r;
      localStorage.setItem('reminderIdToSearch', r.id);
    }
  })
  form.className = 'card'
  document.getElementById('submitBtn').innerHTML = 'Update';
  document.getElementById('title').value = reminderToEdit.title;
  document.getElementById('category').value = reminderToEdit.category;
  document.getElementById('priority').value = reminderToEdit.priority;
  document.getElementById('date').value = reminderToEdit.date;
  document.getElementById('time').value = reminderToEdit.time;
  document.getElementById('repeat').value = reminderToEdit.repeat;

  form.style.display = "flex";
}

function toggle(id) {
  reminders.forEach((r) => {
    if (r.id == id) {
      r.done = !r.done;
      reminderToToggle = r;
    }
  })
  displayReminders();
}

function removeItem(id) {
  reminders = reminders.filter(r => r.id != id);
  displayReminders();
}


function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  }
}

document.getElementById('search').addEventListener('input', () => {
  input = document.getElementById('search').value
  debSearch(input);
})

window.addEventListener('load', function () {
  localStorage.removeItem('searchInput');
  localStorage.removeItem('reminderIdToSearch');
})

function search(inp) {
  // console.log(inp)
  listCard.innerHTML = "";
  tableBody.innerHTML = "";
  let input = inp.toLowerCase();
  if (showTodaysReminder) {
    reminders.forEach((r) => {
      let eventDate = new Date(r.date);
      if (r.title.toLowerCase().includes(input) && todayDate == eventDate.getDate() && month == eventDate.getMonth() && year == eventDate.getFullYear()) {
        renderReminderAsList(r);
        renderReminderAsTable(r);
      }
    })
  }
  else {
    reminders.forEach((r) => {
      if (r.title.toLowerCase().includes(input)) {
        renderReminderAsList(r);
        renderReminderAsTable(r);
      }
    })
  }
  localStorage.setItem('searchInput', inp);
}

function getTodayReminder() {
  if (showTodaysReminder) {
    todayReminderbtn.innerHTML = "All Reminder";
    listCard.innerHTML = "";
    tableBody.innerHTML = "";
    document.getElementById('search').value = "";
    reminders.forEach((r) => {
      let eventDate = new Date(r.date);
      if (todayDate == eventDate.getDate() && month == eventDate.getMonth() && year == eventDate.getFullYear()) {
        renderReminderAsList(r);
        renderReminderAsTable(r);
      }
    })
  }
  else {
    todayReminderbtn.innerHTML = "Today's Reminder";
    displayReminders();
  }
}

todayReminderbtn.onclick = function () {
  showTodaysReminder = !showTodaysReminder;
  getTodayReminder();
}


hideAll();

form.className = "card";

// navDate.onclick = () => {
//   hideAll();
//   date.className = ""
// }

// getCurDate.onclick = (e) => {
//   e.preventDefault();
//   let curDate = new Date();
//   let date = curDate.getDate();
//   let year = curDate.getFullYear();
//   let month = curDate.getMonth();
//   let hours = curDate.getHours();
//   let minutes = curDate.getMinutes();
//   let seconds = curDate.getSeconds();
//   let milliSeconds = curDate.getMilliseconds();
//   let timeZone = curDate.getTimezoneOffset();
//   document.getElementById('year').innerHTML = year;
//   document.getElementById('month').innerHTML = month + 1;
//   document.getElementById('dat').innerHTML = date;
//   document.getElementById('hours').innerHTML = hours;
//   document.getElementById('minutes').innerHTML = minutes;
//   document.getElementById('seconds').innerHTML = seconds;
//   document.getElementById('milliseconds').innerHTML = milliSeconds;
//   document.getElementById('timezone').innerHTML = timeZone;
//   document.getElementById('curDate').innerHTML = curDate;
// }