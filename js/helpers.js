//Figure out a way of composing this into the Line constructor



function move(pos, direction){
	if(direction == 'up'){
		return { x: pos.x, y: pos.y - 1};
	}
	else if(direction == 'right'){
		return { x: pos.x + 1, y: pos.y };
	}
	else if( direction == 'down' ){
		return { x: pos.x, y: pos.y + 1 };
	}
	else if( direction == 'left' ){
		return { x: pos.x - 1, y: pos.y };
	}
}

function getRandomDirection(n){
	var directions = ['up', 'right', 'down', 'left'];
	return directions[n];
}
function turnLeftOrRight(direction, n){
	var directions = ['up', 'right', 'down', 'left'];
	var direction = directions.indexOf(direction)
	if(n == 0){ //left
		direction--;
	}
	else{ //right
		direction++;
	}
	if(direction == 4) direction = 0;
	if(direction == -1) direction = 3;
	return directions[direction]
}

function wrapAround(pos, lastPos){
	if(pos.x > windowWidth){
		pos.x = 0;
		lastPos.x = 0;
	}
	if(pos.x < 0){
		pos.x = windowWidth;
		lastPos.x = windowWidth;
	}
	if(pos.y > windowHeight){
		pos.y = 0;
		lastPos.y = 0;
	}
	if(pos.y < 0){
		pos.y = windowHeight;
		lastPos.y = windowHeight;
	}
	return [pos, lastPos];
}
function toRadians(deg){
	return deg * Math.PI / 180;
}
function random(a, b){
	var range = b - a + 1;
	return Math.floor(Math.random()*range) + a;
}
function randomFloat(a, b){
	var range = b - a;
	return Math.random()*range + a;
}
