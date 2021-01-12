<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**INDEX**/
Route::get('/','GestorDBController@index');
Route::get('index','cpmsController@index');
Route::get('GestoresBD/prueba','GestorDBController@prueba');

Route::get('cpms/bd','cpmsController@bdjson');
Route::get('cpms/grupo','cpmsController@grupo');
Route::get('cpms/{bd}','cpmsController@prueba');
Route::get('cpms/seccion/{codigoGrupo}','cpmsController@seccion');
Route::get('cpms/subseccion/{codigoSeccion}','cpmsController@subseccion');
Route::get('cpms/procedimiento/{codigoProcedimiento}','cpmsController@procedimiento');
Route::get('cpms/update/{codigoProcedimiento}/{codigoCmps}/{bd}','cpmsController@update');
/****/
Route::get('GestoresBD/connection','GestorDBController@connection');
Route::get('GestoresBD/insert','GestorDBController@insert');
Route::get('GestoresBD/tablaCPMS','GestorDBController@tableCPMS');
Route::get('GestoresBD/{gdb}','GestorDBController@GestorDB');
Route::get('GestoresBD/alter/{bd}','GestorDBController@Alter');
Route::get('GestoresBD/table/{Tabla}/{a}','GestorDBController@Table');
Route::get('GestoresBD/json/{bd}','GestorDBController@json');
Route::get('GestoresBD/campo/{TablaCampo}/{bd}','GestorDBController@Campos');
Route::get('GestoresBD/Generarjson/{gdb}/{bd}/{tabla}/{campo}','GestorDBController@Generarjson');

