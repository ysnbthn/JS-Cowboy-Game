const shootingArea = document.querySelector('.shootingArea');
const aim = document.querySelector('.aim');

shootingArea.addEventListener('mousemove', function(e){
    
    console.log(e);
    
    aim.style.left = e.clientX + 'px';
    aim.style.top = e.clientY + 'px';

    // For debug
    document.querySelector('#dbt1').textContent = `Aim X: ${e.clientX}, Aim Y: ${e.clientY}`; 
});