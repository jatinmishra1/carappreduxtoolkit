import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [],
};

export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    getAllCars: (state, action) => {
      state.cars = action.payload;
    },
    addCars: (state, action) => {
      state.cars.push(action.payload);
      for (let i = 0; i < state.cars.length; i++) {
        console.log(state.cars[i]);
      }
    },
  },
});

export const { getAllCars, addCars } = carSlice.actions;
export default carSlice.reducer;
