import React from "react";
import {Link} from "react-router-dom";

export function Navigation(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark top">
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
    );
}
