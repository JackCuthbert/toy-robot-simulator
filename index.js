import Robot from './lib/Robot';

let robotElement = null;

document.addEventListener("DOMContentLoaded", () => {
    // Get robot
    robotElement = document.querySelector('.robot');

    // Robby go!
    const robot = new Robot('Robby', renderFunction);

    // Bind event handlers
    document.querySelector('.place').addEventListener('click', e => {
        let x = document.querySelector('.placeX').value,
            y = document.querySelector('.placeY').value,
            facing = document.querySelector('.placeDirection').value;

        // Ensure these are ints!
        robot.place(parseInt(x), parseInt(y), facing);
    });

    document.querySelector('.move').addEventListener('click', e => {
        robot.move();
    });

    document.querySelector('.rotateLeft').addEventListener('click', e => {
        robot.left();
    });

    document.querySelector('.rotateRight').addEventListener('click', e => {
        robot.right();
    });

    document.querySelector('.report').addEventListener('click', e => {
        robot.report();
    });

    document.querySelector('.remove').addEventListener('click', e => {
        document.querySelector('.placeX').value = 0;
        document.querySelector('.placeY').value = 0;
        robot.remove();
    });

});


function renderFunction(robot) {
    if (robot.placed) {
        robotElement.classList.add('placed');
    } else {
        robotElement.classList.remove('placed');
    }

    robotElement.setAttribute('data-direction', robot.facing.toLowerCase());
    robotElement.setAttribute('style', `bottom: ${robot.y * 20}%; left: ${robot.x * 20}%`);
}

// Little console output override
window.console = {
    log: function(str){
        const logWindow = document.querySelector('.log');
        const element = document.createElement('p');
        if (/(invalid)/gi.test(str)) {
            element.setAttribute('style', 'color: rgb(250,100,100)');
        }
        element.appendChild(document.createTextNode(str));
        if (logWindow.childNodes.length === 0) {
            logWindow.appendChild(element);
        } else {
            logWindow.insertBefore(element, logWindow.childNodes[0]);
        }
    },
    info: window.console.info,
    warn: window.console.warn,
    error: window.console.error
};
