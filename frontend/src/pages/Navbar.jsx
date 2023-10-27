import { Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, Modal, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import NotificationIcon from '@mui/icons-material/Notifications'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userAction'
import { removeNotification, setCurrentChat } from '../redux/reducers/chatReducer';
import { getAllMessages } from '../redux/actions/chatAction';

const Navbar = ({ toggleDrawer, socket }) => {
  const [modalOpen, toggleModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationEl, setNotificationEl] = useState(null)
  const open = Boolean(anchorEl);
  const openNotification = Boolean(notificationEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotificationClick = (e) => {
    setNotificationEl(e.currentTarget)
  }
  const handleNotificationClose = (e) => {
    setNotificationEl(null)
  }
  let dispatch = useDispatch()
  let { user } = useSelector(state => state.user)
  let { notifications } = useSelector(state => state.chat);
  let selectChat = async ({ id, chatName }) => {
    dispatch(setCurrentChat({ id, chatName }))
    await dispatch(getAllMessages({ id }))
    socket.emit('join chat', id)
  }
  return (
    <>
      <Modal open={modalOpen} onClose={() => { toggleModalOpen(!modalOpen) }}>
        <Box width={'100vw'} height={'100vh'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Stack borderRadius={'8px'} width={'24vw'} height={'40vh'} bgcolor={'white'} sx={{ alignItems: 'center' }} p={5} gap={3}>
            <Typography variant='h3'>{user.name}</Typography>
            <Avatar alt={user.name} src={user.profilePicture.url} sx={{ height: '190px', width: '190px' }} />
            <Typography variant='h5'>{`Email: ${user.email}`}</Typography>
            <Button variant='contained' onClick={() => { toggleModalOpen(false) }}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Stack flex={1} direction={'row'} padding={'0 20px 0 20px'}
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        bgcolor={'#F2F2F2'} borderRadius={'4px'}>
        <Box onClick={() => toggleDrawer(true)} sx={{display: 'flex', alignItems: 'center'}} gap={1}>
          <SearchIcon />
          <Box display={{ xs: 'none', sm: 'flex' }}>
            <Button variant="outlined" sx={{ color: 'black' }} >
              Search User
            </Button>
          </Box>
        </Box>
        <Box>
          <div className='app-title' style={{ fontSize: '2rem' }}>ChatHub</div>
        </Box>
        <Stack direction={'row'} gap={1} sx={{ alignItems: 'center' }}>
          <IconButton aria-label="delete" size="large"
            aria-controls={openNotification ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openNotification ? 'true' : undefined}
            onClick={handleNotificationClick}
            disabled={notifications.length === 0}
          >
            <Badge badgeContent={notifications.length} color='error'>
              <NotificationIcon />
            </Badge>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={notificationEl}
            open={openNotification}
            onClose={handleNotificationClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {notifications.map(ele =>
              <MenuItem onClick={() => {
                handleNotificationClose()
                selectChat({
                  id: ele.chat._id, chatName: ele.chat.isGroupChat === true ?
                    ele.chat.chatName : ele.chat.users.find(ele => ele._id !== user._id).name
                })
                dispatch(removeNotification({ id: ele._id }))
              }} key={ele._id} id={ele._id}>{`New message from ${ele.chat.isGroupChat === true ?
                ele.chat.chatName : ele.chat.users.find(ele => ele._id !== user._id).name}`}</MenuItem>
            )}
          </Menu>
          <Avatar alt='H' src={user.profilePicture.url} />
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => {
              toggleModalOpen(true)
              handleClose()
            }}>My Profile</MenuItem>
            <MenuItem onClick={() => {
              dispatch(logout())
              handleClose()
            }}>Logout</MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </>
  )
}

export default Navbar