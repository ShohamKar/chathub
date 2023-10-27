import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { accessAChat } from '../redux/actions/chatAction'

const UserCard = ({profilePic, userName, email, id}) => {
  let dispatch = useDispatch()
  let createChat = () => {
    dispatch(accessAChat({userId: id}))
  }
  return (
    <Stack direction={'row'} gap={1} sx={{alignItems: 'center', '&:hover': {cursor: 'pointer'}}} 
    bgcolor={'#50C878'} p={1} borderRadius={'5px'} onClick={() => createChat()}>
      <Avatar src={profilePic} sx={{width: '50px', height: '50px'}}/>
      <Stack>
        <Typography variant='h6' sx={{fontSize: '1.2rem'}}>{userName}</Typography>
        <Typography variant='p' sx={{fontSize: '0.8rem'}}>Email: {email}</Typography>
      </Stack>
    </Stack>
  )
}

export default UserCard