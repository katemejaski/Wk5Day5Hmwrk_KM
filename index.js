import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, 
  Route,
  Link
} from 'react-router-dom';
import './index.css';


// component 1

class Home extends Component {
  render(){
    return(
      <div>
        <h1>React Router Tic Tac Toe Tips</h1>
        <h4>Always go for the corners!</h4>
        
      </div>
    );
  }
}

// About component

class About extends Component {
  render(){
    return(
      <div>
        <h1>About The Game</h1>
        <p><h2>Definition of tic-tac-toe</h2>
a game in which two players alternately put Xs and Os in compartments of a figure formed by two vertical lines crossing two horizontal lines and each tries to get a row of three Xs or three Os before the opponent does
</p>
      </div>
    );
  }
}

// Menu component

class Menu extends Component {
  render(){
    return(
      <div>
        <h1>Menu</h1>
        <p>Have some snacks while you play:
          <ul>
            <li>Cutie Oranges</li>
            <li>Carrots</li>
            <li>Trail Mix</li>
          </ul>
        </p>
      </div>
    );
  }
}

class Navbar extends Component {
  render(){
    return(
      <div className="nav">
        <Link to="/">Game</Link> | 
        <Link to="menu">Menu</Link> | 
        <Link to="about">About</Link> | 
        <Link to="home">Tips</Link>
      </div>
    );
  }
}


class Routes extends Component {
  render(){
    return(
      <Router>
        <div>
          <Navbar />
          <hr />
          <Route name="Game" exact path="/" component={Game}/>
          <Route name="Menu" path="/menu" component={Menu}/>
          <Route name="About" path="/about" component={About} />
          <Route name="Tips" path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}




function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    squares: Array(9).fill(null),
    xISNext: true,
  };
}

handleClick(i) {
  const squares = this.state.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    squares: squares,
    xIsNext: !this.state.xIsNext,
});
}

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }]
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
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
  return null;
}

ReactDOM.render(<Routes />, document.getElementById('root'));