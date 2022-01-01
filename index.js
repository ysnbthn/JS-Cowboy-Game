// FIX RANDOM JUMPING PROBLEM

const shootingArea = document.querySelector('.shootingArea');
const welcome = document.querySelector('.start');
const aim = document.querySelector('.aim');
const badGuys = document.getElementsByClassName('badGuy');
const reloadBtn = document.querySelector('.reload');

var score = 0;
var bullets = 6;

const reloadS = new Audio("Sounds/ReloadSound.mp3");

const difficulty = sessionStorage.getItem('difficulty');
var time = difficulty == "hard" ? 500 : difficulty == "medium" ? 700 : 1000;

// add event listener to bad guys
function addOrRemoveBGLs(text){
    if(text === "add"){
        for(var i =0; i<5;i++){
            badGuys[i].addEventListener('click', handleClick);
        }
    }else{
        for(var i =0; i<5;i++){
            badGuys[i].removeEventListener('click', handleClick);
        }
    }
}

for(var i =0; i<5;i++){
    badGuys[i].addEventListener('click', handleClick);
}

shootingArea.addEventListener('click', shootHandler);

async function playGunS(target){
    if(target === "fire"){
        const gunFire = new Audio("Sounds/Gunfire.mp3");
        gunFire.play();
    }else{
        const empty = new Audio("Sounds/Empty.mp3");
        empty.play();
    }
}

function shootHandler(e){
    
        if(bullets > 0){
        playGunS("fire");
        bullets -= 1;
        let blt = document.getElementsByClassName('bullet');
        blt[bullets].style.display = 'none';
    
        }
        if(bullets== 0){
            playGunS("empty");
            aim.style.pointerEvents = 'visible';
            reloadBtn.style.display = "block";
        }
}

reloadBtn.addEventListener('click',reload);
reloadBtn.addEventListener('mouseover',()=>{
    aim.style.pointerEvents = 'none';
});

function reload(e){
    
    let blt = document.getElementsByClassName('bullet');
    e.target.style.display = 'none';
    
    shootingArea.removeEventListener('click', shootHandler);
    addOrRemoveBGLs("remove");

    reloadS.play();

    let reloading = setInterval(() =>{
        if(bullets <6 ){
            blt[bullets].style.display = "block";
            bullets += 1; 
        }else{
            shootingArea.addEventListener('click', shootHandler);
            aim.style.pointerEvents = 'none';
            addOrRemoveBGLs("add");
            clearInterval(reloading);
        }
    }, 300);

    console.log('clicked');
}

// shooting bad guys
function handleClick(e) {

    //console.log("hit!");   
    //console.log(e.target.id);

    score += 1;
    document.querySelector('.scoreText').innerText = `Score: ${score}`;
    //popBGs();
}

//console.log(saCoordinates.top, saCoordinates.left, saCoordinates.right, saCoordinates.bottom);

// aim movement
shootingArea.addEventListener('mousemove', function(e){
    
    //console.log(e); // debug
    const saCoordinates = shootingArea.getBoundingClientRect();
    
    // because aim size (50 * 50) px
    if(e.clientY +50 >= saCoordinates.top && e.clientY +50 <= saCoordinates.bottom && e.clientX +50 >= saCoordinates.left && e.clientX +50 <= saCoordinates.right){
        aim.style.position = "absolute";
        // Because shooting area postiion is relative now
        aim.style.left = e.clientX - saCoordinates.left + 'px';
        aim.style.top = e.clientY - saCoordinates.top + 'px';

        // For debug
        document.querySelector('#dbt1').textContent = `Aim X: ${e.clientX}, Aim Y: ${e.clientY}`; 
    }
});

aim.addEventListener('click', e=> {
    
    const aimCoordinates = aim.getBoundingClientRect();
    var clickedTarget = e.target;
    var targetCoordinates = clickedTarget.getBoundingClientRect();
    
    //console.log(e.target);
    
    document.querySelector('#dbt2').textContent = `Click X: ${e.clientX}, Click Y: ${e.clientY}`;
});


function startGame(difficulty){

    clearInterval(startTimer);
    var gameTime = difficulty === "hard" ? 14 : difficulty == "medium" ? 29 : 59;

    score = 0;
    
    startTimer(gameTime, document.querySelector('#timeText'));
    addOrRemoveBGLs("add");
    popBGs();

}

var previous = 0; 
var x;
function popBGs(){

    x= setInterval(function(){
        for(var i = 1; i <6; i++){
            document.getElementById(`bg${i}`).style.visibility = 'hidden';
        }
        
        var random = selectRandom(previous);
        var target = random ? document.getElementById(`bg${random}`) : document.getElementById(`bg${1}`);
        target.style.visibility = "visible";
    }, time);
    
}

function selectRandom(last){

    var arr = [1,2,3,4,5];
    var rand = arr[Math.floor(Math.random() * 5)];

    //console.log(rand);

    if(rand != last){
        previous = rand;
        return rand;
    }else{
        selectRandom(previous);
    }

}


async function startTimer(duration, display) {

    var timer = duration, seconds;
    
    const empty = new Audio("Sounds/InGame.mp3");
    empty.play();
    
    var myTimer = setInterval(function () {
        
        seconds = parseInt(timer % 60, 10);
        if(timer >= 0){
            display.textContent = "Time: " +  seconds;
            display.style.color = timer > 5 ? "black" : "red";
            timer --;
        }else{
            display.textContent = "Time: 0";
            //console.log("k");
            clearInterval(startTimer);
            clearInterval(myTimer);
            clearInterval(x);
            addOrRemoveBGLs("remove");
            let text = `Game Over! \nYour Score is : ${score} \nTry Again?`;

            if(confirm(text)){
                location.reload();
            }else{
                history.back();
            }
        }

    }, 1000);
}

if(difficulty){
    setTimeout(startGame(difficulty), 1500);
}
