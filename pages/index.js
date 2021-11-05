import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { auth_required } from '../middlewares/auth_required'

export default function Home() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])

  //checking auth
  
  auth_required()

  function getTasks() {
    /***
     * @todo Fetch the tasks created by the user.
     * @todo Set the tasks state and display them in the using TodoListItem component
     * The user token can be accessed from the context using useAuth() from /context/auth.js
     */
    axios
      .get('/todo/', {
        headers: {
          Authorization: 'Token ' + token,
        }
      })
        .then((response) => {
          setTasks(response.data)
        })
        .catch((error)=>{
          console.log('some error occurred...');
        })
  }

  useEffect(()=>{
    getTasks()
  },[tasks])

  return (
    <div>
      <center>
        <AddTask />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-2 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          <TodoListItem tasks={tasks} />
        </ul>
      </center>
    </div>
  )
}
