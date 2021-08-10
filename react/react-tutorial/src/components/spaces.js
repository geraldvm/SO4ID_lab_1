import React from "react";
import { useEffect, useState } from "react";
import {IconContext} from "react-icons"
import {BsFillSquareFill,BsFillXSquareFill} from "react-icons/bs"
import { MdPlusOne } from "react-icons/md";
import { Link } from "react-router-dom";
export function Spaces() {

    
    /*--- Código mágico que consulta el API ;D ----*/

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/spaces');
        const items = await data.json();
        setItems(items);
    };
    /*-----------------------------------------*/


    return (
        <div className=" d-flex justify-content-center">
            <aside className="col-lg margins" >
                <div className="card">
                    <h4 className="card-header">Espacios</h4>
                    <div className="card-body">
                        <div class="row">
                            <div class="col-md-4">

                                <div class="card">
                                    <article class="card-body">
                                        <h4 class="card-title mb-4 mt-1">Agregar Espacios</h4>
                                        <hr></hr>
                                        <div class="row">
                                            <div class="col">
                                                <form>
                                                    <div class="form-group">
                                                        <label>Descripción</label>
                                                        <input class="form-control" type="text" />
                                                    </div>

                                                    <div class="form-group">
                                                        <button type="submit" class="btn btn-primary btn-block"> Agregar
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </article>
                                </div>


                            </div>
                            <div class="col-md-8">
                                <table class="table">
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
                                            
                                            { (item.state==="free")? <th>
                                                    <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(108, 165, 14)"}}}>
                                                        <div>
                                                            <BsFillSquareFill />
                                                        </div>
                                                    </IconContext.Provider>
                                                </th>
                                                :<th>
                                                    <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(252, 3, 90)"}}}>
                                                        <div>
                                                            <BsFillXSquareFill />
                                                        </div>
                                                    </IconContext.Provider>
                                                </th>
                                            }
                                            { (item.state==="free")? <th>
                                            <Link to='/reservations'><button class="btn-icon"  variant="contained" color="secondary" ngbTooltip="Delete">
                                                <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(15, 58, 71)"}}}>
                                                        <div>
                                                        <MdPlusOne /> 
                                                        </div>
                                                    </IconContext.Provider>
                                                    
                                                
                                            </button></Link>
                                                </th>
                                                :<th>
                                                </th>
                                            }

                                            
                                            <th scope="row">
                                                <button class="btn-icon" placement="top" ngbTooltip="Delete">
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
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