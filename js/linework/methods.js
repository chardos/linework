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
      self.origin = self.destination;
      self.queue.shift(1);
      if(self.queue.length) self.queue[0]();

    }
    else{
      self.drawLineSegment(ctx, self.currPos, self.nextPos);
      self.currPos =  $.extend({}, self.nextPos);
      self.nextPos = self.getNextPos(self.angle);
      requestAnimationFrame( step )
    }
  }
  requestAnimationFrame( step )

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
