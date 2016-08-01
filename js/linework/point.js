/**
 * Point on the cartisian plane
 * @since 0.0.1
 * @author Richard Tan <chardos@gmail.com>
 */
 import { toRadians } from './helpers';

export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }

  angleTo(point) {
    const deg = Math.atan2(point.Y - this.Y, point.X - this.X) * 180 / Math.PI;
  	if (deg < 0) return deg + 360;
  	return deg;
  }

  distanceTo(point) {
    return Math.sqrt(Math.pow(point.X - this.X, 2) + Math.pow(point.Y - this.Y, 2));
  }

  moveByAngleAndDistance(angle, distance) {
    const angleInRadians = toRadians(angle);
    return new Point(
      this.x + Math.cos(angleInRadians) * distance,
      this.y + Math.sin(angleInRadians) * distance
    );
  }
}
