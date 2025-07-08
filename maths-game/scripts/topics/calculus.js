// Calculus (Ages 16–18)
export function teachCalculus(subtopic) {
    switch(subtopic) {
        case 'derivative':
            return '<b>Derivatives</b>: Show how things change. The derivative of x² is 2x.';
        case 'integral':
            return '<b>Integrals</b>: Find the area under a curve.';
        default:
            return 'Choose a subtopic to learn more.';
    }
}

export function generateCalculusQuestion(subtopic) {
    let question, answer;
    switch(subtopic) {
        case 'derivative':
            question = 'What is the derivative of x² with respect to x?';
            answer = '2x';
            break;
        case 'integral':
            question = 'What is the integral of 2x with respect to x?';
            answer = 'x^2 + C';
            break;
        default:
            question = 'Select a subtopic.';
            answer = '';
    }
    return { question, answer };
}

export function checkCalculusAnswer(userAnswer, correctAnswer) {
    return userAnswer.replace(/\s/g, '') === correctAnswer.replace(/\s/g, '');
}

export function helpCalculus(subtopic, question, answer) {
    switch(subtopic) {
        case 'derivative':
            return `<b>Derivatives Help:</b><br>
            <ul>
                <li>The derivative of xⁿ is n·xⁿ⁻¹.</li>
                <li>Example: d/dx x² = 2x</li>
                <li>Practice: d/dx x³ = 3x²</li>
            </ul>`;
        case 'integral':
            return `<b>Integrals Help:</b><br>
            <ul>
                <li>The integral of xⁿ is xⁿ⁺¹/(n+1) + C.</li>
                <li>Example: ∫2x dx = x² + C</li>
                <li>Practice: ∫3x² dx = x³ + C</li>
            </ul>`;
        default:
            return 'Choose a subtopic for help.';
    }
}

export function helpCalculusStep(subtopic, question, answer) {
    let steps = '';
    switch(subtopic) {
        case 'derivative':
            steps = `<b>How to solve:</b><br>
            1. The derivative of x² with respect to x is found using the rule: d/dx xⁿ = n·xⁿ⁻¹.<br>
            2. Here, n = 2, so d/dx x² = 2·x¹ = <b>2x</b>.<br>
            <b>Answer:</b> 2x`;
            break;
        case 'integral':
            steps = `<b>How to solve:</b><br>
            1. The integral of 2x with respect to x is found using the rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C.<br>
            2. Here, n = 1, so ∫2x dx = 2 × x²/2 = x².<br>
            3. Add the constant of integration: <b>x² + C</b>.<br>
            <b>Answer:</b> x² + C`;
            break;
        default:
            steps = 'No step-by-step help for this subtopic.';
    }
    return steps;
}
