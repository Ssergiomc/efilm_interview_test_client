import { Redirect } from 'react-router-dom';
import { useState, useEffect } from "react";


function TodoList() {

    let [allTasks, setAllTasks] = useState([]);
    let [tasksList, setTasksList] = useState([]);
    let [emptyTasks, setEmptyTasks] = useState(false);

    //PRACTICAR PROTECCION RUTAS MEDIANTE LOCAL STORAGE
    // let [userCheck, setUserCheck] = useState("");
    // let checkUserConnected = localStorage.getItem('userName');
    // checkUserConnected = JSON.parse(checkUserConnected);
    // if (checkUserConnected !== "") {
    //     setUserCheck(checkUserConnected);
    // }


    useEffect(() => {
        fetch(`http://localhost:9000/tasks/all`)
            .then(resp => resp.json())
            .then(tasks => {
                if (!tasks.message) {
                    setAllTasks(tasks)
                    setEmptyTasks(false);
                } else {
                    setEmptyTasks(true);
                }
            })


    }, []);

    useEffect(() => {
        setTasksList(allTasks.map((task, index) => {
            return (
                <div key={index} className="card" id={task._id} value={task.taskname}>
                    <h3 className="listTaskName">🔸 {task.taskname}</h3>
                    <span className="listTaskOwner">Propietario: {task.taskowner} </span>
                </div >
            )
        }))


    }, [allTasks])


    // if (userCheck !== "") {
    return (

        <div className="contAllTasks">
            <h1>Tareas</h1>
            <div className="cards">
                {emptyTasks ? "No existen tareas de equipo pendientes, buen trabajo." : tasksList}
            </div>
        </div>
    )
    // } else {
    //     return (
    //         <Redirect to="/login" />
    //     )
    // }
}
export default TodoList;