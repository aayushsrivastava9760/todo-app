/* eslint-disable @next/next/no-img-element */

import axios from "axios"
import { useRef, useState } from "react"
import { useAuth } from "../context/auth"

export default function TodoListItem({id,title}) {

  const [newTitle,setNewTitle] = useState(title)
  const { token, notify } = useAuth()
  const inputRef = useRef(null)
  const doneButtonRef = useRef(null)
  const editAndDeleteButtonRef = useRef(null)
  const titleRef = useRef(null)

  const editTask = (id) => {
    /**
    * @todo Complete this function.
    * @todo 1. Update the dom accordingly
    */
    editAndDeleteButtonRef.current.className = 'hideme'
    titleRef.current.className = 'hideme'
    inputRef.current.className = 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring  todo-edit-task-input'
    doneButtonRef.current.className = ''
  }

  const deleteTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
    axios({
      headers:{
        Authorization: `Token ${token}`
      },
      url: `https://todo-app-csoc.herokuapp.com/todo/${id}/`,
      method:'delete',
    })
      .then(function (data,status){
        notify('Task was deleted successfully', 'success')
      })
      .catch(function (error){
        notify('Some error occurred...','error')
      })

  }

  const updateTask = (id) => {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
    */

    if( validFieldInputs() ){

      const dataForApiRequest = {
        id,
        title: newTitle
      }

      axios({
        headers:{
          Authorization: `Token ${token}`
        },
        url: `https://todo-app-csoc.herokuapp.com/todo/${id}/`,
        method:'patch',
        data: dataForApiRequest,
      })
        .then(function (data,status){
          editAndDeleteButtonRef.current.className = ''
          titleRef.current.className = 'todo-task  text-gray-600'
          inputRef.current.className = 'hideme'
          doneButtonRef.current.className = 'hideme'
          notify('Task was updated successfully','success')
        })
        .catch(function (error){
          notify('Some error occurred...','error')
        })
    }

    else{
      console.log('please enter valid tasks');
      notify('Please enter valid task','warn')
    }
  }

  const validFieldInputs = () => {
    if(newTitle !== ''){
      return true
    }
    else{
      return false
    }
  }

  return (
    <>
      <li key={id} className='border flex border-gray-500 rounded px-2 py-2 justify-between items-center mb-2'>
        <input
          id={`input-button-${id}`}
          type='text'
          className='hideme'
          placeholder='Edit The Task'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          ref={inputRef}
        />
        <div id={`done-button-${id}`} className='hideme' ref={doneButtonRef}>
          <button
            className='bg-transparent hover:bg-gray-500 text-gray-700 text-sm  hover:text-white py-2 px-3 border border-gray-500 hover:border-transparent rounded todo-update-task'
            type='button'
            onClick={() => updateTask(id)}
          >
            Done
        </button>
        </div>
        <div id={`task-${id}`} className='todo-task  text-gray-600' ref={titleRef} >
          {title}
        </div>
        <span id={`task-actions-${id}`} className='' ref={editAndDeleteButtonRef}>
          <button
            style={{ marginRight: '5px' }}
            type='button'
            onClick={() => editTask(id)}
            className='bg-transparent hover:bg-yellow-500 hover:text-white border border-yellow-500 hover:border-transparent rounded px-2 py-2'
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png'
              width='18px'
              height='20px'
              alt='Edit'
            />
          </button>
          <button
            type='button'
            className='bg-transparent hover:bg-red-500 hover:text-white border border-red-500 hover:border-transparent rounded px-2 py-2'
            onClick={() => deleteTask(id)}
          >
            <img
              src='https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg'
              width='18px'
              height='22px'
              alt='Delete'
            />
          </button>
        </span>
      </li>
    </>
  )
}
