import Tile from '../Tile/Tile';
import './Chessboard.css';


interface Piece{
    image: String
    x    : number
    y    : number
}

const pieces: Piece[] = [];


for (let i=0;i<3;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            pieces.push({image :"src/assets/black-piece.png",x :i,y :j})
        }
    }
}

for (let i=5;i<8;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            pieces.push({image :"src/assets/red-piece.png",x :i,y :j})
        }
    }
}


export default function Chessboard() {
    let board: any = [];

    for (let i = 0; i<8; i++){
        for (let j = 0; j<8; j++){
            let image = undefined;

            pieces.forEach((p)=>{
                if (p.x == i && p.y == j){
                    image = p.image;
                }
            });


            board.push(<Tile coordinates={[i,j]} image={image}/>);
        }
    }





    return <div id='chessboard'>{board}</div>
}