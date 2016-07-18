import chai, { expect } from 'chai';

// To test...
import Robot from '../src/Robot';

describe('Robot', () => {

    describe('#report', () => {
        it('should return correct placement', () => {
            const danny = new Robot('Danny');
            const dennis = new Robot('Dennis');

            expect(danny.place(0,0,'NORTH').report()).to.eql({ x: 0, y: 0, facing: 'NORTH', name: 'Danny' });
            expect(dennis.place(1,2,'SOUTH').report()).to.eql({ x: 1, y: 2, facing: 'SOUTH', name: 'Dennis' });
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
    });

    describe('#move', () => {
        it('should return nulls if the robot isn\'t placed', () => {
            const winston = new Robot('Winston');
            const kellin = new Robot('Kellin');

            const notPlaced = {
                x: null,
                y: null,
                facing: null,
                name: 'Winston'
            };

            const notPlaced2 = {
                x: null,
                y: null,
                facing: null,
                name: 'Kellin'
            };

            expect(winston.move()).to.eql(notPlaced);
            expect(winston.move().move()).to.eql(notPlaced);

            expect(kellin.move()).to.eql(notPlaced2);
            expect(kellin.move().move()).to.eql(notPlaced2);
        });

        it('should return the currect coordinates when moved NORTH after being placed', () => {
            const jt = new Robot('JT');

            expect(jt.place(0,0,'NORTH').move()).to.eql({
                x: 0,
                y: 1,
                facing: 'NORTH',
                name: 'JT'
            });

            expect(jt.place(0,0,'NORTH').move().move().move().move().move()).to.eql({
                x: 0,
                y: 4,
                facing: 'NORTH',
                name: 'JT'
            });
        });

        it('should return the currect coordinates when moved SOUTH after being placed', () => {
            const taylor = new Robot('Taylor');

            expect(taylor.place(0,2,'SOUTH').move().move().move().move().move()).to.eql({
                x: 0,
                y: 0,
                facing: 'SOUTH',
                name: 'Taylor'
            });

            expect(taylor.place(0,0,'SOUTH').move().move()).to.eql({
                x: 0,
                y: 0,
                facing: 'SOUTH',
                name: 'Taylor'
            });
        });

        it('should return the correct coordinates when moved WEST after being placed', () => {
            const adam = new Robot('Adam');

            expect(adam.place(1,3,'WEST').move()).to.eql({
                x: 0,
                y: 3,
                facing: 'WEST',
                name: 'Adam'
            });

            expect(adam.place(3,3,'WEST').move()).to.eql({
                x: 2,
                y: 3,
                facing: 'WEST',
                name: 'Adam'
            });

            expect(adam.place(3,3,'WEST').move().move().move()).to.eql({
                x: 0,
                y: 3,
                facing: 'WEST',
                name: 'Adam'
            });

            expect(adam.place(3,3,'WEST').move().move().move().move().move()).to.eql({
                x: 0,
                y: 3,
                facing: 'WEST',
                name: 'Adam'
            });
        });
        it('should return the correct coordinates when moved EAST after being placed', () => {
            const clint = new Robot('Clint');

            expect(clint.place(0,0, 'EAST').move()).to.eql({
                x: 1,
                y: 0,
                facing: 'EAST',
                name: 'Clint'
            });

            expect(clint.place(1,2, 'EAST').move().move().move().move()).to.eql({
                x: 4,
                y: 2,
                facing: 'EAST',
                name: 'Clint'
            });

            expect(clint.place(1,3, 'EAST').move().move()).to.eql({
                x: 3,
                y: 3,
                facing: 'EAST',
                name: 'Clint'
            });
        });
    });

    describe('#left', () => {
        it('should return the correct facing direction when rotating left after being placed');
    });

    describe('#right', () => {
        it('should return the correct facing direction when rotating right after being placed');
    });
});



/*

X


4   .    .    .    .    .

3   .    .    .    .    .

2   .    .    .    .    .

1   .    .    .    .    .

0   .    .    .    .    .

    0    1    2    3    4     Y

*/
