<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Libraries/PHPMailer/src/Exception.php';
require 'Libraries/PHPMailer/src/PHPMailer.php';
require 'Libraries/PHPMailer/src/SMTP.php';

class AdminPage extends Controller
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
		$id_user = $_SESSION['id_ztrack'];
        //$perm = $this->model->verificarPermisos($id_user, "AdminPage");
        //if (!$perm && $id_user != 1) {
            //$this->views->getView($this, "permisos");
            //exit;
        //}
        $this->views->getView($this, "index");
    }
    public function validarCamposCorreoYClave()
    {
        $id_user = $_SESSION['id_usuario'];
        $res = $this->model->validarCamposCorreoYClave($id_user);
        echo json_encode($res);
        die();
    }

    public function registrar()
    {
        $id = strClean($_POST['id']);
        $correo_usuario = strClean($_POST['correo']);
        $clave_correo = strClean($_POST['password']);
        $email_existente = strClean($_POST['correo_admin']);
        $usuario_activo = $_SESSION['id_usuario'];

        if (empty($correo_usuario) || empty($clave_correo)) {
            $msg = array('msg' => 'Ingrese todos sus datos', 'icono' => 'warning');
        } else {
            $data = $this->model->insertarRespuesta($id, $correo_usuario,$usuario_activo);

            if ($data == "ok") {
                $evento = "RESPONDIDO";
                $id_consulta = $this->model->IdRespuesta($correo_usuario);
                $id = $id_consulta['id'];
                $data2 = $this->model->h_respuesta($id, $id, $correo_usuario,$usuario_activo, $evento);
                $msg = array('msg' => 'Respuesta enviada', 'icono' => 'success');
                
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = $correo_usuario; // Reemplaza con tu dirección de correo electrónico de Gmail
                $mail->Password = $clave_correo; // Reemplaza con tu contraseña de Gmail
                $mail->SMTPSecure = 'ssl';
                $mail->Port = 465;

                // Configuración del correo electrónico
                $mail->setFrom('zgroupsistemas@gmail.com', 'ZTRACK');
                $mail->addAddress($email_existente); // Reemplaza con la dirección de correo electrónico del destinatario
                $mail->send();
            } else {
                $msg = array('msg' => 'Error al registrar', 'icono' => 'error');
            }
        }
        echo json_encode($msg, JSON_UNESCAPED_UNICODE);
        die();
    }
   
  
    public function LiveData()
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
        //forma de recibir un json desde js     
        $datosRecibidos = file_get_contents("php://input");
        //$resultado = $_POST['data'];
        //echo json_encode($datosRecibidos, JSON_UNESCAPED_UNICODE);
        $resultado1 = json_decode($datosRecibidos);
        //enviar el resultado1 a api para procesar si existe algun cambio
        $VerificarLive = $this->model->VerificarLive($resultado1);
        $resultado = $resultado1->data;
        echo json_encode($VerificarLive, JSON_UNESCAPED_UNICODE);
        */
        $datosW =$_SESSION['data'] ;
        $resultado1 = array('data'=>$datosW);
        $VerificarLive = $this->model->VerificarLive($resultado1);
        $Verificar = json_decode($VerificarLive);
        $Verificar = $Verificar->data;
        //$resultado = $VerificarLive->data;
        /*
        $text ="";
        $datosW =$_SESSION['data'] ;
        foreach ($datosW as $dat) {
            $text.=$dat->telemetria_id.",";
        }
        */
        $d =0 ;
        foreach ($datosW as $clave => $valor) {
            // $array[3] se actualizará con cada valor de $array...
            //echo "{$clave} => {$valor} ";
            //print_r($array);
            foreach ($Verificar as $dat) {
                if($valor->telemetria_id==$dat->telemetria_id){
                    //va haber reemplazo en session en la fecha pa continuar actualizando
                    $_SESSION['data'][$clave]->ultima_fecha =$dat->ultima_fecha ;
                    $dat->ultima_fecha = fechaPro($dat->ultima_fecha);
                    //echo $dat->ultima_fecha;
                    $dat->temp_supply_1 =tempNormal($dat->temp_supply_1) ; 
                    $dat->return_air =tempNormal($dat->return_air) ; 
                    $dat->set_point =tempNormal($dat->set_point);
                    $dat->relative_humidity =porNormal($dat->relative_humidity) ; 
                    $dat->humidity_set_point =porNormal($dat->humidity_set_point) ; 
                    $dat->evaporation_coil =tempNormal($dat->evaporation_coil) ; 
                    
                    //$dat->compress_coil_1 =tempNormal($dat->compress_coil_1) ;
                    $dat->ambient_air = tempNormal($dat->ambient_air);
                    $dat->cargo_1_temp =tempNormal($dat->cargo_1_temp) ; 
                    $dat->cargo_2_temp =tempNormal($dat->cargo_2_temp) ; 
                    $dat->cargo_3_temp =tempNormal($dat->cargo_3_temp) ; 
                    $dat->cargo_4_temp =tempNormal($dat->cargo_4_temp) ; 
                    $d++;
                }
            }
        }        
        //echo json_encode($_SESSION['data'][0]->telemetria_id, JSON_UNESCAPED_UNICODE);
        echo json_encode($Verificar , JSON_UNESCAPED_UNICODE);
        die();
    } 
    
    
    public function ListaDispositivoEmpresa()
    {
    //$empresa_id = $_SESSION['empresa_id'];
    $imei = '867869061617106';
    $data = $this->model->DatosSensor($imei);
    $data = json_decode($data);
    $lecturas = (isset($data->data) && is_array($data->data)) ? $data->data : array();
    if (count($lecturas) == 0) {
        $res = "<div class='col-12 text-center'><h4 class='fw-bold'>Equipo sin lecturas</h4><p>".$imei."</p></div>";
    } else {
        $res = ContenedorMadurador_2($lecturas);
    }
    
    $data1 = array(
        //'data' => $data,
        'text' => $res
    );
    
    echo json_encode($data1, JSON_UNESCAPED_UNICODE);
    die();
    }
    public function ListaD() {
        $data = $this->model->ListaDispositivoEmpresa($_SESSION['empresa_id']);
        $data = json_decode($data);
        $data = $data->data;
        $estados = array();
        
        foreach($data as $val2) {
            $estado = $this->determinarEstado($val2->ultima_fecha);
            $estados[] = (object) ['estado' => $estado];
        }
        
        $n_array = array(
            'estados' => $estados
        );
        
        echo json_encode($n_array, JSON_UNESCAPED_UNICODE);
        die();
    }

    private function determinarEstado($ultima_fecha) {
        
        $fechaActual = new DateTime();
        $fechaUltima = new DateTime($ultima_fecha);
        $diferencia = $fechaActual->getTimestamp() - $fechaUltima->getTimestamp();
        
        //tiempo en segundos
        if ($diferencia >= 1800) { 
            return 'Online';
        } elseif ($diferencia <= 86400) { 
            return 'Wait';
        } else {
            return 'Offline';
        }
    }
    public function ListaComandos(){
        $data = $this->model-> ListaComandos();
        $data = json_decode($data);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    

    public function generarCardAnalytic(){
        $data = $this->model->generarComandos(8);
        $cards = json_decode($data);
        echo json_encode($cards, JSON_UNESCAPED_UNICODE);
    }
    
    public function ListaDeDispositivos() {
        $obj = [];
        $data = $this->model->ListaDeSensores();
        $data = json_decode(json_encode($data));

        $datosApi = $this->model->obtenerSpyTmp();
        $datosApi = json_decode($datosApi);
        $datosApi = $datosApi->data;
        //echo json_encode($datosApi);
        foreach($data as $val){
            $obj2 = [
                'id' => $val->id,
                'usda' => $val->usda ." <button type='button' class='btn btn-primary btn-sm' onclick='graficoDispositivo(\"$val->relacion\")'><i class='ri-line-chart-line fs-6'></i></button>",
                'pallet' => $val->pallet,
                'empresa' => $val->empresa,
                'set_point' => $val->set_point,
                'temperatura' => $val->temperatura,
                'estado' => $val->estado_ok
            ];
            array_push($obj, $obj2);
        }
        echo json_encode($obj, JSON_UNESCAPED_UNICODE);
    }

    public function GraficaEncendidoApagado(){
        $data = [];
        for($i=0; $i<5; $i++){
            $data[$i]['on'] = $i+1;
            $data[$i]['off'] = $i+3;
            $data[$i]['wait'] =  $i+5;
        }

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    public function GraficaUltimos3Dias(){
        //$empresa_id = 2;
       // $data = $this->model->ListaDeDispositivos($_SESSION['empresa_genset_id']);
        //$res = json_decode($data);
        //$res = $res->data;
        //$res = $res->consumo;
        $res = [];
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    public function graficoDispositivo($id){
        $obj = [
            'sensor' => $id
        ];
        $data = $this->model->graficoSensor($obj);
        $data = json_decode($data);
        $res = $data->data;
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }
    public function listaAlarmas(){
        $data =[];
     
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function listaMensajes(){
        $data =[];
       
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function listaHoras(){
        $data = [];
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
}

