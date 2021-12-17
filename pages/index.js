import TodoListItem from '../components/TodoListItem'
import AddTask from '../components/AddTask'
import { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { auth_required } from '../middlewares/auth_required'

export default function Home() {
  const { token, notify , profileName } = useAuth()
  const [tasks, setTasks] = useState([])
  const [showClearAllbtn,setShowClearAllBtn] = useState(false)

  const clearAllTasks = () => {

    let check = true

    tasks.forEach(task => {
      const { id } = task
      axios({
        headers:{
          Authorization: `Token ${token}`
        },
        url: `https://todo-app-csoc.herokuapp.com/todo/${id}/`,
        method:'delete',
      })
        .then(function (data,status){
          check = true
        })
        .catch(function (error){
          notify('Some error occurred...','error')
          check = false
        })
    })
    if(check){
      notify('All tasks were successfully cleared','success')
    }
  }

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
    if(profileName !== ''){
      notify(`Welcome ${profileName} !!`,'basic')
    }
    if(tasks.length>0){
      setShowClearAllBtn(true)
    }
    else{
      setShowClearAllBtn(false)
    }
  },[])

  useEffect(()=>{
    getTasks()
    if(tasks.length>0){
      setShowClearAllBtn(true)
    }
    else{
      setShowClearAllBtn(false)
    }
  },[tasks])

  return (
    <div>
      <center>
        <AddTask />
        <ul className='flex-col mt-9 max-w-sm mb-3 '>
          <span className='inline-block bg-blue-600 py-1 mb-5 px-9 text-sm text-white font-bold rounded-full '>
            Available Tasks
          </span>
          {tasks.length > 0 ? tasks.map((task) => <TodoListItem key={task.id} {...task} />) : <h1 className='text-gray-600 py-2'>No tasks to display</h1>}
        </ul>
        {showClearAllbtn ?
        <button className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white my-4 py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={clearAllTasks}>Clear All</button> :
        <h1></h1>
        }
      </center>
    </div>
  )
}
