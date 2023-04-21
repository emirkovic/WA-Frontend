import React, { useEffect, useState } from 'react';
import store from '../../store/index';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Sidebar = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => setState(store.getState()));
        return () => {
            unsubscribe();
        };
    }, [])

    const bgImage = () => {
        if (state.user && state.user.avatar && state.user.avatar.url) {
            return `url(${state.user.avatar.url})`;
        } else {
            return `url(https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png)`;
        }
    }

    if (state.user) {
        return (
            <div className="sidebar-wrapper">
                <div className="header">Kviz Aplikacija</div>

                <div className="user">
                    <div className="avatar" style={{ backgroundImage: bgImage() }}></div>
                    <div className="name">{state.user.firstName + ' ' + state.user.lastName}</div>
                </div>

                <div className="links">
                    <NavLink to="/dashboard">
                        <div className="link">Menu</div>
                    </NavLink>
                    <NavLink to="/account">
                        <div className="link">Profil</div>
                    </NavLink>
                    <NavLink to="/my-quizzes">
                        <div className="link">Moji Kvizevi</div>
                    </NavLink>
                    <NavLink to="/create-quiz">
                        <div className="link">Napravi Kviz</div>
                    </NavLink>
                    <NavLink to="/community-quizzes">
                        <div className="link">Community Kvizevi</div>
                    </NavLink>
                </div>
            </div>
        )
    } else {
        return <div>Loading</div>;
    }
}

export default Sidebar;