import React from 'react';
import router from '../router';

import { useLocation } from 'fast-react-router';
import './style.css';

export const NavigationButton = (props) => {
    const page = useLocation();
    const isActive = page.pathname === props.path;

    const jump = () => {
        router.history.push(props.path);
    }

    return (
        <span
            className={isActive ? 'navigation-btn active' : 'navigation-btn'}
            onClick={jump}
        >{props.children}</span>
    );
}