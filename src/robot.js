export default class Robot {
    /**
     * Create a new robot
     * @param {string} name - The name of the robot
     * @constructor
     */
    constructor(name) {
        this.x = null;
        this.y = null;
        this.facing = null;
        this.name = name;
    }

    /*
     * Private methods
     * --------------------*/

    /**
     * Check if the supplied position is valid
     * @param {number} value - The x or y coordinate for checking.
     */
    _isValidPosition(value) {
        return value <= 4 && value >= 0;
    }

    /**
     * Check if the supplied facing direction is valid
     * @param {string} str - The direction string for checking
     */
    _isValidDirection(str) {
        return /(north|south|east|west)/gi.test(str);
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
            this.facing = facing;
        } else {
            throw new Error('Supplied invalid direction');
        }

        return this;
    }

    /**
     * Log the current robot information
     * @return {Robot} - The robot
     */
    report() {
        console.log(this);
        return this;
    }

    /**
     * Move the robot in the direction it's facing
     * @return {Robot} - The robot
     */
    move() {
        if (this.x === null || this.y === null || this.facing === null) {
            return this;
        } else {
            switch (this.facing) {
                case 'NORTH':
                    if (this._isValidPosition(this.y + 1)) {
                        this.y = this.y + 1;
                    }
                    return this;
                case 'SOUTH':
                    if (this._isValidPosition(this.y - 1)) {
                        this.y = this.y - 1;
                    }
                    return this;
                case 'EAST':
                    if (this._isValidPosition(this.x + 1)) {
                        this.x = this.x + 1;
                    }
                    return this;
                case 'WEST':
                    if (this._isValidPosition(this.x - 1)) {
                        this.x = this.x - 1;
                    }
                    return this;
                default:
                    return this;
            }
        }
    }
}
