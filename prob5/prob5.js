const block = document.getElementById('block');
const controlBtn = document.getElementById('control-btn');
let isMoved = false;

controlBtn.addEventListener('click', function() {
    if (!isMoved) {
        block.style.transform = 'translate(300px, -50%)';
        isMoved = true;
    } else {
        block.style.transform = 'translate(0, -50%)';
        isMoved = false;
    }
});
