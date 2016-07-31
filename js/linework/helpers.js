Linework.setContext = function (ctx){
	this.prototype.ctx = ctx;
}


Linework.prototype.findAngle = function(p1, p2){
  var deg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
	if(deg < 0) deg += 360;
	return deg;
}
Linework.prototype.getAngledPosition = function(pos, angle, distance){
	angle = toRadians(angle)
	return {
		x: pos.x + (Math.cos(angle) * distance),
		y: pos.y + (Math.sin(angle) * distance)
	}
}
Linework.prototype.getNextPos = function(angle){
	angle = toRadians(angle)
	return {
		x: this.currPos.x + (Math.cos(angle) * this.speed),
		y: this.currPos.y + (Math.sin(angle) * this.speed)
	}
}
Linework.prototype.setup = function(){
	this.currPos =  $.extend({}, this.origin);
  this.angle = this.findAngle(this.currPos, this.destination);
  this.nextPos = this.getNextPos(this.angle);
  this.direction = this.getDirection(this.angle);
}
Linework.prototype.drawLineSegment = function(ctx, currPos, nextPos){
	ctx.beginPath();
	ctx.moveTo(currPos.x, currPos.y);
	ctx.lineTo(nextPos.x, nextPos.y);
	ctx.stroke();
	ctx.closePath();
}
Linework.prototype.getDirection = function(angle){
	// Get the direction the line is travelling in
	// console.log(angle);
	if(angle >= 225 && angle < 315){
		return 'up';
	}
	else if(angle >= 315 || angle < 45){
		return 'right';
	}
	else if(angle >= 45 && angle < 135){
		return 'down';
	}
	else if(angle >= 135 && angle < 225){
		// console.log('left');
		return 'left';
	}
}
Linework.prototype.hasReachedDestination = function(direction, nextPos, dest){
	if(direction == 'up' && this.nextPos.y > this.destination.y){
		return false;
	}
	if(direction == 'down' && this.nextPos.y < this.destination.y){
		return false;
	}
	if(direction == 'left' && this.nextPos.x > this.destination.x){
		return false;
	}
	if(direction == 'right' && this.nextPos.x < this.destination.x){
		return false;
	}
	return true;
}
Linework.prototype.kickStart = function(){
	if(!this.isAnimating){
		this.queue[0]()
		this.isAnimating = true;
	}
}

//move one step forward
Linework.prototype.step = function(self){
	// check if the current pos has reached (or gone past) the destination
	if(self.hasReachedDestination(self.direction, self.nextPos, self.destination)){

		//draw the line segment to the destination (instead of the nextPos,
		//so it doesn't go past the destination).
		self.drawLineSegment(ctx, self.currPos, self.destination);

		self.queue.shift(1);
		if(self.queue.length){
			self.origin = self.destination;
			self.destination = self.queue[0].position;
			self.setup();
		}
		else{
			//Queue has been completed.
			self.origin = self.destination;
			self.isAnimating = false;
			self.requiresSetup = true;
			return;
		}
	}
	else{
		self.drawLineSegment(ctx, self.currPos, self.nextPos);
		//set next coordinates
		self.currPos =  $.extend({}, self.nextPos);
		self.nextPos = self.getNextPos(self.angle);
	}

	requestAnimationFrame( self.step.bind(null, self) )

}
