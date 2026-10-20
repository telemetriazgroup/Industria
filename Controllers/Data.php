<?php

class Data extends Controller
{
    public function __construct()
    {
        session_start();
        if (empty($_SESSION['activo_ztrack'])) {
            header("location: " . base_url);
        }
        parent::__construct();
    }
    public function index()
    {   
        // aqui debe llegar todo los datos si es user 1 sino de acuedo a loq ue esta permitido 
		$id_user = $_SESSION['id_ztrack'];
        /*
        $perm = $this->model->verificarPermisos($id_user, "Live");
        if (!$perm && $id_user != 1) {
            $this->views->getView($this, "permisos");
            exit;
        }
        */
        /*
        //pedimos la info 
        $data = $this->model->ListaContenedores($id_user);
        #echo $data ;
        $resultadoContenedores = json_decode($data);
        $resultadoContenedores = $resultadoContenedores->data;
        $this->views->getView($this, "index",json_encode($resultadoContenedores));
        */
        $gps = $_SESSION['gps'];
        if($gps == 1){
            $this->views->getView($this, "index2");
        }else{
            $this->views->getView($this, "index");
        }

    }
    public function ListaDispositivoEmpresa()
    {
        $data = $this->model->ListaDispositivoEmpresa($_SESSION['empresa_id']);
        $data = json_decode($data);
        $data = $data->data;
        $data=$data[0];
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();

    } 

    public function GraficaInicial($param){
    
        if($param!=""){
            $pros = explode(",",$param);
            //se debe enviar id de telemetria
            $nombre = $pros[0];
            $telemetria = $pros[1];

            $fechaI =(isset($pros[2])) ? $pros[2] :"0" ;
            $fechaF =(isset($pros[3])) ? $pros[3] :"0" ;
            // consultar para nombre_contenedor y ultima fecha 
            $consultaUltima = $this->model->ContenedorData($nombre);
            $resultadoL = json_decode($consultaUltima);
            $resultadoL = $resultadoL->data;
            $ultimaFecha = $resultadoL[0]->ultima_fecha;
            if($fechaI=="0" && $fechaF=="0"){
                $cadena = array(
                    'device'=>$telemetria,
                    'ultima'=>gmtFecha($ultimaFecha),
                    'utc'=>$_SESSION['utc']
                );
            }else{
                if(fechaGrafica($fechaI,$fechaF)=="ok"){
                    $cadena = array(
                        'device'=>$telemetria,
                        'ultima'=>gmtFecha($ultimaFecha),
                        //'fechaI'=>$fechaI.":00",
                        //'fechaF'=>$fechaF.":00"
                        'fechaI'=> validateDate($fechaI),
                        'fechaF'=> validateDate($fechaF),
                        'utc'=>$_SESSION['utc']
                        
                    );
                    //validateDate($fechaI, $format = 'Y-m-d H:i:s')
                }else{
                    $cadena = array();
                }
            }
            if(count($cadena)!=0){
                //hacer peticion de data en el servidor 
                $dataMadurador = $this->model->DatosGraficaTabla($cadena);
                $resultadoMadurador = json_decode($dataMadurador);
                $resultadoMadurador = $resultadoMadurador->data;
            }else{
                $resultadoMadurador =fechaGrafica($fechaI,$fechaF);
            }
        }else{
            $resultadoMadurador ="";
        }
        echo json_encode($resultadoMadurador , JSON_UNESCAPED_UNICODE);

    }
    public function DatosRecientes(){
        $imei = '867869061617106';
        $raw = $this->model->DatosRecienteIndustria($imei);
        echo json_encode(respuestaRecienteIndustria($raw, 'tabla'), JSON_UNESCAPED_UNICODE);
        die();
    }

    public function DatosDispositivoPorFecha(){
        $dispositivo = isset($_POST['dispositivos']) ? $_POST['dispositivos'] : '';
        if ($dispositivo == '' || $dispositivo == '0') {
            $dispositivo = '867869061617106';
        }
        $f_inicio = isset($_POST['f_inicio']) ? $_POST['f_inicio'] : '';
        $f_fin = isset($_POST['f_fin']) ? $_POST['f_fin'] : '';
        $completo = isset($_POST['completo']) && $_POST['completo'] == '1';
        $limite = 2000;
        $error = validarConsultaIndustria($dispositivo, $f_inicio, $f_fin, $limite);
        if ($error != null) {
            $res = array('msg' => $error, 'icon' => 'warning', 'parcial' => false);
        } else {
            $desde = fechaIndustria($f_inicio)->format('Y-m-d H:i:s');
            $hasta = fechaIndustria($f_fin)->format('Y-m-d H:i:s');
            $res = consultarRangoTabla($this->model, $dispositivo, $desde, $hasta, $completo);
        }
        echo json_encode($res, JSON_UNESCAPED_UNICODE);

    }

    public function obtenerDispositivos(){
        /*
        $novo =[];
        $data = $this->model->ListaGensetEmpresa($_SESSION['empresa_genset_id']);
        $resultadoMadurador = json_decode($data);
        $resultadoMadurador = $resultadoMadurador->data->genset;
        foreach ($resultadoMadurador as $producto) {
            $por =  ['id' => $producto->config, 'imei' => $producto->imei, 'dispositivo' => $producto->descripcion . " - " . $producto->imei];
            array_push($novo,$por);
        }
        //echo json_encode($resultadoMadurador, JSON_UNESCAPED_UNICODE);
        echo json_encode($novo, JSON_UNESCAPED_UNICODE); */

        $data = $this->model->ListaSensoresUsda();
        echo json_encode($data, JSON_UNESCAPED_UNICODE);

    }

    public function obtenerDatosTabla($param){
        if($param!=""){
            $pros = explode(",",$param);
            //se debe enviar id de telemetria
            $nombre = $pros[0];
            //$telemetria = $pros[1];

            $fechaI =(isset($pros[1])) ? $pros[2] :"0" ;
            $fechaF =(isset($pros[2])) ? $pros[3] :"0" ;
            // consultar para nombre_contenedor y ultima fecha 
            //$consultaUltima = $this->model->ContenedorData($nombre);
            //$resultadoL = json_decode($consultaUltima);
            //$resultadoL = $resultadoL->data;
            //$ultimaFecha = $resultadoL[0]->ultima_fecha;
            if($fechaI=="0" && $fechaF=="0"){
                $cadena = array(
                    //'device'=>$telemetria,
                    //'ultima'=>gmtFecha($ultimaFecha),
                    //'utc'=>$_SESSION['utc']
                    'sensor'=>$nombre
                );
            }else{
                if(fechaGrafica($fechaI,$fechaF)=="ok"){
                    $cadena = array(
                        //'device'=>$telemetria,
                        //'ultima'=>gmtFecha($ultimaFecha),
                        //'fechaI'=>$fechaI.":00",
                        //'fechaF'=>$fechaF.":00"
                        'fechaI'=> validateDate($fechaI),
                        'fechaF'=> validateDate($fechaF),
                        //'utc'=>$_SESSION['utc']
                        'sensor'=>$nombre
                        
                    );
                    //validateDate($fechaI, $format = 'Y-m-d H:i:s')
                }else{
                    $cadena = array();
                }
            }
            if(count($cadena)!=0){
                //hacer peticion de data en el servidor 
                $dataMadurador = $this->model->obtenerDatosTabla($cadena);
                $resultadoMadurador = json_decode($dataMadurador);
                $resultadoMadurador = $resultadoMadurador->data;
            }else{
                $resultadoMadurador =fechaGrafica($fechaI,$fechaF);
            }
        }else{
            $resultadoMadurador ="";
        }
        echo json_encode($resultadoMadurador , JSON_UNESCAPED_UNICODE);
    }
}
