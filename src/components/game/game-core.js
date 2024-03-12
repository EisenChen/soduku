export class Soduku {
    constructor() {
        this.board = Array.from(Array(9), () => Array(9).fill(-1));
        this.boardResetValue = Array.from(Array(9), () => Array(9).fill(-1));
        this.level = 'easy';
        this.restOfCells = 0;
    }
    getBoard() {
        return this.board;
    }
    setAnswer(col, row, val) {
        if (val == -1) this.board[col][row] = -1;
        if (val < 1 || val > 9) return;
        this.board[col][row] = val;
    }
    isValidRow(row) {
        let set = {};
        for (let i = 0; i < 9; i++) {
            let val = this.board[row][i];
            if (set[val] != undefined && val != -1) return false;
            set[val] = true;
        }
        return true;
    }
    isValidCol(col) {
        let set = {};
        for (let i = 0; i < 9; i++) {
            let val = this.board[i][col];
            if (set[val] != undefined && val != -1) return false;
            set[val] = true;
        }
        return true;
    }
    isValidBlock(top, left) {
        let set = {};
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let val = this.board[3 * top + i][3 * left + j];
                if (set[val] != undefined && val != -1) return false;
                set[val] = true;
            }
        }
        return true;
    }
    isValid() {
        for (let i = 0; i < 9; i++) {
            if (!this.isValidRow(i) || !this.isValidCol(i)) return false;
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!this.isValidBlock(i, j)) return false;
            }
        }
        return true;
    }
    clear() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.board[i][j] = -1;
            }
        }
    }
    isValidAnswer(i, j, val) {
        if (val < 1 || val > 9) return false;
        if (this.board[i][j] != -1) return false;
        this.setAnswer(i, j, val);
        if (!this.isValidCol(j) ||
            !this.isValidRow(i) ||
            !this.isValidBlock(Math.floor(i / 3), Math.floor(j / 3))) {
            this.setAnswer(i, j, -1);
            return false;
        }
        this.setAnswer(i, j, -1);
        return true;
    }
    getCandidates(i, j) {
        let val = this.board[i][j];        
        this.board[i][j] = -1;
        let arr = [];
        for (let k = 1; k < 10; k++) {
            if (this.isValidAnswer(i, j, k)) arr.push(k);
        }
        this.board[i][j] = val;
        return arr;
    }
    generateGame(i = 0, j = 0) {
        //Set next cell
        let next_i = j >= 8 ? i + 1 : i;
        let next_j = j < 8 ? j + 1 : 0;

        //Get valid option numbers
        let candidates = this.getCandidates(i, j);
        if (candidates.length === 0) return false;

        //Shuffle valid option numbers
        candidates.sort((a, b) => 0.5 - Math.random());

        for (let k = 0; k < candidates.length; k++) {
            this.board[i][j] = candidates[k];

            //Finish all cells
            if (i >= 8 && j >= 8) return true;

            //If cells after current cell were failed, try put another option number in current cell.
            if (!this.generateGame(next_i, next_j)) {
                continue;
            } else {
                return true;
            }
        }
        //If all current cells were tried but not correct, reset current cell and go back.
        if (i < 8 || j < 8) {
            this.board[i][j] = -1;
            return false;
        }
        return true;
    }
    getRestOfCells() {
        return this.restOfCells;
    }
    setLevel(level = 'easy') {
        this.level = level;
        this.restOfCells = 0;
        if (level === 'easy') this.restOfCells = 20;
        if (level === 'medium') this.restOfCells = 40;
        if (level === 'hard') this.restOfCells = 60;
        let arr = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                arr.push(`${i}${j}`);
            }
        }
        for (let i = 0; i < this.restOfCells; i++) {
            let idx = Math.floor(Math.random() * arr.length);
            let ele = arr[idx];
            let col = Math.floor(ele / 10);
            let row = ele % 10;
            this.board[col][row] = -1;
            arr.splice(idx, 1);
        }
    }
    getGameResetValue() {
        return this.boardResetValue;
    }
    setGameResetValue() {
        this.boardResetValue = structuredClone(this.board);
    }
    resetGame() {
        this.board = structuredClone(this.boardResetValue);
        if (this.level === 'easy') this.restOfCells = 20;
        if (this.level === 'medium') this.restOfCells = 40;
        if (this.level === 'hard') this.restOfCells = 60;
    }
    fillAllAnswer() {
        let cells = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.boardResetValue[i][j] === -1) cells.push([i, j]);
            }
        }
        this.fillAnswer(cells);
        this.restOfCells = 0;
    }
    fillAnswer(arr, idx = 0) {
        if (arr === undefined) return;
        let pCol = arr[idx][0];
        let pRow = arr[idx][1];
        let options = this.getCandidates(pCol, pRow);
        if (options.length === 0) return false;
        for (let i = 0; i < options.length; i++) {
            this.setAnswer(pCol, pRow, options[i]);
            if (idx === arr.length - 1) return true;
            let next = this.fillAnswer(arr, idx + 1);
            if (!next) continue;
            return true;
        }
        if (idx < arr.length - 1) {
            this.setAnswer(pCol, pRow, -1);
            return false;
        }
        return true;
    }
    generate(level) {
        this.clear();
        this.generateGame();
        this.setLevel(level);
        this.setGameResetValue();
    }
}
