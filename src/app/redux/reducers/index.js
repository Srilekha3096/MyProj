import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsApp from "./contactsApp"
// import Counterslice from 'app/pages/Redux/CounterSlices.js/Counterslice';
import DateFormaterReducer from '../actions/fetchDateFormater';
import UserRolePermissionsReducer from '../actions/fetchUserRolePermissions';
import authReducer from '../authSlice';

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        contactsApp: contactsApp,
        // counter: Counterslice,
        getFetchDate: DateFormaterReducer,
        getUserRolePermissions: UserRolePermissionsReducer,
        auth: authReducer
    });
};

export default exportReducers;

