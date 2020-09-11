import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css'
import { CalendarApp } from './CalendarApp';
console.log(process.env.REACT_APP_API_URL)
ReactDOM.render(

    <CalendarApp />,

    document.getElementById('root')
);