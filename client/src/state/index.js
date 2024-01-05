import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit for simplified reducer creation

// Initial state for the authentication slice of the Redux store
const initialState = {
  user: null,
  token: null,
  posts: [],
  messages: {},
  chats: [], // New state for chats
 // dislikes: {}, // Add this line
};
// Creating the authSlice using createSlice
export const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Action to set user login information
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Action to set user logout information
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
     // Action to update user followers information
    setFollowers: (state, action) => {
      if (state.user) {
        state.user.followers = action.payload.followers;
      } else {
        console.error("followers non-existent :(");
      }
    },
    // Action to set the array of posts in the state
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
     // Action to update a specific post in the state
     setPost: (state, action) => {
      if (action.payload.post && action.payload.post._id) {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) {
            return action.payload.post;
          }
          return post;
        });
        state.posts = updatedPosts;
      }
    },  
     // Action to set the list of chats in the state
     setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
    // Action to add a new chat to the state
    addChat: (state, action) => {
      state.chats.push(action.payload.chat);
    },
    // Action to update a specific chat in the state
    updateChat: (state, action) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id === action.payload.chat.id) {
          return action.payload.chat;
        }
        return chat;
      });
      state.chats = updatedChats;
    }, 
    setMessages: (state, action) => {
      // Update the state with the fetched messages for a specific chat
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    },
  },
});

// Exporting specific actions from the authSlice
  export const {
    setLogin,
    setLogout,
    setFollowers,
    setPosts,
    setPost,
    setChats, // New chat-related actions
    addChat,
    updateChat,
    setMessages,
  } = authSlice.actions;
  
export default authSlice.reducer; // Exporting the authSlice reducer for use in the Redux store