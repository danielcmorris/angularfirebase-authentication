export class Square {
    id: string;
    topNumbers: number[];
    leftNumbers: number[];
    gameNumber: number;
    gameName: string;
    opponent: string;
    boxes: Array<Box>;
}

export class Box {
    id: string;
    home: number;
    away: number;
    name: string;
    uid: string;
}