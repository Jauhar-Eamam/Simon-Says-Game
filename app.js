let gameSeq = [];
let userSeq = [];

let hiScore = document.querySelector('.highScore')

// let hScore = 0
let userScore = 0

let btns = ["red", "yellow", "purple", "green"]

let started = false;
let level = 0;
let key = true;

let h2 = document.querySelector('h2')

document.addEventListener('keypress', function () {
    if (started == false) {
        console.log("Game started!")
        started = true

        let score = document.querySelector('.userScore');
        score.innerText = `Score: ${userScore}`
    }

    if (key == true) {
        setTimeout(() => {
            levelUp();
        }, 1000);

        key = false
    }
});

function btnFlash(btn) {
    btn.classList.add("btnFlash");
    setTimeout(() => {
        btn.classList.remove("btnFlash")
    }, 250);

};

function btnFlashGreen(btn) {
    btn.classList.add("btnFlashGreen");
    setTimeout(() => {
        btn.classList.remove("btnFlashGreen")
    }, 250);

}

function levelUp() {
    userSeq = []
    level++;
    h2.innerText = `Level ${level}`

    let ranInd = Math.floor((Math.random() * 4))
    let ranColor = btns[ranInd];
    let ranBtn = document.querySelector(`.${ranColor}`)
    gameSeq.push(ranColor)
    console.log(gameSeq);

    btnFlash(ranBtn);
    scoreCheck();
};

function btnPress() {
    let btn = this
    let color = this.classList[1]
    userSeq.push(color)
    btnFlashGreen(btn)

    checkAns(userSeq.length - 1);
};


let allBtns = document.querySelectorAll('.innerBox');
for (btn of allBtns) {
    btn.addEventListener('click', btnPress)
}



function checkAns(ind) {
    if (gameSeq[ind] === userSeq[ind]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 1000);
        }
    } else {
        h2.innerHTML = "<h2><b>Game Over!</b> Press any key to start the game.</h2>"

        let body = document.querySelector('body')
        body.classList.add('bodyRed')
        setTimeout(() => {
            body.classList.remove('bodyRed')
        }, 100);

        setTimeout(() => {
            body.classList.add('bodyRed')
            setTimeout(() => {
                body.classList.remove('bodyRed')
            }, 100);
        }, 250);

        console.log("Game over!");
        

        scoreCheck();


        reset();
    }

};

function scoreCheck() {

    if (level <= 5) {
        let score = -10
        for (let i = 1; i <= level; i++) {
            score = score + 10;
        }
        userS(score)
        highScore(score);

    } else if (level <= 10) {
        let score = 50 - 20
        for (let i = 1; i <= level - 5; i++) {
            score = score + 20
        }
        userS(score)
        highScore(score)

    } else if (level <= 15) {
        let score = 150 - 50;
        for (let i = 1; i <= level - 10; i++) {
            score = score + 50;
        }
        userS(score)
        highScore(score)
    }
}

function userS(userSc) {
    let score = document.querySelector('.userScore');
    score.innerText = `Score: ${userSc}`
}

function highScore(score) {
    // let s = hiScore.innerText = `High Score is: ${score}`
    if (score >= userScore) {
        userScore = score;
        hiScore.innerText = `High Score is: ${score}`
    }
    hiScore.classList.add('h2Red')

}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0
    key = true
};
