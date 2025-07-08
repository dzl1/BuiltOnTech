// Algebra (Ages 12–16)
export function teachAlgebra(subtopic) {
    switch(subtopic) {
        case 'linear':
            return '<b>Linear Equations</b>: Solve for x in equations like x + 5 = 12.';
        case 'exp':
            return '<b>Expressions</b>: Simplify or evaluate expressions like 2x + 3.';
        default:
            return 'Choose a subtopic to learn more.';
    }
}

export function generateAlgebraQuestion(subtopic) {
    let question, answer;
    switch(subtopic) {
        case 'linear': {
            const x = Math.floor(Math.random() * 20);
            const b = Math.floor(Math.random() * 20);
            question = `x + ${b} = ${x + b}. What is x?`;
            answer = x;
            break;
        }
        case 'exp': {
            const x = Math.floor(Math.random() * 10);
            question = `What is 2x + 3 when x = ${x}?`;
            answer = 2 * x + 3;
            break;
        }
        default:
            question = 'Select a subtopic.';
            answer = '';
    }
    return { question, answer };
}

export function checkAlgebraAnswer(userAnswer, correctAnswer) {
    return Number(userAnswer) === correctAnswer;
}

export function helpAlgebra(subtopic, question, answer) {
    switch(subtopic) {
        case 'linear':
            return `<b>Linear Equations Help:</b><br>
            <ul>
                <li>To solve x + b = c, subtract b from both sides: x = c - b.</li>
                <li>Example: x + 4 = 10 → x = 10 - 4 = 6.</li>
                <li>Practice: x + 7 = 15 → x = 8</li>
            </ul>`;
        case 'exp':
            return `<b>Expressions Help:</b><br>
            <ul>
                <li>Plug in the value of x and do the math.</li>
                <li>Example: 2x + 3, x = 4 → 2×4 + 3 = 8 + 3 = 11.</li>
                <li>Practice: 2x + 3, x = 2 → 2×2 + 3 = 7</li>
            </ul>`;
        default:
            return 'Choose a subtopic for help.';
    }
}

export function helpAlgebraStep(subtopic, question, answer) {
    let steps = '';
    switch(subtopic) {
        case 'linear': {
            // x + b = c. Extract b and c
            const match = question.match(/x \+ (\d+) = (\d+)/);
            if (!match) return 'No step-by-step help available.';
            const b = Number(match[1]);
            const c = Number(match[2]);
            steps = `<b>How to solve:</b><br>
            <ol>
                <li>Look at the equation: <b>x + ${b} = ${c}</b></li>
                <li>We want to find out what x is. x is a number that, when you add ${b}, gives you ${c}.</li>
                <li>To get x by itself, do the opposite of adding ${b}. The opposite is subtracting ${b}.</li>
                <li>So, subtract ${b} from both sides:<br>&nbsp;&nbsp;<b>x + ${b} - ${b} = ${c} - ${b}</b></li>
                <li>That means:<br>&nbsp;&nbsp;<b>x = ${c - b}</b></li>
            </ol>
            <b>Final Answer:</b> <span style='color:green;'>x = ${c - b}</span><br><br>
            <b>Extra Example:</b><br>
            <ul>
                <li>Suppose the question is: x + 3 = 10. To find x, subtract 3 from 10: x = 10 - 3 = 7.</li>
                <li>Try: x + 5 = 13. x = 13 - 5 = 8.</li>
            </ul>`;
            break;
        }
        case 'exp': {
            // What is 2x + 3 when x = n?
            const match = question.match(/x = (\d+)/);
            if (!match) return 'No step-by-step help available.';
            const x = Number(match[1]);
            steps = `<b>How to solve:</b><br>
            <ol>
                <li>We are given x = ${x}. The question is: What is 2x + 3?</li>
                <li>First, multiply x by 2: 2 × ${x} = ${2 * x}.</li>
                <li>Then, add 3: ${2 * x} + 3 = <b>${2 * x + 3}</b>.</li>
            </ol>
            <b>Final Answer:</b> <span style='color:green;'>${2 * x + 3}</span><br><br>
            <b>Extra Example:</b><br>
            <ul>
                <li>If x = 4, then 2x + 3 = 2 × 4 + 3 = 8 + 3 = 11.</li>
                <li>If x = 2, then 2x + 3 = 2 × 2 + 3 = 4 + 3 = 7.</li>
            </ul>`;
            break;
        }
        default:
            steps = 'No step-by-step help for this subtopic.';
    }
    return steps;
}
