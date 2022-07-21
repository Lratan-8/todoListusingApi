import React, { useState, useEffect } from 'react'

let TaskCard = (props) => {

  let completed = props.completed;
  let title = props.title;
  let keys = props.id;
  let userId = props.userId;
  let eventId = props.id;
  

  const [bgColor, setbg] = useState('#91f584');
  const [edit, setEdit] = useState(false);
  const [changeTask, setChangeTask] = useState('')


  //this is to change the background of the list item according to completion

  useEffect(() => {

    if (completed === true) {
      setbg('#91f584');
    } else {
      setbg('#ff6969')
    };

  }, []);



  //to handle the delete button 

  const handleDelete = (e) => {

    fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.value}`,

      {
        method: "DELETE",
      });
    e.target.parentElement.parentElement.remove();

  };



  //to handle the edit button

  const HandleEdit = (e) => {
    if (!edit) {
      setEdit(true)
    } else if (changeTask !== '') {
      fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            id: `${e.target.keys}`,
            title: `${changeTask}`,
            userId: userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          alert(`updated to task: ${json.title}`)
        });
      setEdit(false);
      setChangeTask('');
    } else {
      alert("No task changed");
      setEdit(false);
      setChangeTask('');
    }
  }




  //edits change Task as the input field is changed
  const changeTodo = (e) => {
    setChangeTask(e.target.value)
  }





  return (
    <div key={keys} className='d-flex w-100 justify-content-evenly my-1 align-items-center' style={{ height: '70px', borderRadius: '10px', boxSizing: 'border-Box', paddingRight: '20px', backgroundColor: bgColor }}>

      <div className={props.completed ? "completed" : "pending"} />
      {edit ? <div className="taskInput">
        <input type="text" placeholder={props.title} onChange={changeTodo} className="taskText" />
      </div> : <div className='w-75 ' style={{ color: 'black' }}>{`${title}`}<span> {props.title}</span></div>}


      {/* <div className='w-75 ' style={{color: 'black'}}>{`${title}`}</div> */}

      <div className='d-flex w-25 justify-content-evenly bg-dark h-75 align-items-center' style={{ borderRadius: '5px' }}>
        <img id={eventId} onClick={HandleEdit} src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png" alt="editButton" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
        <img onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="delete button" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
      </div>

    </div>
  )
}

export default TaskCard
