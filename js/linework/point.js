/**
 * Point on the cartisian plane
 * @since 0.0.1
 * @author Richard Tan <chardos@gmail.com>
 */
 import { toRadians } from './helpers';

export default class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  angleTo(point) {
    const deg = Math.atan2(point.y - this.y, point.x - this.x) * 180 / Math.PI;
  	if (deg < 0) return deg + 360;
  	return deg;
  }

  distanceTo(point) {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
  }

  moveByAngleAndDistance(angle, distance) {
    const angleInRadians = toRadians(angle);
    return new Point(
      this.x + Math.cos(angleInRadians) * distance,
      this.y + Math.sin(angleInRadians) * distance
    );
  }
}
