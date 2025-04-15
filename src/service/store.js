import { configureStore, createSlice } from '@reduxjs/toolkit';
const employeeSlice = createSlice({
    name: "employee",
    initialState: [],
    reducers: {
        set: (state, action) => action.payload,
        addEmployee: (state, action) => {state.push(action.payload);}
    }
})

export const { addEmployee, set} = employeeSlice.actions;

export const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer
  }
});