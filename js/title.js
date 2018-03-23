var playBut;
var scoreBut;
var backBut;
var scoreBoard;
var titleText;

titleState = {
  create: function() {
    var s = localStorage.getItem("highScore");
    var l = localStorage.getItem("level");
    console.log("highs " + s);

    if (!s) {
      console.log("in here");
      var score = [];
      var myJSON = JSON.stringify(score);
      localStorage.setItem("highScore", myJSON);
      titleAction();
    } else {
      titleAction();
    }

    if (!l) {
      localStorage.setItem("level", 0);
    } else if (l > 2) {
      localStorage.setItem("level", 0);
    }

  },
  // Input listener for menu
  update: function() {
  }
}


function titleAction() {
  if (backBut !== undefined){
      backBut.kill();
  }

  if (scoreBoard !== undefined){
    scoreBoard.destroy();
  }

  titleText = game.add.text(60, 20, "Crime Hunter!", { font: "50px", fill: "#ffffff", align: "centre" });
  game.stage.backgroundColor = '#004141';

  playBut = game.add.button(200, 100, 'playButton', playAction, this, 2, 1, 0);
  scoreBut = game.add.button(200, 140, 'scoreButton', scoreAction, this, 2, 1, 0);
}

function scoreAction() {
  playBut.kill();
  scoreBut.kill();
  titleText.destroy();

  scoreBoard = new ScoreBoard(this.game);

  console.log(localStorage.getItem("highScore"))
  var scores = JSON.parse(localStorage.getItem("highScore"));

  if (scores.length > 5) {
    //scores.shift();
    scores = scores.splice(0, 5);
    localStorage.setItem("highScore", JSON.stringify(scores));
  }

  scoreBoard.draw(scores);

  backBut = game.add.button(200, 200, 'backButton', titleAction, this, 2, 1, 0);

  game.stage.backgroundColor = '#004141';
}

function playAction() {
  game.state.start('preLevel');
}
