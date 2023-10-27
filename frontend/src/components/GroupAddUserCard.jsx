import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { accessAChat } from '../redux/actions/chatAction'

const GroupAddUserCard = ({profilePic, userName, email, id, selectUser}) => {
  let dispatch = useDispatch()
  return (
    <Stack direction={'row'} gap={1} sx={{alignItems: 'center', '&:hover': {cursor: 'pointer'}}} 
    bgcolor={'#E6E6E6'} p={1} borderRadius={'5px'} onClick={() => selectUser({_id: id, userName})}>
      <Avatar src={profilePic} sx={{width: '40px', height: '40px'}}/>
      <Stack>
        <Typography variant='h6' sx={{fontSize: '1rem'}}>{userName}</Typography>
        <Typography variant='p' sx={{fontSize: '0.7rem'}}>Email: {email}</Typography>
      </Stack>
    </Stack>
  )
}

export default GroupAddUserCard