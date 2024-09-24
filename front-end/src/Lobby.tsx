import './Lobby.css'
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Lobby() {
    const navigate = useNavigate();

    function generateInviteCode() {
        return Math.random().toString(36).substring(7).toUpperCase();
      }

    const handleSubmit = () => {
        // Set the cookie with name 'myCookie' and value 'cookieValue2'
        Cookies.set('gameType', 'online'); // expires in 7 days
        Cookies.set('inviteCode', generateInviteCode()); // expires in 7 days
        navigate("/game");
      };

  return (
    <>
        <div className='title' ><h1>Online Play</h1></div>
        <div className='joinGame'>
            <div>
                <TextField fullWidth id="outlined-basic" label="Enter Code..." variant="outlined"  InputLabelProps={{style : {color : 'white'} }} sx={{fieldset: { borderColor: "white" }}}  />
            </div>
            <div>
                <button onClick={() => navigate("/game")}> Join Game </button>
            </div>
        </div>
        <div>
            --- OR ---
        </div>
        <div className='createGame'>
            <button onClick={handleSubmit}> Create Game</button>
        </div>
    </>
  )
}

export default Lobby
