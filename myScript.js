const elements = document.querySelectorAll('.bounce');

elements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    console.log('Mouse over element with class "bounce"');
animationCall(element)  });
});


function animationCall(t){

t.classList.add('hover');
console.log('class :'+ t.className);
setTimeout(function(){
  t.classList.remove('hover');
}, 1010)
}