@extends('plantilla')
@section('seccion')
<nav class="navbar navbar-dark bg-dark mb-4">
	<a class="navbar-brand" href="#"><span>CPMS</span></a>
</nav>
<div class="container-fluid">

	<form id="cpms">
		<div class="row">
			<div class="col-md-5">
				<div class="card">
				<div class="card-header text-center"><h4>Tarifario</h4></div>
					<div class="card-body">
						<div class="card-text text-center mb-4">
							<h6 id="message" class="text-danger"></h6>
						</div>
						<div class="form-group">
							<select class="form-control " id="codigoNomenclador"size="12"></select>
						</div>
						<div class="form-group">
							<div class="card">
								<div class="card-header">Leyenda</div>
								<div class="card-body">
									<div class="d-flex justify-content-between align-items-baseline">
										Tiene codigo CPMS <span style="background-color:#F0C882;color:#fff;" class="p-3 rounded-pill text-center">VERDE CLARO</span>
									</div>
								</div>
							</div>
						</div>					
					</div>
					
				</div>
			</div>
			<!---->
			<div class="col-md-7">
				<div class="card">
					<div class="card-header text-center"><h4>CPMS</h4></div>
					<div class="card-body">
						<div class="form-group">
							<select class="form-control" id="seccion"></select>
						</div>
						<div class="form-group">
							<select class="form-control" id="subseccion"></select>
						</div>
						<div id="table"></div>

							
						<div id="message-process"></div>

						
				</div>
			</div>
		</div>
		</div>
			<div class="container p-4 justify-content-center">
				<button type="submit" style="background-color:#015837;color:#fff;height:50px;" id="cpms" class="CMPS btn  btn-block text-center rounded-pill">Agregar CPMS</button>
			</div>
	</form>

</div>
@endsection
