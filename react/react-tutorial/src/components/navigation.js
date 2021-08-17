import React from "react";
import { Link } from "react-router-dom";
import Clock from 'react-live-clock';


export function Navigation() {
    /*------------- JSX solo acepta className, no class como el HTML normal :( ------------------*/
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bike-nav">
                <a className="navbar-brand">Parqueo TEC</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navMainMenu" className="navbar-collapse collapse">
                    <div className="navbar-nav ml-auto">
                        <Link to='/reservations' className="nav-item nav-link active">Reservaciones</Link>
                        <Link to='/spaces' className="nav-item nav-link">Espacios</Link>
                    </div>
                </div>
            </nav>
            <div className="line"></div>
        </div>   
    );
}
 