import { useState } from "react"
import { useAuth } from "../context/auth"
import axios from '../utils/axios'


export default function AddTask() {

  const { token } = useAuth()

  const [task,setTask] = useState('')

  const addTask = () => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
    const id = new Date().getTime().toString()

    const dataForApiRequest = {
      id: id,
      title: task
    }

    axios({
      headers:{
        Authorization: `Token ${token}`,
      },
      url: '/todo/create/',
      method: 'post',
      data: dataForApiRequest,
    })
      .then(function (data,status){
        console.log(data);
      })
      .catch( function (error){
        console.log('some error occurred...');
      })
  }

  const validInputField = (text) => {
    if(text !== ''){
      return true
    }
    else{
      return false
    }
  }

  return (
    <div className='flex items-center max-w-sm mt-24'>
      <input
        type='text'
        className='todo-add-task-input px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full'
        value={task}
        onChange={(e)=> setTask(e.target.value)}
        placeholder='Enter Task'
      />
      <button
        type='button'
        className='todo-add-task bg-transparent hover:bg-green-500 text-green-700 text-sm hover:text-white px-3 py-2 border border-green-500 hover:border-transparent rounded'
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  )
}
