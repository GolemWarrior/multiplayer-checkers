import Tile from '../Tile/Tile';
import './Chessboard.css';

interface Piece{
    image: String;
    x    : number;
    y    : number;
}

const pieces: Piece[] = [];


let activePiece: HTMLElement|null = null;
let wasPieceJustSet: Boolean = false;

function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement
    if (element.classList.contains('checker-piece') && !wasPieceJustSet){
        console.log(e.target);
    
        const x = e.clientX-50;
        const y = e.clientY-50;
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`; 
        activePiece = element;

    }
    else{
        wasPieceJustSet = false
    }
}

function movePiece(e: React.MouseEvent){
    const element = e.target as HTMLElement
    if (element == activePiece){

        
        console.log(e.target);

        let checkerBoard = document.getElementById("chessboard");
        //console.log(checkerBoard!.offsetLeft)

        const xMin = Number(checkerBoard!.offsetLeft);
        const yMin = Number(checkerBoard!.offsetTop);
        const xMax = xMin + Number(checkerBoard!.offsetWidth)-100;
        const yMax = yMin + Number(checkerBoard!.offsetHeight)-100;

        const x = e.clientX-50;
        const y = e.clientY-50;
        element.style.position = "absolute";

        if (x<(xMin)){
            element.style.left = `${xMin}px`
        }
        else if(x>xMax){
            element.style.left = `${xMax}px`
        }
         else{
             element.style.left = `${x}px`
        }

        if (y<(yMin)){
            element.style.top = `${yMin}px`
        }
        else if(y>yMax){
            element.style.top = `${yMax}px`
        }
         else{
             element.style.top = `${y}px`
        }

    }
}

function placePiece(e: React.MouseEvent){
    if(activePiece){
        activePiece = null;
        wasPieceJustSet = true;
    }

}

for (let i=0;i<3;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            pieces.push({image :"src/assets/black-piece.png",x :i,y :j});
        }
    }
}

for (let i=5;i<8;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            pieces.push({image :"src/assets/red-piece.png",x :i,y :j});
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


            board.push(<Tile key={`${i},${j}`} coordinates={[i,j]} image={image}/>);
        }
    }


    return <div 
    onMouseUp={e =>grabPiece(e)} 
    onMouseMove={e => movePiece(e)} 
    onMouseDown={e =>placePiece(e)}
    id='chessboard'>{board}
    </div>
}