const elements = document.querySelectorAll('.bounce');
const sideButtons =Array.from(document.querySelectorAll('.sideButton'));
const sideLinks = Array.from(document.querySelectorAll('.sideLink'));
const home = document.querySelector('.homeButton');
console.log("Number of sideButtons: " + sideButtons.length);


home.addEventListener('click', function() {
  window.location.href = 'index.html';
});

elements.forEach(element => {
  element.addEventListener('mouseenter', () => {

animationCall(element)  });
});

sideButtons.forEach(button=>{
  button.addEventListener('click', ()=>{
    menuToggle(sideButtons.indexOf(button))});
});


function menuToggle(b)
{
  sideLinks.forEach(sideLink=>{
    sideLink.style.display='none';
  });
  sideLinks[b+1].style.display="grid";
  console.log("toggle called at button: "+sideLinks[b].className);
}

/*********/

/*********/



for(let i=0; i<elements.length;i++)
{
  //setTimeout(animationCall(elements[i]),500);
  setTimeout(() => {
    animationCall(elements[i]);
  }, i*50);
}

function animationCall(t){

t.classList.add('hover');

setTimeout(function(){
  t.classList.remove('hover');
}, 1010)
}