document.getElementById('subjectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const subjectName = document.getElementById('subjectName').value;
    const dayOfWeek = document.getElementById('dayOfWeek').value;
    const startPeriod = parseInt(document.getElementById('startPeriod').value);
    const endPeriod = parseInt(document.getElementById('endPeriod').value);
    const classroom = document.getElementById('classroom').value;
    const teacher = document.getElementById('teacher').value;
    const color = document.getElementById('colorPicker').value;

    addSubject(subjectName, dayOfWeek, startPeriod, endPeriod, classroom, teacher, color);
    updateSchedule();
    updateTodaySubjects();
    this.reset();
});

function addSubject(name, day, start, end, room, teacher, color) {
    let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    subjects.push({ name, day, start, end, room, teacher, color });
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

function updateSchedule() {
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const scheduleGrid = document.getElementById('scheduleGrid');
    scheduleGrid.innerHTML = '';

    for (let i = 1; i <= 10; i++) {
        for (let j = 2; j <= 7; j++) {
            const cell = document.createElement('div');
            const subject = subjects.find(sub => sub.start <= i && sub.end >= i && sub.day == j);
            if (subject) {
                cell.style.backgroundColor = subject.color;
                cell.innerHTML = `<strong>${subject.name}</strong>
${subject.room}
<span style="opacity: 0.7;">${subject.teacher}</span>`;
            }
            scheduleGrid.appendChild(cell);
        }
    }
}

function updateTodaySubjects() {
    const today = new Date().getDay();
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    const todaySubjects = subjects.filter(sub => sub.day == today);
    const todayContainer = document.getElementById('todaySubjects');
    todayContainer.innerHTML = '';

    todaySubjects.forEach(sub => {
        const item = document.createElement('div');
        item.innerText = `${sub.name} - Tiết: ${sub.start} đến ${sub.end}`;
        todayContainer.appendChild(item);
    });

    const summary = document.getElementById('summary');
    summary.innerHTML = `Tổng số môn: ${todaySubjects.length}`;
}

// Khởi động bảng và danh sách khi tải trang
window.onload = function() {
    updateSchedule();
    updateTodaySubjects();
};
