import { Avatar, Box, Popover, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const SingleMessage = ({ senderMe, profilePic, msg, senderName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{senderName}</Typography>
      </Popover>
      <Stack direction={'row'} gap={1} sx={{ alignItems: 'center' }}>
        {!senderMe &&
          <Avatar
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            src={profilePic}
          />}
        <Stack width={'100%'} direction={(senderMe ? 'row-reverse' : 'row')}>
          <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }} width={'max-content'} p={1} borderRadius={'7px'} bgcolor={(senderMe ? '#89CFF0' : '#7CFC00')}>{msg}</Box>
        </Stack>
      </Stack>
    </>
  )
}

export default SingleMessage