// Geometry (Ages 12–16)
export function teachGeometry(subtopic) {
    switch(subtopic) {
        case 'area':
            return '<b>Area</b>: The space inside a shape. For rectangles: Area = width × height.';
        case 'perimeter':
            return '<b>Perimeter</b>: The distance around a shape. For rectangles: Perimeter = 2 × (width + height).';
        case 'volume':
            return '<b>Volume</b>: The space inside a 3D object. For cubes: Volume = side × side × side.';
        default:
            return 'Choose a subtopic to learn more.';
    }
}

export function generateGeometryQuestion(subtopic) {
    let question, answer;
    switch(subtopic) {
        case 'area': {
            const w = Math.ceil(Math.random() * 20);
            const h = Math.ceil(Math.random() * 20);
            question = `What is the area of a rectangle with width ${w} and height ${h}?`;
            answer = w * h;
            break;
        }
        case 'perimeter': {
            const w = Math.ceil(Math.random() * 20);
            const h = Math.ceil(Math.random() * 20);
            question = `What is the perimeter of a rectangle with width ${w} and height ${h}?`;
            answer = 2 * (w + h);
            break;
        }
        case 'volume': {
            const s = Math.ceil(Math.random() * 10);
            question = `What is the volume of a cube with side ${s}?`;
            answer = s * s * s;
            break;
        }
        default:
            question = 'Select a subtopic.';
            answer = '';
    }
    return { question, answer };
}

export function checkGeometryAnswer(userAnswer, correctAnswer) {
    return Number(userAnswer) === correctAnswer;
}

export function helpGeometry(subtopic, question, answer) {
    switch(subtopic) {
        case 'area':
            return `<b>Area Help:</b><br>
            <ul>
                <li>Area = width × height for rectangles.</li>
                <li>Example: width 5, height 3 → 5 × 3 = 15.</li>
                <li>Practice: width 7, height 2 → 7 × 2 = 14</li>
            </ul>`;
        case 'perimeter':
            return `<b>Perimeter Help:</b><br>
            <ul>
                <li>Perimeter = 2 × (width + height) for rectangles.</li>
                <li>Example: width 4, height 6 → 2 × (4 + 6) = 20.</li>
                <li>Practice: width 3, height 8 → 2 × (3 + 8) = 22</li>
            </ul>`;
        case 'volume':
            return `<b>Volume Help:</b><br>
            <ul>
                <li>Volume = side × side × side for cubes.</li>
                <li>Example: side 3 → 3 × 3 × 3 = 27.</li>
                <li>Practice: side 5 → 5 × 5 × 5 = 125</li>
            </ul>`;
        default:
            return 'Choose a subtopic for help.';
    }
}

export function helpGeometryStep(subtopic, question, answer) {
    let steps = '';
    switch(subtopic) {
        case 'area': {
            const match = question.match(/width (\d+) and height (\d+)/);
            if (!match) return 'No step-by-step help available.';
            const w = Number(match[1]);
            const h = Number(match[2]);
            steps = `<b>How to solve:</b><br>
            1. Area = width × height.<br>
            2. Area = ${w} × ${h} = <b>${w * h}</b>.<br>
            <b>Answer:</b> ${w * h}`;
            break;
        }
        case 'perimeter': {
            const match = question.match(/width (\d+) and height (\d+)/);
            if (!match) return 'No step-by-step help available.';
            const w = Number(match[1]);
            const h = Number(match[2]);
            steps = `<b>How to solve:</b><br>
            1. Perimeter = 2 × (width + height).<br>
            2. Perimeter = 2 × (${w} + ${h}) = 2 × ${w + h} = <b>${2 * (w + h)}</b>.<br>
            <b>Answer:</b> ${2 * (w + h)}`;
            break;
        }
        case 'volume': {
            const match = question.match(/side (\d+)/);
            if (!match) return 'No step-by-step help available.';
            const s = Number(match[1]);
            steps = `<b>How to solve:</b><br>
            1. Volume = side × side × side.<br>
            2. Volume = ${s} × ${s} × ${s} = <b>${s * s * s}</b>.<br>
            <b>Answer:</b> ${s * s * s}`;
            break;
        }
        default:
            steps = 'No step-by-step help for this subtopic.';
    }
    return steps;
}
