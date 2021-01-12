@extends('plantilla')
@section('seccion')
<nav class="navbar navbar-dark bg-dark">
     <a class="navbar-brand" href="#"><span>CPMS</span></a>
</nav>
<br>

<div class="container-fluid">
	<form id="cpms">
				<div class="card">
					<div class="card-body">
						<div class="form-group">
							<select class="form-control" id="basedatos"></select>
						</div>
					</div>
				</div>
		<br>
		<div class="row">
			<div class="col-md-5">
				<div class="card">
				<div class="card-header text-center">Procedimientos</div>
					<div class="card-body">
						<div class="form-group">
							<select class="form-control" id="codigoNomenclador"size="20"></select>
						</div>
					</div>
				</div>
			</div>
			<!---->
			<div class="col-md-7">
				<div class="card">
				<div class="card-header text-center">CPMS</div>
					<div class="card-body">
						<div class="form-group">	
							<select class="form-control" id="grupo"></select>
						</div>
						<div class="form-group">
							<select class="form-control" id="seccion"></select>
						</div>
						<div class="form-group">
							<select class="form-control" id="subseccion"></select>
						</div>
										
						<div id="table"></div>

					</div>
				</div>
			</div>
			<div class="container p-4">
				<div class="card">
					<div class="card-body">
						<button type="submit" class="CMPS btn btn-primary btn-block text-center">Actualizacion</button>
					</div>
				</div>
			</div>

		</div>
	</form>
</div>
@endsection
@include('modal')