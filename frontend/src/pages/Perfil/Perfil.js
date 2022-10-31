import React, {useEffect, useState} from "react";
import api from "../../services/api";
import { USER_ID } from "../../services/auth";
import { Table, ListGroup, Card } from "react-bootstrap";
import { faTrash, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Perfil.css"
import { useHistory } from "react-router-dom";
import { Dialog, Form, FormGroupInput } from "react-bootstrap-utils";

export default function Perfil(){
    const history = useHistory();
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
    async function deletarLink(linkId){
        try {
            await api.delete(`link/${linkId}`);
            window.location.reload(true)
        } catch (error) {
            console.log('error >>> ', error);
            console.warn(error);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getUser()}, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getLinks()}, []);

    return (
        <div className="fullPagePerfil d-flex justify-content-center">
            <div className="tabela">
                <h1>Meu perfil</h1>
                    <Card style={{ width: '18rem'}}>
                        <Card.Header>Nome: {usuario.name}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>E-mail: {usuario.email}</ListGroup.Item>
                            <ListGroup.Item>Idade: {usuario.idade}</ListGroup.Item>
                            <ListGroup.Item>Telefone: {usuario.telefone}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <EditarPerfilUsuario user={usuario}/>
                <br />
                <h2>Meus links</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Link Original</th>
                            <th>Link Encurtado</th>
                            <th>Contador de Cliques</th>
                            <th>Ações</th>
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
                            <td>
                                <div className="botoesAcao d-flex justify-content-center">
                                    <button type="button" className="btn mr-1" onClick={()=>{history.push(`/link/${link.linkId}`)}}>
                                        <FontAwesomeIcon icon={faLink}/>
                                    </button>
                                    <button type="button" className="btn" onClick={()=>{deletarLink(link.linkId)}}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

function EditarPerfilUsuario({user}){
    const form = {
        name: user.name,
        email: user.email,
        idade: user.idade,
        telefone: user.telefone
    }
    async function salvarDadosUsuario(dadosForm){
        try {
            await api.put(`/user/${user.userId}`, dadosForm);
            window.location.reload(true);
        } catch(err) {
            console.warn(err);
        }
    }
    return (
        <Dialog
            title="Editar dados de usuario"
            size="xl"
            scrollable
            staticBackdrop
            body={({close}) => (
                <Form
                    onSubmit={(dadosForm) => salvarDadosUsuario(dadosForm)}
                    initialValues={form}
                    customActions={
                        <>
                            <button className="btn btn-success btn-sm mr-1" type="submit">Salvar</button>
                            <button className="btn btn-danger btn-sm" type="button" onClick={() => close()}>Cancelar</button>
                        </>
                    }
                >
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="name"
                                type="string"
                                label="Nome"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="email"
                                type="email"
                                label="email"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="idade"
                                type="number"
                                min="0"
                                label="Idade"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="telefone"
                                type="string"
                                label="Telefone"
                            />
                        </div>
                    </div>
                </Form>
            )}
        >
            <button className="btn btn-sm mt-1 mb-2" type="button">
                Editar dados do usuario
            </button>
        </Dialog>
    )
}