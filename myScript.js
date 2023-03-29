value= document.getElementById("tx");
    value.innerHTML= "Inderjit Singh";
    const screenA = document.getElementById('A');
const screenB = document.getElementById('B');


var isScrolling= false;
// document.addEventListener('wheel', function(event){
//     if (event.deltaY >0 && !isScrolling) {
//         isScrolling = true;
//         screenB.scrollIntoView({ behavior: 'smooth', setInterval: '500' });
//         console.log("Scrolling");
//         event.preventDefault();
//         setTimeout(function() {
//             isScrolling = false;
//         }, 500);
//     }
//     else  if (event.deltaY <0 && !isScrolling) {
//         isScrolling = true;
//         screenA.scrollIntoView({ behavior: 'smooth' , setInterval: '500'  });
//         console.log("Scrolling");
//         event.preventDefault();
//         setTimeout(function() {
//             isScrolling = false;
//         }, 500);

//     }
// }, { passive: false });
const container = document.querySelector('.container');
const namePics = document.querySelectorAll('.NamePic');

container.addEventListener('scroll', () => {
  const scrollTop = container.scrollTop;

  namePics.forEach((namePic) => {
    if (namePic.offsetTop <= scrollTop && namePic.offsetTop + namePic.offsetHeight > scrollTop) {
      console.log('Currently snapped:', namePic.id);
      console.log('offset: '+namePic.offsetTop+ ' scrollTop ' + scrollTop+ ' offsetHeight: '+namePic.offsetHeight);
    }
  });
});

