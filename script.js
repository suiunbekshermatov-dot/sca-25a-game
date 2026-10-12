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
let fieldDeck = [], fieldCurrent = null, fieldGuessed = new Set(), fieldScore = 0, fieldRound = 0, fieldSolved = false;
function startFieldGame() {
 fieldDeck = fieldQuestions.map((_, i) => i).sort(() => Math.random() - 0.5);
 fieldScore = 0; fieldRound = 0;
 document.getElementById("fieldScore").textContent = fieldScore;
 nextFieldRound();
}
function nextFieldRound() {
 if (!fieldDeck.length) fieldDeck = fieldQuestions.map((_, i) => i).sort(() => Math.random() - 0.5);
 fieldCurrent = fieldQuestions[fieldDeck.pop()];
 fieldGuessed = new Set(); fieldSolved = false; fieldRound++;
 document.getElementById("fieldCategory").textContent = fieldCurrent.category;
 document.getElementById("fieldRound").textContent = "Раунд " + fieldRound;
 document.getElementById("fieldClue").textContent = fieldCurrent.clue;
 document.getElementById("fieldFeedback").textContent = "Выберите букву!";
 renderFieldWord(); renderFieldLetters();
}
function renderFieldWord() {
 if (!fieldCurrent) return;
 document.getElementById("fieldWord").innerHTML = Array.from(fieldCurrent.answer).map(ch => {
  if (ch === " ") return '<span class="field-letter space"></span>';
  return '<span class="field-letter">' + (fieldGuessed.has(ch) || fieldSolved ? ch : "_") + '</span>';
 }).join("");
}
function renderFieldLetters() {
 document.getElementById("fieldLetters").innerHTML = fieldAlphabet.map(ch =>
  '<button class="option-btn" ' + (fieldGuessed.has(ch) || fieldSolved ? 'disabled' : '') + ' onclick="guessFieldLetter(\'' + ch + '\')">' + ch + '</button>'
 ).join("");
}
function guessFieldLetter(letter) {
 if (!fieldCurrent || fieldSolved || fieldGuessed.has(letter)) return;
 fieldGuessed.add(letter);
 const hits = Array.from(fieldCurrent.answer).filter(ch => ch === letter).length;
 if (hits) {
  fieldScore += hits * 10;
  document.getElementById("fieldFeedback").textContent = "✅ Есть такая буква! +" + (hits * 10) + " очков.";
 } else {
  document.getElementById("fieldFeedback").textContent = "❌ Такой буквы нет. Попробуйте другую.";
 }
 const letters = Array.from(fieldCurrent.answer).filter(ch => ch !== " ");
 if (letters.every(ch => fieldGuessed.has(ch))) {
  fieldSolved = true; fieldScore += 30;
  document.getElementById("fieldFeedback").textContent = "🎉 Верно! Слово: " + fieldCurrent.answer + ". Бонус +30 очков!";
 }
 document.getElementById("fieldScore").textContent = fieldScore;
 renderFieldWord(); renderFieldLetters();
}
function revealFieldAnswer() {
 if (!fieldCurrent || fieldSolved) return;
 fieldSolved = true; renderFieldWord(); renderFieldLetters();
 document.getElementById("fieldFeedback").textContent = "Ответ: " + fieldCurrent.answer + ". Нажмите «Следующее слово», чтобы продолжить.";
}
