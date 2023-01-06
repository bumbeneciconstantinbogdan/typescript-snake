import { Game } from "../Controller/Game"
import { Difficulty } from "../Model/Difficulty"


let game: Game
let size: number

beforeAll(()=>{
    size = 4
    game = new Game(size)
})

describe('Game', ()=>{
    it('Should have initial difficulty MEDIUM', ()=>{
        expect(game.difficulty).toBe(Difficulty.medium)
    })
    it('Should change difficulty', ()=>{
        game.changeDifficulty()
        expect(game.difficulty).toBe(Difficulty.hard)
        game.changeDifficulty()
        expect(game.difficulty).toBe(Difficulty.easy)
    })
})