const boxes = Array.from(document.querySelectorAll('.boxes'));
let activeRow = 1;
let activeColumn = 1;
let activeCell = 11;
let currentWord = '';
let flowing = '';
let five = false;
let gameOver = false;
let typingAllowed = true;
const words = ["Bread", "Break", "Built", "Brush", "Begin", "Burst", "Belly", "Brave", "Brief", "Beach", "Click", "Clown", "Dance", "Diary", "Diver", "Dream", "Drive", "Draft", "Debit", "Ditch", "Flair", "Fleet", "Fable", "Faint", "Ghost", "Gloom", "Happy", "House", "Heart", "Hitch", "Joint", "Juice", "Jolly", "Known", "Karma", "Kites", "Light", "Laugh", "Lumen", "Ledge", "Magic", "Mount", "Mower"
    , "nerve", "never", "needs", "noted", "night", "north", "nasty", "nurse", "newly", "noise", "Party", "Plant", "Point", "Power", "Place", "Phone", "Paint", "Pilot", "Ready", "Round", "Right", "Range", "Route", "Raise", "Rural", "Ratio", "Relax", "Start", "Sight", "Sound", "Story", "Study", "Shape", "Scale", "Catch", "Clean", "Clear", "Charm", "Chase", "Caper", "Crown", "apple", "baker", "candy", "joker", "daisy", "eager", "table", "gummy", "happy", "icing", "jolly", "known", "lemon", "mercy", "novel", "olive", "peace", "quest", "razor", "silky", "truck", "uncle", "vital", "watch", "xerox", "yield", "zebra", "mango", "spicy", "chaos", "braid", "elbow", "fudge", "grape", "hatch", "image", "jewel", "kitty", "laser", "mango", "noble", "ocean", "piano", "quilt", "rider", "salsa", "tiger", "uncut", "video", "waste", "peace", "smile", "happy", "money", "crazy", "house", "watch", "loved", "heart", "dream", "magic", "party", "honey", "music", "faith", "grace", "trust", "light", "laugh", "sweet", "beauty", "truth", "power", "charm", "proud", "brave", "bliss", "angel", "green", "fresh", "queen", "yacht", "crave"];
let randomIndex = 0;
while (!five) {
    randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].toLowerCase();
    if (currentWord.length === 5) {
        five = true;
       // console.log("ran once")
        break;
    }
}

// TEST


//currentWord='promo';


// TEST

console.log(currentWord);

document.addEventListener('keydown', function (event) {
    if (typingAllowed) {
        const reg = /^[a-zA-Z]$/;

        if (reg.test(event.key) && activeColumn < 6 && activeRow < 7) {

            // boxes[activeCell].textContent=event.key;
            document.getElementById(activeCell).textContent = event.key.toUpperCase();
            document.getElementById(activeCell).style.border = '2px solid black';
            activeColumn++;
            activeCell++;
            flowing = flowing + event.key;
            //console.log("flowing "+ flowing);

        }
        else if (event.key === 'Backspace') {
            console.log("backspace pressed " + activeColumn);
            if (activeColumn > 1) {
                --activeColumn;
                --activeCell;
                console.log("column  " + activeColumn);
                document.getElementById(activeCell).textContent = '';
                document.getElementById(activeCell).style.border = '2px solid rgb(130, 130, 130)';
                flowing = flowing.slice(0, -1);
                console.log("flowing " + flowing);
            }
        }
        else if (event.key === 'Enter' && activeColumn === 6) {
            console.warn("done");



            // if(checkValidWord(flowing)===true){
            //     console.log("CHECKING...");
            //     match(flowing);
            //     activeColumn=1;
            //     activeRow++;
            //     activeCell=activeRow*10+activeColumn;
            //     console.log("active cell "+ activeCell);
            //     flowing='';
            // }

            checkValidWord(flowing).then(function (status) {
                if (status == '200') {
                    //console.log("CHECKING...");
                    match(flowing);
                    if (gameOver) {
                        setTimeout(function () {
                            let msg = document.querySelector('.msgtxt');
                            msg.classList.toggle('error');
                            msg.textContent = 'Correct';
                        }, 2000);
                    }
                    else if (activeRow === 6) {

                        setTimeout(function () {
                            let msg = document.querySelector('.msgtxt');
                            msg.classList.toggle('error');
                            msg.textContent = 'The word was ' + currentWord.toLocaleUpperCase();

                        }, 2000);

                    }
                    activeColumn = 1;
                    activeRow++;
                    activeCell = activeRow * 10 + activeColumn;
                    // console.log("active cell "+ activeCell);
                    flowing = '';

                }
                else if (status == '404') {
                    let msg = document.querySelector('.msgtxt');
                    msg.classList.toggle('error');
                    msg.textContent = 'Invalid Word';
                    setTimeout(function () {
                        msg.classList.toggle('error');
                    }, 2000)
                }
                else {
                    let msg = document.querySelector('.msgtxt');
                    msg.classList.toggle('error');
                    msg.textContent = 'Internet Error';
                    setTimeout(function () {
                        msg.classList.toggle('error');
                    }, 2000)
                }
            });


        }

    }

});

function match(playerWord) {
    console.log("player word " + playerWord + " length " + playerWord.length);
    let wArr = '';
    let result = '';
    let currentWordTemp = currentWord;
    let occured = [false, false, false, false, false];
    wArr = playerWord.split('');
    let wArrTemp = wArr;
    let wHas = [];
    wArr.forEach(letter => {
        console.log("LETTER INDEX >>>>>>> " + wArr.indexOf(letter));
        if (currentWordTemp.indexOf(letter) !== -1 && !occured[wArrTemp.indexOf(letter)]) {
            let indexTemp = currentWordTemp.indexOf(letter);
            if (currentWordTemp.indexOf(letter) === wArr.indexOf(letter)) {
                console.log("BULLSEYE !!!!!!!");
                wHas[indexTemp] = 1;
                // currentWordTemp[indexTemp]="x";
                occured[wArr.indexOf(letter)] = true;
                currentWordTemp = currentWordTemp.replace(currentWordTemp[indexTemp], '8');
                wArrTemp[wArrTemp.indexOf(letter)] = '5';
                console.error("current temp " + currentWordTemp + " replaced by " + currentWordTemp[indexTemp]);

            }

            // if( currentWordTemp[currentWordTemp.indexOf(letter)]===wArr[wArr.indexOf(letter)]){
            //  wHas[wArr.indexOf(letter)]=1;
            //  console.log("BULLSEYE !!!!! "+letter+" at "+ currentWordTemp.indexOf(letter)+ " and in user at: " +wArr.indexOf(letter));
            //  currentWordTemp[currentWordTemp.indexOf(letter)]='x';
            //  console.log("current temp: "+currentWordTemp);
            // }

            else {

                console.error("at " + currentWordTemp.indexOf(letter));
                wHas[wArrTemp.indexOf(letter)] = 2;

                if (currentWord[wArrTemp.indexOf(letter)] === letter) {
                    console.error("c1 " + currentWord[wArrTemp.indexOf(letter)] === letter + " c2 :" + letter);
                    wHas[wArrTemp.indexOf(letter)] = 1;
                }

                occured[wArr.indexOf(letter)] = true;
                currentWordTemp = currentWordTemp.replace(currentWordTemp[indexTemp], '8');
                wArrTemp[wArrTemp.indexOf(letter)] = '5';


            }
        }
        else {
            wHas[wArr.indexOf(letter)] = 0;
            console.warn(" nope. " + currentWordTemp + " does not contain " + letter);
        }
        console.warn("COLOR CODES: " + wHas);
    });
    for (let i = 0; i < 5; i++) {
        let pass = '';
        pass = activeRow.toString() + (i + 1).toString();
        let d = document.getElementById(pass);
        if (wHas[i] === 1) {
            // console.log("pass "+pass+ " and wArr "+wHas[i]);

            setTimeout(function () {
                d.style.backgroundColor = "#6aaa64";
                d.style.border = '2px solid #6aaa64';
                d.style.color = "#ffffff";
            }, (i * 100) + 500);
        }
        else if (wHas[i] === 2) {
            //console.log("pass "+pass+ " and wArr "+wHas[i]);
            setTimeout(function () {
                d.style.backgroundColor = "#c9b458";
                d.style.border = '2px solid #c9b458';
                d.style.color = "#ffffff";
            }, (i * 100) + 500);

        }
        else {
            // console.log("pass GRAYYYYYYYYYYYYYY "+pass+ " and wArr "+wHas[i]);
            setTimeout(function () {
                d.style.backgroundColor = "rgb(130, 130, 130)";
                d.style.border = '2px solid rgb(130, 130, 130)';
                d.style.color = "#ffffff";
            }, (i * 100) + 500);

        }


        setTimeout(function () {
            d.classList.toggle('turn');
        }, (i) * 100);

        setTimeout(function () {
            d.classList.toggle('turn');
        }, (i * 100) + 500);


    }

    result = wHas.join('');
    if (result == '11111') {
        gameOver = true;
        console.log("GAME DONE!!!!!!!!");
    }

}

document.querySelector('.replay').addEventListener('click', function () {
    window.location = 'home.html';
});




//     function checkValidWord(cw) {

//         var checkStr= 'https://api.dictionaryapi.dev/api/v2/entries/en/'+cw;


//         fetch(checkStr)
//   .then(response => {

//     console.log(response.status);
//      if(response.status==='200')
//      {
//          console.log("valid word entered");
//         return true;
//      }
//      else
//      {
//         console.log("valid word entered");
//         return false;
//      }
//     })

//   .catch(error => console.error(error));

// }

function checkValidWord(cw) {
    var checkStr = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + cw;

    return fetch(checkStr)
        .then(response => {
            console.log(response.status);
            return response.status;
        })
        .catch(error => {
            console.error(error);
            return error;
        });
}

//***********************************************************//



document.querySelector('.help').addEventListener('click', function () {
    typingAllowed = false;
    document.querySelector('body').classList.toggle('sos');
    document.querySelector('.header').classList.toggle('sos');
    document.querySelector('.title').classList.toggle('sos');
    setTimeout(function () {
        document.querySelector('.instructions').classList.toggle('sos');
        document.querySelectorAll('.op').forEach(function (element) {
            setTimeout(function () {
                element.classList.toggle('sos');
            }, 100);
        });
    }, 500);
});
document.querySelector('.iButton').addEventListener('click', function () {

    document.querySelectorAll('.op').forEach(function (element) {
        element.classList.toggle('sos');
        setTimeout(function () {
            document.querySelector('.instructions').classList.toggle('sos');
        }, 500);
    });
    setTimeout(function () {
        document.querySelector('body').classList.toggle('sos');
        document.querySelector('.header').classList.toggle('sos');
        document.querySelector('.title').classList.toggle('sos');
        typingAllowed = true;
    }, 500);
});



//***********************************************************//
