import { Route } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import TodoList from './users/TodoList';
import ModifyTasks from './users/ModifyTasks';
import Register from './users/Register';
import Login from './users/Login';



function Main() {


    return (
        <main >
            <Route exact path="/">
                <Form.Label><h1>Task App</h1></Form.Label>
                <Form.Group id="introText">
                    <Form.Text><h3><span>Task App</span></h3></Form.Text>
                    <Form.Text className="expText"><h4>🔹 Se trata de una aplicación de tareas (To do list / Task Manager).</h4></Form.Text>
                    <Form.Text className="expText"><h4>🔹 Posibilidades de CRUD (creación, lectura, modificación y borrado) de las mismas por usuario.</h4></Form.Text>
                    <Form.Text className="expText"><h4>🔹 Esta orientado principalmente a empresas donde todos los usuarios podrán ver las tareas a realizar.</h4></Form.Text>
                    <Form.Text className="expText"><h4>🔹 Unicamente podrá modificar la tarea el usuario propietario de la correspondiente tarea específica.</h4></Form.Text>
                </Form.Group>
            </Route>

            <Route exact path="/register">
                <Register />
            </Route>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/tasks">
                <TodoList />
            </Route>

            <Route exact path="/modifyTasks">
                <ModifyTasks />
            </Route>

        </main>
    )
}
export default Main;