<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Config;

class GestorDBController extends Controller
{
    

    public function index(){

        $gdb=env('DB_CONNECTION');

        switch ($gdb) {
            case 'mysql':
                $result=DB::table('information_schema.tables')
                        ->select('table_name')
                        ->where('table_name','cpms')
                        ->get()
                        ->count();
            break;
            case 'pgsql':
                $result=DB::table('information_schema.tables')
                        ->select('table_name')                   
                        ->where('table_schema','public')
                        ->where('table_type','BASE TABLE')
                        ->where('table_name','cpms')
                        ->get()
                        ->count();
            break;
        }


        // if($result === 1 ){
        //     return view('cpms'); 
        // }else{
        //     return view('GestoresBD');          
        // }
        return view('cpms'); 
        // return view('GestoresBD');
    }

    public function connection(){
        return env('DB_CONNECTION');
    }


    //ALTER TABLE
    public function Alter($bd){

        $bds=explode('|',$bd);

        $gbd=config('datadb.'.$bds[1].'.gdb');
        $bd=config('datadb.'.$bds[1].'.database');
        $table=config('datadb.'.$bds[1].'.tabla');

        Config::set('database.connections.'.$gbd.'.database',$bd);

        $sql=DB::table('information_schema.columns')
        ->where('table_schema','public')
        ->where('table_name',$table)
        ->where('column_name','cpms')
        ->get()
        ->count();

        if($sql == 0){
            DB::statement('ALTER TABLE '.$table.' ADD cpms varchar(10)');    
        }

    }


    ///CREACION DE LA TABLA CPMS
    public function tableCPMS(){

        $gbd = config('datadb.0.gdb');
        $bd = config('datadb.0.database');
        Config::set('database.connections.'.$gbd.'.database',$bd);

        $result=DB::table('information_schema.tables')
                    ->select('table_name')                   
                    ->where('table_schema','public')
                    ->where('table_type','BASE TABLE')
                    ->where('table_name','cpms')
                    ->get()
                    ->count();

        if($result == 0){
                 $CreateTableCpms=config('cpms.CreateTable');
                 DB::statement($CreateTableCpms);
        }       
    }

    //INSERT DE LOS DATOS PARA LA TABLA CPMS
    public function insert(){

        $gbd=config('datadb.0.gdb');
        $bd=config('datadb.0.database');
        Config::set('database.connections.'.$gbd.'.database',$bd);
    
        $result=DB::table('cpms')          
                    ->get()
                    ->count();
    
        if($result == 0){
            $data = file_get_contents("../config/cpms-data.json");
            $cpmsData = json_decode($data, true);
                foreach ($cpmsData as $result) {
                        DB::table('cpms')->insert($result);
                }
        }

        return 1;

    }

    //LISTADO DE BASE DE DATOS
    public function GestorDB($gdb){ 

     $Gdb=env('DB_CONNECTION');
        
            switch ($gdb) {
                case 'mysql':
                        $sql=DB::table('information_schema.schemata')
                                ->select('schema_name AS database')
                                ->orderByRaw('schema_name ASC')
                                ->get();
                break;
                case 'pgsql':
                        $sql=DB::table('pg_database')
                                ->select('datname AS database')
                                ->where('datistemplate','f')                   
                                ->orderByRaw('datname ASC')
                                ->get();
                                    
                break;
                    case 'sqlsrv':
                break;
            }        

            if(file_exists('../config/bd.json')){
                unlink('../config/bd.json');
            }

             $json=json_encode($sql);
            return $json;                  
    }
    
    
    //CREACION DE ARCHIVO JSON CON LA BD SELECCIONADA
    public function json($json){    
        $y=array();
        $bd=explode(',', $json);
        $file = fopen("../config/bd.json", "w+");

        foreach($bd as $a=>$b){
            $y[]=array('id' => $a,'bd' => $b);
        }                    
        $json=json_encode($y); 
        fwrite($file,$json);
        fclose($file);

        return response()->json($json);
    }

    //lISTADO DE TABLAS
    public function Table($db,$a){
         $bd = explode('|',$db);      
        //  $gdb = env('DB_CONNECTION');
         $gdb = 'pgsql';
        Config::set('database.connections.'.$gdb.'.database',$bd[0]);             
        switch ($gdb) {
            case 'mysql':
                $sql=DB::table('information_schema.tables')
                    ->select('table_name')
                    ->where('table_schema',$bd[0])
                    ->get();
            break;
            case 'pgsql':
                $sql=DB::table('information_schema.tables')
                ->select('table_name')                   
                ->where('table_schema','public')
                ->where('table_type','BASE TABLE')
                ->orderByRaw('table_name ASC')
                ->get();
            break;
            
        }
    
        $bdarchivado=config('datadb.'.$bd[1].'.database');

        if($bdarchivado == $bd[0] && $a=='db'){            
            $mensaje='LA BD SELECCIONADA YA FUE UTILIZADA';
            $pregunta='¿Deseas editar?';

            $result=response()->json([
                'estado'=>'0',
                'mensaje'=>$mensaje,
                'pregunta'=>$pregunta
                ]);

        }else{
            $result=json_encode($sql);
        }

       return $result;
       
    }


    public function Campos($tabla,$bd){
        $bd=explode('|',$bd);
        // $gdb=env('DB_CONNECTION');
        $gdb='pgsql';
        Config::set('database.connections.'.$gdb.'.database',$bd[0]);
       
        switch ($gdb) {
            case 'mysql':
                $Campos=DB::table('information_schema.columns')
                    ->select('column_name')
                    ->where('table_name',$tabla)
                    ->get();

            break;
            case 'pgsql':
                $Campos=DB::table('information_schema.columns')
                ->select('column_name')                   
                ->where('table_schema','public')
                ->where('table_name',$tabla)                    
                ->get();

            break;

        }

        return json_encode($Campos);        
    }


    public function Generarjson($gdb,$bd,$tabla,$campo){

        $bds=explode('|',$bd);
        $camp=explode(',',$campo);

        $contenido='<?php return[';     
                $contenido.="'gdb'=>'".$gdb."','database'=>'".$bds[0]."','tabla'=>'$tabla','campos'=>[";
                    foreach($camp as $a => $b){
                        $contenido.="'campo$a'=>'$b',";   
                    }
                $contenido.='],';
        $contenido.='];?>';
        
        $file = fopen("../config/datadb/".$bds[1].".php", "w+");
        fwrite($file,$contenido);
        fclose($file);       
        
        $data = file_get_contents("../config/bd.json");      
        $cpmsData = json_decode($data, true);
        $count =count($cpmsData);
                   
        if ($count <> count(glob('../config/datadb/'.'{*}',GLOB_BRACE))){
            $mensaje='Se guardo los datos de la BD: '.$bds[0];
            $pregunta='Debe seleccionar otra base de datos';
            $count='0';
        }else{
            $mensaje='Se guardaron correctamente los datos las BD';
            $pregunta='';
            $count='1';
        }

        
        return response()->json([
            'mensaje'=>$mensaje,
            'pregunta'=>$pregunta,
            'aceptar'=>$count
            ]);
    }



    public function prueba(){
        $files=glob('../config/datadb/'.'{*}',GLOB_BRACE);
        //$files=glob('C:/laragon/www/cpms/config/datadb/'.'{*}',GLOB_BRACE);
        foreach($files as $file){
            while(($archivo = readdir(opendir($file)))!== false){
                if($archivo <> '..' && $archivo <> '.' ){
                        //unlink($archivo);
                        return $archivo;
                }
            }
        }
        
    }


}//END
