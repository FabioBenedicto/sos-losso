import { AxiosResponse } from 'axios';
import React, { useState, createContext, ReactNode, useEffect } from 'react';
import api from '../services/api';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        ra: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    useEffect(() => {
        api
            .get('/validate/students', { withCredentials: true })
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
