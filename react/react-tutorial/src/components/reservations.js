import React from "react";
import { useEffect, useState } from "react";


export function Reservations() {
    const [initialState, setInitialState] = useState([]);
    useEffect(() => {
        fetch('/reservations/test').then(res => {
            if (res.ok) {
                return JSON.parse(JSON.stringify(res));
            }
        }).then(jsonResponse => console.log(jsonResponse))
    }, [])
    return (

        <div className=" d-flex justify-content-center">
            <aside className="col-lg margins" >
                <div className="card">
                    <h4 className="card-header">Reservations</h4>
                    <div className="line"></div>
                    <div className="card-body"></div>
                </div>
            </aside>
            <div> 
                {initialState.length > 0 && initialState.map(e => <li>{e}</li>)}
            </div>
        </div>

    )
}