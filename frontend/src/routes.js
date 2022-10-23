import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Encurtador from "./pages/Encurtador";
import Analytics from "./pages/Analytics";

export default function Routes() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Switch>
                <Route exact path="/cadastro" component={Cadastro} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/perfil" component={Perfil} />
                <Route exact path="/analytics" component={Analytics} />
                <Route exact path="/" component={Encurtador} />
            </Switch>
        </BrowserRouter>
    )
}