import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Home from './Home/Home';
import AuthenticatedRoute from './route-wrappers/AuthenticatedRoute';
import UnauthenticatedRoute from './route-wrappers/UnauthenticatedRoute';

const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<UnauthenticatedRoute />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Login />} />
                </Route>
                <Route element={<AuthenticatedRoute />}>
                    <Route path='/' element={<Navigate to='/home' />} />
                    <Route path='/home' element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

