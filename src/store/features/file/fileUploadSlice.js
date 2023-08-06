import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uploadFile = createAsyncThunk("file/upload", async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const fileUploadSlice = createSlice({
  name: "file",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export { uploadFile };

export default fileUploadSlice.reducer;
