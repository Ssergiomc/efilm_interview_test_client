import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from './906334g.png';


function Header() {
    const [user, setUser]= useState("");
    const [logged, setLogged] = useState(false);
    const [expanded, setExpanded] = useState(false);

    function collapseNav() {
        setTimeout(() => { setExpanded(false) }, 150);
    }

    function logout() {
        collapseNav();
        setLogged(undefined);
        localStorage.clear()
        window.location = "/";
    }


    function ControlPanel() {

        if(localStorage.getItem("userName")){
            let userFromStorage= localStorage.getItem("userName");
            userFromStorage = JSON.parse(userFromStorage);
            setUser(userFromStorage);
            setLogged(true)
        }

        if (!logged) {
            return (
                <Nav className="ml-auto">
                    <Link onClick={collapseNav} className="nav-link" to="/register">Registrarse</Link>
                    <Link onClick={collapseNav} className="nav-link" to="/login">Iniciar sesión</Link>
                </Nav>
            )
        }
        return (
            <Nav className="ml-auto">
                <Link onClick={collapseNav} className="nav-link" to="/tasks">Tareas</Link>
                <Link onClick={collapseNav} className="nav-link" to="/modifyTasks">Modificar tareas</Link>
                <Link onClick={logout} className="nav-link" to="/">Cerrar sesión</Link>
            </Nav>
        )
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
                <Link onClick={collapseNav} to="/">
                    <img className="logoIcon" src={logo} alt="logo" title="Inicio"/>
                </Link>
                <div id="welcomeContainer">
                    <span>{logged ? "Bienvenid@" : ""}</span>
                    <span id="welcomeUser">{logged ? user.split(' ')[0] + " " + user.split(' ')[1] : ""}</span>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ControlPanel />
                    {/* <Link className="nav-link" to="/tasks">Tareas</Link>
                    <Link className="nav-link" to="/modifyTasks">Modificar tarea</Link> */}
                </Navbar.Collapse>
            </Navbar>

        </header>
    )
}
export default Header;