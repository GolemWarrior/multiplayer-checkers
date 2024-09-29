import Chessboard from './components/Chessboard/Chessboard'
import EndGameModal from './components/Chessboard/EndGameModal'
import './Game.css'
import{ useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function Game() {
  const [gameType, setGameType] = useState('');
  const [inviteCode, setInvitecode] = useState('');
  const [blackScore, setBlackScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [showEndModal, setShowEndModal] = useState(false);
  const [winner, setWinner] = useState('');
  const [resetBoard, setResetBoard] = useState(false); // Add reset state

  useEffect(() => {
    if(Cookies.get('gameType') == 'online'){
      setGameType('online');
      let inviteCode = Cookies.get('inviteCode');
      if(inviteCode){
        setInvitecode(inviteCode);
      }
    }
  }, [gameType, inviteCode]);

  {/* TODO: Make a constant imported variable for 12 instdad of hardcoding it */}

  useEffect(() => {
    if (blackScore == 12 || redScore == 12){
      setWinner(blackScore == 12 ? 'Black' : 'Red');
      setShowEndModal(true);
    }
  }, [blackScore, redScore]);

  // Function to handle piece capture and update the score
  const handleCapture = (color: string) => {
    if (color === 'black') {
      setRedScore(redScore+1);
    } else if (color === 'red') {
      setBlackScore(blackScore+1);
    }
  };

    // Function to reset the game state
  const handleRematch = () => {
    setBlackScore(0); // Reset Black score
    setRedScore(0); // Reset Red score
    setShowEndModal(false); // Close modal
    setResetBoard(true); // Trigger board reset
    setTimeout(() => setResetBoard(false), 0); // Reset the board flag after rendering
  };
  
  return (
    <>
    <div className='wrapper'>

      <div className="gameContainer">
        {
        gameType == 'online' ?
            <div className="inviteCode">
              <h2>Invite Code: {inviteCode}</h2>
            </div>
            :
            null
        }
        <div className='gameBoard'>
          {showEndModal ? <EndGameModal winner={winner} onRematch={handleRematch}/> : null}
          <Chessboard onCapture={handleCapture} resetBoard={resetBoard} />
        </div>

      </div>
      <div className='rightMenu'>
        <div className='scoreBoard' style={{ textAlign: 'center', border: '2px solid white', borderRadius: '15px' }}>
          <div className='scoreTitle'> <span style={{ verticalAlign: 'middle'}}> Score:  </span> </div>
          <div className='scorePiece'> <img className='scorePieceImageLeft' src='src/assets/black-piece.png' style={{ verticalAlign: 'middle'}} height='70px'></img> <span className='scorePieceText'> — &nbsp;{blackScore} </span> </div>
          <div className='scorePiece'> <img className='scorePieceImageRight' src='src/assets/red-piece.png' style={{ verticalAlign: 'middle'}} height='70px'></img> <span className='scorePieceText' > — &nbsp;{redScore}</span> </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Game
