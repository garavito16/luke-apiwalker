import React,{useEffect, useState} from "react";
import axios from 'axios';

const MostrarPeople = (props) => {

    const [datos,setDatos] = useState([]);

    useEffect(() => {
        axios.get("https://swapi.dev/api/people/" + props.match.params.id)
            .then(response => {
                let detalleAux = [];
                for (const property in response.data) {
                    let aux = {
                        propiedad: property.replace("_", " ").toLocaleUpperCase(),
                        valor: response.data[property]
                    };
                    detalleAux.push(aux);
                }

                axios.get(response.data.homeworld)
                    .then(respta => {
                        let aux = {
                            propiedad: "HOMEWORLD",
                            valor: respta.data.name
                        };
                        setDatos([...detalleAux.slice(0, 5), aux]);
                    })
                    .catch(error => {
                        console.log(error);
                    });

            })
            .catch(error => {
                console.log(error);
                setDatos(null);
            })
    },[]);

    return (
        <div className="datos">
            {
                (datos != null) ?
                    datos.length > 0 && datos.map((item,indice)=>{
                        return (
                            <div key={"indice"+indice}>
                            {
                                (indice === 0) ? 
                                <h1 >{item.valor}</h1> 
                                :
                                <p>{item.propiedad} : {item.valor}</p>
                            }
                            </div>
                        )
                    })
                : 
                <div>
                    <p className="mensajito">Estos no son los droides que está buscando</p>
                    <img className="imagen" src="https://imgwoman.elperiodico.com/73/3c/c0/ewan-mcgregor-caracterizado-obi-wan-kenobi.jpg"></img>
                </div>
            }
        </div>
    )
}

export default MostrarPeople;