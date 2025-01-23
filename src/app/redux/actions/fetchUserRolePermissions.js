import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from "app/services/auth-services";
import axios from 'axios';

// Utility function to get token and designation from localStorage
const getTokenAndDesignation = () => {
    const token = localStorage.getItem("accesstoken");
    const designation = localStorage.getItem("Designation");
    return { token, designation };
};

console.log("getTokenAndDesignation", getTokenAndDesignation())
// Asynchronous thunk action for fetching user role permissions
export const fetchUserRolePermissions = createAsyncThunk(
    'data/getUserRolePermissions',
    async (payload, { rejectWithValue }) => {
        try {
            console.log("payload from Redux", payload);
            if (!localStorage.getItem("accesstoken") || !localStorage.getItem("Designation")) {
                throw new Error("User is not authenticated or designation is missing.");
            }

            const response = await axios.post(
                `${BASE_URL}/Erpapp/RoleAdditionalCRUD/`,
                { name: localStorage.getItem("Designation"), Is_Deleted: false },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            console.log("userRolePermissions from redux", response.data[0])

            // Check if the response data is as expected
            if (response?.data) {
                return {
                    userRolePermissions: response.data[0].permissions,
                    formPermissions: response.data[0].FormNames,
                    modulePermissions: response.data[0].Modelname
                };
            } else {
                return []
                // throw new Error("Unexpected response structure.");
            }
        } catch (error) {
            console.error("Error fetching user role permissions:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Initial state for the slice
const initialState = {
    data: {
        userRolePermissions: [],
        formPermissions: [],
        modulePermissions: [],
    },
    loading: false,
    error: null,
};

// Create a slice for managing user role permissions
export const UserRolePermissionSlice = createSlice({
    name: 'getUserRolePermissions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserRolePermissions.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear error state when starting to fetch
            })
            .addCase(fetchUserRolePermissions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null; // Clear error state on successful fetch
            })
            .addCase(fetchUserRolePermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

// Selector for user role permissions
export const selectedUserRolePermissions = (state) => state.getUserRolePermissions?.data;

// Export the reducer
export default UserRolePermissionSlice.reducer;
