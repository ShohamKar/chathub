import axios from "axios"
import { server } from '../store'
import { setLoadingFalse, setLoadingTrue, setLoginFailed, setLoginSuccess, setLogout } from "../reducers/userReducer"

export let login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(setLoadingTrue())
    let { data } = await axios.post(`${server}/login`, {
      email,
      password
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
    dispatch(setLoginSuccess(data))
    dispatch(setLoadingFalse())
  } catch (error) {
    dispatch(setLoginFailed(error.response.data))
    dispatch(setLoadingFalse())
  }
}

export let register = (userData) => async (dispatch) => {
  try {
    dispatch(setLoadingTrue())
    let { data } = await axios.post(`${server}/register`, userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
    dispatch(setLoadingFalse())
    dispatch(setLoginSuccess(data))
  } catch (error) {
    dispatch(setLoginFailed(error.response.data))
    dispatch(setLoadingFalse())
  }
}

export let getMyProfile = () => async(dispatch) => {
  try {
    dispatch(setLoadingTrue())
    let {data} = await axios.get(`${server}/me`, { withCredentials: true })
    dispatch(setLoginSuccess(data))
    dispatch(setLoadingFalse())
  } catch (error) {
    dispatch(setLoginFailed(error.response.data))
    dispatch(setLoadingFalse())
  }
}

export let logout = () => async(dispatch) => {
  try{
    dispatch(setLoadingTrue())
    let {data} = await axios.post(`${server}/logout`, {}, {withCredentials: true})
    dispatch(setLoadingFalse())
    dispatch(setLogout())
  }catch(error){
    dispatch(setLoginFailed(error.response.data))
  }
}