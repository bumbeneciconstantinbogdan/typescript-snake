import { Direction } from "../Model/Direction";
import { Point } from "../Model/Point";
import { SnakeElement } from "../Model/SnakeElement";

export class Snake {
    private _body: Array<SnakeElement>;
    constructor(initialPosition: Point) {
        this.reset(initialPosition)
    }
    public move(direction: Direction): void {
        const { x, y } = this.head
        for (let i = this._body.length - 1; i > 0; i--) {
            this._body[i] = this._body[i - 1]
        }
        switch (direction) {
            case Direction.north: this.head = { x, y: y - 1, direction }; break;
            case Direction.south: this.head = { x, y: y + 1, direction }; break;
            case Direction.east: this.head = { x: x + 1, y, direction }; break;
            case Direction.west: this.head = { x: x - 1, y, direction }; break;
        }
    }
    public hasCollision(withPoint: Point): boolean {
        return this.head.x === withPoint.x && this.head.y === withPoint.y
    }

    public grow(withApple: Point): void {
        this._body.push({ ...withApple, direction: this.head.direction })
    }

    public reset(initialPosition: Point): void{
        this._body = new Array<SnakeElement>()
        this._body.push({ ...initialPosition, direction: Direction.east })
        this._body.push({ ...initialPosition, x: initialPosition.x - 1, direction: Direction.east })
    }

    get body(): Array<SnakeElement> {
        return this._body
    }

    get head(): SnakeElement {
        return this._body[0]
    }

    set head(value: SnakeElement) {
        this._body[0] = value
    }

}