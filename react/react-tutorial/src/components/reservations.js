import React from "react";
import { useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';




function onRemove(selectedList, removedItem) {
    console.log(removedItem)
}


export function Reservations() {
    /*---- Código mágico que consulta el API ;D ----*/

    useEffect(() => {
        fetchItems();
        fetchSpaces();
    }, []);

    const [reservations, setReservations] = useState([]);
    const [spaces, setSpaces] = useState([]);
    const [id_space, setId_space] = useState();
    const [time, setTime] = useState();
    const [plate, setPlate] = useState();

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

    const postReservation = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                car_plate: plate,
                id_space: id_space.id,
                time: time
            })
        };
        const data = await fetch('http://localhost:1616/reservations', requestOptions);
        console.log(data)
        fetchItems();
    }

    const deleteReservation = async (id, e) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const data = await fetch('http://localhost:1616/reservations/' + id, requestOptions);
        console.log(data)
        fetchItems();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postReservation();
    }

    const onSelect = (selectedList, selectedItem) => {
        setId_space(JSON.parse(JSON.stringify(selectedItem)));
    }
    return (
        <div className=" d-flex justify-content-center">
            <aside className="col-lg margins" >
                <div className="card">
                    <h4 className="card-header">Reservaciones</h4>
                    <div className="row">
                        <div className="col-md-4">
                            <div class="">
                                <article class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label>Espacio</label>
                                                    <Multiselect
                                                        options={spaces} // Options to display in the dropdown
                                                        singleSelect
                                                        onSelect={onSelect} // Function will trigger on select event
                                                        onRemove={onRemove} // Function will trigger on remove event
                                                        displayValue="id" // Property name to display in the dropdown options
                                                    />
                                                </div>
                                                <div class="form-group">
                                                    <label>Hora</label>
                                                    <input class="form-control" type="text" value={time} onChange={e => setTime(e.target.value)} />
                                                </div>
                                                <div class="form-group">
                                                    <label>Placa</label>
                                                    <input class="form-control" type="text" value={plate} onChange={e => setPlate(e.target.value)} />
                                                </div>
                                                <div class="form-group">
                                                    <button type="submit" class="btn btn-primary btn-block">Reservar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Espacio</th>
                                        <th scope="col">Hora</th>
                                        <th scope="col">Placa</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(item =>
                                        <tr>
                                            <td>{item.id_space}</td>
                                            <td>{item.time}</td>
                                            <td>{item.car_plate}</td>
                                            <th scope="row">
                                                <button class="btn-icon">
                                                    <i class="fa fa-trash" aria-hidden="true" onClick={(e) => deleteReservation(item.id_space, e)}></i>
                                                </button>
                                            </th>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </aside>
        </div>

    )
}