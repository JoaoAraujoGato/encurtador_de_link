import React, {useEffect, useState} from "react";
import api from "../../services/api";
import { USER_ID } from "../../services/auth";
import { Table, ListGroup, Card } from "react-bootstrap";
import "./Perfil.css"

export default function Perfil(){
    const idUsusario = sessionStorage.getItem(USER_ID);

    const [linksUsuario, setLinksUsuario] = useState([]);
    const [usuario, setUsuario] = useState({});

    async function getLinks() {
        try {
            const response = await api.get(`linkUser/${idUsusario}`);
            setLinksUsuario(response.data);
        } catch (error) {
            console.log('error >>> ', error);
            console.warn(error);
        }
    }

    async function getUser() {
        try {
            const response = await api.get(`user/${idUsusario}`);
            setUsuario(response.data);
        } catch (error) {
            console.log('error >>> ', error);
            console.warn(error);
        }
    }

    //function 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getUser()}, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getLinks()}, []);

    return (
        <div className="fullPage d-flex justify-content-center">
            <div className="tabela">
                <h1>Meu perfil</h1>
                    <Card style={{ width: '18rem'}}>
                        <Card.Header>Nome: {usuario.name}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>E-mail: {usuario.email}</ListGroup.Item>
                            <ListGroup.Item>Idade: {usuario.idade}</ListGroup.Item>
                            <ListGroup.Item>Endereço: {usuario.endereco}</ListGroup.Item>
                            <ListGroup.Item>Telefone: {usuario.telefone}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                <br />
                <h2>Meus links</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Link Original</th>
                            <th>Link Encurtado</th>
                            <th>Contador de Cliques</th>
                        </tr>
                    </thead>
                    <tbody>
                    {linksUsuario.map((link, index)=>{
                        return(
                        <tr key={index}>
                            <td>{link.titulo}</td>
                            <td>{link.linkOriginal}</td>
                            <td>{link.linkEncurtado}</td>
                            <td>{link.contadorCliques}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}