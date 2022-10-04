import React from "react";
import { useHistory } from "react-router-dom";

export default function Encurtador(){
    const history = useHistory();
    return (
        <>
            <h1>Encurtador</h1>
            <button onClick={() => history.push("/login")}>Login</button>
            <button onClick={() => history.push("/perfil")}>Perfil</button>
            <button onClick={() => history.push("/cadastro")}>Cadastro</button>
            <button onClick={() => history.push("/")}>Encurtador</button>
        </>
    )
}