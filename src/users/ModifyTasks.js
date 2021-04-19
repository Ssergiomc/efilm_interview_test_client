import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from "react";

import taskdone from '../greentick.png';
import taskedit from '../edit.png';
import taskdelete from '../trash.png';


function ModifyTasks() {
    let [userName, setUserName] = useState("");
    let [userId, setUserId] = useState("");
    let [userTasks, setUserTasks] = useState([]);
    let [userTasksList, setUserTasksList] = useState([]);
    let [emptyTasks, setEmptyTasks] = useState(false);
    let [getNewTask, setGetNewTask] = useState("");
    let [modifTaskId, setModifTaskId] = useState("");

    let [modifTaskName, setModifTaskName] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        setModifTaskId(e.currentTarget.value);
        // console.log(e.currentTarget.value);
    }


    useEffect(() => {

        let userIdFromStorage = localStorage.getItem("userId");
        userIdFromStorage = JSON.parse(userIdFromStorage);
        setUserId(userIdFromStorage);

        let userNameFromStorage = localStorage.getItem("userName");
        userNameFromStorage = JSON.parse(userNameFromStorage);
        setUserName(userNameFromStorage);

        if (userId !== "") {
            fetch(`http://localhost:9000/tasks/gettasksuser/${userId}`)
                .then(resp => resp.json())
                .then(myTasks => {
                    if (myTasks.message) {
                        alert(myTasks.message);
                    } else {
                        setUserTasks(myTasks)
                    }
                })
        }
    }, [userId]);

    useEffect(() => {
        if (userTasks.length === 0) {
            setEmptyTasks(true);
        } else {
            setEmptyTasks(false);
        }
    }, [userTasks])

    function deleteTask(e) {

        let taskId = e.currentTarget.value;

        let taskDeleteObj = {
            task: taskId,
            user: userId,
        }

        let fetchDeleteTask = {
            method: "DELETE",
            body: JSON.stringify(taskDeleteObj),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }
        fetch("http://localhost:9000/tasks/deleteonetask", fetchDeleteTask)
            .then(resp => resp.json())
            .then(myTasksModif => {
                setUserTasks(myTasksModif)
                if (myTasksModif.length === 0) {
                    setEmptyTasks(true)
                }
            })
    }




    /* VOY POR AQUI */
    function editTask(e) {

        let taskModifObj = {
            newNameTask: modifTaskName,
        }

        let fetchModifTask = {
            method: "PUT",
            body: JSON.stringify(taskModifObj),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }
        fetch(`http://localhost:9000/tasks/modifyonetask/${modifTaskId}`, fetchModifTask)
            .then(resp => resp.json())
            .then(data => {
                if (data.status === 0) {
                    setEmptyTasks(true);
                    window.location.reload();
                }
            })
    }

    useEffect(() => {
        setUserTasksList(userTasks.map((usertask, index) => {
            // console.log(usertask);
            return (
                <>
                    <div key={index} className="card" id={usertask._id} value={usertask.taskname}>
                        <div className="taskDescAction">
                            <h3 className="listTaskName">🔸 {usertask.taskname}</h3>
                            <div className="buttonsActions">
                                {/* <button className="buttonTask" title="Tarea completada"><img className="buttonComplete" src={taskdone} alt="completed task" /></button> */}
                                <button className="buttonTask" title="Editar tarea" id="buttonAction" value={usertask._id} onClick={e => handleShow(e)}><img className="buttonEdit" src={taskedit} alt="task to edit" /></button>
                                <button className="buttonTask" title="Borrar tarea" value={usertask._id} onClick={e => deleteTask(e)}><img className="buttonDelete" src={taskdelete} alt="task to delete" /></button>
                            </div>
                        </div>
                        <span className="listTaskOwner">Propietario: {usertask.taskowner} </span>
                        {/* <span className="listTaskSit">Situación: {usertask.situation} </span> */}
                    </div >

                </>
            )
        }))

    }, [userTasks])

    function readNewTask(e) {
        e.preventDefault();
        setGetNewTask(e.target.value)
        // console.log(e.target.value);
    }

    function getModifTask(e) {
        if (e.target.name === "userModifTask") {
            setModifTaskName(e.target.value)
            // console.log(e.target.value);
        }
    }

    return (
        <div id="taskSite">
            <div className="contAllTasks">
                <h1>Modificar Tareas</h1>
                <div className="contNewTasks">
                    <h2>Crear Tarea</h2>
                    <div id="TaskForm">
                        <Form id="newTaskForm" action={`http://localhost:9000/tasks/createnewtask/${userName}/${userId}`} method="POST">
                            <Form.Group className="formNewTask">
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre máx 30 caract"
                                    required
                                    value={getNewTask}
                                    name="task"
                                    onChange={readNewTask}
                                    minLength="6"
                                    maxLength="30"
                                    className="newTask"
                                />
                            </Form.Group>

                            <Form.Group className="formNewTaskSubmit">
                                <Button type="submit">Añadir</Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="contUserTasks">
                    <h2>Tareas propias</h2>
                    <div className="cards">
                        {emptyTasks ? "No tienes tareas propias pendientes." : userTasksList}
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Nombre Tarea</Modal.Title>
                </Modal.Header>
                <InputGroup className="mb-3">
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Nuevo nombre"
                        name="userModifTask"
                        value={modifTaskName}
                        onChange={getModifTask}
                    />
                </InputGroup>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={e => editTask(e)}>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ModifyTasks;