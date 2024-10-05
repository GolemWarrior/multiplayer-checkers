import './Lobby.css'
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Lobby() {
    const [selected, setSelected] = useState(""); // State to track selected button

    const navigate = useNavigate();

    function generateInviteCode() {
        return Math.random().toString(36).substring(7).toUpperCase();
      }

    const handleSubmit = () => {
        // Set the cookie with name 'myCookie' and value 'cookieValue2'
        Cookies.set('gameType', 'online'); // expires in 7 days
        Cookies.set('inviteCode', generateInviteCode()); // expires in 7 days
        console.log(selected); // Logging this for now, will need to connect color later on
        Cookies.set('color', selected);
        navigate("/game");
      };
    
    const handleSelection = (event: React.MouseEvent<HTMLElement>, newSelected: string | null) => {
        if (newSelected !== null) {
            console.log(event);
            setSelected(newSelected); // Only update if new selection is valid
        }
    };

  return (
    <>
        <div className='title' ><h1>Online Play</h1></div>
        <h3> Choose Color & Create </h3>
        <div className='createGame'>
            <div>
            </div>
            <div>
            <ToggleButtonGroup
                value={selected}
                exclusive
                color="primary"
                className="ToggleButtonGroup"
                onChange={handleSelection}
            >
                <ToggleButton className='leftToggle' value="red">
                    <img src="src/assets/red-piece.png" alt="Red piece" />
                </ToggleButton>
                <ToggleButton className='rightToggle' value="black">
                    <img src="src/assets/black-piece.png" alt="Black piece" />
                </ToggleButton>
            </ToggleButtonGroup>
            </div>
            <div className='createButton'>
                <button onClick={handleSubmit}> Create Game</button>
            </div>
        </div>
        <div>
           <h2>--- OR ---</h2> 
        </div>
        <h3> Enter Code & Join </h3>
        <div className='joinGame'>
            <div>
                <TextField fullWidth id="outlined-basic" label="Enter Code..." variant="outlined"  InputLabelProps={{style : {color : 'white'} }} sx={{fieldset: { borderColor: "white" }}}  />
            </div>
            <div>
                <button onClick={() => navigate("/game")}> Join Game </button>
            </div>
        </div>

    </>
  )
}

export default Lobby
