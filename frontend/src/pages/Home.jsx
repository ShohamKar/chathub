import { Box, Button, Drawer, InputBase, Stack, SwipeableDrawer, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import MyChats from './MyChats'
import ChatBox from './ChatBox'
import UserCard from '../components/UserCard'
import axios from 'axios'
import { server } from '../redux/store'
import { getAllChats } from '../redux/actions/chatAction'
import io from 'socket.io-client'


const Home = () => {
  let { isAuth, user } = useSelector(state => state.user)
  let {allChats, enableReload, currentChat, currChatName} = useSelector(state => state.chat)
  let dispatch = useDispatch()
  let [drawer, toggleDrawer] = useState(false)
  let [createChatOpen, toggleCreateChatOpen] = useState(false)
  if (!isAuth) {
    return <Navigate to={'/login'} replace />
  }
  const ENDPOINT = 'http://localhost:5000/'
  let socket, selectedChatCompare;
  let [socketConnected, setSocketConnected] = useState(false)

  let [searchKeyword, updateSearchKeyword] = useState('')
  let [searchResults, updateSearchResults] = useState([])
  let searchUsers = async() => {
    let {data} = await axios.get(`${server}/users?search=${searchKeyword}`)
    updateSearchResults(data.users)
  }
  useEffect(() => {
    dispatch(getAllChats())
    toggleCreateChatOpen(false)
  }, [enableReload])

  socket = io(ENDPOINT)
  useEffect(() => {
    socket.emit('setup', user)
    socket.on('connected', () => setSocketConnected(true))
  }, [])
  return (
    <>
      <Drawer anchor='left' open={drawer} onClose={() => toggleDrawer(false)}>
        <Box width={{xs: '80vw', sm:'45vw', md: '35vw', lg: '25vw', xl: '20vw'}}>
          <Stack p={4} gap={2}>
            <Typography variant='h5'>Search Users</Typography>
            <Stack direction={'row'} gap={1}>
              <Box p={1} border={'0.1px solid #E6E6E6'} borderRadius={'2px'}>
                <InputBase placeholder='Search' value={searchKeyword} onChange={(e) => updateSearchKeyword(e.target.value)}/>
              </Box>
              <Button variant='contained' onClick={() => searchUsers()}>Go</Button>
            </Stack>
            {searchResults.map(ele => <UserCard key={ele._id}
              profilePic={ele.profilePicture.url}
              userName={ele.name}
              email={ele.email}
              id={ele._id}
            />)}
          </Stack>
        </Box>
      </Drawer>
      <Box width={'100vw'} boxSizing={'border-box'} height={'100vh'} className="homepage-bg">
        <Stack width={'100%'} height={'100%'}>
          <Navbar toggleDrawer={toggleDrawer} socket={socket}/>
          <Stack direction={'row'} flex={15} margin={'10px'} borderRadius={'15px'} gap={2}>
            <MyChats socket={socket} currentChat={currentChat} allChats={allChats} createChatOpen={createChatOpen} toggleCreateChatOpen={toggleCreateChatOpen}/>
            <ChatBox socket={socket} currentChat={currentChat} currChatName={currChatName} />
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default Home