import React from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroupInput } from "react-bootstrap-utils";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";

import "./Cadastro.css"

export default function Cadastro(){
    const history = useHistory();

    const showNotification = (msg) =>  toast(msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false
    });

    async function cadastrarUsuario(form) {
        const { password, passwordConfirmation, idade } = form;

        if(password !== passwordConfirmation){
            showNotification("Senhas diferentes");
        }

        if (password.length < 6){
            showNotification("A senha deve ter no mínimo 6 caracteres");
        }

        else {
            form.idade = idade?.toString();
            delete form.passwordConfirmation;
            try {
                await api.post('user', form);
                history.push("/login");
            } catch (error){
                console.warn(error);
                showNotification(error.message);
            }
        }
    };

    return (
        <div className="fullPage d-flex justify-content-center">
            <div className="boxCadastro">
                <h1 className="mb-3 d-flex justify-content-center">Cadastre-se</h1>
                <Form initialValues={{}} onSubmit={(data) => cadastrarUsuario(data)} customActions={
                    <>
                        <button className="btn btn-success btn-sm mr-1" type="submit">Cadastre-se</button>
                        <button className="btn btn-danger btn-sm" type="button" onClick={() => history.goBack()}>Voltar</button>
                    </> 
                }>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="name"
                                type="string"
                                label="Nome"
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="email"
                                type="email"
                                label="email"
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="password"
                                type="password"
                                label="Digite sua senha"
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="passwordConfirmation"
                                type="password"
                                label="Confirme sua senha"
                                required
                            />
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <FormGroupInput
                                name="idade"
                                type="number"
                                min="0"
                                label="Idade"
                                required
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
                <ToastContainer />
            </div>
        </div>
    )
}