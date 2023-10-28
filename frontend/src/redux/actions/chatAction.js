import axios from "axios"
import { server } from "../store"
import { addToCurrentChat, loadChats, setChatMessages, toggleEnableReload, updateGroupName, updateLatestMsg } from "../reducers/chatReducer"
import { setError, setMessage } from "../reducers/userReducer"

export let getAllChats = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`${server}/chat`)
    dispatch(loadChats(data))
  } catch (error) {
    dispatch(setError(error.response.data))
  }
}

export let accessAChat = ({ userId }) => async (dispatch) => {
  try {
    let { data } = await axios.post(`${server}/chat`, { userId }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    dispatch(toggleEnableReload())
  } catch (error) {
    dispatch(setError(error?.response?.data))
  }
}

export let createGroup = ({ chatName, users }) => async (dispatch) => {
  try {
    await axios.post(`${server}/group`, {
      chatName,
      users
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    dispatch(setMessage('Group created successfully'))
    dispatch(toggleEnableReload())
  } catch (error) {
    dispatch(setError(error?.response?.data))
  }
}

export let getAllMessages = ({ id }) => async (dispatch) => {
  try {
    let { data } = await axios.get(`${server}/message/${id}`, {withCredentials: true})
    dispatch(setChatMessages(data))
  } catch (error) {
    dispatch(setError(error?.response?.data))
  }
}

export let sendMessageInChat = ({ chatId, content, socket }) => async (dispatch) => {
  try {
    let { data } = await axios.post(`${server}/message`, {
      chatId,
      content
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    dispatch(addToCurrentChat({ msg: data.message }))
    dispatch(updateLatestMsg({ msg: data.message }))
    socket.emit('new message', data)
  } catch (error) {
    dispatch(setError(error?.response?.data))
  }
}

export let renameGroupName = ({ groupId, groupName }) => async (dispatch) => {
  try {
    await axios.patch(`${server}/rename`, {
      groupId,
      groupName
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    dispatch(updateGroupName({ newName: groupName }))
    dispatch(toggleEnableReload())
  } catch (error) {
    dispatch(setError(error?.response?.data))
  }
}