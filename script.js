// Список студентов группы SCA-25A
const students = [
    { name: "Asema Abdykaiymova", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" },
    { name: "Omurbek Abykov", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
    { name: "Nurislam Adylov", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300" },
    { name: "Baiyel Akylbaev", photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300" },
    { name: "Aiturgan Akylbekova", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" },
    { name: "Iskander Almazov", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300" },
    { name: "Erzhan Aralbaev", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300" },
    { name: "Nursultan Bakinov", photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300" },
    { name: "Islam Chokonov", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300" },
    { name: "Aidarbek Erkinbekov", photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300" },
    { name: "Atai Erkinov", photo: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=300" },
    { name: "Altynai Isabekova", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300" },
    { name: "Kutman Kairatov", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" },
    { name: "Islam Kaiypkulov", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
    { name: "Nuran Kydyrov", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300" },
    { name: "Nagima Malikova", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" },
    { name: "Shamil Mamedov", photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300" },
    { name: "Radiya Muratova", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" },
    { name: "Erbol Muslimov", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300" },
    { name: "Amanbek Niyazov", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300" },
    { name: "Mirat Sagynaliev", photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300" },
    { name: "Mirbek Salizhanov", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300" },
    { name: "Aidana Satkynova", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300" },
    { name: "Niyaz Zhenishev", photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300" },
    { name: "Almaz Zhusubaliev", photo: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=300" }
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
            <img src="${randomStudent.photo}" class="winner-avatar" alt="">
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
        <img src="${st.photo}" alt="${st.name}">
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
