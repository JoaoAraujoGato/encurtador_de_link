import React from "react";
import { useHistory } from "react-router-dom";
import {AppBar, Toolbar} from "@mui/material";
import "./Menu.css";
import { isAuthenticated, logOut } from "../../services/auth";

export default function Menu(props) {
    const history = useHistory();
    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "#f73816" }}>
                    <div className="w-100 d-flex justify-content-around botoes">
                        <div>
                            <button onClick={() => history.push("/analytics")}>Analytics</button>
                        </div>
                        <div>
                            {!isAuthenticated()
                            ? <button onClick={() => history.push("/login")}>Login</button>
                            : <button onClick={() => {logOut(); window.location.reload(true)}}>Logout</button>}
                        </div>
                        {!isAuthenticated()
                            ? <div>
                                <button onClick={() => history.push("/cadastro")}>Cadastre-se</button>
                            </div>
                            : <></>
                        }
                        <div>
                            <button onClick={() => history.push("/")}>Encurtador</button>
                        </div>
                        <div>
                            <button onClick={() => history.push("/perfil")}>Perfil</button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            {props.children}
        </>
    );
}