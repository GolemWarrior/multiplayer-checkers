import Chessboard from './components/Chessboard/Chessboard'
import './Game.css'
import{ useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function Game() {
  const [gameType, setGameType] = useState('');
  const [inviteCode, setInvitecode] = useState('');
  const [blackScore, setBlackScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  useEffect(() => {
    if(Cookies.get('gameType') == 'online'){
      setGameType('online');
      let inviteCode = Cookies.get('inviteCode');
      if(inviteCode){
        setInvitecode(inviteCode);
      }
    }

  }, [gameType, inviteCode]);


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
          <Chessboard/>
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
