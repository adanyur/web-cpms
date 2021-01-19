$(document).ready(() => {
    $("#seccion").hide();
    $("#subseccion").hide();
    $("#alert").hide();
    $("#message-process").hide();
});

const listTarifario = () => {
    let baseDatos = "bd_isis|1";
    let template = "";
    $.getJSON("cpms/" + baseDatos, (data) => {
        data.map((data) => {
            let cpms = data.cpms;
            let color =
                cpms === null
                    ? "background-color:#FFFFFF;"
                    : "background-color:#9EEDB6;";
            if (data.seccion === null && data.cpms === null) {
                color = "background-color:#FAC0C4;";
            }
            template += `<option style=${color} id="codigo" value="${data.codigo}|${data.seccion}|${data.cpms}">${data.descripcion}</option>`;
        });
        $("#codigoNomenclador").html(template);
        $("#message").text("SELECCIONAR UN ITEM DEL TARIFARIO");
    });
};
listTarifario();

const Edit = (codigo, subseccion) => {
    check = $("#codigo" + codigo).is(":checked");
    listOne(subseccion, undefined);
};

const templateProcedimiento = (data, dataCpms) => {
    let templateA = "";
    let templateB = "";

    if (dataCpms !== undefined) {
        templateB = `
            <tr onclick="Edit(${dataCpms.codigo_procedimiento},'${dataCpms.codigo_subseccion}')">
            <td>${dataCpms.codigo_procedimiento}</td>
            <td>${dataCpms.nombre_procedimiento}</td>
            <td>
                <div class="form-check">
                    <input class="form-check-input" id="codigo${dataCpms.codigo_procedimiento}" name="codigo" checked="true" type="checkbox" value="${dataCpms.codigo_procedimiento}">
                </div>
            </td>
            </tr>   
        `;
    }

    data.map((data) => {
        templateA += `
        <tr>
            <td>${data.codigo_procedimiento}</td>
            <td>${data.nombre_procedimiento}</td>
            <td>
                <div class="form-check">
                    <input class="form-check-input" name="codigo" type="checkbox" value="${data.codigo_procedimiento}">
                </div>
            </td>
        </tr>
        `;
    });

    return dataCpms === undefined ? templateA : templateB;
};

const listOne = (codigo, dataCpms) => {
    let template = "";
    $.getJSON("cpms/procedimiento/" + codigo, (data) => {
        template += `<table class="table" id="tabla"> 
                        <thead>
                        <tr>
                            <th>Codigo </th>
                            <th>Nombre procedimiento </th>
                            <th>Seleccionar </th>
                        </tr>
                        </thead>
                        <tbody>
                        `;

        template += templateProcedimiento(data, dataCpms);

        template += `</tbody></table>`;
        $("#table").show();
        $("#table").html(template);
        $("#tabla").DataTable({
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
            },
            lengthMenu: [
                [3, 5, 10, -1],
                [3, 5, 10, "todo"],
            ],
        });
    });
};

const listSeccion = (cpms) => {
    $.getJSON("cpms/seccion/1", (data) => {
        let template = "";
        template += '<option value="0">SELECCIONAR SECCION</option>';
        data.map((data) => {
            template += `<option value="${data.codigo_seccion}">${data.nombre_seccion}</option>`;
        });
        $("#seccion").show();
        $("#seccion").html(template);
        if (cpms !== undefined) {
            $("#seccion").val(cpms.codigo_seccion);
        }
    });
};

const listSubseccion = (codigoSeccion, cmps) => {
    $.getJSON("cpms/subseccion/" + codigoSeccion, (data) => {
        let template = "";
        template += '<option value="0">SELECCIONAR SUBSECCION</option>';

        if (data.length === 1 && cmps === undefined) {
            listOne(data[0].codigo_subseccion);
        }

        data.map((data) => {
            template += `<option value="${data.codigo_subseccion}">${data.nombre_subseccion}</option>`;
        });

        $("#subseccion").show();
        $("#subseccion").html(template);
        if (cmps !== undefined) {
            $("#subseccion").val(cmps.codigo_subseccion);
        }
    });
};

const cpms = (data) => {
    if (data.seccion === "null") {
        $("#seccion").show();
    }

    $.getJSON("cpms/data/" + data.cpms, (data) => {
        data.map((data) => {
            listSeccion(data);
            listSubseccion(data.codigo_seccion, data);
            listOne(data.codigo_subseccion, data);
        });
    });
};

$("#codigoNomenclador").on("click", (e) => {
    $("#message").hide();
    $("#table").hide();
    let value = $("#codigoNomenclador").val();
    let codigo = value.split("|");
    let data = {
        codigo: codigo[0],
        seccion: codigo[1],
        cpms: codigo[2],
    };

    if (data.seccion === "null" && data.cpms === "null") {
        listSeccion();
        $("#subseccion").hide();
    } else if (data.cpms === "null" && data.seccion !== "null") {
        $("#seccion").hide();
        listSubseccion(value);
    }

    if (data.cpms !== "null") {
        cpms(data);
    }

    e.preventDefault();
});

$("#seccion").change((e) => {
    let codigo = $("#seccion").val();
    listSubseccion(codigo);
    e.preventDefault();
});

$("#subseccion").change((e) => {
    let codigo = $("#subseccion").val();
    listOne(codigo);
    e.preventDefault();
});

const hideAlert = () => {
    setTimeout(() => {
        $("#message-process").hide(500);
        $("#alert").hide(500);
    }, 2000);
};

$("#cpms").submit((e) => {
    let dato = $("#codigoNomenclador").val();
    let bd = "bd_isis|1";
    let checbox2 = $("input:checkbox[name=codigo]:checked").val();
    $.getJSON("cpms/update/" + dato + "/" + checbox2 + "/" + bd, (result) => {
        listTarifario();
        $("#seccion").hide();
        $("#subseccion").hide();
        $("#table").hide();
        $("#message").show();
        $("#message-process").text(result.message);
        $("#alert").show(500);
        $("#message-process").show(500);
        hideAlert();
    });
    e.preventDefault();
});
