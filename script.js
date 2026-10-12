// Список 24 студентов группы SCA-25A
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
const teamScores = loadSavedTeamScores();
const teamNames = ["Команда 1", "Команда 2", "Команда 3", "Команда 4"];
function changeTeamScore(teamIndex, delta) {
    teamScores[teamIndex] = Math.max(0, teamScores[teamIndex] + delta);
    document.getElementById("teamScore" + teamIndex).textContent = teamScores[teamIndex];
    saveTeamScores();
}
function resetTeamScores() {
    teamScores.fill(0);
    teamScores.forEach((score, i) => document.getElementById("teamScore" + i).textContent = score);
    saveTeamScores();
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
// Секретные миссии — без фотографий, с командными и весёлыми заданиями
const missions = [
    { emoji: "🤝", category: "Командная работа", text: "За 30 секунд придумайте девиз SCA-25A и произнесите его всей группой." },
    { emoji: "🧠", category: "Смекалка", text: "Назовите по очереди 5 способов использовать обычную скрепку — кроме её прямого назначения." },
    { emoji: "💻", category: "IT-челлендж", text: "Объясните слово «алгоритм» так, чтобы понял ученик начальной школы." },
    { emoji: "🎭", category: "Пантомима", text: "Без слов изобразите компьютер, который завис. Группа должна угадать." },
    { emoji: "⚡", category: "Блиц", text: "За 15 секунд назовите 7 профессий, связанных с IT." },
    { emoji: "🌟", category: "Позитив", text: "Назовите три сильные стороны вашей группы и приведите один пример." },
    { emoji: "🔐", category: "Кибербезопасность", text: "Придумайте пример надёжной парольной фразы и объясните, почему она хорошая. Не используйте личные пароли." },
    { emoji: "🎬", category: "Креатив", text: "Придумайте название фильма о жизни SCA-25A и коротко представьте его." },
    { emoji: "🧩", category: "Логика", text: "Составьте пошаговый алгоритм приготовления чая так, чтобы робот смог его выполнить." },
    { emoji: "🎤", category: "Самопрезентация", text: "За 20 секунд расскажите, какой навык вы хотите освоить до конца учебного года." },
    { emoji: "🕵️", category: "Детектив", text: "Выберите ведущего: он показывает эмоцию без слов, а команда угадывает её за 3 попытки." },
    { emoji: "🚀", category: "Будущее", text: "Представьте, что прошло 5 лет. Каждый участник команды называет одну свою будущую победу." },
    { emoji: "🎨", category: "Дизайн", text: "За 30 секунд придумайте логотип группы жестами или быстрым наброском на доске." },
    { emoji: "🔄", category: "Объясни иначе", text: "Объясните понятие «интернет» без слов «сеть», «сайт» и «компьютер»." },
    { emoji: "👏", category: "Поддержка", text: "Поблагодарите одногруппника за конкретное хорошее качество или поступок." },
    { emoji: "🏗️", category: "Инженеры", text: "За минуту спроектируйте башню из доступных в аудитории безопасных предметов. Ничего не ломайте." },
    { emoji: "📱", category: "Цифровая жизнь", text: "Назовите 3 привычки, которые помогают не отвлекаться на телефон во время учёбы." },
    { emoji: "🎯", category: "Общая цель", text: "Вся команда за 20 секунд должна договориться об одной цели на этот семестр." },
    { emoji: "🗣️", category: "Словесная игра", text: "Каждый участник добавляет по одному слову, чтобы вместе сочинить историю про программиста." },
    { emoji: "🏆", category: "Финальный вызов", text: "За 30 секунд убедите кураторскую комиссию, почему именно ваша команда заслуживает победу." }
];
let remainingMissions = missions.map((_, i) => i);
let currentMission = null;
let completedMissions = 0;
function updateMissionProgress() {
    document.getElementById("missionProgress").textContent = "Выполнено: " + completedMissions + " / " + missions.length;
}
function drawMission() {
    if (remainingMissions.length === 0) {
        document.getElementById("missionEmoji").textContent = "🏆";
        document.getElementById("missionCategory").textContent = "Все миссии выполнены!";
        document.getElementById("missionText").textContent = "SCA-25A справилась со всеми заданиями! Нажмите «Начать заново», чтобы сыграть ещё раз.";
        document.getElementById("missionDoneBtn").disabled = true;
        currentMission = null;
        return;
    }
    const pick = Math.floor(Math.random() * remainingMissions.length);
    currentMission = remainingMissions.splice(pick, 1)[0];
    const mission = missions[currentMission];
    document.getElementById("missionEmoji").textContent = mission.emoji;
    document.getElementById("missionCategory").textContent = mission.category;
    document.getElementById("missionText").textContent = mission.text;
    document.getElementById("missionFeedback").textContent = "";
    document.getElementById("missionDoneBtn").disabled = false;
}
function completeMission() {
    if (currentMission === null) return;
    completedMissions++;
    currentMission = null;
    document.getElementById("missionDoneBtn").disabled = true;
    document.getElementById("missionFeedback").textContent = "✅ Отлично! Миссия засчитана. Готовы к следующей?";
    updateMissionProgress();
    if (remainingMissions.length === 0) {
        document.getElementById("missionEmoji").textContent = "🏆";
        document.getElementById("missionCategory").textContent = "Все миссии выполнены!";
        document.getElementById("missionText").textContent = "Поздравляем! Вы прошли все секретные миссии.";
    }
}
function resetMissions() {
    remainingMissions = missions.map((_, i) => i);
    currentMission = null;
    completedMissions = 0;
    document.getElementById("missionEmoji").textContent = "🕵️";
    document.getElementById("missionCategory").textContent = "Ваша миссия ждёт";
    document.getElementById("missionText").textContent = "Нажмите «Получить миссию», чтобы открыть первое задание.";
    document.getElementById("missionFeedback").textContent = "";
    document.getElementById("missionDoneBtn").disabled = true;
    updateMissionProgress();
}
updateMissionProgress();

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


/* Поле чудес: общеобразовательные слова и факты */
const fieldQuestions = [
 { category:"География", clue:"Самая большая по площади страна мира.", answer:"РОССИЯ" },
 { category:"Биология", clue:"Орган, который перекачивает кровь по телу.", answer:"СЕРДЦЕ" },
 { category:"Космос", clue:"Звезда, вокруг которой вращается Земля.", answer:"СОЛНЦЕ" },
 { category:"История", clue:"Древняя цивилизация, построившая пирамиды в Гизе.", answer:"ЕГИПЕТ" },
 { category:"Литература", clue:"Автор романа «Война и мир». Фамилия.", answer:"ТОЛСТОЙ" },
 { category:"Наука", clue:"Прибор для наблюдения за далёкими космическими объектами.", answer:"ТЕЛЕСКОП" },
 { category:"Математика", clue:"Фигура с тремя сторонами.", answer:"ТРЕУГОЛЬНИК" },
 { category:"Кыргызстан", clue:"Столица Кыргызской Республики.", answer:"БИШКЕК" },
 { category:"Химия", clue:"Как называется химический элемент с символом O?", answer:"КИСЛОРОД" },
 { category:"География", clue:"Самый большой океан Земли.", answer:"ТИХИЙ ОКЕАН" },
 { category:"Искусство", clue:"Человек, который создаёт картины.", answer:"ХУДОЖНИК" },
 { category:"Информатика", clue:"Набор команд для решения задачи.", answer:"АЛГОРИТМ" },
 { category:"Биология", clue:"Зелёный пигмент, помогающий растениям поглощать свет.", answer:"ХЛОРОФИЛЛ" },
 { category:"Астрономия", clue:"Естественный спутник Земли.", answer:"ЛУНА" },
 { category:"Язык", clue:"Слово, противоположное по значению другому слову.", answer:"АНТОНИМ" },
 { category:"Физика", clue:"Единица измерения силы в системе СИ.", answer:"НЬЮТОН" },
 { category:"История науки", clue:"Учёный, сформулировавший закон всемирного тяготения. Фамилия.", answer:"НЬЮТОН" },
 { category:"География", clue:"Континент, на котором находится Кыргызстан.", answer:"АЗИЯ" },
 { category:"Технологии", clue:"Устройство, которое обрабатывает данные и выполняет программы.", answer:"КОМПЬЮТЕР" },
 { category:"Экология", clue:"Наука о взаимоотношениях живых организмов и окружающей среды.", answer:"ЭКОЛОГИЯ" },
 { category:"Математика", clue:"Результат сложения.", answer:"СУММА" },
 { category:"Литература", clue:"Краткий поучительный рассказ с нравственным выводом.", answer:"БАСНЯ" },
 { category:"География", clue:"Высокая форма рельефа с вершиной и склонами.", answer:"ГОРА" },
 { category:"Информатика", clue:"Основной язык разметки веб-страниц.", answer:"HTML" }
];
const fieldAlphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
const fieldPrizes = [
 {label:"10 очков", points:10},{label:"20 очков",points:20},{label:"БАНКРОТ",bankrupt:true},
 {label:"50 очков",points:50},{label:"ПРИЗ +50",gift:true},{label:"15 очков",points:15},
 {label:"ПЕРЕХОД ХОДА",skip:true},{label:"30 очков",points:30}
];
let fieldDeck = [], fieldCurrent = null, fieldGuessed = new Set(), fieldScore = 0, fieldRound = 0, fieldSolved = false;
let fieldDrumRotation = 0, fieldDrumBusy = false, fieldCurrentPrize = null;
function startFieldGame() {
 fieldDeck = fieldQuestions.map((_, i) => i).sort(() => Math.random() - 0.5);
 fieldScore = 0; fieldRound = 0; fieldDrumRotation = 0;
 document.getElementById("fieldScore").textContent = fieldScore;
 document.getElementById("fieldPrize").textContent = "Барабан готов к вращению!";
 document.getElementById("fieldDrum").style.transform = "rotate(0deg)";
 nextFieldRound();
}
function nextFieldRound() {
 if (!fieldDeck.length) fieldDeck = fieldQuestions.map((_, i) => i).sort(() => Math.random() - 0.5);
 fieldCurrent = fieldQuestions[fieldDeck.pop()];
 fieldGuessed = new Set(); fieldSolved = false; fieldCurrentPrize = null; fieldRound++;
 document.getElementById("fieldCategory").textContent = fieldCurrent.category;
 document.getElementById("fieldRound").textContent = "Раунд " + fieldRound;
 document.getElementById("fieldClue").textContent = fieldCurrent.clue;
 document.getElementById("fieldFeedback").textContent = "Сначала крутите барабан!";
 document.getElementById("fieldPrize").textContent = "Ваш приз?";
 document.getElementById("spinFieldDrumBtn").disabled = false;
 renderFieldWord(); renderFieldLetters();
}
function spinFieldDrum() {
 if (!fieldCurrent || fieldSolved || fieldDrumBusy || fieldCurrentPrize) {
  if (!fieldCurrent) document.getElementById("fieldFeedback").textContent = "Сначала нажмите «Начать игру».";
  return;
 }
 fieldDrumBusy = true;
 document.getElementById("spinFieldDrumBtn").disabled = true;
 const index = Math.floor(Math.random() * fieldPrizes.length);
 fieldCurrentPrize = fieldPrizes[index];
 const segment = 360 / fieldPrizes.length;
 const desiredAngle = (360 - (index * segment + segment / 2) + 360) % 360;
 const currentAngle = ((fieldDrumRotation % 360) + 360) % 360;
 const alignment = (desiredAngle - currentAngle + 360) % 360;
 const target = 360 * (5 + Math.floor(Math.random() * 3)) + alignment;
 fieldDrumRotation += target;
 document.getElementById("fieldDrum").style.transform = "rotate(" + fieldDrumRotation + "deg)";
 document.getElementById("fieldPrize").textContent = "Барабан вращается…";
 renderFieldLetters();
 window.setTimeout(() => {
  fieldDrumBusy = false;
  const prize = fieldCurrentPrize;
  document.getElementById("fieldPrize").textContent = "🎯 " + prize.label;
  if (prize.bankrupt) {
   fieldScore = 0;
   document.getElementById("fieldFeedback").textContent = "💥 Банкрот! Очки обнуляются. Выберите букву для продолжения.";
  } else if (prize.gift) {
   fieldScore += 50;
   document.getElementById("fieldFeedback").textContent = "🎁 Приз! +50 бонусных очков. Теперь выберите букву.";
  } else if (prize.skip) {
   fieldCurrentPrize = null;
   document.getElementById("fieldFeedback").textContent = "⏭️ Переход хода! Крутите барабан снова.";
   document.getElementById("spinFieldDrumBtn").disabled = false;
  } else {
   document.getElementById("fieldFeedback").textContent = "Выигрыш: " + prize.points + " очков за каждое найденное в слове вхождение буквы.";
  }
  document.getElementById("fieldScore").textContent = fieldScore;
  renderFieldLetters();
 }, 4100);
}
function renderFieldWord() {
 if (!fieldCurrent) return;
 document.getElementById("fieldWord").innerHTML = Array.from(fieldCurrent.answer).map(ch => {
  if (ch === " ") return '<span class="field-letter space"></span>';
  return '<span class="field-letter">' + (fieldGuessed.has(ch) || fieldSolved ? ch : "_") + '</span>';
 }).join("");
}
function renderFieldLetters() {
 const canGuess = !!fieldCurrentPrize && !fieldDrumBusy && !fieldSolved;
 document.getElementById("fieldLetters").innerHTML = fieldAlphabet.map(ch =>
  '<button class="option-btn" ' + (fieldGuessed.has(ch) || !canGuess ? 'disabled' : '') + ' onclick="guessFieldLetter(&quot;' + ch + '&quot;)">' + ch + '</button>'
 ).join("");
}
function guessFieldLetter(letter) {
 if (!fieldCurrent || fieldSolved || fieldGuessed.has(letter) || !fieldCurrentPrize || fieldDrumBusy) return;
 fieldGuessed.add(letter);
 const hits = Array.from(fieldCurrent.answer).filter(ch => ch === letter).length;
 const prize = fieldCurrentPrize;
 if (hits) {
  const points = prize.points || 0;
  fieldScore += hits * points;
  document.getElementById("fieldFeedback").textContent = "✅ Есть такая буква! +" + (hits * points) + " очков.";
 } else {
  document.getElementById("fieldFeedback").textContent = "❌ Такой буквы нет. Следующий ход — снова барабан.";
 }
 const letters = Array.from(fieldCurrent.answer).filter(ch => ch !== " ");
 if (letters.every(ch => fieldGuessed.has(ch))) {
  fieldSolved = true; fieldScore += 30;
  document.getElementById("fieldFeedback").textContent = "🎉 Верно! Слово: " + fieldCurrent.answer + ". Бонус +30 очков!";
 }
 fieldCurrentPrize = null;
 document.getElementById("fieldScore").textContent = fieldScore;
 document.getElementById("spinFieldDrumBtn").disabled = fieldSolved;
 renderFieldWord(); renderFieldLetters();
}
function revealFieldAnswer() {
 if (!fieldCurrent || fieldSolved) return;
 fieldSolved = true; fieldCurrentPrize = null; renderFieldWord(); renderFieldLetters();
 document.getElementById("spinFieldDrumBtn").disabled = true;
 document.getElementById("fieldFeedback").textContent = "Ответ: " + fieldCurrent.answer + ". Нажмите «Следующее слово», чтобы продолжить.";
}


// Новые режимы: Jeopardy, Escape Room и общий сохраняемый рейтинг.
const SCA_SCORE_KEY = "sca25a_saved_team_scores_v1";
function loadSavedTeamScores() {
    try {
        const saved = JSON.parse(localStorage.getItem("sca25a_saved_team_scores_v1") || "null");
        return Array.isArray(saved) && saved.length === 4
            ? saved.map(value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0)
            : [0, 0, 0, 0];
    } catch (error) { return [0, 0, 0, 0]; }
}
function saveTeamScores() {
    try { localStorage.setItem(SCA_SCORE_KEY, JSON.stringify(teamScores)); }
    catch (error) { console.warn("Не удалось сохранить рейтинг в этом браузере.", error); }
    renderOverallLeaderboard();
}
function renderOverallLeaderboard() {
    const root = document.getElementById("overallLeaderboard");
    if (!root) return;
    const ordered = teamScores.map((score, index) => ({name: teamNames[index], score, index}))
        .sort((a, b) => b.score - a.score);
    root.innerHTML = ordered.map((team, place) =>
        '<div class="leaderboard-row"><span>' + ["🥇","🥈","🥉","🎖️"][place] + " " + team.name +
        '</span><strong>' + team.score + " балл(ов)</strong></div>"
    ).join("");
    const leader = document.getElementById("rankingLeader");
    if (leader) leader.textContent = ordered[0].score > 0 ? ordered[0].name + " — " + ordered[0].score + " балл(ов)" : "Баллы ещё не начислены";
    for (let i = 0; i < teamScores.length; i++) {
        const scoreNode = document.getElementById("teamScore" + i);
        if (scoreNode) scoreNode.textContent = teamScores[i];
    }
}
function resetAllScores() {
    if (!confirm("Сбросить все баллы команд? Это действие нельзя отменить.")) return;
    teamScores.fill(0);
    saveTeamScores();
    document.getElementById("rankingFeedback").textContent = "Все баллы сброшены.";
}
function exportRankingCSV() {
    const rows = [["Место","Команда","Баллы"], ...teamScores
        .map((score, index) => ({score, name:teamNames[index]}))
        .sort((a,b) => b.score-a.score)
        .map((team,index) => [index+1,team.name,team.score])];
    const csv = "\uFEFF" + rows.map(row => row.map(value => '"' + String(value).replace(/"/g,'""') + '"').join(";")).join("\r\n");
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "SCA-25A-obshchiy-reyting.csv";
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}

const jeopardyQuestions = [
    {category:"IT и компьютеры",points:100,q:"Как расшифровывается HTML?",a:"HyperText Markup Language — язык разметки гипертекста."},
    {category:"IT и компьютеры",points:200,q:"Какое устройство обычно называют «мозгом» компьютера?",a:"Центральный процессор (CPU)."},
    {category:"IT и компьютеры",points:300,q:"Что хранит данные даже после выключения питания: RAM или SSD?",a:"SSD (или другой накопитель)."},
    {category:"IT и компьютеры",points:400,q:"Как называется ошибка в программе?",a:"Баг (bug)."},
    {category:"Логика",points:100,q:"Сколько месяцев в году имеют 28 дней?",a:"Все 12 месяцев."},
    {category:"Логика",points:200,q:"Продолжите ряд: 2, 4, 8, 16, ...",a:"32 — каждое число умножается на 2."},
    {category:"Логика",points:300,q:"У двух отцов и двух сыновей три яблока. Каждому досталось по одному. Как?",a:"Это дедушка, отец и сын — всего три человека."},
    {category:"Логика",points:400,q:"Что становится больше, если его перевернуть вверх ногами: 6 или 9?",a:"6 превращается в 9."},
    {category:"Колледж и учёба",points:100,q:"Как называется человек, который помогает группе в организационных и воспитательных вопросах?",a:"Куратор."},
    {category:"Колледж и учёба",points:200,q:"Как называется заранее установленный срок сдачи задания?",a:"Дедлайн."},
    {category:"Колледж и учёба",points:300,q:"Назовите одно полезное правило командной работы.",a:"Например: распределять роли, слушать друг друга и соблюдать договорённости."},
    {category:"Колледж и учёба",points:400,q:"Какой документ или портфолио помогает показать навыки работодателю онлайн?",a:"Например, профиль LinkedIn или портфолио проектов."},
    {category:"Общие знания",points:100,q:"Как называется столица Кыргызстана?",a:"Бишкек."},
    {category:"Общие знания",points:200,q:"Сколько градусов в прямом угле?",a:"90 градусов."},
    {category:"Общие знания",points:300,q:"Как называется наука о живых организмах?",a:"Биология."},
    {category:"Общие знания",points:400,q:"Какой газ растения поглощают при фотосинтезе?",a:"Углекислый газ (CO₂)."}
];
let jeopardyUsed = new Set();
let currentJeopardyQuestion = null;
let jeopardyAnswerVisible = false;
function renderJeopardyBoard() {
    const board = document.getElementById("jeopardyBoard");
    if (!board) return;
    const categories = [...new Set(jeopardyQuestions.map(item => item.category))];
    board.innerHTML = categories.map(category => '<div class="jeopardy-category">' + category + '</div>').join("");
    for (let row = 0; row < 4; row++) {
        categories.forEach(category => {
            const item = jeopardyQuestions.find(q => q.category === category && q.points === (row+1)*100);
            const index = jeopardyQuestions.indexOf(item);
            const button = document.createElement("button");
            button.className = "jeopardy-cell";
            button.textContent = item.points;
            button.disabled = jeopardyUsed.has(index);
            button.setAttribute("aria-label", category + ", " + item.points + " баллов");
            button.addEventListener("click", () => selectJeopardyQuestion(index));
            board.appendChild(button);
        });
    }
}
function selectJeopardyQuestion(index) {
    if (jeopardyUsed.has(index)) return;
    currentJeopardyQuestion = index;
    jeopardyAnswerVisible = false;
    const item = jeopardyQuestions[index];
    document.getElementById("jeopardyQuestionCard").innerHTML =
        '<h3>' + item.category + ' · ' + item.points + ' баллов</h3><p>' + item.q + '</p><p id="jeopardyAnswerText" class="small-note">Ответ пока скрыт.</p>';
}
function revealJeopardyAnswer() {
    if (currentJeopardyQuestion === null) {
        document.getElementById("jeopardyQuestionCard").innerHTML = "<h3>Сначала выберите вопрос</h3><p>Нажмите на ячейку с баллами на игровом поле.</p>";
        return;
    }
    const item = jeopardyQuestions[currentJeopardyQuestion];
    const answer = document.getElementById("jeopardyAnswerText");
    if (answer) { answer.textContent = "Ответ: " + item.a; answer.classList.remove("small-note"); }
    jeopardyAnswerVisible = true;
}
function scoreJeopardyAnswer(correct) {
    if (currentJeopardyQuestion === null) {
        document.getElementById("jeopardyQuestionCard").innerHTML = "<h3>Выберите вопрос</h3><p>Сначала выберите ячейку на игровом поле.</p>";
        return;
    }
    const index = currentJeopardyQuestion;
    const item = jeopardyQuestions[index];
    if (correct && !jeopardyAnswerVisible) {
        document.getElementById("jeopardyQuestionCard").innerHTML = "<h3>Сначала откройте ответ</h3><p>Нажмите «Показать ответ», чтобы ведущий мог проверить ответ команды.</p>";
        return;
    }
    jeopardyUsed.add(index);
    if (correct) {
        const teamIndex = Number(document.getElementById("jeopardyTeam").value);
        teamScores[teamIndex] += item.points;
        saveTeamScores();
        document.getElementById("jeopardyQuestionCard").innerHTML = "<h3>✅ +" + item.points + " баллов: " + teamNames[teamIndex] + "</h3><p>Баллы добавлены в общий рейтинг.</p>";
    } else {
        document.getElementById("jeopardyQuestionCard").innerHTML = "<h3>Вопрос завершён</h3><p>Баллы не начислены. Выберите следующий вопрос.</p>";
    }
    currentJeopardyQuestion = null;
    jeopardyAnswerVisible = false;
    renderJeopardyBoard();
}

const escapeRiddles = [
    {q:"Какой язык разметки веб-страниц состоит из четырёх букв?", answers:["html"], digit:"2", hint:"HTML"},
    {q:"Как называется устройство, которое указывает на экран и обычно управляется рукой?", answers:["мышь","компьютерная мышь"], digit:"5", hint:"Мышь"},
    {q:"Сколько сторон у шестиугольника?", answers:["6","шесть"], digit:"8", hint:"Шесть"},
    {q:"Как называется секретная комбинация для входа в аккаунт?", answers:["пароль"], digit:"4", hint:"Пароль"}
];
let escapeStep = 0;
let escapeUnlocked = false;
function normalizeRiddleAnswer(value) {
    return value.toLocaleLowerCase("ru-RU").trim().replace(/ё/g,"е").replace(/[.,!?;:]/g,"").replace(/\s+/g," ");
}
function checkEscapeAnswer() {
    if (escapeUnlocked) return;
    const input = document.getElementById("escapeAnswer");
    const value = normalizeRiddleAnswer(input.value);
    const riddle = escapeRiddles[escapeStep];
    if (!value) { document.getElementById("escapeFeedback").textContent = "Введите ответ, прежде чем проверять."; return; }
    if (riddle.answers.includes(value)) {
        const digits = escapeRiddles.slice(0, escapeStep+1).map(item => item.digit);
        document.getElementById("safeDisplay").textContent = digits.join(" ") + (digits.length < 4 ? " _ ".repeat(4-digits.length).trim() : "");
        document.getElementById("escapeFeedback").textContent = "✅ Верно! Цифра " + riddle.digit + " открыта.";
        escapeStep++;
        input.value = "";
        if (escapeStep >= escapeRiddles.length) {
            document.getElementById("escapeRiddle").textContent = "Все загадки решены! Введите четыре цифры в поле кода.";
            document.getElementById("escapeProgress").textContent = "Все 4 загадки решены";
            document.getElementById("escapeStatus").textContent = "Код найден. Осталось открыть сейф.";
        } else {
            document.getElementById("escapeRiddle").textContent = escapeRiddles[escapeStep].q;
            document.getElementById("escapeProgress").textContent = "Загадка " + (escapeStep+1) + " из 4";
        }
    } else {
        document.getElementById("escapeFeedback").textContent = "❌ Не совсем. Попробуйте ещё раз или обсудите загадку с командой.";
    }
}
function openVirtualSafe() {
    if (escapeUnlocked) return;
    const code = document.getElementById("safeCode").value.trim();
    if (escapeStep < escapeRiddles.length) {
        document.getElementById("escapeStatus").textContent = "Сначала решите все четыре загадки.";
        return;
    }
    if (code !== escapeRiddles.map(item => item.digit).join("")) {
        document.getElementById("escapeStatus").textContent = "Код неверный. Проверьте открытые цифры.";
        return;
    }
    escapeUnlocked = true;
    const teamIndex = Number(document.getElementById("escapeTeam").value);
    teamScores[teamIndex] += 100;
    saveTeamScores();
    document.getElementById("safeStatus").textContent = "🔓 Сейф открыт! +100 баллов команде " + teamNames[teamIndex] + ".";
    document.getElementById("safeDisplay").textContent = code.split("").join(" ");
    document.getElementById("safeReward").hidden = false;
    document.getElementById("safeCode").disabled = true;
    document.getElementById("escapeFeedback").textContent = "🎉 Победа! Баллы внесены в общий рейтинг.";
}
function resetEscapeRoom() {
    escapeStep = 0; escapeUnlocked = false;
    document.getElementById("safeDisplay").textContent = "_ _ _ _";
    document.getElementById("safeStatus").textContent = "Сейф закрыт. Начните с первой загадки.";
    document.getElementById("escapeProgress").textContent = "Загадка 1 из 4";
    document.getElementById("escapeRiddle").textContent = escapeRiddles[0].q;
    document.getElementById("escapeAnswer").value = "";
    document.getElementById("escapeAnswer").disabled = false;
    document.getElementById("safeCode").value = "";
    document.getElementById("safeCode").disabled = false;
    document.getElementById("escapeFeedback").textContent = "";
    document.getElementById("safeReward").hidden = true;
}
document.getElementById("escapeAnswer").addEventListener("keydown", event => { if (event.key === "Enter") checkEscapeAnswer(); });
renderJeopardyBoard();
renderOverallLeaderboard();
teamScores.forEach((score, index) => {
    const node = document.getElementById("teamScore" + index);
    if (node) node.textContent = score;
});


// Математическая дуэль: два студента решают один пример у смарт-панели.
const mathQuestionSets = {
 beginner: [
  {q:"18 + 27 = ?",a:"45"},{q:"64 − 29 = ?",a:"35"},{q:"7 × 8 = ?",a:"56"},{q:"144 ÷ 12 = ?",a:"12"},
  {q:"15% от 200 = ?",a:"30"},{q:"3x = 21. x = ?",a:"7"},{q:"2² + 5 = ?",a:"9"},{q:"Периметр квадрата со стороной 6 см?",a:"24"},
  {q:"0,5 + 0,25 = ?",a:"0.75"},{q:"x + 17 = 40. x = ?",a:"23"},{q:"9 × 9 = ?",a:"81"},{q:"1/2 от 86 = ?",a:"43"}
 ],
 hard: [
  {q:"Решите: 3(2x − 4) = 30. x = ?",a:"7"},{q:"√196 = ?",a:"14"},{q:"2⁵ × 2² = ?",a:"128"},{q:"Если x² = 81 и x > 0, найдите x.",a:"9"},
  {q:"Решите: 5x + 7 = 3x + 25. x = ?",a:"9"},{q:"25% от 360 = ?",a:"90"},{q:"Упростите: (3/4) ÷ (1/2). Ответ дробью или десятичным числом.",a:"1.5"},
  {q:"Площадь круга радиуса 3: используйте π ≈ 3,14. Ответ округлите до сотых.",a:"28.26"},{q:"Решите систему: x + y = 10, x − y = 2. Найдите x.",a:"6"},
  {q:"Найдите 15² − 9².",a:"144"},{q:"Если 2x + 3 = 17, чему равно 3x?",a:"21"},{q:"Среднее арифметическое чисел 8, 12, 16 и 24?",a:"15"}
 ]
};
let mathRoundScores=[0,0], mathCurrentQuestion=null, mathAnswered={left:false,right:false}, mathQuestionNumber=0, mathDuelActive=false, mathPendingPoints=[0,0], mathDuelUsed={beginner:[],hard:[]};
function normalizeMathAnswer(value) { return String(value).trim().replace(/,/g,".").replace(/\s+/g,"").replace(/−/g,"-"); }
function selectedMathTeam(side) { return Number(document.getElementById(side==="left"?"mathTeamLeft":"mathTeamRight").value); }
function updateMathDuelDisplay() {
 const left=selectedMathTeam("left"), right=selectedMathTeam("right");
 document.getElementById("mathLeftTeamLabel").textContent=["🔵 Команда 1","🟣 Команда 2","🟢 Команда 3","🟠 Команда 4"][left];
 document.getElementById("mathRightTeamLabel").textContent=["🔵 Команда 1","🟣 Команда 2","🟢 Команда 3","🟠 Команда 4"][right];
 document.getElementById("mathLeftPlayerTitle").textContent="👤 Студент: "+["Команда 1","Команда 2","Команда 3","Команда 4"][left];
 document.getElementById("mathRightPlayerTitle").textContent="👤 Студент: "+["Команда 1","Команда 2","Команда 3","Команда 4"][right];
 document.getElementById("mathLeftRoundScore").textContent=mathRoundScores[0];
 document.getElementById("mathRightRoundScore").textContent=mathRoundScores[1];
 const offset=Math.max(-42,Math.min(42,(mathRoundScores[0]-mathRoundScores[1])*8));
 document.getElementById("tugRope").style.left=(50+offset)+"%";
}
function startMathDuel() {
 mathRoundScores=[0,0]; mathPendingPoints=[0,0]; mathQuestionNumber=0; mathDuelActive=true;
 mathDuelUsed[document.getElementById("mathDifficulty").value]=[];
 document.getElementById("startMathDuelBtn").textContent="Начать заново";
 updateMathDuelDisplay(); nextMathQuestion();
}
function nextMathQuestion() {
 if(!mathDuelActive) {
  document.getElementById("mathFeedback").textContent="Сначала нажмите «Начать дуэль».";
  return;
 }
 const level=document.getElementById("mathDifficulty").value, bank=mathQuestionSets[level];
 let available=bank.map((_,i)=>i).filter(i=>!mathDuelUsed[level].includes(i));
 if(!available.length) { finishMathDuel(); return; }
 const index=available[Math.floor(Math.random()*available.length)];
 mathDuelUsed[level].push(index); mathCurrentQuestion=bank[index]; mathAnswered={left:false,right:false}; mathQuestionNumber++;
 document.getElementById("mathRoundLabel").textContent="Раунд "+mathQuestionNumber+" · "+(level==="beginner"?"Для новичков":"Сложный уровень");
 document.getElementById("mathQuestion").textContent=mathCurrentQuestion.q;
 document.getElementById("mathFeedback").textContent="Оба участника решают один и тот же пример. Ответьте до перехода к следующему.";
 ["left","right"].forEach(side=>{
  document.getElementById(side==="left"?"math"+ "LeftAnswer":"mathRightAnswer").value="";
  document.getElementById(side==="left"?"mathLeftAnswer":"mathRightAnswer").disabled=false;
  document.getElementById(side==="left"?"mathLeftStatus":"mathRightStatus").textContent="Готов к решению";
  document.querySelector(".player-"+side+" .btn").disabled=false;
 });
}
function submitMathAnswer(side) {
 if(!mathDuelActive||!mathCurrentQuestion||mathAnswered[side]) return;
 const input=document.getElementById(side==="left"?"mathLeftAnswer":"mathRightAnswer");
 const status=document.getElementById(side==="left"?"mathLeftStatus":"mathRightStatus");
 const correct=normalizeMathAnswer(input.value)===normalizeMathAnswer(mathCurrentQuestion.a);
 mathAnswered[side]=true;
 document.querySelector(".player-"+side+" .btn").disabled=true;
 input.disabled=true;
 if(correct) { mathRoundScores[side==="left"?0:1]++; mathPendingPoints[side==="left"?0:1]++; status.textContent="✅ Правильно! +1"; }
 else status.textContent="❌ Ответ: "+mathCurrentQuestion.a;
 updateMathDuelDisplay();
 if(mathAnswered.left&&mathAnswered.right) document.getElementById("mathFeedback").textContent="Раунд завершён. Нажмите «Следующий пример» для продолжения.";
}
function finishMathDuel() {
 mathDuelActive=false;
 const left=selectedMathTeam("left"), right=selectedMathTeam("right");
 teamScores[left]+=mathPendingPoints[0];
 if(right!==left) teamScores[right]+=mathPendingPoints[1];
 else teamScores[left]+=mathPendingPoints[1];
 saveTeamScores();
 let result=mathRoundScores[0]===mathRoundScores[1]?"Ничья!":(mathRoundScores[0]>mathRoundScores[1]?"Победила левая сторона!":"Победила правая сторона!");
 document.getElementById("mathQuestion").textContent="Дуэль завершена";
 document.getElementById("mathFeedback").textContent=result+" Результаты добавлены в общий рейтинг.";
 document.getElementById("startMathDuelBtn").textContent="Играть ещё раз";
}
function resetMathDuel() {
 mathDuelActive=false; mathCurrentQuestion=null; mathRoundScores=[0,0]; mathPendingPoints=[0,0]; mathQuestionNumber=0; mathAnswered={left:false,right:false};
 document.getElementById("mathQuestion").textContent="Нажмите «Начать дуэль», чтобы получить пример.";
 document.getElementById("mathRoundLabel").textContent="Раунд 0";
 document.getElementById("mathFeedback").textContent="Раунд сброшен. Нажмите «Начать дуэль», чтобы начать заново.";
 ["mathLeftAnswer","mathRightAnswer"].forEach(id=>{document.getElementById(id).value="";document.getElementById(id).disabled=false;});
 ["mathLeftStatus","mathRightStatus"].forEach(id=>document.getElementById(id).textContent="Готов к решению");
 document.querySelectorAll(".math-player .btn").forEach(button=>button.disabled=false);
 updateMathDuelDisplay();
}
document.getElementById("mathTeamLeft").addEventListener("change",updateMathDuelDisplay);
document.getElementById("mathTeamRight").addEventListener("change",updateMathDuelDisplay);
document.getElementById("mathLeftAnswer").addEventListener("keydown",event=>{if(event.key==="Enter")submitMathAnswer("left");});
document.getElementById("mathRightAnswer").addEventListener("keydown",event=>{if(event.key==="Enter")submitMathAnswer("right");});
updateMathDuelDisplay();
