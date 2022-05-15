let block = document.getElementById('block');

block.style.display = 'none';
let name = '';
let btn = document.getElementById('btn');

function check() {
    name = document.getElementById('input').value;

    btn.disabled = true;

    if (name !== '') {

        btn.disabled = false;
    }


}

let time = setInterval(check, 300);

btn.onclick = function () {
    clearInterval(time);
    block.style.display = 'block';
    let content = document.getElementById('content');
    content.parentNode.removeChild(content);
    startGame(name);

}
let restart = document.getElementById('restart');


function startGame(name) {
    let re = document.getElementById('re');
    re.onclick = function () {
        console.log('da')
        location.reload();


    }

    vpered();
    let scoreShow = document.getElementById('score');
    let timeShow = document.getElementById('time');
    var timer = 0;
    var timerInterval;

    var second = document.getElementById('second');
    var minute = document.getElementById('minute');

    function vpered() {
        sanovka();
        timerInterval = setInterval(function () {
            timer += 1 / 60;
            msVal = Math.floor((timer - Math.floor(timer)) * 100);
            secondVal = Math.floor(timer) - Math.floor(timer / 60) * 60;
            minuteVal = Math.floor(timer / 60);

            second.innerHTML = secondVal < 10 ? "0" + secondVal.toString() : secondVal;
            minute.innerHTML = minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal;
        }, 1000 / 60);
    }

    function sanovka() {
        clearInterval(timerInterval);
    }


    document.getElementById('nick').textContent = 'Ваш ник: ' + name;
    let field = document.createElement('div');

    document.body.appendChild(field);
    field.classList.add('field');

    let fieldWidth = Math.floor(field.offsetWidth / 64);
    let fieldHeight = Math.floor(field.offsetHeight / 64);
    let fieldFull = fieldHeight * fieldWidth;


    let score = 0;

    for (let i = 1; i < fieldFull + 1; i++) {
        let excel = document.createElement('div');
        field.appendChild(excel);
        excel.classList.add('excel');
    }

    let excel = document.getElementsByClassName('excel');
    let x = 1,
        y = fieldHeight;
    let xCount = 1;
    for (let i = 0; i < excel.length; i++) {
        if (x > fieldWidth) {
            x = 1;
            y--;

            xCount++;
        }

        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        x++;

    }


    function generateDoctor() {
        let posX = 1;
        let posY = fieldHeight;
        return [posX, posY];
    }

    let mn = 1;
    if (fieldWidth < 20 && fieldWidth > 14) {
        mn = 1.4
    } else if (fieldWidth < 27 && fieldWidth > 21) {
        m = 2
    } else if (fieldWidth > 28) {
        mn = 2.4
    }
    if (fieldHeight > 14) {
        mn = 1.1
    }
    console.log(fieldHeight)
    console.log(mn)

    let counter = 0;
    let coordinates = generateDoctor();
    let doctorBody = [document.querySelector('[posX="' + coordinates[0] + '"][posY="' + coordinates[1] + '"]')];

    doctorBody[0].classList.add('doctor');

    let heart = [];
    let stone = [];
    let worm = [];


    function generateCoordinate() {
        let posX = Math.round(Math.random() * (fieldHeight - 1) + 1);
        let posY = Math.round(Math.random() * ((xCount * mn) - 1) + 1)

        return [posY, posX];
    }


    function createHeart(count) {


        for (let i = 0; i < count; i++) {

            let heartCoordinates = generateCoordinate();


            heart[i] = document.querySelector('[posX="' + heartCoordinates[0] + '"][posY="' + heartCoordinates[1] + '"]');

            while (heart[i].classList.contains('doctorBody')) {

                let heartCoordinates = generateCoordinate();
                heart[i] = document.querySelector('[posX="' + heartCoordinates[0] + '"][posY="' + heartCoordinates[1] + '"]');

            }

            heart[i].classList.add('heart');
        }


    }

    function createStone(count) {


        for (let i = 0; i < count; i++) {

            let stoneCoordinates = generateCoordinate();


            stone[i] = document.querySelector('[posX="' + stoneCoordinates[0] + '"][posY="' + stoneCoordinates[1] + '"]');

            while (stone[i].classList.contains('doctorBody')) {

                let stoneCoordinates = generateCoordinate();
                stone[i] = document.querySelector('[posX="' + stoneCoordinates[0] + '"][posY="' + stoneCoordinates[1] + '"]');

            }

            stone[i].classList.add('stone');
        }


    }


    function createWorm(count) {


        for (let i = 0; i < count; i++) {

            let wormCoordinates = generateCoordinate();


            worm[i] = document.querySelector('[posX="' + wormCoordinates[0] + '"][posY="' + wormCoordinates[1] + '"]');

            while (worm[i].classList.contains('heart') || worm[i].classList.contains('stone')) {

                let wormCoordinates = generateCoordinate();
                worm[i] = document.querySelector('[posX="' + wormCoordinates[0] + '"][posY="' + wormCoordinates[1] + '"]');

            }

            worm[i].classList.add('worm');
        }


    }

    let heartCount = 10;
    let stoneCount = 10;
    let wormCount = 10;
    createHeart(heartCount);
    createStone(stoneCount);
    createWorm(wormCount);

    let direction = 'left';


    function move() {
        console.log(counter)
        let doctorCoordinates = [doctorBody[0].getAttribute('posX'), doctorBody[0].getAttribute('posY')];

        doctorBody[0].classList.remove('doctor');

        doctorBody.pop();

        if (direction == 'right') {

            if (doctorCoordinates[0] < fieldWidth) {

                doctorBody.unshift(document.querySelector('[posX="' + (+doctorCoordinates[0] + 1) + '"][posY="' + doctorCoordinates[1] + '"]'));
            } else {
                doctorBody.unshift(document.querySelector('[posX="' + (+doctorCoordinates[0]) + '"][posY="' + doctorCoordinates[1] + '"]'));
            }
        } else if (direction == 'left') {

            if (doctorCoordinates[0] > 1) {

                doctorBody.unshift(document.querySelector('[posX="' + (+doctorCoordinates[0] - 1) + '"][posY="' + doctorCoordinates[1] + '"]'));
            } else {
                doctorBody.unshift(document.querySelector('[posX="' + (+doctorCoordinates[0]) + '"][posY="' + doctorCoordinates[1] + '"]'));
            }
        } else if (direction == 'up') {


            if (doctorCoordinates[1] < fieldHeight) {

                doctorBody.unshift(document.querySelector('[posX="' + doctorCoordinates[0] + '"][posY="' + (+doctorCoordinates[1] + 1) + '"]'));
            } else {
                doctorBody.unshift(document.querySelector('[posX="' + (+doctorCoordinates[0]) + '"][posY="' + doctorCoordinates[1] + '"]'));
            }
        } else if (direction == 'down') {


            if (doctorCoordinates[1] > 1) {

                doctorBody.unshift(document.querySelector('[posX="' + doctorCoordinates[0] + '"][posY="' + (+doctorCoordinates[1] - 1) + '"]'));
            } else {
                doctorBody.unshift(document.querySelector('[posX="' + (+doctorCoordinates[0]) + '"][posY="' + doctorCoordinates[1] + '"]'));
            }
        }


        for (let i = 0; i < stone.length; i++) {
            if (typeof stone[i] !== 'undefined') {
                if (doctorBody[0].getAttribute('posX') == stone[i].getAttribute('posX') && doctorBody[0].getAttribute('posY') == stone[i].getAttribute('posY')) {
                    doctorBody.unshift(document.querySelector('[posX="' + (+doctorCoordinates[0]) + '"][posY="' + doctorCoordinates[1] + '"]'));
                }

                if (doctorBody[0].getAttribute('posX') == stone[i].getAttribute('posX') && doctorBody[0].getAttribute('posY') == stone[i].getAttribute('posY') - 1) {
                    function fallStone() {
                        if (typeof stone[i] !== 'undefined') {

                            let stoneUnder = document.querySelector('[posX="' + stone[i].getAttribute('posX') + '"][posY="' + (stone[i].getAttribute('posY') - 1) + '"]');
                            if (stoneUnder.classList.contains('stone')) {

                                stone[i].classList.remove('stone');
                                delete stone[i];
                            }
                            if (typeof stone[i] !== 'undefined') {
                                stone[i].classList.remove('stone');
                                stone[i] = document.querySelector('[posX="' + stone[i].getAttribute('posX') + '"][posY="' + (stone[i].getAttribute('posY') - 1) + '"]');
                                stone[i].classList.add('stone');
                                if (doctorBody[0].getAttribute('posX') == stone[i].getAttribute('posX') && doctorBody[0].getAttribute('posY') == stone[i].getAttribute('posY')) {


                                    endGame(score, 'Ты проиграл')

                                }

                                if (stone[i].getAttribute('posY') == 1) {
                                    stone[i].classList.remove('stone');


                                    delete stone[i];
                                    // heart.splice(i, 1);
                                    clearInterval(fallHeartEnd);

                                }

                            }
                        }
                    }

                    let fallHeartEnd = setInterval(fallStone, 600);
                }
            }
        }

        for (let i = 0; i < heart.length; i++) {

            for (let j = 0; j < stone.length; j++) {
                if (typeof heart[i] !== 'undefined' && typeof stone[j] !== 'undefined') {

                    if (heart[i].getAttribute('posX') == stone[j].getAttribute('posX') && heart[i].getAttribute('posY') == stone[j].getAttribute('posY')) {
                        counter++;

                        heart[i].classList.remove('heart');
                        delete heart[i];

                    }
                }

            }
            if (typeof heart[i] !== 'undefined') {

                if (doctorBody[0].getAttribute('posX') == heart[i].getAttribute('posX') && doctorBody[0].getAttribute('posY') == heart[i].getAttribute('posY') - 1) {


                    function fallHeart() {

                        if (typeof heart[i] !== 'undefined') {
                            let heartUnder = document.querySelector('[posX="' + heart[i].getAttribute('posX') + '"][posY="' + (heart[i].getAttribute('posY') - 1) + '"]');
                            if (heartUnder.classList.contains('heart')) {
                                counter++;
                                heart[i].classList.remove('heart');
                                delete heart[i];
                            }
                            if (typeof heart[i] !== 'undefined') {
                                heart[i].classList.remove('heart');
                                heart[i] = document.querySelector('[posX="' + heart[i].getAttribute('posX') + '"][posY="' + (heart[i].getAttribute('posY') - 1) + '"]');
                                heart[i].classList.add('heart');


                                if (heart[i].getAttribute('posY') == 1) {
                                    heart[i].classList.remove('heart');

                                    counter++;
                                    delete heart[i];
                                    if (heartCount === counter) {
                                        endGame(score, 'Ты выиграл')
                                    }
                                    // heart.splice(i, 1);
                                    clearInterval(fallHeartEnd);

                                }
                            }
                        }


                    }

                    let fallHeartEnd = setInterval(fallHeart, 600);


                }
            }


            if (typeof heart[i] !== 'undefined') {
                if (doctorBody[0].getAttribute('posX') == heart[i].getAttribute('posX') && doctorBody[0].getAttribute('posY') == heart[i].getAttribute('posY')) {
                    heart[i].classList.remove('heart');
                    score++;

                    if (typeof fallHeartEnd !== 'undefined') {
                        clearInterval(fallHeartEnd);
                    }

                    counter++;
                    delete heart[i];
                    if (typeof heart[i] !== 'undefined') {

                        heart[i].classList.remove('heart');
                    }


                    if (heartCount === counter) {
                        endGame(score, 'Ты выиграл')
                    }

                }
            }

        }

        let fieldChange = document.querySelector('[posX="' + doctorCoordinates[0] + '"][posY="' + doctorCoordinates[1] + '"]');


        fieldChange.classList.add('earth');

        doctorBody[0].classList.remove('worm');
        doctorBody[0].classList.remove('earth');
        doctorBody[0].classList.add('doctor');
        scoreShow.textContent = 'Кол-во собранных сердец: ' + score;
    }


    let interval = setInterval(move, 250);

    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 87) {
            direction = 'up';
        }
        if (e.keyCode == 65) {
            direction = 'left';
        }
        if (e.keyCode == 83) {
            direction = 'down';
        }
        if (e.keyCode == 68) {
            direction = 'right';
        }

    });

    let restart = document.getElementById('restart');
    restart.onclick = function () {

        location.reload();


    }


}


function endGame(score, text) {

    $('.popup-bg').fadeIn(2);
    document.getElementById('text-end').textContent = text;
    document.getElementById('score-end').textContent = 'у тебя: ' + score + ' cердца';

}
