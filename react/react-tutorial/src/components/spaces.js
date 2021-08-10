import React from "react";

export function Spaces() {
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
                                        <h4 class="card-title mb-4 mt-1">Make a report</h4>
                                        <hr></hr>
                                        <div class="row">
                                            <div class="col">
                                                <form>
                                                    <div class="form-group">
                                                        <label>Start time</label>
                                                        <input class="form-control" type="text" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label>End time</label>
                                                    </div>

                                                    <div class="form-group">
                                                        <button type="submit" class="btn btn-primary btn-block"> Submit
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
                                            <th scope="col">Date</th>
                                            <th scope="col">Start</th>
                                            <th scope="col">Finish</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Approval pending</td>
                                            <th scope="row">
                                                <button class="btn-icon" placement="top" ngbTooltip="Delete">
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </th>
                                        </tr>

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