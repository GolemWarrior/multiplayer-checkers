import { act, useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

interface Piece{
    image: String;
    x    : number;
    y    : number;
}


let activePiece: HTMLElement|null = null;
let wasPieceJustSet: Boolean = false;



const initialBoardState: Piece[] =[];

for (let i=0;i<3;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            initialBoardState.push({image :"src/assets/black-piece.png",x :i,y :j});
        }
    }
}

for (let i=5;i<8;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            initialBoardState.push({image :"src/assets/red-piece.png",x :i,y :j});
        }
    }
}


export default function Chessboard() {
    const [gridPosx, setGridPosx] = useState(0);
    const [gridPosy, setGridPosy] = useState(0);
    const [pieces, setPieces] = useState<Piece[] >(initialBoardState);
    const chessboardRef = useRef<HTMLDivElement>(null);
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


    function grabPiece(e: React.MouseEvent){
        const element = e.target as HTMLElement
        const chessboard = chessboardRef.current;
        if (element.classList.contains('checker-piece') && !wasPieceJustSet && chessboard){
            console.log("grabPiece");
            const gridPosx = Math.abs(Math.round((e.clientX- chessboard.offsetLeft-50)/100));
            const gridPosy = Math.abs(Math.round((e.clientY-chessboard.offsetTop-50)/100));
            console.log("gridposx, gridposy: ", gridPosx,gridPosy);
            setGridPosx(gridPosx);
            setGridPosy(gridPosy);

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
        //const element = e.target as HTMLElement
        if (activePiece){
    
            const element = activePiece;
            
    
            let checkerBoard = document.getElementById("chessboard");
    
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
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const x = Math.abs(Math.round((e.clientX- chessboard.offsetLeft-50)/100));
            const y = Math.abs(Math.round((e.clientY-chessboard.offsetTop-50)/100));
            console.log("placePiece");
            console.log("x,y: ",x,y);
            setPieces((value)=>{  
                const pieces = value.map((p)=>{
                    console.log("gridposx, gridposy: ", gridPosx,gridPosy);
                    if (p.x==gridPosy &&p.y==gridPosx){
                        console.log("p.x, p.y: ",p.x, p.y)
                        p.x = y;
                        p.y = x;
                    }
                    return p;
                });
                return pieces;
            });
            console.log("activePiece: ",activePiece);
            activePiece!.style.position = "relative";
            activePiece?.style.removeProperty("top");
            activePiece?.style.removeProperty("left");
            activePiece = null;
            wasPieceJustSet = true;

        }
    
    }


    return <div 
    onMouseUp={e =>grabPiece(e)} 
    onMouseMove={e => movePiece(e)} 
    onMouseDown={e =>placePiece(e)}
    id='chessboard'
    ref = {chessboardRef}
    >{board}
    
    
    </div>
}