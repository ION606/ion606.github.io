document.addEventListener('DOMContentLoaded', (e) => {
    const canvas = document.getElementById('matrixCanvas');
    const context = canvas.getContext('2d');

    let columns;
    let drops;

    function setup() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.floor(canvas.width / fontSize);
        drops = [];

        for (let x = 0; x < columns; x++)
            drops[x] = 1;
    }

    window.addEventListener('resize', setup);

    let fontSize = 16;

    const katakana = "アカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロゴゾドボポ";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const matrixChars = katakana + latin + nums;

    function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#ff00ff'; // Bright pink color
        context.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            context.fillText(text, i * fontSize, drops[i] * fontSize);

            // Randomly go back to the top
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;

            // Move the drop down
            drops[i]++;

            // Change color over time
            context.fillStyle = `rgb(${Math.floor(Math.random() * 205) + 50}, 0, ${Math.floor(Math.random() * 205) + 50})`; // Pink and purple shades
        }
    }

    setup(); // Call setup initially to set up canvas and drops
    setInterval(draw, 33);
});