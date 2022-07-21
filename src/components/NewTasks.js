import React, { useState} from "react";
const NewTask=(props)=>{

    const[newTask, setNewTask] = useState('')

    // calls the API with POST method as soon as "ADD" Button is clicked
    const AddNewTask = () => {
        if(newTask !== ''){
            fetch(`https://jsonplaceholder.typicode.com/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title: `${newTask}`,
                completed: false,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {console.log(json)
            alert(`Task ${json.title} Added`)});
        } else{
            alert("Add a task")
        }
        setNewTask('');
    }

// edits newTask as the input field is changed
    const handleNewTaskChange = (e) => {
        setNewTask(e.target.value);
    }
    return(

        <div className="newTask navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center">
           
            <div className="newCard d-flex justify-content-center w-100">
                {/* <div className="newTaskHead">
                <span> <strong>Add New Task</strong></span>
                </div> */}
                
                <input type="text" className="newInput form-control me-2  w-25" placeholder="Add New Task" onChange={handleNewTaskChange}/>
                {/* className="taskText" */}
                <button className="buttonInput btn btn-outline-success w-25" onClick={AddNewTask}>Add  </button>
            </div>
            
        </div>
        
    )
}

export default NewTask