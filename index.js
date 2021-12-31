const shootingArea = document.querySelector('.shootingArea');
const aim = document.querySelector('.aim');
const badGuys = document.getElementsByClassName('badGuy');
const saCoordinates = shootingArea.getBoundingClientRect();

var score = 0;

//console.log(badGuys);

for (var i = 0; i<badGuys.length; i++) {
    badGuys[i].addEventListener('click', clickCallBack);
}
// shooting bad guys
function clickCallBack(e) {

    //console.log("hit!");   
    //console.log(e.target.id);

    score += 100;
    document.querySelector('.scoreText').innerText = `Score: ${score}`;
}

//console.log(saCoordinates.top, saCoordinates.left, saCoordinates.right, saCoordinates.bottom);

// aim movement
shootingArea.addEventListener('mousemove', function(e){
    
    //console.log(e); // debug

    // because aim size (50 * 50) px
    if(e.pageY +50 >= saCoordinates.top && e.pageY +50 <= saCoordinates.bottom && e.pageX +50 >= saCoordinates.left && e.pageX +50 <= saCoordinates.right){
        aim.style.left = e.clientX + 'px';
        aim.style.top = e.clientY + 'px';


        // For debug
        document.querySelector('#dbt1').textContent = `Aim X: ${e.clientX}, Aim Y: ${e.clientY}`; 
    }
});

aim.addEventListener('click', e=> {
    
    const aimCoordinates = aim.getBoundingClientRect();
    var clickedTarget = e.target;
    var targetCoordinates = clickedTarget.getBoundingClientRect();
    
    console.log(e.target);
    
    document.querySelector('#dbt2').textContent = `Click X: ${e.clientX}, Click Y: ${e.clientY}`;
});




function startGame(time, difficulty){
    score = 0;
    startTimer(time, document.querySelector('#timeText'));


}

startGame(15, "easy");

function popBGs(difficulty){


    var time = difficulty == "hard" ? 300 : difficulty == "medium" ? 500 : 800;
    var previous = 0; 

    setInterval(() => {

        var random = Math.floor(Math.random() * 5) + 1;
        var target = document.getElementById(`bg${random}`);
        target.style.display = none;
        previous = random;

    }, time);
}


function startTimer(duration, display) {

    var timer = duration, seconds;
    var myTimer = setInterval(function () {
        
        seconds = parseInt(timer % 60, 10);

        if(timer > 0){
            seconds = seconds < 10 ? "" + seconds : seconds;
            display.textContent = "Time: " +  seconds;
            timer --;
        }else{
            display.textContent = "Time: 0";
            //console.log("k");
            clearInterval(myTimer);
        }

    }, 1000);
}



