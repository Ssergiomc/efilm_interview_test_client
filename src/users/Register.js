import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_URL } from './../Const';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function Register() {
    const [newName, setName] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newPass, setPass] = useState("");
    const [passRep, setPassRep] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordsMatchError, setPasswordsMatchError] = useState("");
    const buttonStatus = !passwordsMatch;

    function readNewUser(e) {
        switch (e.target.id) {
            case "inputName":
                setName(e.target.value);
                break;
            case "inputEmail":
                setEmail(e.target.value);
                break;
            case "inputPassword":
                setPass(e.target.value);
                break;
            case "inputRepPassword":
                setPassRep(e.target.value);
                break;

            default:
                break;
        }
    }

    console.log(newName + " " + newEmail + " " + newPass);

    useEffect(() => {
        if (passRep === newPass) {
            setPasswordsMatch(true);
            setPasswordsMatchError("");
        } else {
            setPasswordsMatch(false);
            setPasswordsMatchError("Las contraseñas deben ser iguales");
        }
    }, [passRep, newPass])

    return (
        <>
            <h1>Registro</h1>
            <Form id="registerForm" action={`${API_URL}/users/register`} method="POST">
                <Form.Group>
                    <Form.Label htmlFor="inputName">Nombre completo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Manuel Larra"
                        required
                        value={newName}
                        id="inputName"
                        name="name"
                        onChange={readNewUser}
                        minLength="6"
                        maxLength="20"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputEmail">Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="prueba@mail.com"
                        required
                        value={newEmail}
                        id="inputEmail"
                        name="email"
                        onChange={readNewUser}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputPassword">Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        required
                        value={newPass}
                        id="inputPassword"
                        name="password"
                        onChange={readNewUser}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="inputRepPassword">Repetir Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Repetir contraseña"
                        required
                        id="inputRepPassword"
                        value={passRep}
                        onChange={readNewUser}
                    />
                    <Form.Text className="text-alert">
                        {passwordsMatchError}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="formRegSubmitGroup">
                    <Link to="/login">Ya tengo cuenta</Link>
                    <Button
                        type="submit"
                        disabled={buttonStatus}
                    >
                        Enviar
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}
export default Register;