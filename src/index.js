import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function GreenSquare(props) {
    return (
      <button className="green-square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  // Render a square component based on i
  renderSquare(i) {
    if (winningSquares(this.props.squares).includes(i)) {
        return (
            <GreenSquare 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                key={i % 3}
            />
        );
    }
    else {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                key={i % 3}
            />
        );
    }
  }

  // Render the 3x3 board
  render() {
    let rows = [];
    for (let row = 0; row < 3; row++) {
        let rowElements = [];
        for (let col = 0; col < 3; col++) {
            rowElements.push(this.renderSquare(col + row * 3));
        }
        rows.push(<div className="board-row" key={row}>{rowElements}</div>);
    }
                  
    return (
        <div>{rows}</div>
    );
  }
}


class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
      };
  }
    
  // Updates the game state when a box is clicked
  handleClick(i) {
      const squares = this.state.squares.slice();
    
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      
      this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
      })
  }
    
  // Resets the board back to the beginning
  resetBoard() {
      this.setState({
          squares: Array(9).fill(null),
          xIsNext: true,
      })
  }
    
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    
    if (winner) {
        status = "Winner: " + winner;
    }
    else {
        status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
    }
      
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="reset">
            <button onClick={() => this.resetBoard()}>{"Reset"}</button>
          </div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


// Checks who won the game and returns the player.
// If neither player won, returns "Tie"
// If the game is not finished, returns null
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    
    if (!squares.includes(null)) {
        return 'Tie';
    }
    
    return null;
}


// Looks at the board and returns the winning line
// If winning line is not found, return an empty array.
function winningSquares(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i].slice();
        }
    }
    
    return [];
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
