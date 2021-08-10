import React from "react";
import { useEffect, useState } from "react";


export function Reservations() {
    /*--- Código mágico que consulta el API ;D ----*/

    useEffect(() => {
        fetchItems();
        fetchSpaces();
    }, []);

    const [reservations, setReservations] = useState([]);
    const [spaces, setSpaces] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/reservations');
        const reservations = await data.json();
        setReservations(reservations);
    };

    const fetchSpaces = async () => {
        const data = await fetch('/spaces');
        const spaces = await data.json();
        setSpaces(spaces);
    };
    /*-----------------------------------------*/
    return (
        <div className=" d-flex justify-content-center">
            <aside className="col-lg margins" >
                <div className="card">
                    <h4 className="card-header">Reservaciones</h4>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card-body">
                                <div>
                                    {reservations.map(reservation =>
                                        <ul>
                                            <li>{reservation.id_space}</li>
                                            <li>{reservation.time}</li>
                                            <li>{reservation.car_plate}</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                        <div>
                                    {spaces.map(space =>
                                        <ul>
                                            <li>{space.id}</li>
                                            <li>{space.state}</li>
                                            <li>{space.description}</li>
                                        </ul>
                                    )}
                                </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>

    )
}