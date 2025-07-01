// Topic module imports
import * as arithmetic from './topics/arithmetic.js';
import * as fractions from './topics/fractions.js';
import * as algebra from './topics/algebra.js';
import * as geometry from './topics/geometry.js';
import * as trigonometry from './topics/trigonometry.js';
import * as calculus from './topics/calculus.js';

const topics = {
    arithmetic,
    fractions,
    algebra,
    geometry,
    trigonometry,
    calculus
};

// Subtopic definitions for each topic
const subtopics = {
    arithmetic: [
        { value: 'addition', label: 'Addition' },
        { value: 'subtraction', label: 'Subtraction' },
        { value: 'multiplication', label: 'Multiplication' },
        { value: 'division', label: 'Division' }
    ],
    fractions: [
        { value: 'add', label: 'Add Fractions' },
        { value: 'subtract', label: 'Subtract Fractions' },
        { value: 'multiply', label: 'Multiply Fractions' },
        { value: 'divide', label: 'Divide Fractions' }
    ],
    algebra: [
        { value: 'linear', label: 'Linear Equations' },
        { value: 'exp', label: 'Expressions' }
    ],
    geometry: [
        { value: 'area', label: 'Area' },
        { value: 'perimeter', label: 'Perimeter' },
        { value: 'volume', label: 'Volume' }
    ],
    trigonometry: [
        { value: 'sine', label: 'Sine' },
        { value: 'cosine', label: 'Cosine' },
        { value: 'tangent', label: 'Tangent' }
    ],
    calculus: [
        { value: 'derivative', label: 'Derivatives' },
        { value: 'integral', label: 'Integrals' }
    ]
};

const topicSelect = document.getElementById('topic');
const subtopicSelect = document.getElementById('subtopic');
const teachingDiv = document.getElementById('teaching');
const questionDiv = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit');
const feedbackDiv = document.getElementById('feedback');
const nextBtn = document.getElementById('next');
const ageSelect = document.getElementById('age');
const inlineHelpBtn = document.getElementById('inline-help');
const progressDiv = document.getElementById('progress');
const resetBtn = document.getElementById('reset');
const emailParentBtn = document.getElementById('email-parent');
const helpDiv = document.getElementById('help-content');
const timerSelect = document.getElementById('timer');
const timerDisplay = document.getElementById('timer-display');

let currentTopic = topicSelect.value;
let currentSubtopic = null;
let currentQuestion = null;
let currentAnswer = null;
let currentAge = Number(ageSelect.value);
let timerInterval = null;
let timerValue = 5;
let timeLeft = 5;
let timerStarted = false;
let totalQuestions = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let parentEmail = '';
let helpVisible = false;

// Remove the JS that creates and inserts helpBtn and helpDiv dynamically, since all help UI is now in the HTML.
// Instead, just get references to the helpDiv and use it.

function populateSubtopics(topicKey) {
    subtopicSelect.innerHTML = '';
    subtopics[topicKey].forEach(st => {
        const opt = document.createElement('option');
        opt.value = st.value;
        opt.textContent = st.label;
        subtopicSelect.appendChild(opt);
    });
    currentSubtopic = subtopicSelect.value;
}

function loadTopic(topicKey, subtopicKey) {
    const topic = topics[topicKey];
    teachingDiv.innerHTML = topic[`teach${capitalize(topicKey)}`](subtopicKey);
    generateQuestion(topicKey, subtopicKey);
    feedbackDiv.textContent = '';
    answerInput.value = '';
    nextBtn.style.display = 'none';
    submitBtn.disabled = false;
    resetHelp();
}

function updateProgress() {
    progressDiv.textContent = `Questions answered: ${totalQuestions} | Correct: ${correctAnswers}`;
    if (correctAnswers >= 50) {
        emailParentBtn.style.display = 'block';
    } else {
        emailParentBtn.style.display = 'none';
    }
}

function resetProgress() {
    totalQuestions = 0;
    correctAnswers = 0;
    updateProgress();
}

resetBtn.addEventListener('click', () => {
    resetProgress();
    generateQuestion(currentTopic, currentSubtopic);
    feedbackDiv.textContent = '';
    nextBtn.style.display = 'none';
    submitBtn.disabled = false;
    answerInput.value = '';
    answerInput.focus();
});

emailParentBtn.addEventListener('click', () => {
    if (!parentEmail) {
        parentEmail = prompt('Enter your parent\'s email address:');
    }
    if (parentEmail) {
        window.location.href = `mailto:${parentEmail}?subject=I%20got%2050%20maths%20questions%20right!&body=Hi%20Parent!%20I%20answered%2050%20maths%20questions%20correctly%20on%20the%20Kids%20Maths%20Learning%20App!`;
    }
});

ageSelect.addEventListener('change', (e) => {
    currentAge = Number(e.target.value);
    generateQuestion(currentTopic, currentSubtopic);
});

function generateQuestion(topicKey, subtopicKey) {
    const topic = topics[topicKey];
    const { question, answer } = topic[`generate${capitalize(topicKey)}Question`](subtopicKey, currentAge);
    currentQuestion = question;
    currentAnswer = answer;
    questionDiv.textContent = question;
    answerInput.value = '';
    feedbackDiv.textContent = '';
    resetHelp();
    updateProgress();
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim();
    if (userAnswer === '') {
        feedbackDiv.textContent = 'Please enter an answer!';
        return;
    }
    const topic = topics[currentTopic];
    const isCorrect = topic[`check${capitalize(currentTopic)}Answer`](userAnswer, currentAnswer);
    totalQuestions++;
    if (isCorrect) {
        correctAnswers++;
        feedbackDiv.textContent = '✅ Correct!';
        feedbackDiv.style.color = 'green';
        nextBtn.style.display = 'block';
        submitBtn.disabled = true;
        resetHelp();
    } else {
        feedbackDiv.textContent = `❌ Incorrect. Try again!`;
        feedbackDiv.style.color = 'red';
        inlineHelpBtn.style.display = 'block';
    }
    updateProgress();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

inlineHelpBtn.addEventListener('click', () => {
    if (helpVisible) {
        hideHelp();
        helpVisible = false;
    } else {
        showHelp(currentTopic, currentQuestion, currentAnswer);
        helpVisible = true;
    }
});

function showHelp(topicKey, question, answer) {
    const topic = topics[topicKey];
    if (typeof topic[`help${capitalize(topicKey)}`] === 'function') {
        // Prefer a step-by-step help if available
        if (typeof topic[`help${capitalize(topicKey)}Step`] === 'function') {
            helpDiv.innerHTML = topic[`help${capitalize(topicKey)}Step`](currentSubtopic, question, answer);
        } else {
            helpDiv.innerHTML = topic[`help${capitalize(topicKey)}`](currentSubtopic, question, answer);
        }
    } else {
        helpDiv.innerHTML = '<em>No extra help available for this topic yet.</em>';
    }
    helpDiv.style.display = 'block';
}

function hideHelp() {
    helpDiv.style.display = 'none';
}

// Hide help on topic/question change or correct answer
function resetHelp() {
    hideHelp();
    helpVisible = false;
}

topicSelect.addEventListener('change', (e) => {
    currentTopic = e.target.value;
    populateSubtopics(currentTopic);
    currentSubtopic = subtopicSelect.value;
    loadTopic(currentTopic, currentSubtopic);
});

subtopicSelect.addEventListener('change', (e) => {
    currentSubtopic = e.target.value;
    loadTopic(currentTopic, currentSubtopic);
});

const tutorialBtn = document.createElement('button');
tutorialBtn.id = 'view-tutorial';
tutorialBtn.textContent = 'View Tutorial';
tutorialBtn.style.marginBottom = '16px';
subtopicSelect.parentNode.insertBefore(tutorialBtn, subtopicSelect.nextSibling);

tutorialBtn.addEventListener('click', () => {
    const topicKey = topicSelect.value;
    const subtopicKey = subtopicSelect.value;
    let fileSubtopic = subtopicKey;
    // Compose file name
    const tutorialFile = `${topicKey}-${fileSubtopic}.html`;
    window.location.href = `tutorials/${tutorialFile}`;
});

// Timer functionality
// Update timer value when user changes selection
timerSelect.addEventListener('change', () => {
    timerValue = parseInt(timerSelect.value, 10);
});

// Start timer for each question
function startTimer(correctAnswer) {
    clearInterval(timerInterval);
    timeLeft = timerValue;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout(correctAnswer);
        }
    }, 1000);
}

// Handle timeout
function handleTimeout(correctAnswer) {
    feedbackDiv.textContent = `⏰ Time's up! The correct answer was: ${correctAnswer}`;
    incorrectAnswers++;
    totalQuestions++;
    updateProgress();
    nextBtn.style.display = 'block';
    submitBtn.disabled = true;
    answerInput.disabled = true;
}

// Listen for first input to start timer
answerInput.addEventListener('input', function onFirstInput() {
    if (!timerStarted && answerInput.value.trim() !== '') {
        timerStarted = true;
        if (currentQuestion && typeof currentQuestion.answer !== 'undefined') {
            startTimer(currentQuestion.answer);
        }
    }
});

// When showing a new question, reset timer state
function showQuestion(questionObj) {
    currentQuestion = questionObj;
    answerInput.value = '';
    feedbackDiv.textContent = '';
    submitBtn.disabled = false;
    answerInput.disabled = false;
    nextBtn.style.display = 'none';
    timerDisplay.textContent = '';
    timerStarted = false;
    clearInterval(timerInterval);
}

// On submit, check answer and move on
submitBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerStarted = false;
    const userAnswer = answerInput.value.trim();
    const correctAnswer = currentAnswer; // <-- FIXED
    totalQuestions++;
    if (userAnswer === correctAnswer.toString()) {
        feedbackDiv.textContent = '✅ Correct!';
        correctAnswers++;
    } else {
        feedbackDiv.textContent = `❌ Incorrect! The correct answer was: ${correctAnswer}`;
        incorrectAnswers++;
    }
    updateProgress();
    nextBtn.style.display = 'block';
    submitBtn.disabled = true;
    answerInput.disabled = true;
});

// On next, load next question (replace with your logic)
nextBtn.addEventListener('click', () => {
    generateQuestion(currentTopic, currentSubtopic);
    nextBtn.style.display = 'none';
    submitBtn.disabled = false;
    answerInput.disabled = false;
    answerInput.value = '';
    answerInput.focus();
    timerDisplay.textContent = '';
    timerStarted = false;
    clearInterval(timerInterval);
});

// On reset, clear tallies and progress
document.getElementById('reset').addEventListener('click', () => {
    totalQuestions = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    updateProgress();
    clearInterval(timerInterval);
    timerDisplay.textContent = '';
    // ...existing reset logic...
});

// Initial load
populateSubtopics(currentTopic);
loadTopic(currentTopic, currentSubtopic);
updateProgress();