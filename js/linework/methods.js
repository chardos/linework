Linework.setContext = function (ctx){
	this.prototype.ctx = ctx;
}
//Sets the global speed of all Lineworks
// Linework.setSpeed = function (speed){
//   console.log(this.prototype);
// 	this.prototype.speed = speed;
// }

Linework.prototype.setPosition = function (x, y){
  this.origin = {x: x, y: y};
  this.currPos = {x: x, y: y};
	this.queue = [];
}


Linework.prototype.drawLineTo = function (x, y){
  this.queue.push(this.drawLineTo_queued.bind(this, x, y))
  this.kickStart();
  //in kickstart, run thru the array
  return this;
}

Linework.prototype.drawLine = function (deg, distance){
  this.queue.push(this.drawLine_queued.bind(this, deg, distance))
  this.kickStart();

  return this;
}

Linework.prototype.drawLine_queued = function (deg, distance){
  var coords = this.getAngledPosition(this.currPos, deg, distance);
  return this.drawLineTo_queued(coords.x, coords.y);
}

Linework.prototype.drawLineTo_queued = function(x, y){
  this.destination = {x:x, y:y};
  var self = this;
  self.setup();
  function step(){
    // console.log('==========');
    // console.log('dir', self.direction);
    // console.log('nextpos',self.nextPos);
    // console.log('dest', self.destination);
    if(self.hasReachedDestination(self.direction, self.nextPos, self.destination)){
      console.log('reached');

      //draw the line segment to the destination (instead of the nextPos,
  		//so it doesn't go past the destination).
  		self.drawLineSegment(self.ctx, self.currPos, self.destination);

      self.origin = self.destination;
      self.queue.shift(1);
      if(self.queue.length) {
        self.queue[0]()
      }
      else{
        self.isAnimating = false;
      }

    }
    else{
      self.drawLineSegment(self.ctx, self.currPos, self.nextPos);
      self.currPos =  $.extend({}, self.nextPos);
      self.nextPos = self.getNextPos(self.angle);
      if (!self.debugMode) {
        requestAnimationFrame( step )
      }
    }
  }
  if (!this.debugMode) {
    requestAnimationFrame( step )
  }
  else{
    setInterval(step, 300)
  }

  return this;
}





//Desired API
// var line = new Linework()
// line.setPosition(x,y)
// line.drawLine(degrees, distance, callback)
// line.drawLineTo(x, y, speed(optional), callback(optional))
// line.turnLeft(degrees, distance)
// line.curveLeft(degrees, radius)
// line.drawCircle(degrees, radius)
