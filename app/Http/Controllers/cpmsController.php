<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\CollectionstdClass;
use App\cpms;
use Config;

class cpmsController extends Controller
{
    public function index(){
        return view('cpms');
    }


    public function grupo(){
        $grupo = cpms::distinct()
            ->orderByRaw('codigo_grupo')
            ->get(['codigo_grupo','nombre_grupo']);
    
        return response()->json($grupo);
    }


   public function prueba($db){
        $database=explode('|',$db);
        $gdb=config('datadb.'.$database[1].'.gdb');    
        $bd=config('datadb.'.$database[1].'.database');
        $tabla=config('datadb.'.$database[1].'.tabla');
        $campo1=config('datadb.'.$database[1].'.campos.campo0');
        $campo2=config('datadb.'.$database[1].'.campos.campo1');
        Config::set('database.connections.'.$gdb.'.database',$bd);
        $table=DB::table($tabla);

        $json = $table->select($campo1.' AS codigo',$campo2.' AS descripcion','cpms AS cpms','tf_cpms_sec AS seccion')
                      ->distinct()
                      ->orderByRaw($campo2.' ASC')
                      ->whereNotNull('tf_cpms_sec')
                      ->get();

        return response()->json($json);
    }

    public function seccion($codigo){        
        $codigoSeccion = explode('|',$codigo);
        $seccion=cpms::distinct()
        ->where('codigo_seccion','LIKE',$codigoSeccion[1].'%')
        ->orderByRaw('codigo_seccion')
        ->get(['codigo_seccion','nombre_seccion']);

         return response()->json($seccion);
    }



    public function subseccion($codigo){
        $codigoSeccion = explode('|',$codigo);
        $subseccion=cpms::distinct()
                ->whereCodigo_seccion($codigoSeccion[1])
                ->orderByRaw('nombre_subseccion ASC')
                ->get(['codigo_subseccion','nombre_subseccion']);

            return response()->json($subseccion);
    }


    public function procedimiento($codigoProcedimiento){

    $procedimientos=cpms::where('codigo_subseccion',$codigoProcedimiento)
                        ->orderByRaw('codigo_procedimiento')
                        ->get(['codigo_procedimiento','nombre_procedimiento']);
                            
        return json_encode($procedimientos);

    }

    
    /*METODO PARA HACER ACTUALIZACIONES EN LA TABLA NOMENCLADOR*/
    public function update($codigoProcedimiento,$codigoCmps,$bd){

        $database=explode('|',$bd);
        $codigoProcedimiento = explode('|',$codigoProcedimiento);
        $gdb=config('datadb.'.$database[1].'.gdb');    
        $bd=config('datadb.'.$database[1].'.database');
        $tabla=config('datadb.'.$database[1].'.tabla');
        $campo1=config('datadb.'.$database[1].'.campos.campo0');
        
        Config::set('database.connections.'.$gdb.'.database',$bd);

        $proceUpdate = DB::table($tabla)
                        ->where($campo1,$codigoProcedimiento[0])
                        ->update(['cpms' => $codigoCmps]);

        return 1;

    }    


    public function bdjson(){
        $data = file_get_contents("../config/bd.json");
        return  response()->json($data);
    }


}

