import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../api-helpers/apiHelpers'
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import { useNavigate } from 'react-router-dom';


const Auth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // problem is when we refresh a page then data which store in state that data was lost so those data we store in browsers local storage
  const onResReceived = (data) => {
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem("userId",data.id);
    navigate("/")
  }  

  const getData = (data) => {
    console.log("Auth",data)
    sendUserAuthRequest(data.inputs,data.signup)
    // .then((res)=>console.log(res))
    // .then(()=>dispatch(userActions.login()))
    .then(onResReceived)
    .catch((err)=>console.log(err)); 
  }

  return (
    <div><AuthForm onSubmit={getData} isAdmin={false} /> </div>
  )
}

export default Auth