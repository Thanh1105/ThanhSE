import React from "react";
import Login from "../login/login";
import { Route, Routes } from 'react-router-dom';
const RoutesMain = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>
    );
}
export default RoutesMain;