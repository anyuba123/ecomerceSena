import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


function ChangeUserRole({
  name,
  email,
  role,
  onClose,
  userId,
  callFunc,
}) {

  const [userRole, setUserRole] = useState( role )

  const handleOnChangeSelect = (e) => { 
    setUserRole(e.target.value)

    console.log(e.target.value)
  }
  const updateUserRole = async () => { 
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole
      })
    })
    const responseData = await fetchResponse.json()
    if (responseData.success) {
      toast.success(responseData.message)
      onClose()
      callFunc()
    }

    console.log("role updated", responseData)
  }



  return (
    <div className='fixed inset-0 z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
      <div className=' mx-auto bg-white shadow-md p4 w-full max-w-sm mt-20 '>
        <div>
          <button className='block ml-auto' onClick={onClose}>
            <IoMdClose />
          </button>
        </div>

        <h1 className='pb-4 text-lg font-medium'>Cambiar Rol de Usuario</h1>
       <p>Name : {name}</p>
        <p>Email : {email}</p> 

        <div className='flex items-center justify-between my-4'>
          <p>ROLE</p>
          <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
            {
              Object.values(ROLE).map(el => {
                return (
                  <option value={el} key={el}>{el}</option>
                )
              })
            }
          </select>
        </div>
        <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'  onClick={updateUserRole} >Cambiar Rol</button>
      </div>
    </div>
  )
}

export default ChangeUserRole