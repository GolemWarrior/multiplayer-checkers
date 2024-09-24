import Chessboard from './components/Chessboard/Chessboard'
import './Game.css'
import{ useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function Game() {
  const [gameType, setGameType] = useState('');
  const [inviteCode, setInvitecode] = useState('');

  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
      if (newMessage.trim()) {
          setMessages([...messages, newMessage]);
          setNewMessage('');
      }
  };


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
          <div className='scorePiece'> <img className='scorePieceImageLeft' src='src/assets/black-piece.png' style={{ verticalAlign: 'middle'}} height='70px'></img> <span className='scorePieceText'> — &nbsp;5 </span> </div>
          <div className='scorePiece'> <img className='scorePieceImageRight' src='src/assets/red-piece.png' style={{ verticalAlign: 'middle'}} height='70px'></img> <span className='scorePieceText' > — &nbsp;5</span> </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Game
