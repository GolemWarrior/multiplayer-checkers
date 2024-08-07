import './Tile.css'

interface Props{
    coordinates: number[];
    image?: string;
}

export default function Tile({ coordinates, image }:Props){
    if ((coordinates[0]+coordinates[1])%2==0){
        return <div className='tile white-tile'></div>
    }
    else{
        return <div className='tile black-tile'>
            {image && <div className='checker-piece' style={{ backgroundImage: `url("${image}") `}} ></div>}
        </div>
    }
    

}