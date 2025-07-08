// Arithmetic (Ages 9–11)
export function teachArithmetic(subtopic) {
    switch(subtopic) {
        case 'addition':
            return '<b>Addition</b> is combining two or more numbers to get a total. Example: 3 + 4 = 7.';
        case 'subtraction':
            return '<b>Subtraction</b> is taking one number away from another. Example: 9 - 5 = 4.';
        case 'multiplication':
            return '<b>Multiplication</b> is repeated addition. Example: 3 × 4 = 12.';
        case 'division':
            return '<b>Division</b> is splitting into equal parts. Example: 12 ÷ 3 = 4.';
        default:
            return 'Choose a subtopic to learn more.';
    }
}

// For real-world multiplication explanations
const objects = [
    'apples', 'oranges', 'bananas', 'books', 'cars', 'pencils', 'balls', 'stickers', 'marbles', 'coins',
    'flowers', 'chairs', 'tables', 'pens', 'notebooks', 'candies', 'toys', 'blocks', 'cups', 'plates',
    'bottles', 'shoes', 'socks', 'hats', 'shirts', 'pants', 'jackets', 'bags', 'boxes', 'crayons',
    'markers', 'erasers', 'rulers', 'backpacks', 'bikes', 'trains', 'planes', 'boats', 'kites', 'dolls',
    'robots', 'puzzles', 'games', 'cards', 'tickets', 'posters', 'photos', 'paintings', 'drawings', 'magazines',
    'comics', 'balloons', 'drums', 'guitars', 'pianos', 'violins', 'trumpets', 'flutes', 'drinks', 'snacks',
    'cookies', 'cakes', 'pies', 'muffins', 'cupcakes', 'ice creams', 'pizzas', 'burgers', 'fries', 'sandwiches',
    'eggs', 'sausages', 'meatballs', 'pancakes', 'waffles', 'cereal bowls', 'milk cartons', 'juice boxes', 'water bottles', 'scooters',
    'skateboards', 'helmets', 'gloves', 'scarves', 'umbrellas', 'keys', 'rings', 'bracelets', 'necklaces', 'watches',
    'tickets', 'passes', 'badges', 'medals', 'trophies', 'stars', 'moons', 'planets', 'rockets', 'spaceships'
];
function getRandomObject() {
    return objects[Math.floor(Math.random() * objects.length)];
}

export function generateArithmeticQuestion(subtopic, age = 9) {
    // Increase number range and complexity with age
    let min = 1, max = 50;
    if (age >= 12) max = 100;
    if (age >= 15) max = 500;
    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (max - min + 1)) + min;
    let question, answer;
    switch(subtopic) {
        case 'addition':
            if (age >= 15) {
                // 3-number addition for older kids
                let c = Math.floor(Math.random() * (max - min + 1)) + min;
                question = `${a} + ${b} + ${c} = ?`;
                answer = a + b + c;
            } else {
                question = `${a} + ${b} = ?`;
                answer = a + b;
            }
            break;
        case 'subtraction':
            if (b > a) [a, b] = [b, a];
            question = `${a} - ${b} = ?`;
            answer = a - b;
            break;
        case 'multiplication':
            if (age < 14) {
                a = Math.floor(Math.random() * 12) + 1;
                b = Math.floor(Math.random() * 12) + 1;
            } else if (age >= 14 && age < 15) {
                a = Math.floor(Math.random() * 50) + 1;
                b = Math.floor(Math.random() * 50) + 1;
            } else if (age >= 15) {
                a = Math.floor(Math.random() * 90) + 10;
                b = Math.floor(Math.random() * 90) + 10;
            }
            question = `${a} × ${b} = ?`;
            answer = a * b;
            break;
        case 'division':
            if (age >= 15) {
                // Integer division with remainder
                let product = a * b;
                question = `${product} ÷ ${a} = ?`;
                answer = (product / a).toFixed(2);
            } else {
                answer = (a / b).toFixed(2);
                question = `${a} ÷ ${b} = ? (2 decimal places)`;
            }
            break;
        default:
            question = 'Select a subtopic.';
            answer = '';
    }
    return { question, answer };
}

export function checkArithmeticAnswer(userAnswer, correctAnswer) {
    return Number(userAnswer) === Number(correctAnswer);
}

export function helpArithmetic(subtopic, question, answer) {
    switch(subtopic) {
        case 'addition':
            return `<b>Addition Help:</b><br>
            <ul>
                <li>To add, start with the first number and count up by the second.</li>
                <li>Example: 5 + 3 = 8. Start at 5, count up 3: 6, 7, 8.</li>
                <li>Try using your fingers or objects to help you add.</li>
                <li>Practice: 7 + 2 = 9, 10 + 5 = 15</li>
            </ul>`;
        case 'subtraction':
            return `<b>Subtraction Help:</b><br>
            <ul>
                <li>To subtract, start with the first number and count down by the second.</li>
                <li>Example: 9 - 4 = 5. Start at 9, count down 4: 8, 7, 6, 5.</li>
                <li>Use a number line or objects to help you see what is left.</li>
                <li>Practice: 8 - 3 = 5, 15 - 7 = 8</li>
            </ul>`;
        case 'multiplication':
            return `<b>Multiplication Help:</b><br>
            <ul>
                <li>Multiplication is repeated addition. 3 × 4 means 3 + 3 + 3 + 3 = 12.</li>
                <li>Use arrays or draw groups to visualize.</li>
                <li>Practice: 2 × 5 = 10, 6 × 3 = 18</li>
            </ul>`;
        case 'division':
            return `<b>Division Help:</b><br>
            <ul>
                <li>Division splits a number into equal parts. 12 ÷ 3 = 4 means 12 split into 3 groups is 4 in each.</li>
                <li>Draw circles and share objects equally to see how division works.</li>
                <li>Practice: 20 ÷ 4 = 5, 18 ÷ 3 = 6</li>
            </ul>`;
        default:
            return 'Choose a subtopic for help.';
    }
}

export function helpArithmeticStep(subtopic, question, answer, age = 9) {
    // Enhanced: handle 3-number addition, 2-digit multiplication, division with remainder
    let steps = '';
    if (subtopic === 'addition' && question.match(/\+/g)?.length === 2) {
        // 3-number addition
        const match = question.match(/(\d+) \+ (\d+) \+ (\d+)/);
        if (!match) return 'No step-by-step help available.';
        const a = Number(match[1]), b = Number(match[2]), c = Number(match[3]);
        steps = `<b>How to solve:</b><br>
        1. Add the first two numbers: ${a} + ${b} = ${a + b}.<br>
        2. Add the result to the third: ${a + b} + ${c} = <b>${a + b + c}</b>.<br>
        <b>Answer:</b> ${a + b + c}`;
    } else if (subtopic === 'multiplication' && question.match(/\d+ × \d+/)) {
        const match = question.match(/(\d+) × (\d+)/);
        if (!match) return 'No step-by-step help available.';
        const a = Number(match[1]), b = Number(match[2]);
        const obj = getRandomObject();
        let exampleList = '';
        for (let i = 0; i < 5; i++) {
            const exA = Math.floor(Math.random() * 12) + 1;
            const exB = Math.floor(Math.random() * 12) + 1;
            const exObj = getRandomObject();
            exampleList += `<li>If you have ${exA} ${exObj} in each group and ${exB} groups, you have ${exA} + ${exA} + ... (${exB} times) = ${exA * exB} ${exObj}.</li>`;
        }
        return `<b>How to solve:</b><br>
        <ol>
            <li>Imagine you have ${a} ${obj} in each group.</li>
            <li>You have ${b} groups.</li>
            <li>So, you have ${a} ${obj} + ${a} ${obj} + ... (${b} times).</li>
            <li>Total: ${a} × ${b} = <b>${a * b} ${obj}</b>.</li>
        </ol>
        <b>More Examples:</b><ul>${exampleList}</ul>`;
    } else if (subtopic === 'division' && question.match(/\d+ ÷ \d+/)) {
        const match = question.match(/(\d+) ÷ (\d+)/);
        if (!match) return 'No step-by-step help available.';
        const a = Number(match[1]), b = Number(match[2]);
        steps = `<b>How to solve:</b><br>
        1. Divide ${a} by ${b}: ${a} ÷ ${b} = <b>${(a / b).toFixed(2)}</b>.<br>
        <b>Answer:</b> ${(a / b).toFixed(2)}`;
        if (a % b !== 0) {
            steps += `<br>Remainder: ${a} ÷ ${b} = ${Math.floor(a/b)} remainder ${a % b}`;
        }
    } else {
        // Fallback to original logic
        const match = question.match(/(\d+)\s*([+\-×÷])\s*(\d+)/);
        if (!match) return 'No step-by-step help available.';
        const a = Number(match[1]);
        const op = match[2];
        const b = Number(match[3]);
        switch(subtopic) {
            case 'addition':
                steps = `<b>How to solve:</b><br>
                1. Start with ${a}.<br>
                2. Add ${b} to it: ${a} + ${b} = <b>${a + b}</b>.<br>
                <b>Answer:</b> ${a + b}`;
                break;
            case 'subtraction':
                steps = `<b>How to solve:</b><br>
                1. Start with ${a}.<br>
                2. Subtract ${b}: ${a} - ${b} = <b>${a - b}</b>.<br>
                <b>Answer:</b> ${a - b}`;
                break;
            case 'multiplication':
                steps = `<b>How to solve:</b><br>
                1. Multiply ${a} by ${b}: ${a} × ${b} = <b>${a * b}</b>.<br>
                <b>Answer:</b> ${a * b}`;
                break;
            case 'division':
                steps = `<b>How to solve:</b><br>
                1. Divide ${a} by ${b}: ${a} ÷ ${b} = <b>${(a / b).toFixed(2)}</b>.<br>
                <b>Answer:</b> ${(a / b).toFixed(2)}`;
                break;
            default:
                steps = 'No step-by-step help for this subtopic.';
        }
    }
    return steps;
}
