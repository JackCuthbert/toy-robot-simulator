export default class Robot {
    /**
     * Create a new robot
     * @param {string} name - The name of the robot
     * @constructor
     */
    constructor(name, renderCallback = false) {
        this.x = null;
        this.y = null;
        this.facing = null;
        this.name = name;
        this.placed = false;
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
    place(x, y, facing) {
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
    remove() {
        this.placed = false;
        if (this.renderCallback) this.renderCallback.bind(null, this).call();
        return this;
    }

    /**
     * Log the current robot information
     * @return {Robot} - The robot
     */
    report() {
        if (!this.placed) {
            console.log('I\'m not on the table! use .place(x, y, direction) to place me.');
        } else {
            console.log(`${this.x}, ${this.y}, ${this.facing.toUpperCase()}`);
        }
        return this;
    }

    /**
     * Move the robot in the direction it's facing
     * @return {Robot} - The robot
     */
    move() {
        if (this.placed) {
            if (this.facing === 'NORTH') {
                if (this._isValidPosition(this.y + 1)) this.y = this.y + 1;
            }

            else if (this.facing === 'SOUTH') {
                if (this._isValidPosition(this.y - 1)) this.y = this.y - 1;
            }

            else if (this.facing === 'EAST') {
                if (this._isValidPosition(this.x + 1)) this.x = this.x + 1;
            }

            else if (this.facing === 'WEST') {
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
     * @return {Robot} - The robot
     */
    left() {
        if (this.placed) {
            if (this.facing === 'NORTH') {
                this.facing = 'WEST';
            }

            else if (this.facing === 'WEST') {
                this.facing = 'SOUTH';
            }

            else if (this.facing === 'SOUTH') {
                this.facing = 'EAST';
            }

            else if (this.facing === 'EAST') {
                this.facing = 'NORTH';
            }
        } else {
            this.report();
        }

        if (this.renderCallback) this.renderCallback.bind(null, this).call();
        return this;
    }

    /**
     * Rotate the robot right
     * @return {Robot} - The robot
     */
    right() {
        if (this.placed) {
            if (this.facing === 'NORTH') {
                this.facing = 'EAST';
            }

            else if (this.facing === 'EAST') {
                this.facing = 'SOUTH';
            }

            else if (this.facing === 'SOUTH') {
                this.facing = 'WEST';
            }

            else if (this.facing === 'WEST') {
                this.facing = 'NORTH';
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
    _isValidPosition(value) {
        if (value <= 4 && value >= 0) {
            return true;
        } else {
            console.log(`Invalid move when facing ${this.facing}, try turning around!`);
        }
    }

    /**
     * Check if the supplied facing direction is valid
     * @private
     * @param {string} str - The direction string for checking
     * @return {boolean} Is valid direction
     */
    _isValidDirection(str) {
        return /(north|south|east|west)/gi.test(str);
    }
}
