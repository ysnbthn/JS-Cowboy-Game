const shootingArea = document.querySelector('.shootingArea');
const aim = document.querySelector('.aim');


const saCoordinates = shootingArea.getBoundingClientRect();
//console.log(saCoordinates.top, saCoordinates.left, saCoordinates.right, saCoordinates.bottom);



// aim movement
shootingArea.addEventListener('mousemove', function(e){
    
    console.log(e); // debug

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
    
    
    
    
    document.querySelector('#dbt2').textContent = `Click X: ${e.clientX}, Click Y: ${e.clientY}`; 
});

    




