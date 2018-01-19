import * as React from 'react';
import { render } from 'react-dom';
import { RouterComponent } from '../../routers/router';
import 'ant-design-pro/dist/ant-design-pro.css'; 
import "./index.scss";
render( 
    <RouterComponent /> ,
    document.getElementById('application'),
    () => {

    });