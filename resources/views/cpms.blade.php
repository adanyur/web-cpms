@extends('plantilla')
@section('seccion')
<nav class="navbar navbar-dark bg-dark mb-4">
	<a class="navbar-brand" href="#"><span>CPMS</span></a>
</nav>
<div class="container-fluid">
	<form id="cpms">
				<!-- <div class="card">
				<div class="card-header text-center"><h4>Sistema</h4></div>
					<div class="card-body">
						<div class="form-group">
							<select class="form-control" id="basedatos"></select>
						</div>
					</div>
				</div>
		<br> -->
		<div class="row">
			<div class="col-md-5">
				<div class="card">
				<div class="card-header text-center"><h4>Tarifario</h4></div>
					<div class="card-body">
						<div class="form-group">
							<select class="form-control" id="codigoNomenclador"size="20"></select>
						</div>
						<div class="form-group">
							<!-- <span class="btn btn-danger">red</span> -->
						</div>					
					</div>
				</div>
			</div>
			<!---->
			<div class="col-md-7">
				<div class="card">
					<div class="card-header text-center"><h4>CPMS</h4></div>
					<div class="card-body">
						<!-- <div class="form-group">	
							<select class="form-control" id="grupo"></select>
						</div> -->
						<div class="card-text text-center">
							<h4 id="message" class="text-danger"></h4>
						</div>
						<!-- <div class="form-group">
							<select class="form-control" id="seccion"></select>
						</div> -->
						<div class="form-group">
							<select class="form-control" id="subseccion"></select>
						</div><br>
						<div id="table"></div>
				</div>
			</div>
		</div>
			<div class="container p-4">
				<button type="submit" class="CMPS btn btn-success btn-block text-center">Agregar CPMS</button>
			</div>
		</div>
	</form>
</div>
@endsection
@include('modal')