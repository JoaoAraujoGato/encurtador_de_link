import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { USER_ID } from "../../services/auth";
import { Table, ListGroup, Card } from "react-bootstrap";
import "./Perfil.css"

export default function Perfil(){
    const history = useHistory();
    const idUsusario = sessionStorage.getItem(USER_ID);

    const linksUser = [];
    const usuario = [];

    async function getLinks() {
        try {
            const response = await api.get(`linkUser/${idUsusario}`);
            response.data.forEach((link) => {
                link.contadorCliques = parseInt(link.contadorCliques,10)
                linksUser.push(link)});
        } catch (error) {
            console.log('error >>> ', error);
            console.warn(error);
        }
    }

    async function getUser() {
        try {
            const response = await api.get(`user/${idUsusario}`);
            response.data.forEach((user) => {
                usuario.push(user)});
        } catch (error) {
            console.log('error >>> ', error);
            console.warn(error);
        }
    }

    //function 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getUser()}, []);
    useEffect(() => {getLinks()}, []);
 //const meusLinks = [
 //            {id: '1', titulo: 'link 1', linkOriginal: 'www.google.com', linkEncurtado: 'https://shrtco.de/4ZlYb', contadorCliques: 12,},
 //            {id: '2', titulo: 'link 2', linkOriginal: 'www.google.com', linkEncurtado: 'https://shrtco.de/4ZlYb', contadorCliques: 0,},
 //            {id: '3', titulo: 'link 3', linkOriginal: 'www.google.com', linkEncurtado: 'https://shrtco.de/4ZlYb', contadorCliques: 1,},
 //            {id: '4', titulo: 'link 4', linkOriginal: 'www.google.com', linkEncurtado: 'https://shrtco.de/4ZlYb', contadorCliques: 7,},
 //            {id: '5', titulo: 'link 5', linkOriginal: 'www.google.com', linkEncurtado: 'https://shrtco.de/4ZlYb', contadorCliques: 6,},
 //            {id: '6', titulo: 'link 6', linkOriginal: 'www.google.com', linkEncurtado: 'https://shrtco.de/4ZlYb', contadorCliques: 7,},
 //        ];
 //   const meuUser = [
 //       {userId: '1', name:'Alexis', email:'a@a.com', firebaseId:'1',idade:'42', endereco:'rua a 13', telefone: '31912345678'}
 //   ];

    return (
        <div className="fullPage d-flex justify-content-center">
            <div className="tabela">
                <h1>Meu perfil</h1>
                {usuario.map((user)=>{
                    return(
                    <Card style={{ width: '18rem'}}>
                        <Card.Header>Nome: {user.name}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>E-mail: {user.email}</ListGroup.Item>
                            <ListGroup.Item>Idade: {user.idade}</ListGroup.Item>
                            <ListGroup.Item>Endereço: {user.endereco}</ListGroup.Item>
                            <ListGroup.Item>Telefone: {user.telefone}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    )
                })}
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
                    {linksUser.map((link)=>{
                        return(
                        <tr>
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