import { Box, Button, IconButton, InputBase, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import GroupAddUserCard from './GroupAddUserCard';
import axios from 'axios';
import { server } from '../redux/store';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { createGroup } from '../redux/actions/chatAction';

const CreateGroup = ({ createChatOpen, toggleCreateChatOpen }) => {
  let dispatch = useDispatch()
  let [groupName, updateGroupName] = useState('')
  let [userNameSearch, updateUserNameSearch] = useState('')
  let [usersSearch, updateUsersSearch] = useState([])
  let [selectedUsers, updateSelectedUsers] = useState([])
  let searchUser = async () => {
    let { data } = await axios.get(`${server}/users?search=${userNameSearch}&count=4`, {withCredentials: true})
    updateUsersSearch(data.users)
  }
  let selectUser = ({_id, userName}) => {
    let isPresentAlready = selectedUsers.find(ele => _id === ele._id)
    if(!isPresentAlready){
      updateSelectedUsers([...selectedUsers, {_id, userName}])
    }
  }
  let removeUser = ({_id}) => {
    updateSelectedUsers(selectedUsers.filter(ele => ele._id !== _id))
  }
  let createChatGroup = async() => {
    if(!groupName){
      return toast.error('Group must have a name!')
    }
    if(selectedUsers.length < 2){
      return toast.error('Select atleast 2 users!')
    }
    let users = JSON.stringify(selectedUsers.map(ele => ele._id))
    await dispatch(createGroup({chatName: groupName, users}))
    updateGroupName('')
    updateUserNameSearch('')
    updateUsersSearch([])
    updateSelectedUsers([])
  }
  useEffect(() => {
    if (userNameSearch) searchUser()
    else updateUsersSearch([])
  }, [userNameSearch])
  return (
    <Modal open={createChatOpen} onClose={() => { toggleCreateChatOpen(false) }}>
      <Box width={'100vw'} height={'100vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack borderRadius={'8px'} width={{xs:'80vw', sm:'24vw'}} bgcolor={'white'} sx={{ alignItems: 'center', position: 'relative' }} p={5} gap={4}>
          <IconButton sx={{ position: 'absolute', top: '15px', right: '20px' }}
            onClick={() => toggleCreateChatOpen(false)}>
            <CloseIcon/>
          </IconButton>
          <Typography variant='h4'>Create Group Chat</Typography>
          <Box p={1} border={'0.1rem solid #E6E6E6'} borderRadius={'2px'} width={{xs: '70vw', sm: '20vw'}}>
            <InputBase fullWidth placeholder='Group Name' value={groupName} onChange={(e) => updateGroupName(e.target.value)} />
          </Box>
          <Stack gap={0.5}>
            <Stack className='course-categories' width={{xs: '70vw', sm: '20vw'}} direction={'row'} gap={2} maxHeight={'2rem'} sx={{ display: 'flex', overflow: 'scroll' }}>
              {selectedUsers.map(ele => <Stack direction={'row'} gap={2}
                sx={{ alignItems: 'center', justifyContent: 'space-between', '&:hover': { cursor: 'pointer' } }}
                size='small' border={'0.5px solid #c6cbcd'} borderRadius={'5px'} p={1} key={ele._id}>
                {ele.userName} <CloseIcon onClick={() => removeUser({_id: ele._id})} fontSize="small" sx={{'&:hover': { color: 'red' } }} />
              </Stack>)} 
            </Stack>
            <Stack p={1} gap={1} border={'0.1rem solid #E6E6E6'} borderRadius={'2px'} width={{xs: '70vw', sm: '20vw'}}>
              <InputBase placeholder='Enter users to add' value={userNameSearch}
                onChange={(e) => updateUserNameSearch(e.target.value)} />
              <Stack gap={1}>
                {usersSearch.map(ele => <GroupAddUserCard selectUser={selectUser} key={ele._id} profilePic={ele.profilePicture.url}
                  userName={ele.name} email={ele.email} id={ele._id}/>)}
              </Stack>
            </Stack>

          </Stack>
          <Stack direction={'row-reverse'}>
            <Button variant='contained' onClick={() => createChatGroup()}>Create Chat</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default CreateGroup