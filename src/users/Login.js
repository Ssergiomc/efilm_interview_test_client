import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_URL } from './../Const';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [userMail, setUserMail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loginMessageAlert, setLoginMessageAlert] = useState("");
    const [loginPasswordAlert, setLoginPasswordAlert] = useState("");

    function readUser(e) {
        switch (e.target.name) {
            case "email":
                setUserMail(e.target.value);
                break;
            case "password":
                setUserPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    function setconnection(e) {
        e.preventDefault();

        const checktUser = {
            email: userMail.toLowerCase(),
            password: userPassword,
        }

        const fetchSetUser = {
            method: 'POST',
            body: JSON.stringify(checktUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch(`${API_URL}/users/login`, fetchSetUser)
            .then(resp => resp.json())
            .then(data => {
                if (data.status === 0) {
                    let _id = data.user._id;
                    let name = data.user.name;

                    // console.log(_id);
                    // console.log(name); EN CHROME FUNCIONA EN FIREFOX NO!!!

                    _id = JSON.stringify(_id);
                    name = JSON.stringify(name);

                    localStorage.setItem("userId", _id);
                    localStorage.setItem("userName", name);

                    window.location = "/";

                } else if (data.status === 1) {
                    setLoginPasswordAlert("Contraseña incorrecta")
                } else {
                    setLoginMessageAlert("Usuario no existente")
                }
            })
    }

    return (
        <>
            <h1>Iniciar Sesión</h1>
            <Form id="loginForm" onSubmit={setconnection}>
                <Form.Group >
                    <Form.Label>Dirección de correo</Form.Label>
                    <Form.Control
                        required
                        name="email"
                        id="inputEmail"
                        value={userMail}
                        onChange={readUser}
                        type="mail"
                        placeholder="Introduce tu correo electrónico" />
                    <Form.Text className="text-alert">
                        {loginMessageAlert}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="formBasicPassword">
                    <Form.Label>Introduce tu contraseña</Form.Label>
                    <Form.Control
                        required
                        name="password"
                        id="inputPassword"
                        value={userPassword}
                        type="password"
                        placeholder="Contraseña"
                        onChange={readUser}
                    />
                    <Form.Text className="text-alert">
                        {loginPasswordAlert}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="formLogSubmitGroup">
                    <Link to="/register">No tengo cuenta</Link>
                    <Button variant="primary" type="submit">Entrar</Button>
                </Form.Group>
            </Form>
        </>
    )
}
export default Login;