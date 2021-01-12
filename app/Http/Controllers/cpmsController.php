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
        $grupo = cpms::select('codigo_grupo','nombre_grupo')
             ->distinct()
             ->orderByRaw('codigo_grupo ASC')
             ->get();
        return json_encode($grupo);
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
        $json = $table->select($campo1.' AS codigo',$campo2.' AS descripcion','cpms AS cpms')
                     ->distinct()
                     ->orderByRaw($campo2.' ASC')
                     ->get();

        return json_encode($json);
    }

    public function seccion($codigoGrupo){

    $seccion=cpms::select('codigo_seccion','nombre_seccion')
                ->distinct()
                ->where('codigo_seccion','LIKE',$codigoGrupo.'%')
                ->orderByRaw('codigo_seccion ASC')
                ->get();

            return json_encode($seccion);
    }



    public function subseccion($codigoSeccion){
    $subseccion=cpms::select('codigo_subseccion','nombre_subseccion')
                    ->distinct()
                    ->where('codigo_subseccion','LIKE',$codigoSeccion.'%')
                    ->orderByRaw('codigo_subseccion ASC')
                    ->get();

            return json_encode($subseccion);
    }


    public function procedimiento($codigoProcedimiento){

    $procedimientos=cpms::select('codigo_procedimiento','nombre_procedimiento')
                        ->where('codigo_subseccion',$codigoProcedimiento)
                        ->orderByRaw('codigo_procedimiento ASC')
                        ->get();
                            
        return json_encode($procedimientos);

    }

    
    /*METODO PARA HACER ACTUALIZACIONES EN LA TABLA NOMENCLADOR*/
    public function update($codigoProcedimiento,$codigoCmps,$bd){

        $database=explode('|',$bd);
        $gdb=config('datadb.'.$database[1].'.gdb');    
        $bd=config('datadb.'.$database[1].'.database');
        $tabla=config('datadb.'.$database[1].'.tabla');
        $campo1=config('datadb.'.$database[1].'.campos.campo0');
        
        Config::set('database.connections.'.$gdb.'.database',$bd);

        $proceUpdate = DB::table($tabla)
                        ->where($campo1,$codigoProcedimiento)
                        ->update(['cpms' => $codigoCmps]);

        return 1;

    }    


    public function bdjson(){
        $data = file_get_contents("../config/bd.json");
        return  response()->json($data);
    }


}

