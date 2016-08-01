
/**
 * Linework helper methods
 *
 * @since 0.0.1
 * @author Richard Tan <chardos@gmail.com>
 */
import Point from './point';

export function toRadians(angle) {
  return angle * Math.PI / 180;
}

export function getDirection(angle) {
  if (angle >= 225 && angle < 315) return 'up';
  if (angle >= 315 || angle < 45) return 'right';
  if (angle >= 45 && angle < 315) return 'down';
  if (angle >= 135 && angle < 225) return 'left';

  return 'unknown';
}

export function mergeOptions(...optionsList) {
  let mergedOptions = {};

  optionsList.forEach(options => {
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        mergedOptions[key] = options[key];
      }
    }
  });

  return mergedOptions;
}

export function isDefined(variable) {
  return variable !== undefined && variable !== null;
}

export function isObject(variable) {
  return isDefined(variable) && typeof variable === 'object';
}

export function isNumber(variable) {
  return isDefined(variable) && typeof variable === 'number';
}

export function isString(variable) {
  return isDefined(variable) && typeof variable === 'string';
}

export function isFunction(variable) {
  return isDefined(variable) && typeof variable === 'function';
}

/**
 * Wrap position around the window if the position is outside of the windows bounds.
 *
 * @param {Point}	pos		Position to check if it is within window's bounds
 *
 * @returns {Point} The new position
 */
export function wrapAround(pos) {
  let x = pos.x;
  let y = pos.y;

	if (x > window.innerWidth) {
		x = 0;
	} else if (x < 0) {
		x = window.innerWidth;
	}
	if (y > window.innerHeight) {
		y = 0;
	} else if (y < 0) {
		y = window.innerHeight;
	}
	return new Point(x, y);
}
