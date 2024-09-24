import { useNavigate } from 'react-router-dom';
import checkersImage from './assets/checkers.svg';
import './App.css'

function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <div>
        <h1>Checkers</h1>
        <img src={checkersImage} height={300}></img>
      </div>
      <div className="gameButtons">
        <button onClick={() => navigate("/game")}>
          Player vs. Player
        </button>
        <button>
          Player vs. Comp.
        </button>
        <button onClick={() => navigate("/lobby")}>
          Online Play
        </button>
      </div>
    </>
  )
}

export default App
