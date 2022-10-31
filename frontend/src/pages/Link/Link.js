import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";
import QRCodeCanvas from "../QRCode/QRCodeCanvas";
import "./Link.css";

export default function Encurtador(){
    const { id: linkId } = useParams();
    const [link, setLink] = useState({});

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
            console.log('response.data >>> ', response.data);
            setLink(response.data);
        } catch (error) {
            console.warn(error);
            showNotification("Link não encontrado no banco de dados!");
        }
    }
    
    async function copyLink() {
        const numeroCliques = parseInt(link.contadorCliques, 10) + 1;
        await navigator.clipboard.writeText(link.linkEncurtado);
        await api.put(`link/${linkId}`, {contadorCliques: numeroCliques.toString()});
        window.location.reload(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getLinkInfos(), []);

    console.log('link >>> ', link);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="mt-2">
                <h2>{link.titulo}</h2>
            </div>
            <div className="mt-2">
                <h6>Numero de cliques: {link.contadorCliques}</h6>
            </div>
            <div className="mt-2 link-curto">
                <button onClick={copyLink}>
                    {link.linkEncurtado}
                </button>
            </div>
            <div className="mt-2">
                <QRCodeCanvas text={link.linkEncurtado} />
            </div>
            <ToastContainer />
        </div>
    )
}