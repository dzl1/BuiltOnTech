// Simple animation: bouncing ball
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let x = 50, y = 50, dx = 2, dy = 2, radius = 20;
    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#2a4d8f';
        ctx.fill();
        ctx.closePath();
        x += dx;
        y += dy;
        if(x + radius > canvas.width || x - radius < 0) dx = -dx;
        if(y + radius > canvas.height || y - radius < 0) dy = -dy;
        requestAnimationFrame(drawBall);
    }
    drawBall();
});
