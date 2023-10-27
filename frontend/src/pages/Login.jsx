import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../redux/actions/userAction'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Home = () => {
  let [image, changeImage] = useState('')
  let [imagePrev, changeImgPrev] = useState('')
  let avtarHandler = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      changeImgPrev(reader.result)
      changeImage(file)
    }
  }
  let { isAuth } = useSelector(state => state.user)
  let dispatch = useDispatch()
  let [loginData, updateLoginData] = useState({ email: '', password: '' })
  let [registerData, updateRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  let allowLoginChange = e => {
    updateLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  let allowRegisterChange = e => {
    updateRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }
  let loginHandler = async (e) => {
    e.preventDefault()
    if(!loginData.email || !loginData.password){
      return toast.error('Some of the parameters are missing!')
    }
    await dispatch(login({ email: loginData.email, password: loginData.password }))
    updateLoginData({ email: '', password: '' })
  }
  let registerHandler = async (e) => {
    e.preventDefault()
    if(!registerData.email || !registerData.password || !registerData.confirmPassword || !registerData.name || !image){
      return toast.error('Some of the parameters are missing!')
    }
    if(registerData.password !== registerData.confirmPassword){
      return toast.error("Password doesn't match!")
    }
    let formData = new FormData()
    formData.append('name', registerData.name)
    formData.append('email', registerData.email)
    formData.append('password', registerData.password)
    formData.append('file', image)
    await dispatch(register(formData))
    updateRegisterData({ name: '', email: '', password: '', confirmPassword: '' })
  }
  if (isAuth) {
    return <Navigate to={'/'} replace />
  }
  return (
    <Box sx={{ height: {xs:'100vh', sm:'95vh'}, width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h2' sx={{position: 'absolute', top: {xs: '130px', sm: '170px'}}} ><div className='app-title'>ChatHub</div></Typography>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form className="flip-card__form" action="">
                  <input className="flip-card__input" name="email" value={loginData.email} onChange={(e) => allowLoginChange(e)} placeholder="Email" type="email" />
                  <input className="flip-card__input" name="password" value={loginData.password} onChange={(e) => allowLoginChange(e)} placeholder="Password" type="password" />
                  <button className="flip-card__btn" onClick={(e) => loginHandler(e)}>Let`s go!</button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form className="flip-card__form" action="">
                  <input className="flip-card__input" placeholder="Name" name='name' type="name" value={registerData.name} onChange={(e) => allowRegisterChange(e)} />
                  <input className="flip-card__input" name="email" placeholder="Email" type="email" value={registerData.email} onChange={(e) => allowRegisterChange(e)} />
                  <input className="flip-card__input" name="password" placeholder="Password" type="password" value={registerData.password} onChange={(e) => allowRegisterChange(e)} />
                  <input className="flip-card__input" name="confirmPassword" placeholder="Confirm Password" type="password" value={registerData.confirmPassword} onChange={(e) => allowRegisterChange(e)} />
                  <input className="flip-card__input" placeholder="Profile Picture" type="file" onChange={(e) => avtarHandler(e)} accept="image/*"/>
                  <button className="flip-card__btn" onClick={(e) => registerHandler(e)} >Confirm!</button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </Box>
  )
}

export default Home