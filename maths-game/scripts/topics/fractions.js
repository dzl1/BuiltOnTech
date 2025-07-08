// Fractions (Ages 9–12)
export function teachFractions(subtopic) {
    switch(subtopic) {
        case 'add':
            return '<b>Adding Fractions</b>: Make denominators the same, then add numerators. Example: 1/4 + 1/4 = 2/4 = 1/2.';
        case 'subtract':
            return '<b>Subtracting Fractions</b>: Make denominators the same, then subtract numerators. Example: 3/4 - 1/4 = 2/4 = 1/2.';
        case 'multiply':
            return '<b>Multiplying Fractions</b>: Multiply numerators and denominators. Example: 1/2 × 2/3 = 2/6 = 1/3.';
        case 'divide':
            return '<b>Dividing Fractions</b>: Flip the second fraction and multiply. Example: 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2.';
        default:
            return 'Choose a subtopic to learn more.';
    }
}

export function generateFractionsQuestion(subtopic) {
    const a = Math.ceil(Math.random() * 9);
    const b = Math.ceil(Math.random() * 9);
    const c = Math.ceil(Math.random() * 9);
    const d = Math.ceil(Math.random() * 9);
    let question, answer;
    switch(subtopic) {
        case 'add':
            question = `${a}/${b} + ${c}/${d} = ? (decimal)`;
            answer = Number((a / b + c / d).toFixed(2));
            break;
        case 'subtract':
            question = `${a}/${b} - ${c}/${d} = ? (decimal)`;
            answer = Number((a / b - c / d).toFixed(2));
            break;
        case 'multiply':
            question = `${a}/${b} × ${c}/${d} = ? (decimal)`;
            answer = Number(((a / b) * (c / d)).toFixed(2));
            break;
        case 'divide':
            question = `${a}/${b} ÷ ${c}/${d} = ? (decimal)`;
            answer = Number(((a / b) / (c / d)).toFixed(2));
            break;
        default:
            question = 'Select a subtopic.';
            answer = '';
    }
    return { question, answer };
}

export function checkFractionsAnswer(userAnswer, correctAnswer) {
    return Math.abs(Number(userAnswer) - correctAnswer) < 0.01;
}

export function helpFractions(subtopic, question, answer) {
    switch(subtopic) {
        case 'add':
            return `<b>Adding Fractions Help:</b><br>
            <ul>
                <li>Find a common denominator (bottom number).</li>
                <li>Add the numerators (top numbers).</li>
                <li>Example: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2.</li>
                <li>Practice: 2/5 + 1/5 = 3/5</li>
            </ul>`;
        case 'subtract':
            return `<b>Subtracting Fractions Help:</b><br>
            <ul>
                <li>Find a common denominator.</li>
                <li>Subtract the numerators.</li>
                <li>Example: 3/4 - 1/4 = 2/4 = 1/2.</li>
                <li>Practice: 5/6 - 1/6 = 4/6 = 2/3</li>
            </ul>`;
        case 'multiply':
            return `<b>Multiplying Fractions Help:</b><br>
            <ul>
                <li>Multiply the numerators and denominators.</li>
                <li>Example: 2/3 × 3/4 = 6/12 = 1/2.</li>
                <li>Practice: 1/2 × 1/2 = 1/4</li>
            </ul>`;
        case 'divide':
            return `<b>Dividing Fractions Help:</b><br>
            <ul>
                <li>Flip the second fraction and multiply.</li>
                <li>Example: 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2.</li>
                <li>Practice: 2/3 ÷ 1/3 = 2/3 × 3/1 = 6/3 = 2</li>
            </ul>`;
        default:
            return 'Choose a subtopic for help.';
    }
}

export function helpFractionsStep(subtopic, question, answer) {
    // Parse numbers from the question string
    const match = question.match(/(\d+)\/(\d+)\s*([+\-×÷])\s*(\d+)\/(\d+)/);
    if (!match) return 'No step-by-step help available.';
    const a = Number(match[1]), b = Number(match[2]), op = match[3], c = Number(match[4]), d = Number(match[5]);
    let steps = '';
    function gcd(x, y) { return y === 0 ? x : gcd(y, x % y); }
    function lcm(x, y) { return (x * y) / gcd(x, y); }
    switch(subtopic) {
        case 'add': {
            const common = lcm(b, d);
            const a1 = a * (common / b);
            const c1 = c * (common / d);
            const sum = a1 + c1;
            steps = `<b>How to solve:</b><br>
            1. Find common denominator: LCM(${b}, ${d}) = ${common}.<br>
            2. Convert: ${a}/${b} = ${a1}/${common}, ${c}/${d} = ${c1}/${common}.<br>
            3. Add numerators: ${a1} + ${c1} = ${sum}.<br>
            4. Result: ${sum}/${common} = ${(a / b + c / d).toFixed(2)} (decimal).<br>
            <b>Answer:</b> ${(a / b + c / d).toFixed(2)}`;
            break;
        }
        case 'subtract': {
            const common = lcm(b, d);
            const a1 = a * (common / b);
            const c1 = c * (common / d);
            const diff = a1 - c1;
            steps = `<b>How to solve:</b><br>
            1. Find common denominator: LCM(${b}, ${d}) = ${common}.<br>
            2. Convert: ${a}/${b} = ${a1}/${common}, ${c}/${d} = ${c1}/${common}.<br>
            3. Subtract numerators: ${a1} - ${c1} = ${diff}.<br>
            4. Result: ${diff}/${common} = ${(a / b - c / d).toFixed(2)} (decimal).<br>
            <b>Answer:</b> ${(a / b - c / d).toFixed(2)}`;
            break;
        }
        case 'multiply': {
            const num = a * c;
            const den = b * d;
            steps = `<b>How to solve:</b><br>
            1. Multiply numerators: ${a} × ${c} = ${num}.<br>
            2. Multiply denominators: ${b} × ${d} = ${den}.<br>
            3. Result: ${num}/${den} = ${(a / b * c / d).toFixed(2)} (decimal).<br>
            <b>Answer:</b> ${(a / b * c / d).toFixed(2)}`;
            break;
        }
        case 'divide': {
            const num = a * d;
            const den = b * c;
            steps = `<b>How to solve:</b><br>
            1. Flip the second fraction: ${c}/${d} → ${d}/${c}.<br>
            2. Multiply: ${a}/${b} × ${d}/${c}.<br>
            3. Multiply numerators: ${a} × ${d} = ${num}.<br>
            4. Multiply denominators: ${b} × ${c} = ${den}.<br>
            5. Result: ${num}/${den} = ${(a / b / (c / d)).toFixed(2)} (decimal).<br>
            <b>Answer:</b> ${(a / b / (c / d)).toFixed(2)}`;
            break;
        }
        default:
            steps = 'No step-by-step help for this subtopic.';
    }
    return steps;
}
