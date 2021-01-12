@extends('plantilla')
@section('seccion')
<div class="container p-5">
    <form id="GDB">
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm">
                <div class="card">   
                    <div class="card-body">
                            <div class="form-group">
                                    <select class="form-control" id="Gestor">
                                        <option value="0">SELECCIONAR GESTOR DB</option>
                                        <option value="mysql">MySQL     </option>
                                        <option value="pgsql">PostgreSQL</option>
                                        <option value="sqlsrv">SQL Server</option>
                                    </select>
                            </div>
                            <!--TODAS LAS BD-->
                            <div class="form-group">
                                <select multiple class="form-control" id="databases" size="5"></select>
                            </div>
                            <div class="form-group" id="boton-bd">
                                    <button type="submit"  class="selectdb btn btn-primary btn-block text-center">guardar</button>
                            </div>
                            <!--LAS BD SELECCIONADA-->
                            <div class="form-group">
                                <select class="form-control" id="DB2"></select>
                            </div>
                        
                            <!--TABLAS-->
                                <div class="form-group">
                                    <select class="form-control" id="tables"></select>
                                </div>
                        
                            <!--CAMPOS-->
                            <div class="form-group">
                                <select multiple class="form-control" id="campos"></select>
                            </div>
                            <div class="form-group" id="boton-save">
                                    <button type="submit" class="Guardar btn btn-danger btn-block text-center">siguiente</button>
                            </div>
                    </div>
                </div>   
            </div>
            <div class="col-sm"></div>
        </div>
    </form>
</div>
@endsection
@include('modal')
@include('modalcarga')