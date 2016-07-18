'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var directions = {
    NORTH: 'NORTH',
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST'
};

var Robot = function () {
    /**
     * Create a new robot
     * @param {string} name - The name of the robot
     * @constructor
     */

    function Robot(name) {
        var renderCallback = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        _classCallCheck(this, Robot);

        this.x = null;
        this.y = null;
        this.facing = null;
        this.placed = false;
        this.name = name;
        this.renderCallback = renderCallback;
    }

    /*
     * Public methods
     * --------------------*/

    /**
     * Place the robot at specified location and orientation
     * @param {number} x - The x coordinate of the robot
     * @param {number} y - The y coordinate of the robot
     * @param {string} facing - The direction the robot is facing
     * @return {object} The robot
     */


    _createClass(Robot, [{
        key: 'place',
        value: function place(x, y, facing) {
            if (this._isValidPosition(x) && this._isValidPosition(y)) {
                this.x = x;
                this.y = y;
            } else {
                throw new Error('Supplied an invalid position');
            }

            if (this._isValidDirection(facing)) {
                this.facing = facing.toUpperCase();
            } else {
                throw new Error('Supplied invalid direction');
            }

            // Robot is now placed!
            this.placed = true;
            if (this.renderCallback) this.renderCallback.bind(null, this).call();
            return this;
        }

        /**
         * Remove the robot from the table
         * @return {object} The robot
         */

    }, {
        key: 'remove',
        value: function remove() {
            this.placed = false;
            if (this.renderCallback) this.renderCallback.bind(null, this).call();
            return this;
        }

        /**
         * Log the current robot information
         * @return {Robot} The robot
         */

    }, {
        key: 'report',
        value: function report() {
            if (!this.placed) {
                console.log('I\'m not on the table! use .place(x, y, direction) to place me.');
            } else {
                console.log(this.x + ', ' + this.y + ', ' + this.facing.toUpperCase());
            }
            return this;
        }

        /**
         * Move the robot in the direction it's facing
         * @return {Robot} The robot
         */

    }, {
        key: 'move',
        value: function move() {
            if (this.placed) {
                if (this.facing === directions.NORTH) {
                    if (this._isValidPosition(this.y + 1)) this.y = this.y + 1;
                } else if (this.facing === directions.SOUTH) {
                    if (this._isValidPosition(this.y - 1)) this.y = this.y - 1;
                } else if (this.facing === directions.EAST) {
                    if (this._isValidPosition(this.x + 1)) this.x = this.x + 1;
                } else if (this.facing === directions.WEST) {
                    if (this._isValidPosition(this.x - 1)) this.x = this.x - 1;
                }
            } else {
                this.report();
            }

            if (this.renderCallback) this.renderCallback.bind(null, this).call();
            return this;
        }

        /**
         * Rotate the robot left
         * @return {Robot} The robot
         */

    }, {
        key: 'left',
        value: function left() {
            if (this.placed) {
                if (this.facing === directions.NORTH) {
                    this.facing = directions.WEST;
                } else if (this.facing === directions.WEST) {
                    this.facing = directions.SOUTH;
                } else if (this.facing === directions.SOUTH) {
                    this.facing = directions.EAST;
                } else if (this.facing === directions.EAST) {
                    this.facing = directions.NORTH;
                }
            } else {
                this.report();
            }

            if (this.renderCallback) this.renderCallback.bind(null, this).call();
            return this;
        }

        /**
         * Rotate the robot right
         * @return {Robot} The robot
         */

    }, {
        key: 'right',
        value: function right() {
            if (this.placed) {
                if (this.facing === directions.NORTH) {
                    this.facing = directions.EAST;
                } else if (this.facing === directions.EAST) {
                    this.facing = directions.SOUTH;
                } else if (this.facing === directions.SOUTH) {
                    this.facing = directions.WEST;
                } else if (this.facing === directions.WEST) {
                    this.facing = directions.NORTH;
                }
            } else {
                this.report();
            }

            if (this.renderCallback) this.renderCallback.bind(null, this).call();
            return this;
        }

        /*
         * Private methods
         * --------------------*/

        /**
         * Check if the supplied position is valid
         * @private
         * @param {number} value - The x or y coordinate for checking.
         * @return {boolean} Is valid position
         */

    }, {
        key: '_isValidPosition',
        value: function _isValidPosition(value) {
            if (value <= 4 && value >= 0) {
                return true;
            } else {
                console.log('Invalid move when facing ' + this.facing + ', try turning around!');
            }
        }

        /**
         * Check if the supplied facing direction is valid
         * @private
         * @param {string} str - The direction string for checking
         * @return {boolean} Is valid direction
         */

    }, {
        key: '_isValidDirection',
        value: function _isValidDirection(str) {
            return (/(north|south|east|west)/gi.test(str)
            );
        }
    }]);

    return Robot;
}();

exports.default = Robot;