import { useState } from 'react';
import favOff from './favOff.png'
import favOn from './favOn.png'
import { decodeToken } from "react-jwt";

import {Link} from "react-router-dom"
import NombreMes from '../NombreMes/NombreMes';
import GetDia from '../GetDia/GetDia';
import HoraFormat from '../HoraFormat/HoraFormat';
import axios from "axios"
import location from '../../assets/location.png';

export default function CardEvento (props) {
    //console.log(props);
    const [valorFav, setvalorFava] = useState(props.isFav.includes(props.dataEvento._id) ? true : false);
    const decodedID=decodeToken(JSON.parse(localStorage.getItem('token')))
    const id_user=decodedID.id


    const AddFav = async(id_evento)=>{
        setvalorFava(!valorFav);
        try {
            //agrega el evento al usuario creando la relacion
            const url = "http://localhost:3000/app/toggle-favorite/"+id_evento;
            let body = {
                "userID": id_user
              }
            const response  = await axios.post(url, body);
            //console.log(response.data.favorites);
            
        } catch (e){
            console.log(e);
        }
    }
    
    return (
        <div className="Card bg-zinc-100 cursor-pointer" >
            <div className="bg-cover bg-center w-full h-48 rounded-t-lg" style={{ backgroundImage: `url(${props.dataEvento.imagen.secure_url})` }}  >
                <div className='w-full h-auto flex justify-end p-2'>
                    <div className='w-10 p-2'>
                        {/** Si el evento es favorito del usuario va mostrar la imagen favOn de lo contrario la imagen favOff */}
                        <img src={valorFav ? favOn : favOff } alt={favOff ? 'Agrear a Favoritos' : "Eliminar de Favoritos"}  className='bg-slate-25 cursor-pointer' onClick={() =>{AddFav(props.dataEvento._id);}} />
                    </div>
                </div>
            </div>

            <div className="w-full h-48 bg-secondary flex flex-col items-center justify-center">
                <div className='p-4'>
                    <span className="flex text-lg font-semibold text-center">{props.dataEvento.titulo}</span>
                </div>

                <div className='w-full h-full flex items-center justify-center rounded-b-lg'>
                    <div className='flex flex-col w-1/2 items-center'>
                        <NombreMes fecha={props.dataEvento.fecha} />
                        <span>Dia: <GetDia fecha={props.dataEvento.fecha} /></span>
                        <span className=' text-sm'>Hora: <HoraFormat hora={props.dataEvento.hora} /> </span>
                    </div>
                    <div className='flex flex-col items-center justify-center space-y-4'>
                        <div className='w-3/5 flex items-center justify-center text-center'>
                            <div className='justify-end'><img src={location} alt="Location" className='w-8' /></div>
                            <span className=' text-sm'>{props.dataEvento.lugar}</span>
                        </div>
                        <Link to={`/evento/${props.dataEvento._id}`}className='w-3/5 flex P-4'>
                            <button className='w-full rounded-lg shadow-lg bg-green-400 p-1 text-sm font-medium'>Ver Detalles</button>
                        </Link>
                    </div>
                </div>
            

                
            </div>
        </div>
    )
}