function debug(string) {
    console.log(string)
}

var round = "Final";

function toggleRound() {
  if(round == "Qualification") {
    round = "Final";
    renderMat();
  }
  else {
    round = "Qualification";
    renderMat();
  }

  // document.getElementById("round_button").innerHTML = round;
}

var timerState = "Start timer";
var timer = 0;
var timerInterval;

function startTimer() {
  if(timerState == "Start timer") {
    timerState = "Stop timer";
    timer = 0;

    timerInterval = setInterval(function() {
      timer++;
      // show timer in format mm:ss
      var secs = Math.floor(timer / 100);
      document.getElementById("timer-mmss").innerHTML = Math.floor(secs / 60) + ":" + ("0" + secs % 60).slice(-2);
      document.getElementById("timer-ms").innerHTML = ("0" + timer % 100).slice(-2);
    }
    , 10);
  }
  else {
    timerState = "Start timer";

    clearInterval(timerInterval);
  }

  document.getElementById("timer_button").innerHTML = timerState;
}

var car, lightSigns=[], walls=[0, 0, 0, 0], parkingPos;

function carInWall() {
  return walls[car.side] == 1 && (car.position == 0 || car.position == 3);
}

function randomizer() {
  for (let i = 0; i < 4; i++) {
    lightSigns[i] = [];
    for (let j = 0; j < 6; j++) {
      lightSigns[i][j] = 0;
    }
  }

  car = {
    "side": Math.floor(Math.random() * 4),
    "position": Math.floor(Math.random() * 6),
    "direction": Math.floor(Math.random() * 2) * 2 - 1,
  };

  for(let i = 0; i < 4; i++) {
    walls[i] = Math.floor(Math.random() * 2);
  }

  while(carInWall()) {
    car = {
      "side": Math.floor(Math.random() * 4),
      "position": Math.floor(Math.random() * 6),
      "direction": Math.floor(Math.random() * 2) * 2 - 1,
    };
  }

  // parking can have 4 different positions, 2 on the x axis and 2 on the y axis

  parkingPos = Math.floor(Math.random() * 4);

  for(let i = 0; i < 4; i++) {
    if(i == parkingPos) {
      // If the parking is in that quadrant, the light signs can only be on positions 3 - 5
      let lightNo = Math.floor(Math.random() * 18);
      if(lightNo % 2) {
        lightSigns[i][Math.floor(Math.random() * 3) + 3] = Math.floor(Math.random() * 2) + 1;
      } else if(lightNo % 2 == 0) {
        lightSigns[i][3] = Math.floor(Math.random() * 2) + 1;
        lightSigns[i][5] = Math.floor(Math.random() * 2) + 1;
      }
    } else {
      let lightNo = Math.floor(Math.random() * 36);
      if(lightNo % 2) {
        lightSigns[i][Math.floor(Math.random() * 6)] = Math.floor(Math.random() * 2) + 1;
      } else if(lightNo % 2 == 0) {
        // First light
        let upOrDown = Math.floor(Math.random() * 2);
        if(upOrDown == 0) 
          lightSigns[i][0] = Math.floor(Math.random() * 2) + 1;
        else
          lightSigns[i][3] = Math.floor(Math.random() * 2) + 1;

        // Second light

        upOrDown = Math.floor(Math.random() * 2);
        if(upOrDown == 0) 
          lightSigns[i][2] = Math.floor(Math.random() * 2) + 1;
        else
          lightSigns[i][5] = Math.floor(Math.random() * 2) + 1;
      }
    }
  }

  if(round == 'Final') {
    var quadrant = Math.floor(Math.random() * 4);
    var dir = Math.floor(Math.random() * 2) * 2 - 1;
    var pos;

    if(dir == 1) {
      if(lightSigns[quadrant][1] == 0 && lightSigns[quadrant][4] == 0)
        pos = 1;
      else
        pos = 4;
    }
    else {
      if(lightSigns[quadrant][1] == 0 && lightSigns[quadrant][4] == 0)
        pos = 4;
      else
        pos = 1;
    }
    
    car = {
      "side": quadrant,
      "position": pos,
      "direction": dir,
    };

    for(let i = 0; i < 4; i++) {
      walls[i] = 0;
    }
  }
}


function renderRobot(quadrant, position, direction) {
  var robot = document.getElementById("robot");
  var robotArrow = document.getElementById("robot-arrow");

  switch(quadrant) {
    case 0:
      robot.style.setProperty('width', 'calc(30 / 320 * 100%)');
      robot.style.setProperty('height', 'calc(18 / 320 * 100%)');

      if(direction == 1)
        robotArrow.style.setProperty('transform', 'rotate(90deg)');
      else
        robotArrow.style.setProperty('transform', 'rotate(-90deg)');

      if(position == 0 || (position == 1 || position == 2))
        robot.style.setProperty('left', 'calc(20 / 320 * 100% + 100 / 320 * 100%)');
      else
        robot.style.setProperty('left', 'calc(20 / 320 * 100% + 150 / 320 * 100%)');

      if(position == 0 || position == 3)
        robot.style.setProperty('top', 'calc(11 / 320 * 100% + 70 / 320 * 100%)');
      else if(position == 1 || position == 4)
        robot.style.setProperty('top', 'calc(11 / 320 * 100% + 40 / 320 * 100%)');
      else
        robot.style.setProperty('top', 'calc(11 / 320 * 100% + 10 / 320 * 100%)');

      break;

    case 1:
      robot.style.setProperty('width', 'calc(18 / 320 * 100%)');
      robot.style.setProperty('height', 'calc(30 / 320 * 100%)');

      if(direction == 1)
        robotArrow.style.setProperty('transform', 'rotate(180deg)');
      else
        robotArrow.style.setProperty('transform', 'rotate(0deg)');

      if(position == 0 || (position == 1 || position == 2))
        robot.style.setProperty('top', 'calc(20 / 320 * 100% + 100 / 320 * 100%)');
      else
        robot.style.setProperty('top', 'calc(20 / 320 * 100% + 150 / 320 * 100%)');

      if(position == 0 || position == 3)
        robot.style.setProperty('left', 'calc(11 / 320 * 100% + 210 / 320 * 100%)');
      else if(position == 1 || position == 4)
        robot.style.setProperty('left', 'calc(11 / 320 * 100% + 240 / 320 * 100%)');
      else
        robot.style.setProperty('left', 'calc(11 / 320 * 100% + 270 / 320 * 100%)');

      break;
    
    case 2:
      robot.style.setProperty('width', 'calc(30 / 320 * 100%)');
      robot.style.setProperty('height', 'calc(18 / 320 * 100%)');

      if(direction == 1)
        robotArrow.style.setProperty('transform', 'rotate(-90deg)');
      else
        robotArrow.style.setProperty('transform', 'rotate(90deg)');

      if(position == 0 || (position == 1 || position == 2))
        robot.style.setProperty('left', 'calc(20 / 320 * 100% + 150 / 320 * 100%)');
      else
        robot.style.setProperty('left', 'calc(20 / 320 * 100% + 100 / 320 * 100%)');

      if(position == 0 || position == 3)
        robot.style.setProperty('top', 'calc(11 / 320 * 100% + 210 / 320 * 100%)');
      else if(position == 1 || position == 4)
        robot.style.setProperty('top', 'calc(11 / 320 * 100% + 240 / 320 * 100%)');
      else
        robot.style.setProperty('top', 'calc(11 / 320 * 100% + 270 / 320 * 100%)');

      break;
    
    case 3:
      robot.style.setProperty('width', 'calc(18 / 320 * 100%)');
      robot.style.setProperty('height', 'calc(30 / 320 * 100%)');

      if(direction == 1)
        robotArrow.style.setProperty('transform', 'rotate(0deg)');
      else
        robotArrow.style.setProperty('transform', 'rotate(180deg)');

      if(position == 0 || (position == 1 || position == 2))
        robot.style.setProperty('top', 'calc(20 / 320 * 100% + 150 / 320 * 100%)');
      else
        robot.style.setProperty('top', 'calc(20 / 320 * 100% + 100 / 320 * 100%)');

      if(position == 0 || position == 3)
        robot.style.setProperty('left', 'calc(11 / 320 * 100% + 70 / 320 * 100%)');
      else if(position == 1 || position == 4)
        robot.style.setProperty('left', 'calc(11 / 320 * 100% + 40 / 320 * 100%)');
      else
        robot.style.setProperty('left', 'calc(11 / 320 * 100% + 10 / 320 * 100%)');

      break;
  };
}

function renderCube(side, pos, color) {
  var cubeDiv = document.createElement("div");
  cubeDiv.classList.add("cube");
  cubeDiv.classList.add(color + "-cube");
  var top, left;

  switch(side) { 
    case 3: {
      top = 195 - pos % 3 * 50;
      left = 35 + 20 * (pos > 2);
      cubeDiv.style.setProperty('top', 'calc(10 / 320 * 100% + ' + String(top) +' / 320 * 100%)');
      cubeDiv.style.setProperty('left', 'calc(10 / 320 * 100% + ' + String(left) +' / 320 * 100%)');
      break;
    }
    case 0: {
      top = 35 + 20 * (pos > 2);
      left = 95 + pos % 3 * 50;
      cubeDiv.style.setProperty('top', 'calc(10 / 320 * 100% + ' + String(top) +' / 320 * 100%)');
      cubeDiv.style.setProperty('left', 'calc(10 / 320 * 100% + ' + String(left) +' / 320 * 100%)');
      break;
    }
    case 1: {
      top = 95 + pos % 3 * 50;
      left = 255 - 20 * (pos > 2);
      cubeDiv.style.setProperty('top', 'calc(10 / 320 * 100% + ' + String(top) +' / 320 * 100%)');
      cubeDiv.style.setProperty('left', 'calc(10 / 320 * 100% + ' + String(left) +' / 320 * 100%)');
      break;
    }
    case 2: {
      top = 255 - 20 * (pos > 2);
      left = 95 + pos % 3 * 50;
      cubeDiv.style.setProperty('top', 'calc(10 / 320 * 100% + ' + String(top) +' / 320 * 100%)');
      cubeDiv.style.setProperty('left', 'calc(10 / 320 * 100% + ' + String(left) +' / 320 * 100%)');
      break;
    }
    // Add cases for other sides as needed

    default: {
      // handle default case
      break;
    }
  }
  

  var objectContainerDiv = document.getElementById("object-container");
  objectContainerDiv.appendChild(cubeDiv);
}

function renderCubes() {
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j  < 6; j++) {
      if(lightSigns[i][j] == 1) 
        renderCube(i, j, 'red');
      if(lightSigns[i][j] == 2) 
        renderCube(i, j, 'green');
    }
  }
}

function renderWalls() {
  var topWall = document.getElementById("top-wall");
  var rightWall = document.getElementById("right-wall");
  var bottomWall = document.getElementById("bottom-wall");
  var leftWall = document.getElementById("left-wall");

  topWall.style.setProperty('top', 'calc(10 / 320 * 100% + ' + String(100 - 40 * walls[0]) + ' / 320 * 100%)');
  topWall.style.setProperty('height', 'calc(4 / 320 * 100%)');
  topWall.style.setProperty('width', 'calc(' + String(100 + 40 * (walls[1] + walls[3])) + ' / 320 * 100%)');
  topWall.style.setProperty('left', 'calc(10 / 320 * 100% + ' + String(100 - 40 * walls[3]) + ' / 320 * 100%)');
  
  bottomWall.style.setProperty('top', 'calc(6 / 320 * 100% + ' + String(200 + 40 * walls[2]) + ' / 320 * 100%)');
  bottomWall.style.setProperty('height', 'calc(4 / 320 * 100%)');
  bottomWall.style.setProperty('width', 'calc(' + String(100 + 40 * (walls[1] + walls[3])) + ' / 320 * 100%)');
  bottomWall.style.setProperty('left', 'calc(10 / 320 * 100% + ' + String(100 - 40 * walls[3]) + ' / 320 * 100%)');

  rightWall.style.setProperty('left', 'calc(6 / 320 * 100% + ' + String(200 + 40 * walls[1]) + ' / 320 * 100%)');
  rightWall.style.setProperty('width', 'calc(4 / 320 * 100%)');
  rightWall.style.setProperty('height', 'calc(' + String(100 + 40 * (walls[0] + walls[2])) + ' / 320 * 100%)');
  rightWall.style.setProperty('top', 'calc(10 / 320 * 100% + ' + String(100 - 40 * walls[0]) + ' / 320 * 100%)');

  leftWall.style.setProperty('left', 'calc(10 / 320 * 100% + ' + String(100 - 40 * walls[3]) + ' / 320 * 100%)');
  leftWall.style.setProperty('width', 'calc(4 / 320 * 100%)');
  leftWall.style.setProperty('height', 'calc(' + String(100 + 40 * (walls[0] + walls[2])) + ' / 320 * 100%)');
  leftWall.style.setProperty('top', 'calc(10 / 320 * 100% + ' + String(100 - 40 * walls[0]) + ' / 320 * 100%)');
}

function renderParking() {
  // parking is just for the final round, it is composed of 2 magenta elements, of lenght 20, width 2
  // they should be always spaced by 30 * 1.25 = 37.5
  var parking1 = document.getElementById("parking1");
  var parking2 = document.getElementById("parking2");

  // change display of parking elements to block
  parking1.style.setProperty('display', 'block');
  parking2.style.setProperty('display', 'block');

  if(parkingPos & 1) {
    parking1.style.setProperty('width', 'calc(20 / 320 * 100%)');
    parking1.style.setProperty('height', 'calc(2 / 320 * 100%)');
    parking2.style.setProperty('width', 'calc(20 / 320 * 100%)');
    parking2.style.setProperty('height', 'calc(2 / 320 * 100%)');
    

    if(parkingPos == 1) {
      parking1.style.setProperty('top', 'calc(10 / 320 * 100% + 100 / 320 * 100%)');
      parking2.style.setProperty('top', 'calc(10 / 320 * 100% + 137.5 / 320 * 100%)');
      parking1.style.setProperty('left', 'calc(10 / 320 * 100% + 280 / 320 * 100%)');
      parking2.style.setProperty('left', 'calc(10 / 320 * 100% + 280 / 320 * 100%)');
    } else {
      parking1.style.setProperty('top', 'calc(8 / 320 * 100% + 200 / 320 * 100%)');
      parking2.style.setProperty('top', 'calc(8 / 320 * 100% + 162.5 / 320 * 100%)');
      parking1.style.setProperty('left', 'calc(10 / 320 * 100%)');
      parking2.style.setProperty('left', 'calc(10 / 320 * 100%)');
    }
  } else {
    parking1.style.setProperty('width', 'calc(2 / 320 * 100%)');
    parking1.style.setProperty('height', 'calc(20 / 320 * 100%)');
    parking2.style.setProperty('width', 'calc(2 / 320 * 100%)');
    parking2.style.setProperty('height', 'calc(20 / 320 * 100%)');

    if(parkingPos == 0) {
      parking1.style.setProperty('top', 'calc(10 / 320 * 100%)');
      parking2.style.setProperty('top', 'calc(10 / 320 * 100%)');
      parking1.style.setProperty('left', 'calc(10 / 320 * 100% + 100 / 320 * 100%)');
      parking2.style.setProperty('left', 'calc(10 / 320 * 100% + 137.5 / 320 * 100%)');
    } else {
      parking1.style.setProperty('top', 'calc(10 / 320 * 100% + 280 / 320 * 100%)');
      parking2.style.setProperty('top', 'calc(10 / 320 * 100% + 280 / 320 * 100%)');
      parking1.style.setProperty('left', 'calc(8 / 320 * 100% + 200 / 320 * 100%)');
      parking2.style.setProperty('left', 'calc(8 / 320 * 100% + 162.5 / 320 * 100%)');
    }
  }
}

function hideParking() {
  var parking1 = document.getElementById("parking1");
  var parking2 = document.getElementById("parking2");

  parking1.style.setProperty('display', 'none');
  parking2.style.setProperty('display', 'none');
}

function renderMat() {
  randomizer();
  console.log("Robot position:");
  console.log(car);
  console.log("Cube position:");
  console.log(lightSigns);
  console.log("Wall positions:");
  console.log(walls);
  console.log("Parking position:" + parkingPos);

  if(round == 'Final') {
    document.querySelectorAll(".cube").forEach(Element => {
      Element.style.setProperty('display', 'none');
    });

    renderRobot(car.side, car.position, car.direction);
    renderCubes();
    renderWalls();
    renderParking();
  }
  else {
    document.querySelectorAll(".cube").forEach(Element => {
      Element.style.setProperty('display', 'none');
    });

    renderRobot(car.side, car.position, car.direction);
    renderWalls();
    hideParking();
  }
}

window.onload = function() {
  renderMat();
}