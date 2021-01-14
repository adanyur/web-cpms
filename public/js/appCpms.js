$(document).ready(function () {
    /**FUNCIONES QUE SE EJECUTA AL INICIAR**/
    // basedatos();
    // ListadoCmpsGrupo();
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
        template += '<option value="0">SELECCIONAR SISTEMA</option>';
        result.map((result) => {
            template += `<option value="${result.bd}|${result.id}">${result.descripcion}</option>`;
            $("#DB2").html(template);
            $("#basedatos").html(template);
        });
    }

    /////////TABLAS POR BASE DE DATOS

    const table = (json) => {
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
    };

    $("#DB2").change((e) => {
        let tables = $("#DB2").val();
        let a = "db";
        $("#tables").hide();
        $("#campos").hide();
        $("#boton-bd").hide();
        $("#boton-save").hide();
        $.ajax({
            url: "GestoresBD/table/" + tables + "/" + a,
            type: "GET",
            success: (result) => {
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

    $(document).on("click", "#edit", (e) => {
        let tables = $("#DB2").val();
        let a = "edit";
        let url = "GestoresBD/table/" + tables + "/" + a;
        $.get(url, (result) => {
            $("#modal-update").modal("hide");
            table(result);
        });
    });

    $("#tables").change((e) => {
        let tabla = $("#tables").val();
        let bd = $("#DB2").val();
        $.ajax({
            url: "GestoresBD/campo/" + tabla + "/" + bd,
            type: "GET",
            success: (result) => {
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

    $(document).on("click", ".Guardar", (e) => {
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
            success: (result) => {
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

    $(document).on("click", "#aceptar2", (e) => {
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

    const alter = () => {
        let bd = $("#DB2").val();
        url = "GestoresBD/alter/" + bd;
        $.get(url, (result) => {});
    };

    $(document).on("click", "#seleccionar", (e) => {
        $("#databases").hide();
        $("#tables").hide();
        $("#campos").hide();
        $("#boton-bd").hide();
        $("#boton-save").hide();
        $("#DB2").show();
        $("#modal-update").modal("hide");
        alter();
    });

    /****************************************CPMS************************************************/

    const Listado = () => {
        $.getJSON("cpms/bd", (data) => {
            basedatos(data);
        });
    };
    Listado();

    $("#basedatos").change((e) => {
        let grupo = $("#basedatos").val();
        let template = "";
        $.getJSON("cpms/" + grupo, (result) => {
            result.map((result) => {
                let cpms = result.cpms;
                let color =
                    cpms === null
                        ? "background-color:#FFFFFF;"
                        : "background-color:#ffe6e6;";
                template += `<option style=${color} id="codigo" value="${result.codigo}">${result.descripcion}</option>`;
            });
            $("#codigoNomenclador").html(template);
        });
        e.preventDefault();
    });

    $(document).on("dblclick", "#codigo", (e) => {
        let dato = $("#codigo").val();
        alert(dato);
        e.preventDefault();
    });

    const ListadoCmpsGrupo = () => {
        $("#seccion").hide();
        $("#subseccion").hide();
        let template = "";
        template += '<option value="a">SELECCIONAR GRUPO</option>';
        $.getJSON("cpms/grupo", (result) => {
            result.map((result) => {
                template += `<option value="${result.codigo_grupo}">${result.nombre_grupo}</option>`;
            });
            $("#grupo").html(template);
        });
    };
    ListadoCmpsGrupo();

    //SECCION
    $("#grupo").change((e) => {
        let grupo = $("#grupo").val();
        $.getJSON("cpms/seccion/" + grupo, (data) => {
            let template = "";
            template += '<option value="0">SELECCIONAR SECCION</option>';
            data.map((data) => {
                template += `<option value="${data.codigo_seccion}">${data.nombre_seccion}</option>`;
            });
            $("#seccion").show();
            $("#seccion").html(template);
        });
        e.preventDefault();
    });

    //SUBSECCION
    $("#seccion").change((e) => {
        let seccion = $("#seccion").val();
        $.getJSON("cpms/subseccion/" + seccion, (data) => {
            let template = "";
            template += '<option value="0">SELECCIONAR SUBSECCION</option>';
            data.map((data) => {
                template += `<option value="${data.codigo_subseccion}">${data.nombre_subseccion}</option>`;
            });
            $("#subseccion").show();
            $("#subseccion").html(template);
        });
        e.preventDefault();
    });

    /**LISTADO DE PROCEDIMIENTO DE ACUERDO A SUBSECCION**/
    $("#subseccion").change((e) => {
        let subseccion = $("#subseccion").val();
        $.ajax({
            url: "cpms/procedimiento/" + subseccion,
            type: "GET",
            success: (result) => {
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
    $("#cpms").submit((e) => {
        let dato = $("#codigoNomenclador").val();
        let bd = $("#basedatos").val();
        let checbox2 = $("input:checkbox[name=codigo]:checked").val();

        if (bd == "0") {
            modalAlerta(1);
        } else if (dato === null) {
            modalAlerta(2);
        } else if (checkbox === null) {
            modalAlerta(3);
        } else {
            $.ajax({
                url: "cpms/update/" + dato + "/" + checbox2 + "/" + bd,
                type: "GET",
                success: (result) => {
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
                },
            });
        }
        e.preventDefault();
    });
});

const modalAlerta = (codigo) => {
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
};
//END
