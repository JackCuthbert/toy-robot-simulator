// Setup chai
chai.use(spies);
import chai, { expect } from 'chai';
import spies from 'chai-spies';

// To test...
import Robot from '../src/Robot';

describe('Robot', () => {

    describe('#report', () => {
        it('should run console.log once for each robot', () => {

            // Ensure that console log is run when report() is fired
            const logSpy = chai.spy.on(console, 'log');

            const danny = new Robot('Danny');
            const dennis = new Robot('Dennis');

            danny.place(0,0,'NORTH').report();
            dennis.place(1,2,'SOUTH').report();

            expect(logSpy).to.have.been.called.twice;
        });

        it('should run console.log multiple times for multiple robots', () => {

            // Ensure that console log is run when report() is fired
            const logSpy = chai.spy.on(console, 'log');

            const danny = new Robot('Danny');
            const dennis = new Robot('Dennis');

            danny.place(0,0,'NORTH').report().move().report().left().report();
            dennis.place(1,2,'SOUTH').report().left().move().right().move().report();

            expect(logSpy).to.have.been.called.exactly(5);
        });

        it('should log that the robot is not on the table when moves are attemped', () => {
            const logSpy = chai.spy.on(console, 'log');

            const steven = new Robot('Steven');

            steven.move().move().right().left();

            expect(logSpy).to.have.been.called.exactly(4);
            expect(logSpy).to.have.been.called.with('I\'m not on the table! use .place(x, y, direction) to place me.');
        });
    });

    describe('#place', () => {
        it('should throw errors if invalid placing occurs', () => {
            const ollie = new Robot('Ollie');
            expect(() => {
                ollie.place(-1,2,'EAST');
            }).to.throw();
            expect(() => {
                ollie.place(-511,15,'EAST');
            }).to.throw();
            expect(() => {
                ollie.place(4,0,'DERP');
            }).to.throw();
            expect(() => {
                ollie.place(4,0,'DERP');
            }).to.throw();
        });

        it('should return nulls if the robot isn\'t placed', () => {
            const winston = new Robot('Winston');
            const kellin = new Robot('Kellin');

            const notPlaced = {
                x: null,
                y: null,
                facing: null,
                name: 'Winston',
                placed: false,
                renderCallback: false
            };

            const notPlaced2 = {
                x: null,
                y: null,
                facing: null,
                name: 'Kellin',
                placed: false,
                renderCallback: false
            };

            expect(winston.move()).to.eql(notPlaced);
            expect(winston.move().move()).to.eql(notPlaced);

            expect(kellin.move()).to.eql(notPlaced2);
            expect(kellin.move().move()).to.eql(notPlaced2);
        });
    });

    describe('#move', () => {
        it('should set placed false', () => {
            expect(new Robot('Gerald').place(0,0,'NORTH').remove().placed).to.eql(false);
        });
    });

    describe('#move', () => {

        it('should return the currect coordinates when moved NORTH after being placed', () => {
            const jt = new Robot('JT');

            expect(jt.place(0,0,'NORTH').move()).to.eql({
                x: 0,
                y: 1,
                facing: 'NORTH',
                name: 'JT',
                placed: true,
                renderCallback: false
            });

            expect(jt.place(0,0,'north').move().move().move().move().move()).to.eql({
                x: 0,
                y: 4,
                facing: 'NORTH',
                name: 'JT',
                placed: true,
                renderCallback: false
            });
        });

        it('should return the currect coordinates when moved SOUTH after being placed', () => {
            const taylor = new Robot('Taylor');

            expect(taylor.place(0,2,'SOUTH').move().move().move().move().move()).to.eql({
                x: 0,
                y: 0,
                facing: 'SOUTH',
                name: 'Taylor',
                placed: true,
                renderCallback: false
            });

            expect(taylor.place(0,0,'south').move().move()).to.eql({
                x: 0,
                y: 0,
                facing: 'SOUTH',
                name: 'Taylor',
                placed: true,
                renderCallback: false
            });
        });

        it('should return the correct coordinates when moved WEST after being placed', () => {
            const adam = new Robot('Adam');

            expect(adam.place(1,3,'WEST').move()).to.eql({
                x: 0,
                y: 3,
                facing: 'WEST',
                name: 'Adam',
                placed: true,
                renderCallback: false
            });

            expect(adam.place(3,3,'WEST').move()).to.eql({
                x: 2,
                y: 3,
                facing: 'WEST',
                name: 'Adam',
                placed: true,
                renderCallback: false
            });

            expect(adam.place(3,3,'WEST').move().move().move()).to.eql({
                x: 0,
                y: 3,
                facing: 'WEST',
                name: 'Adam',
                placed: true,
                renderCallback: false
            });

            expect(adam.place(3,3,'WEST').move().move().move().move().move()).to.eql({
                x: 0,
                y: 3,
                facing: 'WEST',
                name: 'Adam',
                placed: true,
                renderCallback: false
            });
        });

        it('should return the correct coordinates when moved EAST after being placed', () => {
            const clint = new Robot('Clint');

            expect(clint.place(0,0, 'EAST').move()).to.eql({
                x: 1,
                y: 0,
                facing: 'EAST',
                name: 'Clint',
                placed: true,
                renderCallback: false
            });

            expect(clint.place(1,2, 'EAST').move().move().move().move()).to.eql({
                x: 4,
                y: 2,
                facing: 'EAST',
                name: 'Clint',
                placed: true,
                renderCallback: false
            });

            expect(clint.place(1,3, 'EAST').move().move()).to.eql({
                x: 3,
                y: 3,
                facing: 'EAST',
                name: 'Clint',
                placed: true,
                renderCallback: false
            });
        });
    });

    describe('#left', () => {
        it('should return the correct facing direction when rotating left after being placed', () => {
            const howard = new Robot('Howard');

            // 360
            expect(howard.place(0,0, 'NORTH').right().facing).to.eql('EAST');
            expect(howard.place(0,0, 'NORTH').right().right().facing).to.eql('SOUTH');
            expect(howard.place(0,0, 'NORTH').right().right().right().facing).to.eql('WEST');
            expect(howard.place(0,0, 'NORTH').right().right().right().right().facing).to.eql('NORTH');

            // Random
            expect(howard.place(0,0, 'WEST').right().facing).to.eql('NORTH');
            expect(howard.place(0,0, 'SOUTH').right().facing).to.eql('WEST');
            expect(howard.place(0,0, 'EAST').right().right().facing).to.eql('WEST');
            expect(howard.place(0,0, 'NORTH').right().right().right().facing).to.eql('WEST');
        });
    });

    describe('#right', () => {
        it('should return the correct facing direction when rotating right after being placed', () => {
            const tim = new Robot('Tim');

            // 360
            expect(tim.place(0,0, 'NORTH').left().facing).to.eql('WEST');
            expect(tim.place(0,0, 'NORTH').left().left().facing).to.eql('SOUTH');
            expect(tim.place(0,0, 'NORTH').left().left().left().facing).to.eql('EAST');
            expect(tim.place(0,0, 'NORTH').left().left().left().left().facing).to.eql('NORTH');

            // Random
            expect(tim.place(0,0, 'WEST').left().facing).to.eql('SOUTH');
            expect(tim.place(0,0, 'SOUTH').left().facing).to.eql('EAST');
            expect(tim.place(0,0, 'EAST').left().left().facing).to.eql('WEST');
            expect(tim.place(0,0, 'NORTH').left().left().left().facing).to.eql('EAST');
        });
    });

    describe('#place, #move, #left, #right', () => {
        it('should return the correct coordinates and facing direction after multiple operations', () => {
            const jeremy = new Robot('Jeremy');

            expect(jeremy.place(0,0,'NORTH')
                .move()
                .right()
                .move()
                .move()
                .left()
                .move()).to.eql({
                    x: 2,
                    y: 2,
                    facing: 'NORTH',
                    name: 'Jeremy',
                    placed: true,
                    renderCallback: false
                });
        });
    });
});



/*

Y

4   .    .    .    .    .

3   .    .    .    .    .

2   .    .    .    .    .

1   .    .    .    .    .

0   .    .    .    .    .

    0    1    2    3    4     X

*/
