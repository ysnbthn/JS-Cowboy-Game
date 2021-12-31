const shootingArea = document.querySelector('.shootingArea');
const aim = document.querySelector('.aim');
const badGuys = document.getElementsByClassName('badGuy');
const saCoordinates = shootingArea.getBoundingClientRect();

var score = 0;

//console.log(badGuys);

for (var i = 0; i<badGuys.length; i++) {
    badGuys[i].addEventListener('click', clickCallBack);
}

function clickCallBack(e) {

    var targetArea = e.target.getBoundingClientRect();

    console.log(targetArea);
    console.log(e.clientX, e.clientY);

    console.log(e.target.id);
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

function addScore(scr){
    scr += 100;
    document.querySelector('.scoreText').innerText = `Score: ${scr}`;
}

    




