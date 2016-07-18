# Toy Robot Simulator [![Travis branch](https://img.shields.io/travis/JackCuthbert/toy-robot-simulator/master.svg?maxAge=3600&style=flat-square)](https://travis-ci.org/JackCuthbert/toy-robot-simulator)

## Usage

```javascript
import Robot from 'path/to/Robot';

const robby = new Robot('Robby');

// Chaining move methods
robby.place(0, 0, 'NORTH').move().right().move().move().left().move()
    .report(); // 2, 2, NORTH

// Chaining placements
robby.place(0, 0, 'NORTH').move().right().move().move().left().move().right()
    .report() // 2, 2, EAST
    .place(1, 4, 'SOUTH').move().move().left().move().right().move()
    .report() // 2, 1, SOUTH

// Ignoring placements
const noPlaceForMe = new Robot('Mr Lonely');

noPlaceForMe.move().move().move().right()
    .report(); // I'm not on the table! use .place(x, y, direction) to place me.

// With a render function
const robot = new Robot('Mr. Roboto', renderFunction);

// All methods that change the orientation or the position will trigger this
function renderFunction(robot) {
    console.log(robot); // { x: null, y: null, name: 'Mr. Roboto', ... }
}
```

### API

#### `.place(x, y, facing)`

Place the robot at `x` and `y`, with a `facing` direction.

#### `.remove()`

Remove the robot from the table.

#### `.move()`

Move the robot 1 unit in the direction it's facing.

#### `.left()`

Rotate the robot to the left to face a new direction.

#### `.right()`

Rotate the robot to the right to face a new direction.

## GUI to control robot

```
$ npm install
$ npm start
```
Open <http://localhost:8080/>.
