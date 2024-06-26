import { Soduku } from "./game-core";

describe('Game Test', () => {
    let game = new Soduku();
    test('Valid game area', () => {
        expect(game.getBoard().length).toBe(9);
        expect(game.getBoard()[0].length).toBe(9);
    });
    test('Set answer', () => {
        let board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 1, 5, 6, 7, 8, 9, 1],
            [5, 6, 4, 8, 9, 1, 2, 3, 4],
            [8, 9, 7, 2, 3, 4, 5, 6, 7],
            [3, 1, 2, 6, 4, 8, 9, 1, 2],
            [6, 4, 5, 9, 7, 2, 3, 4, 5],
            [9, 7, 8, 3, 1, 5, 6, 7, 8],
        ]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, board[i][j]);
            }
        }
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                expect(game.getBoard()[i][j]).toBe(board[i][j]);
            }
        }
        ////////////
        game.setAnswer(0, 0, -3241);
        expect(game.getBoard()[0][0]).toBe(board[0][0]);
        ////////////
        game.setAnswer(0, 0, 184);
        expect(game.getBoard()[0][0]).toBe(board[0][0]);
        ////////////
        game.setAnswer(0, 0, -1);
        expect(game.getBoard()[0][0]).toBe(-1);
        ///////////
        game.setAnswer(0, 0, 3);
        expect(game.getBoard()[0][0]).toBe(3);
    });
    test('Check row', () => {
        let board = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1], //T
            [1, 2, 3, 4, 5, 6, 7, 8, 9], //T
            [9, 8, 7, 6, 5, 4, 3, 2, 1], //T
            [6, 7, 8, 9, 1, 2, 3, 4, 5], //T
            [1, 3, 5, 7, 9, 2, 4, 6, 8], //T
            [1, 1, 1, 2, 2, 2, 3, 3, 3], //F
            [1, 4, 7, 1, 4, 7, 1, 4, 7], //F
            [1, 5, 9, 9, 5, 1, 3, 5, 7], //F
            [3, 1, 3, 5, 8, -1, -1, 8, 8], //F
        ]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, board[i][j]);
            }
        }
        expect(game.isValidRow(0)).toBe(true);
        expect(game.isValidRow(1)).toBe(true);
        expect(game.isValidRow(2)).toBe(true);
        expect(game.isValidRow(3)).toBe(true);
        expect(game.isValidRow(4)).toBe(true);
        expect(game.isValidRow(5)).toBe(false);
        expect(game.isValidRow(6)).toBe(false);
        expect(game.isValidRow(7)).toBe(false);
        expect(game.isValidRow(8)).toBe(false);
    });
    test('Check column', () => {
        let board = [
            [-1, 1, 9, 6, 1, 1, 1, 3, 3],
            [-1, 2, 8, 7, 3, 1, 3, 2, 3],
            [-1, 3, 7, 8, 5, 1, 9, 4, 3],
            [-1, 4, 6, 9, 7, 2, 2, 9, 1],
            [-1, 5, 5, 1, 9, 2, 2, 3, 4],
            [-1, 6, 4, 2, 2, 2, 6, 6, 7],
            [-1, 7, 3, 3, 4, 3, 8, 1, 7],
            [-1, 8, 2, 4, 6, 3, 9, 4, 8],
            [-1, 9, 1, 5, 8, 3, 9, 7, 8],
        ]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, board[i][j]);
            }
        }
        expect(game.isValidCol(0)).toBe(true);
        expect(game.isValidCol(1)).toBe(true);
        expect(game.isValidCol(2)).toBe(true);
        expect(game.isValidCol(3)).toBe(true);
        expect(game.isValidCol(4)).toBe(true);
        expect(game.isValidCol(5)).toBe(false);
        expect(game.isValidCol(6)).toBe(false);
        expect(game.isValidCol(7)).toBe(false);
        expect(game.isValidCol(8)).toBe(false);
    });
    test('Check block', () => {
        let board = [
            [1, 3, -1, 1, 2, 3, 1, 3, 1],
            [-1, 2, -1, 4, 5, 6, 1, 2, 3],
            [-1, -1, 3, 7, 8, 9, 4, 5, 3],
            [-1, -1, -1, 1, 2, 3, 1, 3, 1],
            [-1, -1, -1, 4, 5, 6, 1, 2, 3],
            [-1, -1, -1, 7, 8, 9, 4, 5, 3],
            [-1, -1, -1, 1, 2, 3, 1, 3, 1],
            [-1, -1, -1, 4, 5, 6, 1, 2, 3],
            [-1, -1, -1, 7, 8, 9, 4, 5, 3],
        ]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, board[i][j]);
            }
        }
        expect(game.isValidBlock(0, 0)).toBe(false);
        expect(game.isValidBlock(0, 1)).toBe(true);
        expect(game.isValidBlock(0, 2)).toBe(false);
        expect(game.isValidBlock(1, 0)).toBe(true);
        expect(game.isValidBlock(1, 1)).toBe(true);
        expect(game.isValidBlock(1, 2)).toBe(false);
        expect(game.isValidBlock(2, 0)).toBe(true);
        expect(game.isValidBlock(2, 1)).toBe(true);
        expect(game.isValidBlock(2, 2)).toBe(false);
    });
    test('Valid game board', () => {
        let board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 1, 5, 6, 7, 8, 9, 1],
            [5, 6, 4, 8, 9, 1, 2, 3, 4],
            [8, 9, 7, 2, 3, 4, 5, 6, 7],
            [3, 1, 2, 6, 4, 8, 9, 1, 2],
            [6, 4, 5, 9, 7, 2, 3, 4, 5],
            [9, 7, 8, 3, 1, 5, 6, 7, 8],
        ]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, board[i][j]);
            }
        }
        expect(game.isValid()).toBe(false);
        board = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 1, 5, 6, 7, 8, 9, 4],
            [5, 6, 4, 8, 9, 1, 2, 3, 7],
            [8, 9, 7, 2, 3, 4, 5, 6, 1],
            [3, 1, 2, 6, 4, 8, 9, 7, 5],
            [6, 4, 5, 9, 7, 2, 3, 1, 8],
            [9, 7, 8, 3, 1, 5, 6, 4, 2],
        ]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, board[i][j]);
            }
        }
        expect(game.isValid()).toBe(true);
    });
    test('Clear game board', () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, 5);
            }
        }
        game.clear();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                expect(game.getBoard()[i][j]).toBe(-1);
            }
        }
    });
    test('Is valid answer', () => {
        expect(game.isValidAnswer(0, 0, -1)).toBe(false);
        expect(game.isValidAnswer(0, 0, 10)).toBe(false);
        game.clear();
        for (let i = 0; i < 9; i++) {
            game.setAnswer(i, i, i % 3 + 1);
        }
        expect(game.isValidAnswer(0, 0, 1)).toBe(false);
        expect(game.isValidAnswer(0, 0, 2)).toBe(false);
        expect(game.isValidAnswer(0, 1, 1)).toBe(false);
        expect(game.isValidAnswer(0, 1, 2)).toBe(false);
        expect(game.isValidAnswer(0, 0, 4)).toBe(false);
        expect(game.isValidAnswer(0, 1, 4)).toBe(true);
        expect(game.isValidAnswer(0, 3, 1)).toBe(false);
        expect(game.isValidAnswer(0, 3, 2)).toBe(true);
    });
    test('Get candidates', () => {
        game.clear();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                expect(game.getCandidates(i, j)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            }
        }
        ///////////////
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, i, i % 3 + 1);
            }
        }
        expect(game.getCandidates(0, 0)).toStrictEqual([1, 4, 5, 6, 7, 8, 9]);
        expect(game.getCandidates(0, 1)).toStrictEqual([4, 5, 6, 7, 8, 9]);
        expect(game.getCandidates(0, 2)).toStrictEqual([4, 5, 6, 7, 8, 9]);
        expect(game.getCandidates(0, 3)).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9]);
        expect(game.getCandidates(0, 4)).toStrictEqual([3, 4, 5, 6, 7, 8, 9]);
    });
    test('GenerateGame a valid game', () => {
        game.clear();
        for (let i = 0; i < 10; i++) {
            game.clear();
            game.generateGame();
            expect(game.isValid()).toBe(true);
        }
    });
    test('Set level', () => {
        game.clear();
        game.generateGame();
        game.setLevel('easy');
        let count = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.getBoard()[i][j] === -1) count++;
            }
        }
        expect(count).toBe(20);

        game.clear();
        game.generateGame();
        game.setLevel('medium');
        count = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.getBoard()[i][j] === -1) count++;
            }
        }
        expect(count).toBe(40);

        game.clear();
        game.generateGame();
        game.setLevel('hard');
        count = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.getBoard()[i][j] === -1) count++;
            }
        }
        expect(count).toBe(60);
    });
    test('Get right input cell numbers of current game',()=>{
        game.clear();
        game.generateGame();
        game.setLevel('easy');
        expect(game.getRestOfCells()).toBe(20);

        game.clear();
        game.generateGame();
        game.setLevel('medium');
        expect(game.getRestOfCells()).toBe(40);

        game.clear();
        game.generateGame();
        game.setLevel('hard');
        expect(game.getRestOfCells()).toBe(60);
        
    });
    test('Set reset board', () => {
        expect(game.getGameResetValue().length).toBe(9);
        expect(game.getGameResetValue()[0].length).toBe(9);
        game.generate('hard');
        game.setGameResetValue();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, 5);
            }
        }
        expect(game.getBoard()).not.toStrictEqual(game.getGameResetValue());
    });
    test('Reset board', () => {
        game.generate('hard');
        game.setGameResetValue();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                game.setAnswer(i, j, 5);
            }
        }
        game.resetGame();
        expect(game.getBoard()).toStrictEqual(game.getGameResetValue());
    });
    test('Auto fill answer', () => {
        game.clear();
        expect(game.fillAllAnswer()).toBe(true);

        game.generate();
        game.fillAllAnswer();
        let count = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.getBoard()[i][j] === -1) count++;
            }
        }
        expect(count).toBe(0);
        expect(game.isValid()).toBe(true);

        game.generate('medium');
        game.fillAllAnswer();
        count = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.getBoard()[i][j] === -1) count++;
            }
        }
        expect(count).toBe(0);
        expect(game.isValid()).toBe(true);

        game.generate('hard');
        game.fillAllAnswer();
        count = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.getBoard()[i][j] === -1) count++;
            }
        }
        expect(count).toBe(0);
        expect(game.isValid()).toBe(true);
    })
});
