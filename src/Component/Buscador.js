import React,{useState} from "react";
import axios from 'axios';
import './Buscador.css';

const Buscador = (props) => {
    const [valor,setValor] = useState("");
    const [errorCategoria,setErrorCategoria] = useState("");
    const [errorNumero,setErrorNumero] = useState("");

    const buscar = (e) => {
        e.preventDefault();
        
        if(valor === "") {
            setErrorNumero("Debe ingresar un numero para buscar");
            props.setDatos(null);
        }
        else setErrorNumero("");

        if(props.url === "") {
            setErrorCategoria("Debe seleccionar una categoria");
            props.setDatos(null);
        }
        else setErrorCategoria("");

        if(props.url !== "" && valor !== "") {
            axios.get(props.url+valor)
            .then(response=>{
                //props.setDatos(response.data);
                let detalleAux = [];
                for (const property in response.data) {
                    let aux = {
                        propiedad : property.replace("_"," ").toLocaleUpperCase(),
                        valor : response.data[property]
                    };
                    detalleAux.push(aux);
                }
                
                if(props.url.indexOf("people") >= 0) {
                    console.log("entro");
                    axios.get(response.data.homeworld)
                    .then(respta=>{
                        //console.log(respta.data.name);
                        let aux = {
                            propiedad : "HOMEWORLD",
                            valor : respta.data.name
                        };
                        props.setDatos([...detalleAux.slice(0,5),aux]);
                    })
                    .catch(error=>{
                        console.log(error);
                    })
                }
                else {
                    props.setDatos([...detalleAux.slice(0,5)]);
                }
            })
            .catch(error=>{
                console.log(error);
                props.setDatos(null);
            })
        }
    }

    return (
        <div>
            <form onSubmit={(event)=>buscar(event)}>
                <div className="divInput">
                    <input type="number" placeholder="Ingresa un numero" onChange={(e)=>setValor(e.target.value)} value={valor}/>
                </div>
                <div>
                    <button className="botoncito" type="submit">Search</button>
                </div>
                <p className="error">{errorCategoria}</p>
                <p className="error">{errorNumero}</p>
            </form>
        </div>
    )

}

export default Buscador;