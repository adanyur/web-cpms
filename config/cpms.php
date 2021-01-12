<?php

return [

    'CreateTable'=>'
        CREATE TABLE cpms
        (
        id serial NOT NULL,
        codigo_grupo character(1),
        nombre_grupo character varying(100),
        codigo_seccion character varying(5),
        nombre_seccion character varying(250),
        codigo_subseccion character varying(8),
        nombre_subseccion character varying(250),
        codigo_procedimiento character varying(8),
        nombre_procedimiento text,
        CONSTRAINT cpms_pk PRIMARY KEY (id)
        )
    ',


];
?>