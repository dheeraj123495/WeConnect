import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id : "0",
}

const PostSlice = createSlice({
    name: 'userId',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload
        }
    }
})

export const { setUserId } = PostSlice.actions;
export default PostSlice.reducer;
