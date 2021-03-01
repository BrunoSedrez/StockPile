import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const App = () =>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>

export default App;
