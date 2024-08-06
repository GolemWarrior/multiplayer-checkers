import Chessboard from './components/Chessboard/Chessboard'
import './Game.css'
import{ useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function Game() {
  const [gameType, setGameType] = useState('');
  const [inviteCode, setInvitecode] = useState('');


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


    </>
  )
}

export default Game
