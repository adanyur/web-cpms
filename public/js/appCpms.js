$(document).ready(function () {
    /**FUNCIONES QUE SE EJECUTA AL INICIAR**/
    // basedatos();
    ListadoCmpsGrupo();
    /**************************************/
    $("#databases").hide();
    $("#DB2").hide();
    $("#tables").hide();
    $("#campos").hide();
    $("#boton-bd").hide();
    $("#boton-save").hide();

    /****************************************GBD************************************************/
    $("#Gestor").change(function (e) {
        let codigodb = $("#Gestor").val();
        $.ajax({
            url: "GestoresBD/" + codigodb,
            type: "GET",
            success: function (result) {
                let db = JSON.parse(result);
                let template = "";
                db.forEach((db) => {
                    template += `
                            <option value="${db.database}">${db.database}</option>
                        `;
                });
                $("#boton-bd").show();
                $("#databases").show();
                $("#databases").html(template);
                $("#modal-update").modal("show");
                $("#seleccionar").hide();
                $("#siguiente").hide();
                $("#edit").hide();
                $("#cerrar").hide();
                $("#aceptar2").hide();
                $("#aceptar").show();
                $("#mensaje").text("Seleccionar Base de datos");
                Connection();
            },
        });
        e.preventDefault();
    });

    function Connection() {
        $.ajax({
            url: "GestoresBD/connection",
            type: "GET",
            success: function (result) {
                let titulo = "";
                switch (result) {
                    case "mysql":
                        titulo = "MySQL";
                        break;
                    case "pgsql":
                        titulo = "PostgreSQL";
                        break;
                    case "sqlsrv":
                        titulo = "Microsoft SQL Server";
                        break;
                }
                $("#titulo").show();
                $("#connection").text(titulo);
            },
        });
    }

    /*******************/
    $(document).on("click", ".selectdb", function (e) {
        let bd = $("#databases").val();
        $.ajax({
            url: "GestoresBD/json/" + bd,
            type: "GET",
            success: function (result) {
                $("#boton-bd").hide();
                $("#databases").hide();
                $("#DB2").show();
                basedatos(result);
            },
        });
        e.preventDefault();
    });

    function basedatos(data) {
        let result = JSON.parse(data);
        let template = "";
        template += '<option value="0">SELECCIONAR BASE DE DATOS</option>';
        result.map((result) => {
            template += `<option value="${result.bd}|${result.id}">${result.bd}</option>`;
            $("#DB2").html(template);
            $("#basedatos").html(template);
        });
    }

    /////////TABLAS POR BASE DE DATOS
    $("#DB2").change(function (e) {
        let tables = $("#DB2").val();
        let a = "db";
        $("#tables").hide();
        $("#campos").hide();
        $("#boton-bd").hide();
        $("#boton-save").hide();
        $.ajax({
            url: "GestoresBD/table/" + tables + "/" + a,
            type: "GET",
            success: function (result) {
                if (result.estado == "0") {
                    $("#modal-update").modal("show");
                    $("#mensaje").text(result.mensaje);
                    $("#pregunta").text(result.pregunta);
                    $("#seleccionar").hide();
                    $("#siguiente").hide();
                    $("#aceptar").hide();
                    $("#aceptar2").hide();
                    $("#edit").show();
                    $("#cerrar").show();
                } else {
                    table(result);
                }
            },
        });
        e.preventDefault();
    });

    $(document).on("click", "#edit", function (e) {
        let tables = $("#DB2").val();
        let a = "edit";
        let url = "GestoresBD/table/" + tables + "/" + a;
        $.get(url, function (result) {
            $("#modal-update").modal("hide");
            table(result);
        });
    });

    function table(json) {
        let table = JSON.parse(json);
        let template = "";
        template += '<option value="0">SELECCIONAR TABLA</option>';
        table.forEach((table) => {
            template += `<option value="${table.table_name}">${table.table_name}</option>`;
        });
        $("#json").hide();
        $("#jsonf").show();
        $("#tables").show();
        $("#tables").html(template);
    }

    $("#tables").change(function (e) {
        let tabla = $("#tables").val();
        let bd = $("#DB2").val();
        $.ajax({
            url: "GestoresBD/campo/" + tabla + "/" + bd,
            type: "GET",
            success: function (result) {
                let campo = JSON.parse(result);
                let template = "";
                campo.forEach((campo) => {
                    template += `<option value="${campo.column_name}">${campo.column_name}</option>`;
                });
                $("#campos").show();
                $("#boton-save").show();
                $("#campos").html(template);
            },
        });
    });

    /********************SEGUNDO BOTON****************************/

    $(document).on("click", ".Guardar", function (e) {
        let gdb = $("#Gestor").val();
        let bd = $("#DB2").val();
        let tabla = $("#tables").val();
        let campo = $("#campos").val();
        $.ajax({
            url:
                "GestoresBD/Generarjson/" +
                gdb +
                "/" +
                bd +
                "/" +
                tabla +
                "/" +
                campo,
            type: "GET",
            success: function (result) {
                let count = result.aceptar;
                $("#cerrar").hide();
                $("#edit").hide();
                $("#aceptar").hide();
                $("#siguiente").hide();

                if (count == "0") {
                    $("#aceptar2").hide();
                    $("#seleccionar").show();
                } else {
                    $("#seleccionar").hide();
                    $("#aceptar2").show();
                }

                $("#mensaje").text(result.mensaje);
                $("#pregunta").text(result.pregunta);
                $("#modal-update").modal("show");
            },
        });
        e.preventDefault();
    });

    $(document).on("click", "#aceptar2", function (e) {
        $("#cerrar").hide();
        $("#edit").hide();
        $("#aceptar").hide();
        $("#siguiente").hide();
        $("#modal-update").modal("hide");
        $("#modal-carga").modal("show");
        alter();
        cmps();
    });

    function cmps() {
        url = "GestoresBD/tablaCPMS";
        $.get(url, function (result) {
            dataCpms();
        });
    }

    function dataCpms() {
        url = "GestoresBD/insert";
        $.get(url, function (result) {
            if (result == 1) {
                location.reload();
            }
        });
    }

    $(document).on("click", "#seleccionar", function (e) {
        $("#databases").hide();
        $("#tables").hide();
        $("#campos").hide();
        $("#boton-bd").hide();
        $("#boton-save").hide();
        $("#DB2").show();
        $("#modal-update").modal("hide");
        alter();
    });

    function alter() {
        let bd = $("#DB2").val();
        url = "GestoresBD/alter/" + bd;
        $.get(url, function (result) {});
    }

    /****************************************CPMS************************************************/
    const Listado = () => {
        jQuery.getJSON("cpms/bd", (data) => {
            basedatos(data);
        });
    };
    Listado();

    $("#basedatos").change(function (e) {
        let grupo = $("#basedatos").val();
        console.log(grupo);
        $.ajax({
            url: "cpms/" + grupo,
            type: "GET",
            success: function (result) {
                let nomenclador = JSON.parse(result);
                let template = "";
                nomenclador.forEach((nomenclador) => {
                    let cpms = nomenclador.cpms;
                    let color =
                        cpms === null
                            ? "background-color:#FFFFFF;"
                            : "background-color:#ffe6e6;";
                    template += `<option style=${color} id="codigo" value="${nomenclador.codigo}">${nomenclador.descripcion}</option>`;
                });
                $("#codigoNomenclador").html(template);
            },
        });
        e.preventDefault();
    });

    $(document).on("dblclick", "#codigo", (e) => {
        let dato = $("#codigo").val();
        alert(dato);
        //alert(element);
        e.preventDefault();
    });

    function ListadoCmpsGrupo() {
        $("#seccion").hide();
        $("#subseccion").hide();
        $.ajax({
            url: "cpms/grupo",
            type: "GET",
            success: function (result) {
                let cmps = JSON.parse(result);
                let template = "";
                template += '<option value="a">SELECCIONAR GRUPO</option>';
                cmps.forEach((cmps) => {
                    template += `<option value="${cmps.codigo_grupo}">${cmps.nombre_grupo}</option>`;
                });
                $("#grupo").html(template);
            },
        });
    }

    //SECCION
    $("#grupo").change(function (e) {
        let grupo = $("#grupo").val();
        $.ajax({
            url: "cpms/seccion/" + grupo,
            type: "GET",
            success: function (result) {
                let cmps = JSON.parse(result);
                let template = "";
                template += '<option value="0">SELECCIONAR SECCION</option>';
                cmps.forEach((cmps) => {
                    template += `<option value="${cmps.codigo_seccion}">${cmps.nombre_seccion}</option>`;
                });
                $("#seccion").show();
                $("#seccion").html(template);
            },
        });
        e.preventDefault();
    });

    //SUBSECCION
    $("#seccion").change(function (e) {
        let seccion = $("#seccion").val();
        $.ajax({
            url: "cpms/subseccion/" + seccion,
            type: "GET",
            success: function (result) {
                let cmps = JSON.parse(result);
                let template = "";
                template += '<option value="0">SELECCIONAR SUBSECCION</option>';
                cmps.forEach((cmps) => {
                    template += `<option value="${cmps.codigo_subseccion}">${cmps.nombre_subseccion}</option>`;
                });
                $("#subseccion").show();
                $("#subseccion").html(template);
            },
        });
        e.preventDefault();
    });

    /**LISTADO DE PROCEDIMIENTO DE ACUERDO A SUBSECCION**/
    $("#subseccion").change(function (e) {
        let subseccion = $("#subseccion").val();
        $.ajax({
            url: "cpms/procedimiento/" + subseccion,
            type: "GET",
            success: function (result) {
                let template = "";
                let cpms = JSON.parse(result);
                template += `
                            <table class="table" id="tabla"> 
                            <thead>
                            <tr>
                                <th>Codigo </th>
                                <th>Nombre procedimiento </th>
                                <th>Seleccionar </th>
                            </tr>
                            </thead>
                            <tbody>
                            `;
                cpms.forEach((cpms) => {
                    template += `
                                    <tr>
                                        <td>${cpms.codigo_procedimiento}</td>
                                        <td>${cpms.nombre_procedimiento}</td>
                                        <td>
                                            <div class="form-check">
                                                <input class="form-check-input" name="codigo" type="checkbox" value="${cpms.codigo_procedimiento}" id="invalidCheck">
                                            </div>
                                        </td>
                                    </tr>
                                `;
                });
                template += `</tbody></table>`;
                $("#table").show();
                $("#table").html(template);
                $("#tabla").DataTable({
                    language: {
                        url:
                            "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
                    },
                    lengthMenu: [
                        [3, 5, 10, -1],
                        [3, 5, 10, "todo"],
                    ],
                });
            },
        });
        e.preventDefault();
    });

    //UPDATE PARA EL CPMS EN LA TABLA DE NOMENCLADOR
    $("#cpms").submit(function (e) {
        let dato = $("#codigoNomenclador").val();
        let checkbox = [];
        let bd = $("#basedatos").val();
        $("input:checkbox[name=codigo]:checked").each(() => {
            checkbox.push($(this).val());
        });

        if (bd == "0") {
            modalAlerta(1);
        } else if (dato === null) {
            modalAlerta(2);
        } else if (checkbox === null) {
            modalAlerta(3);
        } else {
            $.ajax({
                url: "cpms/update/" + dato + "/" + checkbox + "/" + bd,
                type: "GET",
                success: function (result) {
                    if (result == 1) {
                        $("#seccion").hide();
                        $("#subseccion").hide();
                        $("#table").hide();
                        $("#seleccionar").hide();
                        $("#aceptar").hide();
                        $("#aceptar2").hide();
                        $("#edit").hide();
                        $("#cerrar").show();
                        $("#mensaje").text("Se Actualizo CPMS");
                        $("#modal-update").modal("show");
                        $("#cpms").trigger("reset");
                        $("#codigoNomenclador").empty();
                    }
                },
            });
        }
        e.preventDefault();
    });

    function modalAlerta(codigo) {
        let mensaje =
            codigo === 1
                ? "Seleccionar BD"
                : codigo === 2
                ? "Seleccionar procedimiento"
                : codigo === 3
                ? "Seleccionar solo un CPMS"
                : "";

        $("#seleccionar").hide();
        $("#aceptar").hide();
        $("#aceptar2").hide();
        $("#edit").hide();
        $("#cerrar").show();
        $("#mensaje").text(mensaje);
        $("#modal-update").modal("show");
    }
}); //END
