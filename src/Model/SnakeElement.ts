import { Direction } from "./Direction";
import { Point } from "./Point";

export interface SnakeElement extends Point{
    direction: Direction
}