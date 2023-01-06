import { Direction } from "./Model/Direction"
import { Game } from "./Controller/Game"
import { GameElement } from "./Model/GameElement"
import { Difficulty } from "./Model/Difficulty"


const game = new Game(21)
const music = new Audio(' ./misc/Kubbi - Digestive biscuit.mp3')
const grid = document.querySelector('#grid')
const scoreLabel = document.querySelector('#score')
const difficultyLabel = document.querySelector('#difficulty')

const setup = () => {
    music.volume = 0.25
    music.loop = true
    music.autoplay = true
    grid?.addEventListener("keydown", (e) => {
        let keyboardEvent = <KeyboardEvent>e;
        switch (keyboardEvent.key.toUpperCase()) {
            case 'W':
                game.direction = Direction.north
                break;
            case 'A':
                game.direction = Direction.west
                break;
            case 'S':
                game.direction = Direction.south
                break;
            case 'D':
                game.direction = Direction.east
                break;
            case ' ':
                game.pause = !game.pause
                break;
            case 'R':
                game.triggerReset()
                break
            case 'F':
                game.changeDifficulty()
                break
            case 'M':
                toggleAudio()
                break
        }
    })
    grid?.setAttribute('style', `margin: 2.5em auto; width: ${game.size * 22}; height: ${game.size * 22}; display: grid; grid-template-rows: repeat(${game.size},1fr); grid-template-columns: repeat(${game.size},1fr); outline: none;`)
}

const render = () => {
    grid?.replaceChildren()
    if (scoreLabel?.innerHTML != undefined) {
        if (!game.gameOver) {
            scoreLabel.innerHTML = 'Score: ' + game.points
            if (game.win) {
                scoreLabel.innerHTML = 'Congratulations !'
            }
        } else {
            scoreLabel.innerHTML = 'Game Over'
        }
    }
    if (difficultyLabel?.innerHTML != undefined) {
        difficultyLabel.innerHTML = 'Difficulty: ' + Difficulty[game.difficulty].toUpperCase()
    }
    for (let j = 0; j < game.size; j++) {
        for (let i = 0; i < game.size; i++) {
            const div = document.createElement('div')
            if (game.gameFrame[i][j] === GameElement.Terrain) {
                div.setAttribute('style', 'height: 20px; width:20px; border: 1px solid black; background: gray;')
            } else if (game.gameFrame[i][j] === GameElement.Snake && !game.gameOver) {
                div.setAttribute('style', 'height: 20px; width:20px; border: 1px solid black; background: yellow;')
                if (game.win) {
                    div.setAttribute('style', 'height: 20px; width:20px; border: 1px solid black; background: blue;')
                }
            } else if (game.gameFrame[i][j] === GameElement.Snake && game.gameOver) {
                div.setAttribute('style', 'height: 20px; width:20px; border: 1px solid black; background: purple;')
            } else if (game.gameFrame[i][j] === GameElement.Apple) {
                div.setAttribute('style', 'height: 20px; width:20px; border: 1px solid black; background: red;')
            }
            grid?.appendChild(div)
        }
    }
}

setup() // Run once at start

setInterval(() => render(), 33) // Run with 30fps

function toggleAudio() {
    if (music?.paused) {
        music.play();
    } else {
        music?.pause();
    }
}