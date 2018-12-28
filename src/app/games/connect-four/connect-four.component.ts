import {Component, ViewChild, OnInit} from '@angular/core';
import {ConnectFourService} from './services/connect-four.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: 'connect-four.component.html',
  styleUrls: ['connect-four.component.scss'],
  providers: [ConnectFourService]
})
export class ConnectFourComponent implements OnInit {
  redsTurnState: State;
  blacksTurnState: State;
  gameOverState: State;
  state: State;
  @ViewChild('myCanvas') myCanvas: any;

  constructor(private connectFourService: ConnectFourService) {
    const grid = new Grid();
    this.redsTurnState = new RedsTurnState(this, grid, this.connectFourService);
    this.blacksTurnState = new BlacksTurnState(this, grid, this.connectFourService);
    this.gameOverState = new GameOverState(this, grid, this.connectFourService);
    this.state = this.redsTurnState;
  }

  ngOnInit(): void {
    this.connectFourService.setContext(this.myCanvas.nativeElement.getContext('2d'));
    this.connectFourService.drawBoard();
  }

  setState(newState: State) {
    this.state = newState;
  }
}

export interface State {
  border: string;
  winningPlayer: string;
  isADraw: boolean;
  columnIsFull: boolean;
  newGameText: string;
  startNewGame(): void;
  clickOnCanvas(event: MouseEvent): void;
}

class GameOverState implements State {
  newGameText = 'New Game';
  columnIsFull: boolean;
  isADraw = false;
  winningPlayer = '';
  border: string;
  constructor(private gameboardComponent: ConnectFourComponent, private grid: Grid, private connectFourService: ConnectFourService) {
  }

  startNewGame() {
    this.connectFourService.drawBoard();
    this.grid.resetGrid();
    this.winningPlayer = '';
    this.isADraw = false;
    this.gameboardComponent.setState(this.gameboardComponent.redsTurnState);
  }

  clickOnCanvas(event: MouseEvent): void {}
}

abstract class PlayersTurn implements State {
  protected playerColor: string;
  protected winningString: string;
  protected gameboardComponent: ConnectFourComponent;
  protected connectFourService: ConnectFourService;
  protected grid: Grid;
  newGameText = 'Restart Game';
  columnIsFull: boolean;
  isADraw = false;
  winningPlayer = '';
  border: string;

  clickOnCanvas(event: MouseEvent) {
    this.columnIsFull = false;
    this.tryToDropInColumn(event);
  }

  tryToDropInColumn(event: MouseEvent) {
    const column = Math.floor(event.offsetX / 100) + 1;
    const row = this.grid.calculateRow(column);
    row > 0 ? this.dropInColumn(row, column) : this.columnIsFull = true;
  }

  dropInColumn(row: number, column: number) {
    this.grid.addPiece(column, row, this.playerColor);
    this.connectFourService.drawPiece(column, row, this.playerColor);
    this.changeState(row, column);
  }

  private changeState(row: number, column: number) {
    const connectedStrings: string[] = this.grid.getConnectedStrings(row, column);
    if (this.gameIsOver(connectedStrings)) {
      this.setGameOverState();
    } else {
      this.changeTurn();
    }
  }

  private gameIsOver(connectedStrings: string[]) {
    return this.checkForWinner(connectedStrings).length > 0 || this.grid.checkForDraw();
  }

  startNewGame() {
    this.connectFourService.drawBoard();
    this.grid.resetGrid();
    this.winningPlayer = '';
    this.isADraw = false;
    this.columnIsFull = false;
    this.gameboardComponent.setState(this.gameboardComponent.redsTurnState);
  }

  private setGameOverState() {
    this.gameboardComponent.setState(this.gameboardComponent.gameOverState);
    this.gameboardComponent.state.winningPlayer = this.playerColor;
    this.gameboardComponent.state.border = this.border;
    if (this.grid.checkForDraw()) {this.gameboardComponent.state.isADraw = true; }
  }

  checkStringForWinner(connectedString: string): boolean {
    return connectedString.includes(this.winningString);
  }
  checkForWinner(connectedStrings: string[]): string[] {
    return connectedStrings.filter((connectedLine: string) => this.checkStringForWinner(connectedLine), this);
  }

  abstract changeTurn(): void;
}

export class RedsTurnState extends PlayersTurn {
  border = '15px solid red';
  playerColor = 'red';
  winningString = 'rrrr';

  constructor(gameboardComponent: ConnectFourComponent, grid: Grid, connectFourService: ConnectFourService) {
    super();
    this.gameboardComponent = gameboardComponent;
    this.grid = grid;
    this.connectFourService = connectFourService;
  }

  changeTurn(): void {
    this.columnIsFull = false;
    this.gameboardComponent.setState(this.gameboardComponent.blacksTurnState);
  }
}

export class BlacksTurnState extends PlayersTurn {
  border = '15px solid black';
  playerColor = 'black';
  winningString = 'bbbb';

  constructor(gameboardComponent: ConnectFourComponent, grid: Grid, connectFourService: ConnectFourService) {
    super();
    this.gameboardComponent = gameboardComponent;
    this.grid = grid;
    this.connectFourService = connectFourService;
  }

  changeTurn(): void {
    this.columnIsFull = false;
    this.gameboardComponent.setState(this.gameboardComponent.redsTurnState);
  }
}

export class Grid {
  grid: any;
  constructor() {
    this.resetGrid();
  }
  getGrid(): any {
    return this.grid;
  }

  resetGrid(): void {
    this.grid = {
      1: ['.', '.', '.', '.', '.', '.', '.'],
      2: ['.', '.', '.', '.', '.', '.', '.'],
      3: ['.', '.', '.', '.', '.', '.', '.'],
      4: ['.', '.', '.', '.', '.', '.', '.'],
      5: ['.', '.', '.', '.', '.', '.', '.'],
      6: ['.', '.', '.', '.', '.', '.', '.']
    };
  }

  addPiece(column: number, row: number, playerColor: string) {
    this.grid[row][column - 1] = this.playerSymbol(playerColor);
  }

  private playerSymbol(playerColor: string) {
    return playerColor[0];
  }

  pieceAlreadyInSlot(row: number, column: number) {
    return this.grid[row][column - 1] !== '.';
  }

  getConnectedStrings(row: number, column: number) {
    const connectedStringsArray: string[] = [];
    connectedStringsArray.push(this.getRow(row));
    connectedStringsArray.push(this.getColumn(column));
    connectedStringsArray.push(this.getUpRightDiagonal(row, column));
    connectedStringsArray.push(this.getDownRightDiagonal(row, column));
    return connectedStringsArray;
  }

  private getRow(row: number) {
    return this.grid[row].join('');
  }

  private getColumn(column: number) {
    let columnCollection = '';
    for (let row = 6; row > 0; row--) {
      columnCollection += this.grid[row][column - 1];
    }
    return columnCollection;
  }


  calculateRow(column: number) {
    let row = 6;
    while (row > 0 && this.pieceAlreadyInSlot(row, column)) {
      row--;
    }
    return row;
  }

  private getUpRightDiagonal(row: number, column: number) {
    let currentDiagonalAsString = '';
    let currentRow = row;
    let currentColumn = column;
    while (currentRow < 6 && currentColumn > 1) {
      currentRow ++;
      currentColumn --;
    }

    while (currentRow >= 1 && currentColumn <= 7) {
      currentDiagonalAsString += this.grid[currentRow][currentColumn - 1];
      currentRow--;
      currentColumn++;
    }
    return currentDiagonalAsString;
  }

  private getDownRightDiagonal(row: number, column: number) {
    let currentDiagonalAsString = '';
    let currentRow = row;
    let currentColumn = column;
    while (currentRow > 1 && currentColumn > 1) {
      currentRow --;
      currentColumn --;
    }

    while (currentRow <= 6 && currentColumn <= 7) {
      currentDiagonalAsString += this.grid[currentRow][currentColumn - 1];
      currentRow++;
      currentColumn++;
    }
    return currentDiagonalAsString;
  }

  checkForDraw() {
    return !this.grid[1].includes('.');
  }
}
