/**
 * Linework's core methods
 *
 * @since 0.0.1
 * @author Richard Tan <chardos@gmail.com>
 */
import { isFunction } from './helpers';
import Point from './point';

export default class LineworkCore {
	/**
	 * Linework core constructor
	 *
	 * @constructor
	 *
	 * @param {object} options
	 */
	constructor(options) {
		this.context = options.context;
    this.currentPosition = options.startPosition;
		this.debugMode = options.debugMode;
		this.speed = options.speed;

		this.queue = [];
		this.reset();
	}

	setContext(context) {
		this.context = context;
	}

	setDebug(bool) {
		this.debugMode = bool;
	}

	setPosition(point) {
		this.currentPosition = point;
	}

	setSpeed(speed) {
		this.speed = speed;
	}

	hasReachedDestination() {
		return this.currentPosition.X === this.destination.X
				&& this.currentPosition.Y === this.destination.Y;
	}

	getNextPosition() {
			const distance = this.currentPosition.distanceTo(this.destination);
			if (distance <= this.speed) {
				return this.destination;
			}
			return this.currentPosition.moveByAngleAndDistance(this.angle, distance);
	}

	reset() {
		this.isAnimating = false;
		this.destination = this.currentPosition;
		this.angle = 0;
		this.onComplete = null;
	}

	enqueueDestination(dest, onComplete) {
		this.queue.push({
			func: curPos => dest,
			onComplete
		});
	}

	enqueueFunction(func, onComplete) {
		this.queue.push({
			func: curPos => func(curPos),
			onComplete
		});
	}

	drawLineTo(point, onComplete) {
		this.enqueueDestination(point, onComplete);
		this.animate();
	}

	drawLineDirection(direction, distance, onComplete) {
		throw new Error('TODO: not implemented error');
	}

	drawLineAngle(degrees, distance, onComplete) {
		const point = this.currentPosition.moveByAngleAndDistance(degrees, distance);
		this.enqueueDestination(point, onComplete);
		this.animate();
	}

	drawLineFunc(func, onComplete) {
		this.enqueueFunction(func, onComplete);
		this.animate();
	}

	drawLineSegment(nextPosition) {
		this.context.beginPath();
		this.context.moveTo(this.currentPosition.x, this.currentPosition.y);
		this.context.lineTo(nextPosition.x, nextPosition.y);
		this.context.stroke();
		this.context.closePath();
	}

	animate() {
		if (!this.isAnimating && this.queue.length) {
			const nextItem = this.queue.shift();
			this.destination = nextItem.func(this.currentPosition);
			this.angle = this.currentPosition.angleTo(this.destination);
			this.onComplete = nextItem.onComplete;
			this.isAnimating = true;

			this.animateStep();
		}
	}

	animateStep() {
		const step = () => {
			const nextPosition = this.getNextPosition();
			if (!this.hasReachedDestination()) {
				this.drawLineSegment(nextPosition);
				this.currentPosition = nextPosition;

				if (!this.debugMode) {
					requestAnimationFrame(step);
				} else {
					setTimeout(step, this.speed);
				}
			} else {
				if (isFunction(this.onComplete)) {
					this.onComplete(this.currentPosition);
				}
				this.reset();
				this.animate();
			}
		};

		step();
	}
}
