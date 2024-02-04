import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  notification:[],
  posts: [],
  jobs: [],
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setNotifications: (state, action) => {
      state.notification = action.payload.notification;
    },

    // setNotification: (state, action) => {
    //   const updateNotification = state.notification.map((notifications) => {
    //     if (notifications._id === action.payload.notifications._id) return action.payload.notifications;
    //     return notifications;
    //   });
    //   state.notification = updateNotification;
    // },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setJob: (state, action) => {
      const updatejobs = state.jobs.map((job) => {
        if (job._id === action.payload.job._id) return action.payload.job;
        return job;
      });
      state.jobs = updatejobs;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload.jobs
    },

    setSnackbar: (state, action) => {
      state.snackbarOpen = action.payload.snackbarOpen;
      state.snackbarType = action.payload.snackbarType;
      state.snackbarMessage = action.payload.snackbarMessage;
    },

  },
});

export const { setMode, setLogin, setLogout, setFriends,  setNotifications,setPosts, setPost, setJobs,setSnackbar, setJob } =
  authSlice.actions;
export default authSlice.reducer;
