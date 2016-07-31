function Linework(){
  this.speed = 7;
  this.isAnimating = false;
  this.requiresSetup = true; //Only want to allow setup to happen once.
  this.debugMode = 300; // Number of ms to slow down to. 0 will turn debugMode off.
}
