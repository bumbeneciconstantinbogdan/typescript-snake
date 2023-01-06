import {Snake} from '../Controller/Snake'
import { Direction } from '../Model/Direction'
import { Point } from '../Model/Point'


let initialPosition: Point
let apple: Point
let snake: Snake;

beforeAll(()=>{
    initialPosition = { x: 2, y: 2}
    apple = { ...initialPosition, x: initialPosition.x + 1 }
    snake = new Snake(initialPosition)
})


describe('SNAKE', ()=>{
    it('Should spawn the head at initial position', ()=>{
        expect(snake.head.x).toBe(initialPosition.x)
        expect(snake.head.y).toBe(initialPosition.y)
    })
    it('Should initialize with at least 1 head and one tail', ()=>{
        expect(snake.body.length).toBeGreaterThanOrEqual(2)
    })
    it('Should move', ()=>{
        snake.move(Direction.east)
        const {x, y} = snake.head
        expect(x).toBe(apple.x)
        expect(y).toBe(apple.y)
    })
    it('Should increase in size afer eat an apple', ()=>{
        const sizeBeforeApple = snake.body.length
        snake.grow(apple)
        const sizeAfterApple = snake.body.length
        expect(sizeAfterApple).toBe(sizeBeforeApple + 1)
    })
})