$(document).ready(() => {
    $("#seccion").hide();
    $("#subseccion").hide();
    // $("#message").text("SELECCIONAR UN ITEM DEL TARIFARIO");
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
                    : "background-color:#009B6E;color:#fff;";
            template += `<option style=${color} id="codigo" value="${data.codigo}|${data.seccion}">${data.descripcion}</option>`;
        });
        $("#codigoNomenclador").html(template);
        $("#message").text("SELECCIONAR UN ITEM DEL TARIFARIO");
    });
};

listTarifario();

const listOne = (codigo) => {
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
        data.map((data) => {
            template += `
            <tr>
                <td>${data.codigo_procedimiento}</td>
                <td>${data.nombre_procedimiento}</td>
                <td>
                    <div class="form-check">
                        <input class="form-check-input" name="codigo" type="checkbox" value="${data.codigo_procedimiento}" id="invalidCheck">
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
                url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
            },
            lengthMenu: [
                [3, 5, 10, -1],
                [3, 5, 10, "todo"],
            ],
        });
    });
};

$("#codigoNomenclador").on("click", (e) => {
    $("#message").hide();
    $("#table").hide();
    let codigoSeccion = $("#codigoNomenclador").val();
    $.getJSON("cpms/subseccion/" + codigoSeccion, (data) => {
        let template = "";
        template += '<option value="0">SELECCIONAR SUBSECCION</option>';
        let select = "";
        if (data.length === 1) {
            select = `selected="true"`;
            listOne(data[0].codigo_subseccion);
        }
        data.map((data) => {
            template += `<option value="${data.codigo_subseccion}" ${select}>${data.nombre_subseccion}</option>`;
        });

        $("#subseccion").show();
        $("#subseccion").html(template);
    });
    e.preventDefault();
});

$("#subseccion").change((e) => {
    let codigo = $("#subseccion").val();
    listOne(codigo);
    e.preventDefault();
});

$("#cpms").submit((e) => {
    let dato = $("#codigoNomenclador").val();
    let bd = "bd_isis|1";
    let checbox2 = $("input:checkbox[name=codigo]:checked").val();

    $.getJSON("cpms/update/" + dato + "/" + checbox2 + "/" + bd, (result) => {
        listTarifario();
        $("#subseccion").hide();
        $("#table").hide();
        $("#message").show();
    });
    e.preventDefault();
});
