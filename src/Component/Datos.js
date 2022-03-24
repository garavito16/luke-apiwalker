import React from "react";
import './Datos.css';

const Datos = (props) => {
    return (
        <div className="datos">
            {
                (props.datos != null) ?
                    props.datos.length > 0 && props.datos.map((item,indice)=>{
                        return (
                            <div key={"indice"+indice}>
                            {
                                (indice === 0) ? 
                                <h1>{item.valor}</h1> :
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

export default Datos;