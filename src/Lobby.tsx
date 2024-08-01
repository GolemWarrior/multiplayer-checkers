import './Lobby.css'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function Lobby() {
    const navigate = useNavigate();

  return (
    <>
        <div className='title' ><h1>Online Play</h1></div>
        <div className='joinGame'>
            <div>
                <TextField fullWidth id="outlined-basic" label="Enter Code" variant="outlined" InputLabelProps={{style : {color : 'white'} }} sx={{fieldset: { borderColor: "white" }}} />
            </div>
            <div>
                <button onClick={() => navigate("/game")}> Join Game </button>
            </div>
        </div>

        <div>
            --- OR ---
        </div>
        <div>
            <button onClick={() => navigate("/game")}> Create Game</button>
        </div>
    </>
  )
}

export default Lobby
