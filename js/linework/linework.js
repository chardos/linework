/**
* Linework - Public interface
*
* Desired API
* var line = new Linework()
* line.setPosition(x,y)
* line.drawLine(degrees, distance, callback)
* line.drawLineTo(x, y, speed(optional), callback(optional))
* line.turnLeft(degrees, distance)
* line.curveLeft(degrees, radius)
* line.drawCircle(degrees, radius)
*
* @since 0.0.1
* @author Richard Tan <chardos@gmail.com>
*/
import $ from 'jquery';
import {isDefined, isObject, isNumber, isString, isFunction, wrapAround} from './helpers';
import LineworkCore from './core';
import Point from './point';

export class Linework {
  /**
   * Linework constructor
   *
   * @constructor
   *
   * @param {object} options  Default options
   */
  constructor(options = {}) {
    const defaults = {
      speed:         1,
      context:       null,
      debugMode:     false,
      startPosition: new Point(0, 0),
    };
    const mergedOptions = $.extend({}, defaults, options);

    // Delegate the methods to another class to hide the methods from the public interface
    this.core = new LineworkCore(mergedOptions);
  }

  /**
   * Set the canvas's context
   *
   * @param {object} context
   *
   * @return {Linework}
   */
  setContext(context) {
    this.core.setContext(context);

    return this;
  }

  /**
   * Set debug mode
   *
   * @param {boolean} bool
   *
   * @return {Linework}
   */
  setDebug(bool) {
    this.core.setDebug(bool);

    return this;
  }

  /**
   * Set the current position
   *
   * @param {number} x
   * @param {number} y
   *
   * @return {Linework}
   */
  setPosition(x, y) {
    const point = wrapAround(new Point(x, y));
    this.core.setPosition(point);

    return this;
  }

  /**
   * Set the speed
   *
   * @param {number} newSpeed
   *
   * @return {Linework}
   */
  setSpeed(newSpeed) {
    this.core.setSpeed(newSpeed);

    return this;
  }

  /**
   * Draw a line
   *
   * @param {...*} params - object - {x: number, y: number}
   *                      - function - currentPosition => newPosition
   *                      - string - direction
   *                      - number - distance
   *
   * @return {Linework}
   */
  drawLine(...params) {
    if (params.length === 0) {
      throw new Error('TODO invalid argument error');
    }

    if (isObject(params[0])) {
      const obj = params[0];
      if (isDefined(obj.x) && isDefined(obj.y)) {
        this.core.drawLineTo(obj.x, obj.y, obj.onComplete);
      } else if (isDefined(obj.degrees) && isDefined(obj.distance)) {
        this.core.drawLineANgle(obj.degrees, obj.distance, obj.onComplete);
      } else if (isDefined(obj.direction) && isDefined(obj.distance)) {
        this.core.drawLineDirection(obj.direction, obj.distance, obj.onComplete);
      } else {
        throw new Error('TODO Object incorrect format error');
      }
    } else if (isNumber(params[0]) && isNumber(params[1])) {
      const degrees = params[0];
      const distance = params[1];

      this.core.drawLineAngle(degrees, distance);
    } else if (isString(params[0]) && isNumber(params[1])) {
      const direction = params[0];
      const distance = params[1];

      this.core.drawLineDirection(direction, distance);
    } else if (isFunction(params[0])) {
      this.core.drawLineFunc(params[0]);
    } else {
      throw new Error('TODO another invalid argument error');
    }

    return this;
  }

  drawCurve(...params) {
    throw new Error('Not implemented error');
  }

  drawCircle(...params) {
    throw new Error('Not implemented error');
  }
}
