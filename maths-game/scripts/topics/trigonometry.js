// Trigonometry (Ages 14–18)
export function teachTrigonometry(subtopic) {
    switch(subtopic) {
        case 'sine':
            return '<b>Sine (sin)</b>: sin(θ) = opposite / hypotenuse in a right triangle.';
        case 'cosine':
            return '<b>Cosine (cos)</b>: cos(θ) = adjacent / hypotenuse.';
        case 'tangent':
            return '<b>Tangent (tan)</b>: tan(θ) = opposite / adjacent.';
        default:
            return 'Choose a subtopic to learn more.';
    }
}

export function generateTrigonometryQuestion(subtopic) {
    const angles = [30, 45, 60, 90];
    const angle = angles[Math.floor(Math.random() * angles.length)];
    let question, answer;
    switch(subtopic) {
        case 'sine':
            question = `What is sin(${angle}°)? (2 decimal places)`;
            answer = Number(Math.sin(angle * Math.PI / 180).toFixed(2));
            break;
        case 'cosine':
            question = `What is cos(${angle}°)? (2 decimal places)`;
            answer = Number(Math.cos(angle * Math.PI / 180).toFixed(2));
            break;
        case 'tangent':
            question = `What is tan(${angle}°)? (2 decimal places)`;
            answer = Number(Math.tan(angle * Math.PI / 180).toFixed(2));
            break;
        default:
            question = 'Select a subtopic.';
            answer = '';
    }
    return { question, answer };
}

export function checkTrigonometryAnswer(userAnswer, correctAnswer) {
    return Math.abs(Number(userAnswer) - correctAnswer) < 0.01;
}

export function helpTrigonometry(subtopic, question, answer) {
    switch(subtopic) {
        case 'sine':
            return `<b>Sine Help:</b><br>
            <ul>
                <li>sin(θ) = opposite / hypotenuse in a right triangle.</li>
                <li>Example: sin(30°) = 0.5</li>
                <li>Practice: sin(90°) = 1</li>
            </ul>`;
        case 'cosine':
            return `<b>Cosine Help:</b><br>
            <ul>
                <li>cos(θ) = adjacent / hypotenuse.</li>
                <li>Example: cos(60°) = 0.5</li>
                <li>Practice: cos(0°) = 1</li>
            </ul>`;
        case 'tangent':
            return `<b>Tangent Help:</b><br>
            <ul>
                <li>tan(θ) = opposite / adjacent.</li>
                <li>Example: tan(45°) = 1</li>
                <li>Practice: tan(0°) = 0</li>
            </ul>`;
        default:
            return 'Choose a subtopic for help.';
    }
}

export function helpTrigonometryStep(subtopic, question, answer) {
    let steps = '';
    const match = question.match(/(sin|cos|tan)\((\d+)°\)/);
    if (!match) return 'No step-by-step help available.';
    const func = match[1];
    const angle = Number(match[2]);
    switch(subtopic) {
        case 'sine':
            steps = `<b>How to solve:</b><br>
            1. Use the sine formula: sin(θ).<br>
            2. θ = ${angle}°.<br>
            3. sin(${angle}°) = ${Math.sin(angle * Math.PI / 180).toFixed(2)}.<br>
            <b>Answer:</b> ${Math.sin(angle * Math.PI / 180).toFixed(2)}`;
            break;
        case 'cosine':
            steps = `<b>How to solve:</b><br>
            1. Use the cosine formula: cos(θ).<br>
            2. θ = ${angle}°.<br>
            3. cos(${angle}°) = ${Math.cos(angle * Math.PI / 180).toFixed(2)}.<br>
            <b>Answer:</b> ${Math.cos(angle * Math.PI / 180).toFixed(2)}`;
            break;
        case 'tangent':
            steps = `<b>How to solve:</b><br>
            1. Use the tangent formula: tan(θ).<br>
            2. θ = ${angle}°.<br>
            3. tan(${angle}°) = ${Math.tan(angle * Math.PI / 180).toFixed(2)}.<br>
            <b>Answer:</b> ${Math.tan(angle * Math.PI / 180).toFixed(2)}`;
            break;
        default:
            steps = 'No step-by-step help for this subtopic.';
    }
    return steps;
}
