var sampleSpace = Array.from(document.querySelectorAll(".keyBox"));
var gameOver = true;
var playAgain=false;
var gap;
var container = document.querySelector('.container');
var floor = 1000;
var health;
const player = document.querySelector('.player');
var sampleIDs = [];
var CurrentFlyingIDs = [];
var y = [];
var animating = [];
var bAnimating=[];
var scoreText = document.querySelector('.scoreText');
var score=0;
var healthText = document.querySelector('.healthText');
var health=10;
var hides =Array.from(document.querySelectorAll(".hide"));
var bulletArray= Array.from(document.querySelectorAll(".bullet"));
var bulletLeft='753px';
var bulletTop='720px';
var bulletVL=[];
var bulletVT=[];
var bulletIterate=[];
createEnemy();

function createEnemy() {

    sampleSpace.forEach(element => {

        sampleIDs.push(element.id);
        var newElement = document.createElement('div');
        newElement.setAttribute('id', "id" + element.id);
        newElement.setAttribute('class', "enemy");
        element.appendChild(newElement);
        newElement.style.width = '100px';
        newElement.style.height = '150px';
        newElement.style.backgroundImage = 'url("parachute.png")';
        newElement.style.backgroundRepeat = 'no-repeat';
        newElement.style.backgroundPosition = 'center';
        newElement.style.position = 'absolute';
        var newText = document.createElement('div');
        newText.innerText = element.id;
        newText.style.marginTop = '100px';
        newText.style.bottom = '0px';
        newElement.appendChild(newText);
        y.push(0);
        bulletVL.push[0];
        bulletVT.push[0];
        bulletIterate.push[0];
        animating.push(false);
        bAnimating.push(false);
        console.log("Y : " + y);
    });

}

function spawn() {
    randomIndex = Math.floor(Math.random() * sampleSpace.length);
    var e = sampleSpace[randomIndex];
    if (CurrentFlyingIDs.indexOf(e.id) === -1) {
        e.style.display = 'flex';
        e.firstElementChild.classList.toggle('opShow');
        CurrentFlyingIDs.push(e.id);
        //console.log("current : "+ CurrentFlyingIDs.length);
        animating[randomIndex] = true;
        spawnMe(randomIndex);
    }
    else {
        spawn();
    }
}
var element;
function spawnMe(el) {
    element = sampleSpace[el];

    if (el <= 9) {

        floor = 663;

    }
    else if (el <= 18) {
        floor = 580;
    }
    else {
        floor = 492;
    }
    if (animating[el]) {

        if (y[el] < floor) {

            y[el] += 1;
            sampleSpace[el].style.top = y[el] + "px";
            requestAnimationFrame(function () {
                spawnMe(el);
            });
        }
        else {
            animating[el] = false;
            resetElement(el);
            damage();
        }
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key == "Enter") {

        //animating=true;
        if(playAgain)
        {
            window.location= 'index.html';
        }
        if(gameOver)
        {
            gap = setInterval(spawn, 700);
            gameOver=false;
            console.log("Enter Pressed...");
            spawn();
            for (let hd = 0; hd < hides.length; hd++) {
                hides[hd].classList.toggle('opHide');
            }
        }

    }
    else {
        if (CurrentFlyingIDs.indexOf(e.key.toUpperCase()) !== -1&&!gameOver) {

            score++;
            scoreText.textContent=score;
            returnAngle(sampleIDs.indexOf(e.key.toUpperCase()));
            resetElement(sampleIDs.indexOf(e.key.toUpperCase()));


            // console.log("flying: "+CurrentFlyingIDs);

        }

    }
});

function resetElement(re) {

    // console.log("Key Pressed... "+e.key.toUpperCase());
    CurrentFlyingIDs.splice(CurrentFlyingIDs.indexOf(sampleIDs[re]), 1);
    animating[re] = false;
    // console.log("POS : "+initPos);
    y[re] = 0;
    sampleSpace[re].firstElementChild.classList.toggle('opShow');
    setTimeout(() => {
        sampleSpace[re].style.top = "0px";
    }, 250);


}


function returnAngle(ra) {
    target = sampleSpace[ra];
    const playerRect = player.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const playerCenter = {
        x: playerRect.left + playerRect.width / 2,
        y: playerRect.top + playerRect.height / 2
    };
    const targetCenter = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
    };

    const deltaX = targetCenter.x - playerCenter.x;
    const deltaY = targetCenter.y - playerCenter.y;
    const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI)+90;
    player.style.transform = "rotate(" + angle + "deg)";

    let vx=deltaX/60;
    let vy=deltaY/60;
    bAnimating[bulletArray[bulletArray.length-1]]=true;
    //fire(vx,vy,bulletArray[bulletArray.length-1]);
    bulletArray.pop();
}


// function fire(vx,vy,be) {

//     if(bAnimating[be])
//     {console.log("here..........."+bulletArray.indexOf(be));
//         if(bulletIterate[bulletArray.indexOf(be)]<60)
//         {
//             bulletVL[bulletArray.indexOf(be)]+= vx;
//             bulletVT[bulletArray.indexOf(be)]+= vy;
//             be.style.top= bulletTop+'px';
//             be.style.left= bulletVT+'px';

//             requestAnimationFrame(function () {
//                 fire(vx,vy,be)
//             });
//         }
//         else{
//             bAnimating[be]=false;
//         }
//     }
//}


function damage() {
    health--;
    healthText.textContent=health;




    if(health<=0)
    {
        gameOver=true;
        playAgain= true;
        clearInterval(gap);
       for(var an=0; an<animating.length;an++)
       {
        animating[an]=false;
       }

        console.log("animating: "+animating);

        for (let cfi = 0; cfi < CurrentFlyingIDs.length; cfi++) {
            //console.log("IDs : "+ sampleIDs.indexOf(cfi));
           // sampleSpace[sampleIDs.indexOf(cfi)].firstElementChild.classList.toggle('opShow');
            sampleSpace[sampleIDs.indexOf(CurrentFlyingIDs[cfi])].firstElementChild.classList.toggle('opShow');

        }

        for (let hd = 0; hd < hides.length; hd++) {
            hides[hd].classList.toggle('opHide');
        }
        document.querySelector('.header').textContent= 'YOUR SCORE IS    '+score;
        document.querySelector('.header').style.fontFamily = "'Marcellus', sans-serif";

        document.querySelector('.description').textContent='';
        // document.querySelector('.item').textContent='';
        document.querySelector('.enterToPlay').textContent='PRESS ENTER TO PLAY AGAIN';

    }

}


