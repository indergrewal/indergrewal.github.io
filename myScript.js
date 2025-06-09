const elements = document.querySelectorAll('.bounce');
const sideButtons = Array.from(document.querySelectorAll('.sideButton'));
const sideLinks = Array.from(document.querySelectorAll('.sideLink'));
const home = document.querySelector('.homeButton');
const pros = Array.from(document.querySelectorAll('.projectElement'));

console.log("Number of sideButtons: " + sideButtons.length);


// buttons //

document.querySelector('.cr2').addEventListener('click', function () {
  window.location.href = 'mailto:indergrewal1208.gi@gmail.com';
});
home.addEventListener('click', function () {
  window.location.href = 'index.html';
});

pros.forEach(button => {
  button.addEventListener('click', () => {
    loadProject(pros.indexOf(button))
  });
});

const playStoreLink = document.querySelector('.playStoreLink');
if (playStoreLink) {
  playStoreLink.addEventListener('click', function () {
    window.open('https://play.google.com/store/apps/details?id=com.DetainList.INFINITESURVIVAL');
  });
}

function loadProject(p) {
  switch (p) {
    case 0:
      window.open('PROJECTS/data visualization/home.html');
      break;
    case 1:
      window.open('PROJECTS/Wordrobe/home.html');

      break;
    case 2:
      window.open('PROJECTS/TYPEMASTER/home.html');
      break;
    case 3:
      window.open('PROJECTS/marvelous/home.html');
      break;
    case 5:
      window.open('PROJECTS/GravitySim/home.html');
      break;
    case 6:
      window.open('PROJECTS/TODO/home.html');
      break;
    case 4:
      // window.location.href = 'PROJECTS/p6/p6.html';
      break;
    case 7:
      // window.location.href = 'PROJECTS/p7/p7.html';
      break;
    case 8:
      // window.location.href = 'PROJECTS/p8/p8.html';
      break;


  }
}
// --buttons--//
elements.forEach(element => {
  element.addEventListener('mouseenter', () => {

    animationCall(element)
  });
});

sideButtons.forEach(button => {
  button.addEventListener('click', () => {
    menuToggle(sideButtons.indexOf(button))
  });
});


for (var sl = 1; sl < sideLinks.length; sl++) {
  console.log("sl " + sl + " and " + sideLinks.length);
  sideLinks[sl].style.display = 'none';
}
function menuToggle(b) {
  sideLinks.forEach(sideLink => {
    sideLink.style.display = 'none';
  });
  sideLinks[b + 1].style.display = "grid";
  console.log("toggle called at button: " + sideLinks[b].className);
}

/*********/

/*********/



for (let i = 0; i < elements.length; i++) {
  //setTimeout(animationCall(elements[i]),500);
  setTimeout(() => {
    animationCall(elements[i]);
  }, i * 50);
}

function animationCall(t) {

  t.classList.add('hover');

  setTimeout(function () {
    t.classList.remove('hover');
  }, 1010)
}