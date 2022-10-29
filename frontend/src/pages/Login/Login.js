import React from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroupInput } from "react-bootstrap-utils";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";

import "./Login.css"
import { logIn, userId } from "../../services/auth";

export default function Login(){
    const history = useHistory();

    async function loginUsuario(form) {
        try{
            const response = await api.post("/login", form);
            //conferir o que sai do response
            console.log('response >>> ', response);
            alert(`Bem vindo ${response.data.user.name}`);
            logIn(response.data.accessToken);
            userId(response.data.user.userId);
            localStorage.setItem("userName", response.data.user.name);
            history.push("/");
        } catch (error){
            console.warn(error);
        }
    };

    return (
        <div className="fullPage d-flex justify-content-center">
            <div className="boxLogin">
                <h1 className="mb-3 d-flex justify-content-center">Faça o Login</h1>
                <Form initialValues={{}} onSubmit={(data) => loginUsuario(data)} customActions={
                    <>
                        <button className="btn btn-success btn-sm mr-1" type="submit">Entrar</button>
                        <button className="btn btn-danger btn-sm" type="button" onClick={() => history.goBack()}>Voltar</button>
                        <a className="ml-1" href="/cadastro">Cadastre-se</a>
                    </> 
                }>
                    <div className="col">
                        <FormGroupInput
                            name="email"
                            type="email"
                            label="Email"
                            required
                        />
                    </div>
                    <div className="col">
                        <FormGroupInput
                            name="password"
                            type="password"
                            label="Senha"
                            required
                        />
                    </div>
                </Form>
                <ToastContainer />
            </div>
        </div>
    )
}