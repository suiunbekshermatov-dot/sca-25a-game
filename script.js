// Список всех 25 студентов группы SCA-25A с привязкой к вашим файлам в папке images/
const students = [
    { name: "Asema Abdykaiymova", photo: "images/258715001.JPG" },
    { name: "Omurbek Abykov", photo: "images/258715002.jpeg" },
    { name: "Nurislam Adylov", photo: "images/258715003.JPG" },
    { name: "Baiyel Akylbaev", photo: "images/258715004.jpeg" },
    { name: "Aiturgan Akylbekova", photo: "images/258715005.jpeg" },
    { name: "Iskander Almazov", photo: "images/258715007.JPG" },
    { name: "Erzhan Aralbaev", photo: "images/258715008.jpg" },
    { name: "Nursultan Bakinov", photo: "images/258715009.JPG" },
    { name: "Islam Chokonov", photo: "images/258715011.jpg" },
    { name: "Aidarbek Erkinbekov", photo: "images/258715013.jpg" },
    { name: "Atai Erkinov", photo: "images/placeholder.jpg" },
    { name: "Altynai Isabekova", photo: "images/placeholder.jpg" },
    { name: "Kutman Kairatov", photo: "images/placeholder.jpg" },
    { name: "Islam Kaiypkulov", photo: "images/placeholder.jpg" },
    { name: "Nuran Kydyrov", photo: "images/placeholder.jpg" },
    { name: "Nagima Malikova", photo: "images/placeholder.jpg" },
    { name: "Shamil Mamedov", photo: "images/placeholder.jpg" },
    { name: "Radiya Muratova", photo: "images/placeholder.jpg" },
    { name: "Erbol Muslimov", photo: "images/placeholder.jpg" },
    { name: "Amanbek Niyazov", photo: "images/placeholder.jpg" },
    { name: "Mirat Sagynaliev", photo: "images/placeholder.jpg" },
    { name: "Mirbek Salizhanov", photo: "images/placeholder.jpg" },
    { name: "Aidana Satkynova", photo: "images/placeholder.jpg" },
    { name: "Niyaz Zhenishev", photo: "images/placeholder.jpg" },
    { name: "Almaz Zhusubaliev", photo: "images/placeholder.jpg" }
];

// Переключение вкладок
function switchTab(tabId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Рандомайзер / Рулетка
function spinWheel() {
    const display = document.getElementById('winnerDisplay');
    let counter = 0;
    const maxCount = 20;
    
    const interval = setInterval(() => {
        const randomStudent = students[Math.floor(Math.random() * students.length)];
        display.innerHTML = `
            <img src="${randomStudent.photo}" class="winner-avatar" alt="" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'">
            <div class="winner-name">${randomStudent.name}</div>
            <div class="winner-group">Группа SCA-25A</div>
        `;
        counter++;
        if (counter >= maxCount) {
            clearInterval(interval);
        }
    }, 80);
}

// Заполнение галереи
const galleryGrid = document.getElementById('galleryGrid');
students.forEach(st => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
        <img src="${st.photo}" alt="${st.name}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'">
        <h4>${st.name}</h4>
        <span>SCA-25A</span>
    `;
    galleryGrid.appendChild(card);
});

// Квиз
const quizData = [
    {
        question: "Какой язык программирования изучается на первом курсе чаще всего для основы?",
        options: ["Python / JavaScript", "C++ в микроконтроллерах", "Только HTML", "Ассемблер"],
        correct: 0
    },
    {
        question: "Что делать студенту группы SCA-25A при приближении дедлайна?",
        options: ["Спокойно всё доделать вовремя", "Паниковать за 5 минут до сдачи", "Начать писать диплом с нуля", "Лечь спать"],
        correct: 0
    },
    {
        question: "Какая главная задача куратора на кураторском часе?",
        options: ["Проверить настроение и сплотить группу", "Заставить выучить учебник наизусть", "Задать сложную контрольную", "Выгнать всех из аудитории"],
        correct: 0
    }
];

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    const container = document.getElementById('quizContainer');
    if (currentQuiz < quizData.length) {
        const q = quizData[currentQuiz];
        let optionsHtml = q.options.map((opt, idx) => `
            <button class="option-btn" onclick="selectOption(${idx}, ${q.correct})">${opt}</button>
        `).join('');

        container.innerHTML = `
            <div class="quiz-question">Вопрос ${currentQuiz + 1} из ${quizData.length}:<br>${q.question}</div>
            <div class="options-list">${optionsHtml}</div>
        `;
    } else {
        container.innerHTML = `
            <div style="text-align:center; padding: 2rem;">
                <h3>Квиз завершен! 🎉</h3>
                <p style="font-size: 1.2rem; margin: 1rem 0;">Ваш результат: ${score} из ${quizData.length}</p>
                <button class="btn" onclick="resetQuiz()">Пройти заново</button>
            </div>
        `;
    }
}

function selectOption(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correct) btn.classList.add('correct');
        if (idx === selected && selected !== correct) btn.classList.add('wrong');
    });

    if (selected === correct) score++;
    
    setTimeout(() => {
        currentQuiz++;
        loadQuiz();
    }, 1500);
}

function resetQuiz() {
    currentQuiz = 0;
    score = 0;
    loadQuiz();
}

loadQuiz();

// Правда или Миф
const myths = [
    { text: "На кураторском часе группы SCA-25A всегда царит позитивная атмосфера.", isTrue: true, explanation: "Правда! Наша группа самая дружная." },
    { text: "В колледже можно сдать экзамен, проспав всю подготовку накануне.", isTrue: false, explanation: "Миф! Знания требуют внимания и подготовки." },
    { text: "Каждый студент группы может стать успешным IT-специалистом.", isTrue: true, explanation: "Чистая правда при должном усердии!" }
];

let currentMythIndex = 0;

function loadMyth() {
    const myth = myths[currentMythIndex];
    document.getElementById('mythStatement').innerText = myth.text;
    document.getElementById('mythExplanation').innerText = "";
    document.getElementById('mythButtons').style.display = "flex";
}

function checkMyth(userAnswer) {
    const myth = myths[currentMythIndex];
    const expDiv = document.getElementById('mythExplanation');
    document.getElementById('mythButtons').style.display = "none";

    if (userAnswer === myth.isTrue) {
        expDiv.innerHTML = `✅ Верно! ${myth.explanation}`;
    } else {
        expDiv.innerHTML = `❌ Ошибка! ${myth.explanation}`;
    }

    setTimeout(() => {
        currentMythIndex = (currentMythIndex + 1) % myths.length;
        loadMyth();
    }, 3000);
}

loadMyth();
