import React,{useState,useEffect} from "react";
import axios from 'axios';
import './Lista.css';

const Lista = (props) => {

    const [detalle,setDetalle] = useState([]);

    useEffect(() => {
        axios.get("https://swapi.dev/api")
        .then(response=>{
                let detalleAux = [];

                for (const property in response.data) {
                    let aux = {
                        item : property,
                        url : response.data[property]
                    };
                    detalleAux.push(aux);
                }

                setDetalle(detalleAux);
            });
    }, []);

    /*useEffect(() => {
        fetch('https://swapi.dev/api')
            .then(response => response.json())
            .then(response => {
                console.log(response);
            
                let detalleAux = [];

                for (const property in response) {
                    let aux = {
                        item : property,
                        url : response[property]
                    };
                    detalleAux.push(aux);
                }

                setDetalle(detalleAux);
            })
    }, []);*/

    const setearUrl = (e) => {
        console.log("se agrego:"+e.target.value);
        props.setUrl(e.target.value);
    }

    return (
        <div className="divSelect">
            <select className="seleccion" onChange={(event)=>setearUrl(event)}>
                <option value="">--- Seleccionar categoria ---</option>
                {
                    detalle.length > 0 && detalle.map((item,indice) => {
                        return (
                            <option value={item.url} key={"indice"+indice}>{item.item}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Lista;