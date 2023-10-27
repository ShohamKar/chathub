import { createSlice } from "@reduxjs/toolkit";

let chatSlice = createSlice({
  name: 'chat',
  initialState: {
    allChats: [],
    enableReload: true,
    currentChat: null,
    currChatName: null,
    chatMessages: [],
    notifications: []
  },
  reducers: {
    loadChats(state, action) {
      state.allChats = action.payload.chats
    },
    setError(state, action) {
      state.error = action.payload.error
    },
    toggleEnableReload(state) {
      state.enableReload = !state.enableReload
    },
    setCurrentChat(state, action) {
      state.currentChat = action.payload.id
      state.currChatName = action.payload.chatName
    },
    setChatMessages(state, action) {
      state.chatMessages = action.payload.messages
    },
    addToCurrentChat(state, action) {
      if (state.currentChat === action.payload.msg.chat._id) {
        state.chatMessages.unshift(action.payload.msg)
      }
      else {
        state.notifications.unshift(action.payload.msg)
      }
    },
    updateGroupName(state, action) {
      state.currChatName = action.payload.newName
    },
    updateLatestMsg(state, action) {
      let updatedChat = null
      state.allChats = state.allChats.filter(ele => {
        if (action.payload.msg.chat._id === ele._id) {
          ele.latestMessage = action.payload.msg
          updatedChat = ele;
        }
        return action.payload.msg.chat._id !== ele._id
      })
      state.allChats.unshift(updatedChat)
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(ele => {
        return ele._id !== action.payload.id
      })
    }
  }
})

export default chatSlice

export let {
  loadChats,
  toggleEnableReload,
  setError,
  setCurrentChat,
  setChatMessages,
  addToCurrentChat,
  updateGroupName,
  updateLatestMsg,
  removeNotification } = chatSlice.actions