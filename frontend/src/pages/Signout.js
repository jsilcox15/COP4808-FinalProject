import React from "react";
import { auth } from "../firebase";
import {Navigate} from 'react-router-dom';

export const Signout = (props) => {

    auth.signOut();
    return <Navigate to='/' />
}

export default Signout;