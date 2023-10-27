import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './pages/Loading'
import toast, { Toaster } from 'react-hot-toast'
import { setError, setMessage } from './redux/reducers/userReducer'
import { getMyProfile } from './redux/actions/userAction'

const App = () => {
  let dispatch = useDispatch()
  let { loading, error, message } = useSelector(state => state.user)
  useEffect(() => {
    dispatch(getMyProfile())
  }, [dispatch])
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(setError({ error: '' }))
    }
    if (message) {
      toast.success(message)
      dispatch(setMessage({ message: '' }))
    }
  }, [dispatch, error, message])
  return (
    <Router>
      {loading ? <Loading /> : (
        <>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Toaster position="bottom-center" reverseOrder={false} />
        </>)}
    </Router>
  )
}

export default App