@extends('plantilla')
@section('seccion')
<div class="container p-5">
    <form id="CBD">
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm">
                <div class="card">
                        <div class="card-header text-center">
                            <h3>Conexion</h3>
                        </div>
                    <div class="card-body">
                        <div class="form-group">
                            <select class="form-control" id="CodigoGdb">
                                <option value="MySQL">MySQL     </option>
                                <option value="PostgreSQL">PostgreSQL</option>
                                <option value="SQL">SQL Server</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Host">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Port">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Database">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password">
                        </div>
                        <div class="form-group">
                                    <button type="submit" class="CBD btn btn-primary btn-block text-center">Ingresar</button>
                        </div>
                    </div>    
                </div>   
            </div>
        <div class="col-sm"></div>
        </div>   
    </form>
</div>



@endsection