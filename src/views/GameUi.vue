<template>
    <div class='container'>
        <div class="game-board" @click="setTimer()">
            <div v-for="(row, ridx) in board" :key="ridx" class="row">
                <div v-for="(cell, cidx) in row" :key="cidx" :id="'cell-' + ridx + cidx" :value="ridx + ',' + cidx"
                    class="cell" :class="{ 'selectable': gameResetVal[ridx][cidx] === -1, }"
                    @click="setSelectedCellStyle">
                    {{ cell == -1 ? '' : cell }}
                </div>
            </div>
        </div>
        <div class="control-panel">
            <div class="timer">
                <div class="timer-text">Time</div>
                <div class="timer-time">{{ timePassed }}</div>
            </div>
            <div class="message">
                {{ message }}
            </div>
            <div class="controller-board">
                <select class="level-selector" v-model="level" @change="init">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button @click="init">New Game</button>
                <button @click="reset">Reset</button>
                <button @click="getHint">Hint</button>
            </div>
            <div class="answer-board">
                <button v-for="i in 9" :key="i" @click="setAnswer(i)" class="answer">{{ i }}</button>
                <button class="answer" @click="setAnswer(-1)">Clear</button>
                <button class="answer" @click="fillAllAnswer">Solve</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Soduku } from '../components/game/game-core.js'


export default {
    data() {
        return {
            sudoku: new Soduku(),
            board: [],
            level: 'easy',
            timePassed: '00:00:00',
            timeCount: -1,
            timer: null,
            selectedCell: null,
            gameResetVal: [],
            restOfCells: 0,
            gameover: false,
        }
    },
    watch: {
        restOfCells(newVal) {
            if (newVal === 0 && this.sudoku.isValid()) {
                clearInterval(this.timer);
            }
        }
    },
    methods: {
        init() {
            this.clearHint();
            this.clearSelectedCellStyle();
            this.resetTimer();

            this.sudoku.generate(this.level);
            this.board = this.sudoku.getBoard();
            this.gameResetVal = this.sudoku.getGameResetValue();
            this.restOfCells = this.sudoku.getRestOfCells();
            this.gameover = false;
        },
        reset() {
            this.clearHint();
            this.clearSelectedCellStyle();
            this.resetTimer();

            this.sudoku.resetGame();
            this.board = this.sudoku.getBoard();
            this.restOfCells = this.sudoku.getRestOfCells();
            this.gameover = false;
        },
        getHint() {
            this.clearHint();
            if (this.selectedCell === null) return;
            let p = this.selectedCell.attributes.value.value.split(',');
            let options = this.sudoku.getCandidates(p[0], p[1]);
            let answers = document.querySelectorAll('.answer');
            for (let i = 0; i < answers.length; i++) {
                let val = Number(answers[i].innerText);
                if (options.find(ele => ele === val) != undefined) {
                    answers[i].classList.add('hint');
                }
            }
        },
        clearHint() {
            let eles = document.querySelectorAll('.hint');
            for (let i = 0; i < eles.length; i++) {
                eles[i].classList.remove('hint');
            }
        },
        setTimer() {
            if (this.timeCount >= 0) return;
            this.timeCount = 0;
            this.timer = setInterval(() => {
                this.timeCount++;
                this.setTimePassed();
            }, 1000);
        },
        setTimePassed() {
            if (this.gameover) return;
            if (this.timeCount < 0) this.timePassed = '00:00:00';
            if (this.timeCount < 0) return;
            let h = Math.floor(this.timeCount / 3600);
            let m = Math.floor(this.timeCount / 60) % 60;
            let s = this.timeCount % 60;
            this.timePassed = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        },
        resetTimer() {
            clearInterval(this.timer);
            this.timeCount = -1;
            this.setTimePassed();
        },
        setSelectedCellStyle(ele) {
            this.clearSelectedCellStyle();
            this.selectedCell = null;
            let p = ele.target.attributes.value.value.split(',');
            if (this.gameResetVal[p[0]][p[1]] != -1) return;
            this.selectedCell = document.getElementById(ele.target.id);
            this.selectedCell.classList.add('readytoinput');
        },
        clearSelectedCellStyle() {
            if (this.selectedCell != null)
                this.selectedCell.classList.remove('readytoinput');
        },
        setAnswer(ans) {
            if (this.selectedCell === null) return;
            let p = this.selectedCell.attributes.value.value.split(',');
            this.sudoku.setAnswer(p[0], p[1], ans);
            this.checkAnswer();
            if (ans != -1) this.restOfCells--;
            else this.restOfCells++;
        },
        checkAnswer() {
            if (!this.sudoku.isValid()) this.message = "Wrong!";
            else this.message = "";
        },
        fillAllAnswer() {
            this.sudoku.fillAllAnswer();
            this.restOfCells = 0;
            this.gameover = true;
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
}

.control-panel {
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 1200px) {
    .control-panel {
        width: min(768px,80%);
    }
}

.timer {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.timer-text {
    font-size: 2.5rem;
}

.timer-time {
    font-size: 2.5rem;
}

.message {
    height: 75px;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.controller-board {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    margin: 1rem auto;    
}

.level-selector {
    padding: 1rem 4rem 1rem 1rem;
}

.controller-board button {
    padding: 0.5rem;
}

.answer-board {
    width: 300px;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 1rem;    
}

.answer {
    width: 25%;
    height: 25%;
    margin: auto;
}

.hint {
    background-color: rgb(255, 255, 68);
}

.game-board {
    min-width: 350px;
    min-height: 350px;
    width: min(100%, 768px);
    aspect-ratio: 1/1;
    display: flex;
    padding: 2rem;
    flex-direction: column;
}

.row {
    width: 100%;
    aspect-ratio: 1/1;
    margin: auto;
    display: flex;
    flex-direction: row;
    border: 1px solid;
}

.cell {
    min-height: 30px;
    min-width: 30px;
    width: 100%;
    aspect-ratio: 1/1;
    border: 1px solid;
    flex-grow: 1;
    font-size: min(6vw, 50px);
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e0e0e0;
}

.selectable {
    background: #ffffff;
}

.selectable:hover {
    cursor: pointer;
}

.readytoinput {
    background: #00ffe5;
}
</style>
