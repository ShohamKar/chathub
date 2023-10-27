import { Box, IconButton, InputBase, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import SingleMessage from '../components/SingleMessage';
import toast from 'react-hot-toast';
import { sendMessageInChat } from '../redux/actions/chatAction';
import UpdateGroup from '../components/UpdateGroup';
import { addToCurrentChat, setCurrentChat, updateLatestMsg } from '../redux/reducers/chatReducer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatBox = ({ currentChat, currChatName, socket }) => {
  let dispatch = useDispatch()
  let { user } = useSelector(state => state.user)
  let { chatMessages } = useSelector(state => state.chat)
  let [messageInput, updateMsgInput] = useState('')
  let [openChatSettings, toggleChatSettings] = useState(false)
  useEffect(() => {
    socket.on('message receive', (msg) => {
      dispatch(addToCurrentChat({ msg }))
      dispatch(updateLatestMsg({msg}))
    })
  })
  let sendMessage = async () => {
    if (!messageInput) {
      return toast.error('Please enter a message to send!')
    }
    await dispatch(sendMessageInChat({ chatId: currentChat, content: messageInput, socket }))
    updateMsgInput('')
  }
  if (!currentChat) {
    return <Box flex={8} bgcolor={'#F2F2F2'} borderRadius={'15px'} boxShadow={'3px 5px'} p={3}
      sx={{ display: {xs: 'none', sm: 'flex'}, alignItems: 'center', justifyContent: 'center' }}>
      <Typography fontSize={'2.5rem'} color={'#c0c0c0'}>Click on a user to start chatting</Typography>
    </Box>
  }
  return (
    <Box flex={8} bgcolor={'#F2F2F2'} borderRadius={'15px'} boxShadow={'3px 5px'} p={3} height={'93vh'} boxSizing={'border-box'}>
      <UpdateGroup
        createChatOpen={openChatSettings}
        toggleCreateChatOpen={toggleChatSettings}
        chatName={currChatName}
        currentChat={currentChat}
      />
      <Stack gap={3}>
        <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton onClick={ () => dispatch(setCurrentChat({id: null, chatName: ""}))}>
            <ArrowBackIcon/>
          </IconButton>
          <Typography variant='h4'>{currChatName}</Typography>
          <IconButton onClick={() => toggleChatSettings(true)}>
            <RemoveRedEyeIcon />
          </IconButton>
        </Stack>
        <Stack bgcolor={'#E6E6E6'} height={'80vh'} borderRadius={'10px'}>
          <Stack className='messages hide-scroll' flex={100} direction={'column-reverse'} p={3} gap={2} overflow={'scroll'}>
            {chatMessages.map((ele) => <SingleMessage key={ele._id}
              senderMe={ele.sender._id === user._id}
              profilePic={ele.sender.profilePicture.url}
              senderName={ele.sender.name}
              msg={ele.content} />)}
          </Stack>
          <Stack flex={1} direction={'row'} width={'100%'} bgcolor={'#c0c0c0'} p={1} borderRadius={'12px'}
            boxSizing={'border-box'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <InputBase onKeyDown={(e) => {
              if(e.key === 'Enter' && messageInput !== '') {
                sendMessage()
              }
            }} value={messageInput} onChange={(e) => updateMsgInput(e.target.value)} placeholder='Enter a message...' fullWidth sx={{ fontSize: '1.3rem' }} />
            <IconButton onClick={() => sendMessage()}>
              <SendIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ChatBox