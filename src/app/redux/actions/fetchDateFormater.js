import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from "app/services/auth-services";
import axios from 'axios';


export const fetchDateFormater = createAsyncThunk('data/getDateFormate',
    async () => {
        const token = localStorage.getItem('accesstoken');
        if (token) {
            try {
                const response = await axios.get(`${BASE_URL}/Erpapp/CompanyCRUD/?id=${localStorage.getItem('OrganizationId')}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                });
                console.log("Response fromredux:", response?.data);
                return response?.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        }
    });

const initialState = {
    data: {},
    loading: false,
    error: null,
};

export const DateFormaterSlice = createSlice({
    name: 'getFetchDate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDateFormater.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear error state when starting to fetch
            })
            .addCase(fetchDateFormater.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null; // Clear error state on successful fetch
            })
            .addCase(fetchDateFormater.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the reducer
export const selectedUserDetails = (state) => state.getFetchDate.data
export default DateFormaterSlice.reducer;