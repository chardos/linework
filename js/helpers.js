/**
 * Helpers for testing stuff in the browser
 *
 * @since 0.0.1
 * @copyright MIT
 * @author Richard Tan <chardos@gmail.com>
 */

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 *
 * @param {number}	min		Minimum value (inclusive)
 * @param {number}	max 	Maximum value (exclusive)
 *
 * @returns {number} A random number between min (inclusive) and max (exclusive)
 */
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (included) and max (excluded)
 *
 * @param {number}	min		Minimum integer (inclusive)
 * @param {number}	max 	Maximum integer (exclusive)
 *
 * @returns {number} A random integer between min (included) and max (excluded)
 */
export function getRandomInt(min, max) {
	return Math.floor(getRandomFloat(min, max));
}

/**
 * Returns a random direction.
 *
 * Possible directions: up, right, down, left
 *
 * @returns {string} Direction
 */
export function getRandomDirection() {
	const directions = ['up', 'right', 'down', 'left'];
	const randomIndex = getRandomInt(0, directions.length);
	return directions[randomIndex];
}

/**
 * Move by direction
 */
export function move(pos, direction) {
	if (direction === 'up') {
		return { x: pos.x, y: pos.y - 1 };
	} else if (direction === 'right') {
		return { x: pos.x + 1, y: pos.y };
	} else if (direction === 'down') {
		return { x: pos.x, y: pos.y + 1 };
	} else if (direction === 'left') {
		return { x: pos.x - 1, y: pos.y };
	}
	return { x: pos.x, y: pos.y };
}

/**
 *  Turn left or right
 */
export function turnLeftOrRight(direction, n) {
	var directions = ['up', 'right', 'down', 'left'];
	var direction = directions.indexOf(direction)
	if (n === 0) {  // left
		direction--;
	} else { // right
		direction++;
	}
	if (direction === 4) direction = 0;
	if (direction === -1) direction = 3;
	return directions[direction]
}
