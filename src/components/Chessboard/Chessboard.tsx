import Tile from '../Tile/Tile';
import './Chessboard.css';


export default function Chessboard() {
    let board: any = []

    for (let i = 1; i<9; i++){
        for (let j = 1; j<9; j++){
            board.push(<Tile coordinates={[i,j]}/>);
        }
    }





    return <div id='chessboard'>{board}</div>
}