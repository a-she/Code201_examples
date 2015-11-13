var State = [
  "Nest", // In the nest
  "Hunt", // Hunting for rabbit
  "Win",  // Flying home w/ freshly caught rabbit
  "Dead"  // Bird is dead
]                     
var StateIdx = {
   Nest : 0,
   Hunt : 1,
   Win  : 2,
   Dead : 3
};

var Event = [
  "Time",  // Time has passed (makes bird hungry)
  "Hunt",  // Missed the rabbit
  "Catch", // Rabbit caught
  "Shot"   // Hunter shot the bird
]
var EventIdx = {
   Time  : 0,
   Hunt  : 1,
   Catch : 2,
   Shot  : 3
};

function birdFSM(st) {
  this.state = st; // Initial state
  console.log("birdFSM() constructor called with state = " + st);

  this.processInput = function(event) {
    console.log("processInput() called with event = " + event);
    switch (this.state) {

      case "Nest":
        if (event == "Time") { this.state = "Hunt"; }
        break;

      case "Hunt":
        switch (event) {
          case "Catch": this.state = "Win"; break;
          case "Shot":  this.state = "Dead"; break;
          default: break;
        }
        break;

      case "Win":
        if (event == "Shot") { this.state = "Dead"; }
        else { this.state = "Nest"; }
        break;

      case "Dead":
        console.log("Bird is (still) dead");
        break;

      default:
        break;
    }

    console.log("New state = " + this.state);
  }
}

var eagleFSM = new birdFSM("Nest");
eagleFSM.processInput("Time");
eagleFSM.processInput("Miss");
eagleFSM.processInput("Win");
eagleFSM.processInput("Time");
eagleFSM.processInput("Time");
eagleFSM.processInput("Miss");
eagleFSM.processInput("Shot");
eagleFSM.processInput("Time");
eagleFSM.processInput("Time");
