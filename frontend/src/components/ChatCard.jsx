import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../redux/reducers/chatReducer'
import { getAllMessages } from '../redux/actions/chatAction'

const ChatCard = ({chatname, latestMsg, id, socket}) => {
  let dispatch = useDispatch()
  let {currentChat} = useSelector(state => state.chat)
  let selectChat = async() => {
    dispatch(setCurrentChat({id, chatName: chatname}))
    await dispatch(getAllMessages({id, }))
    socket.emit('join chat', id)
  }
  return (
    <Stack bgcolor={(id === currentChat ? '#50C878' : '#c0c0c0')} p={1}
    borderRadius={'5px'} sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => selectChat()}>
      <Typography variant='h6' fontSize={'1.5rem'}>{chatname}</Typography>
      {latestMsg && <Typography fontSize={'0.8rem'}>{latestMsg.sender.name}: {latestMsg.content}</Typography> }
      {/* trim down latest msg to some charaters fixed */}
    </Stack>
  )
}

export default ChatCard