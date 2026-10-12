// Список всех 25 студентов группы SCA-25A с их уникальными фотографиями
const students = [
    { name: "Asema Abdykaiymova", photo: "images/1.JPG" },
    { name: "Omurbek Abykov", photo: "images/2.JPG" },
    { name: "Nurislam Adylov", photo: "images/3.JPG" },
    { name: "Baiyel Akylbaev", photo: "images/4.JPG" },
    { name: "Aiturgan Akylbekova", photo: "images/5.JPG" },
    { name: "Iskander Almazov", photo: "images/6.JPG" },
    { name: "Erzhan Aralbaev", photo: "images/7.JPG" },
    { name: "Nursultan Bakinov", photo: "images/8.JPG" },
    { name: "Islam Chokonov", photo: "images/9.JPG" },
    { name: "Atai Erkinov", photo: "images/10.JPG" },
    { name: "Altynai Isabekova", photo: "images/11.JPG" },
    { name: "Kutman Kairatov", photo: "images/12.JPG" },
    { name: "Islam Kaiypkulov", photo: "images/13.JPG" },
    { name: "Nuran Kydyrov", photo: "images/14.JPG" },
    { name: "Nagima Malikova", photo: "images/15.JPG" },
    { name: "Shamil Mamedov", photo: "images/16.JPG" },
    { name: "Radiya Muratova", photo: "images/17.JPG" },
    { name: "Erbol Muslimov", photo: "images/18.JPG" },
    { name: "Amanbek Niyazov", photo: "images/19.JPG" },
    { name: "Mirat Sagynaliev", photo: "images/20.JPG" },
    { name: "Mirbek Salizhanov", photo: "images/21.JPG" },
    { name: "Aidana Satkynova", photo: "images/22.JPG" },
    { name: "Niyaz Zhenishev", photo: "images/23.JPG" },
    { name: "Almaz Zhusubaliev", photo: "images/24.JPG" }
];

// Переключение вкладок
function switchTab(tabId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    const activeButton = Array.from(document.querySelectorAll('.nav-btn')).find(btn => btn.getAttribute('onclick') && btn.getAttribute('onclick').includes("'" + tabId + "'"));
    if (activeButton) activeButton.classList.add('active');
    if (tabId === 'guess' && !guessCurrent) nextGuess();
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


// ================= Дополнительные игры SCA-25A =================
const teamScores = [0, 0, 0, 0];
const teamNames = ["Команда 1", "Команда 2", "Команда 3", "Команда 4"];
function changeTeamScore(teamIndex, delta) {
    teamScores[teamIndex] = Math.max(0, teamScores[teamIndex] + delta);
    document.getElementById("teamScore" + teamIndex).textContent = teamScores[teamIndex];
}
function resetTeamScores() {
    teamScores.fill(0);
    teamScores.forEach((score, i) => document.getElementById("teamScore" + i).textContent = score);
}
const challenges = [
    { emoji: "🧠", text: "Решите логическую загадку за 30 секунд." },
    { emoji: "💻", text: "Назовите три языка программирования за 10 секунд." },
    { emoji: "🤝", text: "Назовите два качества хорошего командного игрока." },
    { emoji: "🔐", text: "Объясните, как придумать надёжный пароль." },
    { emoji: "⚡", text: "Назовите три устройства ввода компьютера." },
    { emoji: "🎤", text: "За 20 секунд расскажите, почему вам интересна IT-сфера." },
    { emoji: "🧩", text: "Придумайте алгоритм для приготовления чая." },
    { emoji: "🌟", text: "Скажите комплимент своей группе." },
    { emoji: "🔎", text: "Объясните разницу между hardware и software." },
    { emoji: "🎨", text: "Назовите три правила хорошего дизайна интерфейса." }
];
let lastChallenge = -1;
function spinChallenge() {
    let index = Math.floor(Math.random() * challenges.length);
    if (challenges.length > 1 && index === lastChallenge) index = (index + 1) % challenges.length;
    lastChallenge = index;
    document.getElementById("challengeEmoji").textContent = challenges[index].emoji;
    document.getElementById("challengeText").textContent = challenges[index].text;
}
let guessCurrent = null;
let guessPoints = 0;
function nextGuess() {
    if (students.length < 2) return;
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    guessCurrent = shuffled[0];
    document.getElementById("guessPhoto").src = guessCurrent.photo;
    document.getElementById("guessPhoto").alt = "Угадайте, кто на фото";
    document.getElementById("guessFeedback").textContent = "";
    const options = [guessCurrent, ...shuffled.slice(1, 4)].sort(() => Math.random() - 0.5);
    document.getElementById("guessOptions").innerHTML = options.map(student =>
        '<button class="option-btn" data-name="' + student.name.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;") + '">' + student.name + '</button>'
    ).join("");
    document.querySelectorAll("#guessOptions button").forEach(button => {
        button.addEventListener("click", () => answerGuess(button.dataset.name));
    });
}
function answerGuess(name) {
    if (!guessCurrent) return;
    document.querySelectorAll("#guessOptions button").forEach(button => button.disabled = true);
    if (name === guessCurrent.name) {
        guessPoints++;
        document.getElementById("guessFeedback").textContent = "✅ Верно! Это " + guessCurrent.name + ".";
    } else {
        document.getElementById("guessFeedback").textContent = "❌ Это " + guessCurrent.name + ". Попробуйте следующую фотографию.";
    }
    document.getElementById("guessScore").textContent = guessPoints;
    guessCurrent = null;
}
const itQuestions = [
    { q: "Что означает HTML?", options: ["Язык разметки гипертекста", "Язык программирования баз данных", "Операционная система", "Графический редактор"], a: 0 },
    { q: "Что из этого является языком программирования?", options: ["HTTP", "Python", "Wi-Fi", "JPEG"], a: 1 },
    { q: "Какой пароль надёжнее?", options: ["123456", "qwerty", "Длинная уникальная парольная фраза", "Дата рождения"], a: 2 },
    { q: "Что такое алгоритм?", options: ["Последовательность шагов для решения задачи", "Модель компьютера", "Тип монитора", "Формат изображения"], a: 0 },
    { q: "Что обычно делает функция в программе?", options: ["Группирует выполняемые действия", "Увеличивает яркость монитора", "Заменяет клавиатуру", "Удаляет интернет"], a: 0 },
    { q: "Какой из вариантов — устройство ввода?", options: ["Монитор", "Колонки", "Клавиатура", "Проектор"], a: 2 },
    { q: "Что такое phishing (фишинг)?", options: ["Способ обманом получить данные", "Резервное копирование", "Обновление экрана", "Сжатие видео"], a: 0 },
    { q: "Что означает CSS?", options: ["Cascading Style Sheets", "Computer Security Service", "Central System Software", "Code Syntax Server"], a: 0 }
];
let itIndex = 0, itPoints = 0, itTimeLeft = 20, itTimerId = null, itRoundActive = false;
function startITBattle() {
    clearInterval(itTimerId);
    itIndex = 0; itPoints = 0; itTimeLeft = 20; itRoundActive = true;
    document.getElementById("itScore").textContent = "0";
    document.getElementById("itFeedback").textContent = "";
    document.getElementById("startITBattle").textContent = "Начать заново";
    showITQuestion();
    updateITTimer();
    itTimerId = setInterval(() => {
        itTimeLeft--;
        updateITTimer();
        if (itTimeLeft <= 0) finishITBattle();
    }, 1000);
}
function updateITTimer() { document.getElementById("itTimer").textContent = itTimeLeft; }
function showITQuestion() {
    if (itIndex >= itQuestions.length) { finishITBattle(); return; }
    const q = itQuestions[itIndex];
    document.getElementById("itQuestion").textContent = (itIndex + 1) + ". " + q.q;
    document.getElementById("itOptions").innerHTML = q.options.map((option, i) =>
        '<button class="option-btn" onclick="answerIT(' + i + ')">' + option + '</button>'
    ).join("");
}
function answerIT(selected) {
    if (!itRoundActive) return;
    const q = itQuestions[itIndex];
    document.querySelectorAll("#itOptions button").forEach(button => button.disabled = true);
    if (selected === q.a) {
        itPoints++;
        document.getElementById("itFeedback").textContent = "✅ Правильно!";
    } else {
        document.getElementById("itFeedback").textContent = "❌ Верный ответ: " + q.options[q.a];
    }
    document.getElementById("itScore").textContent = itPoints;
    itIndex++;
    if (itIndex < itQuestions.length) setTimeout(() => { if (itRoundActive) showITQuestion(); }, 650);
    else finishITBattle();
}
function finishITBattle() {
    if (!itRoundActive) return;
    itRoundActive = false;
    clearInterval(itTimerId);
    document.getElementById("itQuestion").textContent = "IT-битва завершена!";
    document.getElementById("itOptions").innerHTML = "";
    document.getElementById("itFeedback").textContent = "Ваш результат: " + itPoints + " из " + itQuestions.length + ".";
    document.getElementById("startITBattle").textContent = "Играть ещё раз";
}
function showFinalResults() {
    const leaderboard = teamScores.map((score, i) => ({ name: teamNames[i], score }))
        .sort((a, b) => b.score - a.score);
    const maxScore = leaderboard[0].score;
    const winners = leaderboard.filter(team => team.score === maxScore);
    document.getElementById("finalWinner").textContent = maxScore === 0
        ? "Начните баттл и начислите баллы командам!"
        : (winners.length > 1 ? "Ничья между командами!" : "Победитель: " + winners[0].name + "!");
    document.getElementById("finalLeaderboard").innerHTML = leaderboard.map((team, index) =>
        '<div class="leaderboard-row"><span>' + (index + 1) + '. ' + team.name + '</span><strong>' + team.score + ' балл(ов)</strong></div>'
    ).join("");
}
