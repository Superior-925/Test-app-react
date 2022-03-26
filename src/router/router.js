import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import Home from "../pages/home/home";

const Router = (props) => {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/" element={<Navigate to ="/home" />}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default Router;
