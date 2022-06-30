import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// action
export const weatherAction = createAsyncThunk(
    'weather/fetch',
   async (payload, {rejectWithValue, getState,dispatch})=>{
    try {
        const {data} = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${payload}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`);
        return data;
    } catch  (error) {
        if(!error?.response){
            throw error
        }
        return rejectWithValue(error?.response?.data);
    }
    }
)

//slice

const weatherSlice = createSlice({
    name: "weather",
    initialState: {},
    extraReducers: (builder) => {
        // pending
        builder.addCase(weatherAction.pending, (state,action) => {
            state.loading = true;
        });
        // fulfilled
        builder.addCase(weatherAction.fulfilled,(state,action) => {
            state.weather = action?.payload;
            state.loading = false;
            state.error = undefined;
        });

        // rejected
        builder.addCase(weatherAction.rejected,(state,action) => {
            state.loading = false;
            state.weather = undefined;
            state.error = action?.payload;
        });

    },

});

export default weatherSlice.reducer;