import React from 'react';
import {Link} from 'react-router-dom'
export default function Header(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Smart Bus Tracker</a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item ">
                    <Link className="nav-link" to="/parent">Home<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/registerStudent">Student Registration<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link" to="/studentList">Student List<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/tracker">Tracker</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/">Logout</Link>
                </li>
                </ul>
            </div>
        </nav>
    );
} 