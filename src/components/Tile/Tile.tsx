import './Tile.css'

interface Props{
    coordinates: number[]
}

export default function Tile({coordinates}:Props){
    if ((coordinates[0]+coordinates[1])%2==0){
        return <div className='tile white-tile'></div>
    }
    else{
        return <div className='tile black-tile'></div>
    }
    

}