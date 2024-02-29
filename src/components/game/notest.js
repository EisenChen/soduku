// class a {
//     constructor() {
//         this.aval = [1,2,3,4,5];
//         this.bval = this.aval;
//     }
// }


// const test = new a();

// console.log(test.aval,test.bval);
// test.aval[0]=10;
// console.log(test.aval,test.bval);

const test = require('./game-core');
const game = new test();

game.generate();

// game.autoFill();

// let count = 0;
// for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//         if (game.getBoard()[i][j] === -1) count++;
//     }
// }
// console.log(count);