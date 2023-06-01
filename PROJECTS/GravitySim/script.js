var c_gravity=0.98;
// Function to create a new ball
function createBall(x, y) {
  // Create a new ball element
  var ball = document.createElement('div');
  ball.className = 'ball';

  // Append the ball to the body
  document.body.appendChild(ball);

  // Variables for ball properties
  var vx = 0; // velocity of the ball on the x-axis
  var vy = 0; // velocity of the ball on the y-axis
  var gravity = c_gravity; // acceleration due to gravity
  var damping = .6; // damping factor for bouncing
  var bounceCount = 0; // number of bounces


  // Function to update the ball's position
  function updateBallPosition() {
    // Update the position based on velocity
    x += vx;
    y += vy;

    // Apply gravity to the velocity
    vy += gravity;

    // Check if the ball hits the ground
    if (y + ball.clientHeight >= window.innerHeight && vy > 0) {
      // Reverse the velocity and apply damping for bouncing
      vy = -vy * damping;

      // Increment the bounce count
      bounceCount++;
    }

    // Stop bouncing if the maximum number of bounces is reached
    if (bounceCount >= 10) {
      vy = 0;
    //   y = window.innerHeight - ball.clientHeight;
    y=window.innerHeight;
        setTimeout(() => {
            ball.remove();
        }, 2000);
      return; // Stop the function
    }

    // Update the ball's position on the screen
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    // Repeat the update at the next animation frame
    requestAnimationFrame(updateBallPosition);
  }

  // Set initial position and velocity based on the click point
  x = x;
  y = y;
  vx = 0;
  vy = 0;

  // Start the animation
  updateBallPosition();
}

// Event listener for mouse click
document.addEventListener('click', function(event) {
    console.log("target" +event.target.className);
    if (event.target.className !== "btn selected")
    {

        document.querySelector('.message').textContent='';
 // Create a new ball at the click point
 createBall(event.clientX, event.clientY);
    }
});


//ADDED***********************************************************************************//

window.onload = function() {
    const colorCodes = [
        "#808080",   // Mercury: Gray
        "#FADA5E",   // Venus: Yellow
        "#AFEEEE",   // Earth: Pale Blue
        "#FF0000",   // Mars: Red
        "#FFA500",   // Jupiter: Orange
        // "#FFFFFF",   // Jupiter: White
        // "#FAE589",   // Saturn: Pale Yellow
        "#FFD700",   // Saturn: Gold
        "#00FFFF",   // Uranus: Cyan
        "#00008B",   // Neptune: Deep Blue
        "#FDB813",   // Sun: Golden Yellow
        "whitesmoke"    // Moon: Pale Yellow
      ];


  const gravities = [
    .4,     // Mercury
    .8,    // Venus
    .98,    // Earth
    .3,    // Mars
    2.4,   // Jupiter
    1.04,   // Saturn
    .887,    // Uranus
    1.15,   // Neptune
    7.4,     // Sun
    .162     // Moon
  ];

  const showGravity = [
    3.7,     // Mercury
    8.8,    // Venus
    9.8,    // Earth
    3.7,    // Mars
    24.8,   // Jupiter
    10.4,   // Saturn
    8.8,    // Uranus
    11.1,   // Neptune
    274,     // Sun
    1.6     // Moon
  ];


   var buttons = document.getElementsByClassName('btn');
    buttons[2].classList.add('selected');
    buttons[2].style.backgroundColor= colorCodes[2];


    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove('selected');
                buttons[j].style.backgroundColor= "#1d1d1d";
            }
            c_gravity= gravities[i];
            console.log("gravity "+c_gravity);
            this.classList.add('selected');
            this.style.backgroundColor= colorCodes[i];
            document.querySelector('.gText').textContent=showGravity[i];
        });
    }
}

