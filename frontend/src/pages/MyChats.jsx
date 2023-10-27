import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ChatCard from '../components/ChatCard';
import { useSelector } from 'react-redux';
import CreateGroup from '../components/CreateGroup';

const MyChats = ({ allChats, createChatOpen, toggleCreateChatOpen, socket, currentChat }) => {
  let { user } = useSelector(state => state.user)
  return (
    <Box display={{ xs: currentChat === null ? 'flex' : 'none', sm: currentChat === null ? 'flex' : 'none', md: 'flex' }}  
    flex={2.5} borderRadius={'15px'} bgcolor={'#F2F2F2'} boxShadow={'3px 5px'}
      overflow={'scroll'} height={'93vh'} boxSizing={'border-box'} className='course-categories'
    >
      <CreateGroup createChatOpen={createChatOpen} toggleCreateChatOpen={toggleCreateChatOpen} />
      <Stack gap={2} width={'100%'} p={2}>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h4'>My Chats</Typography>
          <Stack direction={'row'} sx={{ alignItems: 'center', '&:hover': { cursor: 'pointer' } }}
            gap={1} p={1} bgcolor={'#E6E6E6'} borderRadius={'5px'} onClick={() => toggleCreateChatOpen(true)}>
            <Typography variant='h6'>New Group Chat</Typography>
            <AddIcon />
          </Stack>
        </Stack>
        {allChats.map(ele => <ChatCard socket={socket} key={ele._id} latestMsg={ele.latestMessage} id={ele._id}
          chatname={ele.isGroupChat === true ? (ele.chatName) : ((ele.users.find(usr => usr._id !== user._id)).name)} />)}
      </Stack>
    </Box>
  )
}

export default MyChats