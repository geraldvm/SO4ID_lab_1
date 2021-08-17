import React from "react";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons"
import { BsFillSquareFill, BsFillXSquareFill } from "react-icons/bs"
import { MdPlusOne } from "react-icons/md";
import { Link } from "react-router-dom";
export function Spaces() {


    /*--- Código mágico que consulta el API ;D ----*/

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [description, setDescription] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/spaces');
        const items = await data.json();
        setItems(items);
    };
    /*-----------------------------------------*/
    const postSpace = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: description
            })
        };
        const data = await fetch('http://localhost:1616/spaces', requestOptions);
        console.log(data)
        fetchItems();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postSpace();
    }

    const deleteSpace = async (id, e) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        const data = await fetch('http://localhost:1616/spaces/' + id, requestOptions);
        console.log(data)
        fetchItems();
    }

    return (
        <div className=" d-flex justify-content-center">
            <aside className="col-lg margins" >
                <div className="card">
                    <h4 className="card-header">Espacios</h4>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <article className="card-body">
                                        <h4 className="card-title mb-4 mt-1">Agregar Espacios</h4>
                                        <hr></hr>
                                        <div className="row">
                                            <div className="col">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label>Descripción</label>
                                                        <input className="form-control" type="text" onChange={e => setDescription(e.target.value)} />
                                                    </div>

                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary btn-block"> Agregar
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </article>
                                </div>


                            </div>
                            <div className="col-md-8">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Disponibilidad</th>
                                            <th scope="col">Reservar</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item =>
                                            <tr>
                                                <td>{item.id}</td>
                                                <th>{item.description}</th>

                                                {(item.state === "free") ? <th>
                                                    <IconContext.Provider value={{ style: { fontSize: '30px', color: "rgb(108, 165, 14)" } }}>
                                                        <div>
                                                            <BsFillSquareFill />
                                                        </div>
                                                    </IconContext.Provider>
                                                </th>
                                                    : <th>
                                                        <IconContext.Provider value={{ style: { fontSize: '30px', color: "rgb(252, 3, 90)" } }}>
                                                            <div>
                                                                <BsFillXSquareFill />
                                                            </div>
                                                        </IconContext.Provider>
                                                    </th>
                                                }
                                                {(item.state === "free") ? <th>
                                                    <Link to='/reservations'><button className="btn-icon" variant="contained" color="secondary" >
                                                        <IconContext.Provider value={{ style: { fontSize: '30px', color: "rgb(15, 58, 71)" } }}>
                                                            <div>
                                                                <MdPlusOne />
                                                            </div>
                                                        </IconContext.Provider>


                                                    </button></Link>
                                                </th>
                                                    : <th>
                                                    </th>
                                                }


                                                <th scope="row">
                                                    <button className="btn-icon">
                                                        <i className="fa fa-trash" aria-hidden="true" onClick={(e) => deleteSpace(item.id, e)}></i>
                                                    </button>
                                                </th>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div >
    )
}