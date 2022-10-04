import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Encurtador from "./pages/Encurtador";

export default function Routes() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Switch>
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/login" component={Login} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/" component={Encurtador} />
            </Switch>
        </BrowserRouter>
    )
}