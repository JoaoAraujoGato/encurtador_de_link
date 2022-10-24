import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";

export default function Encurtador(){
    const history = useHistory();
    const { id: linkId } = useParams();
    const [link, setLink] = useState();

    const showNotification = (msg) =>  toast(msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false
    });
    async function getLinkInfos(){
        try {
            const response = await api.get(`link/${linkId}`);
            // validar oq ta vindo do response
            setLink(response.data);
            saveContadorCliques(response.data.contadorCliques)
        } catch (error) {
            console.warn(error);
            showNotification("Link não encontrado no banco de dados!");
        }
    }

    async function saveContadorCliques(contadorCliques) {
        try {
            const numeroCliques = contadorCliques + 1;
            await api.put(`link/${linkId}`, {contadorCliques: numeroCliques});
        } catch (error){
            console.warn(error);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(getLinkInfos(), []);

    return (
        <div>
            <div>
                <h1>Link: {linkId}</h1>
                <button onClick={() => history.push("/login")}>Login</button>
                <button onClick={() => history.push("/perfil")}>Perfil</button>
                <button onClick={() => history.push("/cadastro")}>Cadastro</button>
                <button onClick={() => history.push("/analytics")}>Analytics</button>
                <button onClick={() => history.push("/")}>Encurtador</button>
            </div>
            <div>
                <h2>{link.titulo}</h2>
                <h6>Numero de cliques: {link.contadorCliques + 1}</h6>
            </div>
            <div>
                <a href={link.linkEncurtado}>{link.linkEncurtado}</a>
            </div>
            <div>
                {/* Entender o que é esse qrCode, se vai ter que chamar uma API e tal */}
                {link.qrCode}
            </div>
            <ToastContainer />
        </div>
    )
}