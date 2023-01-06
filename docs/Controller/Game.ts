import { Difficulty } from "../Model/Difficulty";
import { Direction } from "../Model/Direction";
import { GameElement } from "../Model/GameElement";
import { Point } from "../Model/Point";
import { Snake } from "./Snake";

export class Game {
    private _points: number
    private _snake: Snake
    private _size: number
    private _direction: Direction
    private _pause: boolean
    private _apple: Point
    private _gameOver: boolean
    private _gameFrame: Array<Array<GameElement>>
    private _reset: boolean
    private _difficulty: Difficulty
    private _win: boolean

    constructor(size: number) {
        this._points = 0
        this._size = size
        this._snake = new Snake({ x: parseInt((size / 2).toString()), y: parseInt((size / 2).toString()) })
        this._direction = Direction.east
        this._pause = false
        this._gameOver = false
        this._apple = this.generateRandomApple()
        this._reset = false
        this._win = false
        this._gameFrame = new Array<Array<GameElement>>(size)
        this._difficulty = Difficulty.medium
        for (let i = 0; i < size; i++) {
            this._gameFrame[i] = new Array<GameElement>(size)
        }
        this.run()

    }

    private run() {
        const intervalId = setInterval(() => {
            if(this._reset){
                this._snake.reset({ x: parseInt((this.size / 2).toString()), y: parseInt((this.size / 2).toString()) })
                this._reset = false
                clearInterval(intervalId)
                this.run()
            }
            if (!this._pause && !this._gameOver) {
                this._snake.move(this._direction)
                this.checkAppleEaten()
                this.checkBodyCollision()
                this.checkWallCollision()
                this.checkForWin()
                this.updateGameFrame()
            }
            if(this._win){
                clearInterval(intervalId)
            }
        }, this._difficulty)
    }
    
    public checkForWin():void {
       this._win = ( this._snake.body.length === this._size * this._size - 1 )
    }



    private generateRandomApple(): Point {
        return { x: parseInt((Math.random() * this._size).toString()), y: parseInt((Math.random() * this._size).toString()) }
    }

    private checkAppleEaten(): void {
        if (this._snake.hasCollision(this._apple)) {
            this._apple = this.generateRandomApple()
            this._points++
            this._snake.grow(this._apple)
        }
    }

    private checkBodyCollision(): void {
        for (let i = 1; i < this._snake.body.length; i++) {
            if (this._snake.hasCollision(this._snake.body[i])) {
                this._gameOver = true
            }
        }
    }

    private checkWallCollision(): void {
        if (this._snake.head.x < 0) {
            this._snake.head = { ...this._snake.head, x: this._size - 1 }
        }
        if (this._snake.head.x > this._size - 1) {
            this._snake.head = { ...this._snake.head, x: 0 }
        }
        if (this._snake.head.y < 0) {
            this._snake.head = { ...this._snake.head, y: this._size - 1 }
        }
        if (this._snake.head.y > this._size - 1) {
            this._snake.head = { ...this._snake.head, y: 0 }
        }
    }

    private updateGameFrame(): void {
        for (let j = 0; j < this._size; j++) {
            for (let i = 0; i < this._size; i++) {
                this._gameFrame[i][j] = GameElement.Terrain
            }
        }
        for(let i = 0; i < this._snake.body.length; i++){
            const {x, y} = this._snake.body[i]
            this._gameFrame[x][y] = GameElement.Snake
        }
        this.gameFrame[this._apple.x][this._apple.y] = GameElement.Apple
    }

    public triggerReset(): void{
        this._reset = true
        this._direction = Direction.east
        this._apple = this.generateRandomApple()
        this._points = 0
        this._gameOver = false
        this._win = false
    }

    public changeDifficulty(): void{
        switch(this._difficulty){
            case Difficulty.easy:
                this._difficulty = Difficulty.medium
                break;
            case Difficulty.medium:
                this._difficulty = Difficulty.hard
                break;
            case Difficulty.hard:
                this._difficulty = Difficulty.easy
                break;
        }
        this.triggerReset()
    }

    get size(): number {
        return this._size
    }

    get pause(): boolean {
        return this._pause
    }

    set pause(value: boolean) {
        this._pause = value
    }

    get points(): number {
        return this._points
    }

    get direction(): Direction {
        return this._direction
    }

    set direction(value: Direction) {
        this._direction = value
    }

    get difficulty() : Difficulty{
        return this._difficulty
    }

    get gameOver(): boolean {
        return this._gameOver
    }

    get win(): boolean{
        return this._win
    }

    get gameFrame(): Array<Array<GameElement>> {
        return this._gameFrame
    }
}