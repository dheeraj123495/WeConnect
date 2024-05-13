// import { configureStore } from "@reduxjs/toolkit";
// import PostSlice from "./Slice/PostSlice";

// export const store = configureStore({
//     reducer: {
//         userId : PostSlice
//     },
// })


import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./Slice/PostSlice";

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    userId: PostSlice,
  },
  preloadedState: persistedState, // Load persisted state
});

store.subscribe(() => {
  saveState(store.getState());
});
