import { useRef, useState, useEffect } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

interface Piece{
    image: String;
    color: string;
    isKing: Boolean,
    x    : number;
    y    : number;
}


interface ChessboardProps {
    onCapture?: (color: string) => void;
}

let activePiece: HTMLElement|null = null;
let wasPieceJustSet: Boolean = false;



const initialBoardState: Piece[] =[];

for (let i=0;i<3;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            initialBoardState.push({image :"src/assets/black-piece.png", color: "black", isKing:false, x :i,y :j});
        }
    }
}

for (let i=5;i<8;i++){
    for(let j=0;j<8;j++){
        if((i+j)%2!=0){
            initialBoardState.push({image :"src/assets/red-piece.png", color: "red", isKing:false, x :i,y :j});
        }
    }
}


export default function Chessboard({ onCapture }: ChessboardProps) {
    const [gridPosx, setGridPosx] = useState(0);
    const [gridPosy, setGridPosy] = useState(0);
    const [pieces, setPieces] = useState<Piece[] >(initialBoardState);
    const [capturedPieces, setCapturedPieces] =  useState<Piece[]>([]);
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

    useEffect(() => {
        if (capturedPieces.length > 0) {
            if(onCapture){
                onCapture(capturedPieces[capturedPieces.length - 1].color);
            }
        }
      }, [capturedPieces]);

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


    function moveOrHopPiece(x: number, y: number, midX: number, midY: number, currentPieceColor: string, hoppedPiece?: Piece){
        setPieces((value)=>{
            let pieces = value;
            if(hoppedPiece){
                pieces = value.filter((p)=>p.x!=midY || p.y!=midX);
                setCapturedPieces((capturedPieces) => [...capturedPieces, hoppedPiece]);
            }
            pieces = pieces.map((p)=>{
                console.log("gridposx, gridposy: ", gridPosx,gridPosy);
                if (p.x==gridPosy &&p.y==gridPosx){
                    console.log("p.x, p.y: ",p.x, p.y)
                    if((x%2==0 && y%2!=0) || (x%2!=0 && y%2==0)){
                        p.x = y;
                        p.y = x;
                        //TO-DO: Logic needs to change when we make it so that the board only has your color on the rows closer to you)
                        // Also terrible code, might want to make a "promotion" function
                        if(currentPieceColor=='red' && y==0){
                            p.isKing=true; //promotion
                            p.image = "src/assets/red-king.png";
                        }
                        else if (currentPieceColor=='black' && y==7) {
                            p.isKing=true; //promotion
                            p.image = "src/assets/black-king.png";
                        }
                    }
                }
                return p;
            });
            return pieces;
        });
    }
    
    function placePiece(e: React.MouseEvent){
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const x = Math.abs(Math.round((e.clientX- chessboard.offsetLeft-50)/100));
            const y = Math.abs(Math.round((e.clientY-chessboard.offsetTop-50)/100));

            const currentPiece = pieces.find(p => p.x === gridPosy && p.y === gridPosx);
            const isOccupied = pieces.some(p => p.x === y && p.y === x);
            
            if (!isOccupied) {
                console.log("x,y: ",x,y);
                const midX = (gridPosx + x) / 2;
                const midY = (gridPosy + y) / 2;
                const deltaX = x - gridPosx;
                const deltaY = y - gridPosy;

                console.log("delta_x: ", deltaX);
                console.log("delta_y: ", deltaY);


                /*
                1. if currentPiece.color == currentColor, then currentPiece can only move up (unless )
                2. if currentPiece.color != currentColor, then currentPiece can only move down

                 */


    
                // Check if the move is a hop (2 squares diagonally)
                if (Math.abs(deltaX) === 2 && Math.abs(deltaY) === 2) {
                    // Find the piece being hopped over
                    const hoppedPiece = pieces.find(p => p.x === midY && p.y === midX);
                    if (hoppedPiece && hoppedPiece.color !== currentPiece?.color) {
                        if((currentPiece?.color=='red' && ((deltaX==2 && deltaY==-2) || (deltaX==-2 && deltaY==-2))) ||
                        (currentPiece?.color=='black' && ((deltaX==-2 && deltaY==2) || (deltaX==2 && deltaY==2)))
                        || currentPiece?.isKing) {
                            moveOrHopPiece(x, y, midX, midY, currentPiece.color, hoppedPiece);
                        }
                    }
                }
                else if (Math.abs(deltaX) === 1 && Math.abs(deltaY) === 1){
                    if((currentPiece?.color=='red' && ((deltaX==1 && deltaY==-1) || (deltaX==-1 && deltaY==-1))) ||
                        (currentPiece?.color=='black' && ((deltaX==-1 && deltaY==1) || (deltaX==1 && deltaY==1)))
                        || currentPiece?.isKing){
                        moveOrHopPiece(x, y, midX, midY, currentPiece.color);
                    }
                }
            }
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
    >
        {board}
    </div>
}