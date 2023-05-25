  const container= document.querySelector(".container");
  let single = true;
  let flipped;
  let allowed=true;
  let matched= [];
  let started=false;
  let scoreSystem={
    moves:0,
    correct:0,
    incorrect:0,
    score: this.correct*10-this.incorrect*5

  };

  document.addEventListener("mousedown", function(){
    if(!started)
    {


      window.addEventListener('keyup', function(event) {
        if (event.key === 'Escape') {
         console.log("Closing...........");
         window.location.href= 'home.html' ;

          // window.close();
         }
       });
  //**************FULL SCREEN****************************
      const elem = document.documentElement;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }


  //*************FULL SCREEN ENDS************************



      document.querySelector('.left').classList.toggle('after');
      document.querySelector('.right').classList.toggle('after');
      document.querySelector('.play').classList.toggle('after');
      document.querySelector('.score').classList.toggle('after');

      started=true;
  //*************--------GAME--------************************
      setTimeout(function() {
        cards.forEach(function(card)
        {
          card.addEventListener('click', function(){
            if(flipped!==card&&!matched.includes(card)&&allowed)
            {

            flip(card);

              if(single)
              {
              flipped=card;
              console.log("First card");
              single=false;
              }
              else
              {

                if(flipped.firstElementChild.id === card.firstElementChild.id)
                {
                  console.log("MATCH FOUND!!! flipped = "+flipped+" and this is "+ card);
                  card.removeEventListener('click', function(){});
                  flipped.removeEventListener('click', function(){});
                  matched.push(card);
                  matched.push(flipped);

                  allowed=false;
                  setTimeout(function(){

                    card.classList.toggle('bw');
                    flipped.classList.toggle('bw');
                    flipped=null;
                    single=true;
                    allowed=true;
                    scoreSystem.correct++;
                    moved();
                    if(scoreSystem.correct===9)
                    {
                      console.log("GAME OVER "+scoreSystem.correct*10-scoreSystem.incorrect*5);
                      document.querySelector('.score').style.color = "green";
                      document.querySelector('.score').textContent = "SCORE ";
                      document.querySelector('.moves').textContent =scoreSystem.correct*10-scoreSystem.incorrect*5;
                      document.querySelector('.moves').style.backgroundColor = "green";

                    }
                  },1000);


                }
                else
                {
                  allowed=false;
                  console.log("No match");

                  setTimeout(function(){
                    flip(flipped);
                    flip(card);
                    flipped=null;
                    single=true;
                    allowed=true;
                    scoreSystem.incorrect++;
                    moved();
                  },1000)

                  console.log("flipped = "+flipped.firstElementChild.id+" and this is "+ card.firstElementChild.id);
                }

              }
            }
          else
          {
            console.log("Sorry! can't unflip");
          }

          })
          flip(card);
        });
          }, 5000);
    }
  })

  //*************--------GAME ENDS--------*******************

  //*************SHUFFLE************************
  const cards = Array.from(container.querySelectorAll(".card"));
  for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    console.log("length: " +cards.length);
    cards.forEach(function(card)
    {
      container.appendChild(card);
      console.log("C>>>>" +card);
    }
    );
    console.log("cards : " +cards);


  //*************SHUFFLE************************
    function flip(card) {
      card.classList.toggle('flip');
      console.log("flipped card no: "+cards.indexOf(card));

    }
    function moved(){
      scoreSystem.moves++;

     var num;
        if (scoreSystem.moves < 10) {
          num= "0" +scoreSystem.moves ;
        } else {
          num= scoreSystem.moves;
        }
        document.querySelector('.moves').textContent =num;



    }








