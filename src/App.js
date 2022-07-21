import './App.css';
import React,{useState, useEffect} from 'react';
import TaskCard from './components/TaskCard';
import NewTask from './components/NewTasks';

function App() {




  const [items, setitems] = useState([]);

  //the below code will help us fetch data from Api

  let functn = async () =>{

    let url = 'https://jsonplaceholder.typicode.com/todos'
    let data = await fetch(url);
    setitems(await data.json());

  }

  useEffect( () => {
    functn();
    console.log(items);  
  },[])




  //we will pass data from todos as props to all the todo items

  return (
    <div className="App">

      <NewTask/>
      <div className=' w-100 bg-dark d-flex justify-content-center'>

        <ul className=' my-4 w-75 p-0' style={{ listStyle: 'none' }} >

          {items.map((element)=>{
            return <li> <TaskCard keys={element.id} title={element.title} completed={element.completed} userId={element.userId} id={element.id}/> </li>
          })}

        </ul>


      </div>




    </div>
  );
}

export default App;
