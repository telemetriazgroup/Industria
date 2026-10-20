<?php 
    function formatearFecha($fecha) {
        $dateTime = new DateTime($fecha);   
        return $dateTime->format('H:i:s d/m/Y');
    }

    function convertirFecha($fecha){
        $fecha = explode("T", $fecha);
        $fecha1 = explode("-", $fecha[0]);
        $hora = explode(".", $fecha[1]);
        $hora = $hora[0];
        $hoy = $fecha1[2] . "-" . $fecha1[1] . "-" . $fecha1[0] . " " . $hora;
        return $hoy;
    }

    function convertirFecha2($fecha){
        $fecha = explode("T", $fecha);
        $fecha1 = explode("-", $fecha[0]);
        $hora = explode(".", $fecha[1]);
        $hora = $hora[0];
        $hoy = $hora;
        return $hoy;
    }
    function status($dato){
        if($dato==1){$res ="Required";
        }elseif($dato==2){$res ="Executed";
        }elseif($dato==3){$res ="Validated";    
        }else{$res ="canceled";}
        return $res;
    }
    function validarco2($dato){
        if($dato<0 ||$dato>30){$dato="NA";}
        return $dato;
    }
    function parametro($dato){
        if($dato==1){$res ="PPM";
        }elseif($dato==2){$res ="%";
        }elseif($dato==3){$res ="F°";    
        }else{$res ="H";}
        return $res;
    }
    //pasar_celcius
    function pasar_celcius($dato){
        $celsius = (5 / 9) * ($dato - 32);  
        return number_format($celsius, 1);
    }
    function validarModal($matriz){
        $text1 ="<div class='container'>
            <div class='row'>
                <div class='col'></div>
                <div class='col-3'>
                    <h3 class='text-warning'><strong>".$matriz[0]." ".parametro($matriz[2])."</strong></h3></div>
                <div class='col-2'>
                    <i class='bi bi-box-arrow-right'></i>
                </div>
                <div class='col-3'><h3 class='text-success'><strong>".$matriz[1]." ".parametro($matriz[2])."</strong></h3></div>
                <div class='col'></div>
            </div>
        </div>";
        return $text1;
    }
    function comandos_pendientes($testComandos){
        $text_comanos="<div> no pending commands </div>";
        if($testComandos){
            $resultadoComando = json_decode($testComandos);
            $resultadoComando = $resultadoComando->data;
            if($resultadoComando){
                $epa =" hay en total estos  elementos :  ".count($resultadoComando);
                $text_comanos ="<p></p>
                <div><h1>Pending Commands, please wait  :</h1></div>
                <table class='table'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Resumen</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Status</th>
                  </tr>
                </thead>
                <tbody>";
                //aqui ocurre el foreach 
                foreach ($resultadoComando as $index => $valor) {
                    $index_id=$index +1;
                    $text_comanos =$text_comanos."<tr>
                    <th scope='row'>".$index_id."</th>
                    <td>".$valor->evento."</td>
                    <td>".formatearFecha($valor->fecha_creacion)."</td>
                    <td>".status($valor->status)."</td>
                  </tr>";
                }
                $text_comanos =$text_comanos."</tbody>
              </table>";

            }else{
                $epa = "No hay resultados";
            }
        } 
        return $text_comanos;
    }

    function fechaGrafica($dateI,$dateF){
        // Crear objetos DateTime a partir de las cadenas de fecha
        $dateInicial = new DateTime($dateI);
        $dateFinal = new DateTime($dateF);
        //$actual = new DateTime("now");
        if($dateFinal<$dateInicial ){
            $dif="mal";
        }else{
            //si paso 2 años decir que deb contactarse con el administrador
            $interval = $dateInicial->diff($dateFinal);
            $colosal = $interval->format('%Y');
            if($colosal>=2){ $dif="rango";
            }else{ $dif="ok";}
        }
        return $dif;

    }
function tempNormal($val){ 
    // Verificar si el valor está dentro del rango permitido
    if($val < -40 || $val > 120) {
        return "NA";
    }

    if($val>=0 && $val<120){
        	
        //(0 °C × 9/5) + 32 = 32 °F
        $val = ($val*9)/5+32 ;
        $valor="+".$val ;
    }elseif($val>-40 && $val<0){
        if($val==-38.5){
            $valor="NA";
        }else{
            $val = ($val*9)/5+32 ;
            $valor=$val ;
        }
    }else{
        $valor="NA";
    }
    return $valor;
}

function porcentaje($val){
    //Si val es menor a 0 y mayor a 100 = NA
    if($val>=0 && $val<=100){
        $valor=$val ;
    }else{
        $valor="NA";
    }
    return $valor;
}

function validateDate($date, $format = 'Y-m-d\TH:i:s'){
    $d = DateTime::createFromFormat($format, $date);
    if($d && $d->format($format) == $date){
        return $date;
    }else{
        return $date.":00";   
    }
    //return $d && $d->format($format) == $date;
}
function gmtFecha($val){
    if($_SESSION['utc']!=300){
        $val1 =  strtotime($val);
        $dif =300-$_SESSION['utc'];
        $minutes = $dif." minutes";
        $puntoA1 = strtotime($minutes,$val1);
        $val = date('Y-m-d\TH:i:s', $puntoA1);
    }
    return $val;
}

function determinarEstado($ultima_fecha ,$id,$est) {
    if($est==[]){
        $est=[0,0,0];
    }
    date_default_timezone_set('UTC');
    $hoy = date("Y-m-d H:i:s");                   
    $fechaActual = new DateTime($hoy);
    $fechaUltima = new DateTime($ultima_fecha);
    #$diferencia = $fechaActual->getTimestamp() - $fechaUltima->getTimestamp();
    $diferencia = $fechaActual->diff($fechaUltima);
    
    // Convertir la diferencia en minutos
    $diferenciaEnMinutos = ($diferencia->days * 24 * 60) + ($diferencia->h * 60) + $diferencia->i;
    
    //tiempo en segundos
    if ($diferenciaEnMinutos <= 30+300) { 
        $est[0]=$est[0]+1;
        #return 'Online';
    } elseif ($diferenciaEnMinutos <= 1440+300) { 
        $est[1]=$est[1]+1;
        #return 'Wait';
    } else {
        $est[2]=$est[2]+1;
        #return 'Offline';
    }
    //array_push($est,$ultima_fecha,$diferenciaEnMinutos,$fechaActual);
    return $est;
}

function porNormal($val){
    if($val>=0 && $val<100){$valor=$val ;}else{$valor="NA";}
    return $valor;
}
function val_eti($val){
    if($val>=0 && $val<280){$valor=$val ;}else{$valor="NA";}
    return $valor;
}
function validateP($val){
    /*
    if($val == 5){
        $valor = "Active";
    }else{
        $valor = "Inactive";
    }*/
   // $valor="Ripener Mode";
    $valor = "Inactive";
    //$valor = "Cooling Mode";


    return $valor;
} 
/*
function ContenedorPlantilla($val,$url=0, $tipo=1){      
    if($tipo==0){
        $result = ContenedorReefer($val,$url);
    }elseif($tipo==1){
        $result = ContenedorMadurador($val,$url);
    }elseif($tipo==2){
        $result = ContenedorTunel($val,$url);
    }
    return $result;
}*/

function fechaPro($val){
    //echo $val;
    //previa validacion de GMT  "Y-m-d\TH:i:s
    $_SESSION['utc']=300;
    if($_SESSION['utc']!=300){
        $val1 =  strtotime($val);
        $dif =300-(int)$_SESSION['utc'];
        $minutes = $dif." minutes";
        $puntoA1 = strtotime($minutes,$val1);
        $val = date('Y-m-d\TH:i:s', $puntoA1);
    }
    $ultima = explode("T",$val) ;
    $fech = explode("-",$ultima[0]);
    //echo $ultima[0];
    //echo " luis ";
    //echo $fech;
    $fech1 = $fech[2]."/".$fech[1]."/".$fech[0] ; 
    //echo $fech1;
    $fechita =$ultima[1]." - ".$fech1;           

    //$fech1 = $fech[2]."/".$fech[1]."/".$fech[0] ; 
    //$fechita =$ultima[1]." del  ".$fech1;
    return $fechita;
}

function ContenedorReefer($val, $url){
}

function ContenedorTunel($val, $url){
}
function avl_1($dato){
    if($dato==0){
        $res = 0 ;
    }else{
        if($dato>0&& $dato<200){
            $res =$dato/2;
        }else{
            $res="NA";
        }
    }
    return $res;
}
function horas_simuladas($dato){
   //return 24 ;
   // return 12 ;
    return 0 ;


}
function ContenedorMadurador_2($data){ 
    $fechaVista = '';
    if (isset($data[0]->fecha_recepcion) && $data[0]->fecha_recepcion != '') {
        $fechaVista = str_replace('T', ' ', $data[0]->fecha_recepcion);
    }
    $text = "<div class='col-12 col-lg-12'>
                        <h3 class='fw-bold text-center'></h3>
                        <div class='d-flex justify-content-center align-items-center gap-2'>
                            <!-- Última hora de actividad -->
                            <div>
                                <h6 id='fechita_'>{$fechaVista}</h6>
                            </div>
                            <div class='btn btn-group border-0'>
                                <button type='button' class='btn btn-primary border-0'>°F</button>
                                <button type='button' class='btn disabled'>°C</button>
                            </div>
                            <!--
                            <div class='text-center dropdown'>
                                <button class='btn btn-secondary' type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false'>
                                <i class='ri-temp-cold-line'></i>
                                </button>
                                <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                    <li><a class='dropdown-item' href='#'>°F</a></li>
                                    <li><a class='dropdown-item' href='#'>°C</a></li>
                                </ul>
                            </div>-->
                        </div>
                    </div>
                    <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center'>
                            <i class='icon_params bi bi-power fs-1 text-success'></i>
                            <h4 class='text_params text-uppercase text-success fw-bold mt-2' id='state_'>POWER ON</h4>
                        </div>
                    </div>
                    
                    <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center'>
                            <i class='ri-water-percent-line fs-1 text-primary'></i>
                            <h4 class='text-uppercase text_params text-primary'>Humedad</h4>
                            <div class='d-flex justify-content-center align-content-center'>
                                <p class='value-icon' id='eti_icon_'><i class='bi bi-arrows me-2 align-items-center mb-1 text-primary value-icon'></i></p>
                                <label for='ethylene' class='fw-bold value_params value_icon' id='ethyleno_'>{$data[0]->humidity}</label>
                            </div>
                        </div>
                    </div>
                    <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center'>
                            <i class='ri-temp-cold-line fs-1 text-secondary'></i>
                            <h4 class='text-uppercase text_params text-secondary'>Temperatura</h4>
                            <div class='d-flex justify-content-center align-content-center'>
                                <p class='value-icon' id='co2_icon_'><i class='bi bi-arrows me-2 align-items-center mb-1 text-primary value-icon'></i></p>
                                <label for='co2' class='fw-bold value_icon value_params' id='co2_'>{$data[0]->temperature}</label>
                            </div>
                        </div>
                    </div>
                     <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center b'>
                            <i class='ri-water-flash-fill fs-1 text-warning'></i>
                            <h4 class='text-uppercase text_params text-warning'>EC</h4>
                            <div class='d-flex justify-content-center align-content-center'>
                                <p class='value-icon' id='proceso_icon_'><i class='bi bi-arrows me-2 align-items-center mb-1 text-primary value-icon'></i></p>
                                <label for='proceso' class='fw-bold value_params value_icon' id='proceso_'>{$data[0]->EC}</label>
                            </div>
                        </div>
                    </div>
                    <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center'>
                            <i class='ri-contrast-drop-2-line fs-1 text-primary'></i>
                            <h4 class='text-uppercase text_params text-primary'>PH</h4>
                            <div class='d-flex justify-content-center align-content-center'>
                                <p class='value-icon' id='return_icon_'><i class='bi bi-arrows me-2 align-items-center mb-1 text-primary value-icon'></i></p>
                                <label for='return' class='fw-bold value_params value_icon' id='return_'>{$data[0]->PH}</label>
                            </div>
                        </div>
                    </div>
                    <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center'>
                            <i class='ri-cloud-windy-line fs-1 text-secondary'></i>
                            <h4 class='text-uppercase text_params text-secondary'>N</h4>
                            <div class='d-flex justify-content-center align-content-center'>
                                <p class='value-icon' id='supply_icon_'><i class='bi bi-arrows me-2 align-items-center mb-1 text-primary value-icon'></i></p>
                                <label for='supply' class='fw-bold value_icon value_params' id='supply_'>{$data[0]->N}</label>
                            </div>
                        </div>
                    </div>
                    <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center'>
                            <i class='ri-plant-fill fs-1 text-success'></i>
                            <h4 class='text-uppercase text_params text-success'>P</h4>
                            <div class='d-flex justify-content-center align-content-center'>
                                <p class='value-icon' id='i_hours_icon_'><i class='bi bi-arrows me-2 align-items-center mb-1 text-primary value-icon'></i></p>
                                <label for='i_hours' class='fw-bold value_params value_icon' id='i_hours_'>{$data[0]->P}</label>
                            </div>
                        </div>
                    </div>
                    <div class='col-6 col-lg-3 border-top'>
                        <div class='text-center'>
                            <i class='ri-flask-line fs-1'></i>
                            <h4 class='text-uppercase text_params'>K</h4>
                            <div class='d-flex justify-content-center align-content-center'>
                                <p class='value-icon' id='avl_icon_'><i class='bi bi-arrows me-2 align-items-center mb-1 text-primary value-icon'></i></p>
                                <label for='avl' class='fw-bold value_params value_icon' id='avl_'>{$data[0]->K}</label>
                            </div>
                        </div>
                    </div>";
        return $text;
    }

function evaluarSuministroYRetorno($val){
    //evaluar como lo comentado
    if($val > -10){
        $res = "<span class='badge bg-danger fs-6'>{$val}</span>";
    }else if($val <= -10 && $val >= -20){
        $res = "<span class='badge bg-warning fs-6'>{$val}</span>";
    }else if($val < -20){
        $res = "<span class='badge bg-success fs-6'>{$val}</span>";
    }else{
        $res = "<span>{$val}</span>";
    }
    return $res;
}

function evaluarNull($val){
    if($val == null){
        $res = "NA";
    }else{
        $res = $val;
    }
    return $res;
}

function fechaIndustria($valor){
    $valor = trim((string)$valor);
    if ($valor == '') {
        return null;
    }
    if (strlen($valor) == 16) {
        $valor .= ':00';
    }
    $valor = str_replace('T', ' ', $valor);
    $formatos = array('Y-m-d H:i:s', 'Y/m/d H:i:s', 'Y-m-d', 'Y/m/d');
    foreach ($formatos as $formato) {
        $dt = DateTime::createFromFormat($formato, $valor);
        if ($dt && $dt->format($formato) === $valor) {
            if ($formato == 'Y-m-d' || $formato == 'Y/m/d') {
                $dt->setTime(0, 0, 0);
            }
            return $dt;
        }
    }
    return null;
}

function validarConsultaIndustria($imei, $desde, $hasta, $limite = 2000){
    if (!preg_match('/^[A-Za-z0-9]{8,20}$/', (string)$imei)) {
        return 'El IMEI debe tener entre 8 y 20 letras o numeros';
    }
    if ($desde == '' || $hasta == '') {
        return 'Seleccione la fecha de inicio y la fecha final';
    }
    $ini = fechaIndustria($desde);
    $fin = fechaIndustria($hasta);
    if ($ini == null || $fin == null) {
        return 'Fecha ilegible';
    }
    if ($ini > $fin) {
        return 'La fecha de inicio no puede ser mayor a la fecha final';
    }
    $diff = $ini->diff($fin);
    if ($diff->days > 366) {
        return 'El rango maximo es 366 dias';
    }
    $limite = intval($limite);
    if ($limite < 1 || $limite > 2000) {
        return 'El limite debe estar entre 1 y 2000';
    }
    return null;
}

function serieGraficaIndustria($lecturas){
    $fecha = array();
    $humidity = array();
    $temperature = array();
    $EC = array();
    $PH = array();
    $N = array();
    $P = array();
    $K = array();
    $power = array();
    if (!is_array($lecturas)) {
        $lecturas = array();
    }
    $lecturas = array_reverse($lecturas);
    foreach ($lecturas as $row) {
        $marca = '';
        if (isset($row->fecha_recepcion) && $row->fecha_recepcion != '') {
            $marca = str_replace(' ', 'T', $row->fecha_recepcion);
        }
        $fecha[] = $marca;
        $humidity[] = isset($row->humidity) ? $row->humidity : null;
        $temperature[] = isset($row->temperature) ? $row->temperature : null;
        $EC[] = isset($row->EC) ? $row->EC : null;
        $PH[] = isset($row->PH) ? $row->PH : null;
        $N[] = isset($row->N) ? $row->N : null;
        $P[] = isset($row->P) ? $row->P : null;
        $K[] = isset($row->K) ? $row->K : null;
        $power[] = isset($row->power) ? $row->power : null;
    }
    return array(
        'fecha' => $fecha,
        'humidity' => $humidity,
        'temperature' => $temperature,
        'EC' => $EC,
        'PH' => $PH,
        'N' => $N,
        'P' => $P,
        'K' => $K,
        'power' => $power
    );
}

function filasTablaIndustria($lecturas){
    $datos = array();
    if (!is_array($lecturas)) {
        $lecturas = array();
    }
    foreach ($lecturas as $row) {
        $marca = '';
        if (isset($row->fecha_recepcion) && $row->fecha_recepcion != '') {
            $marca = str_replace(' ', 'T', $row->fecha_recepcion);
        }
        $datos[] = array(
            'fecha_recepcion' => $marca,
            'humidity' => isset($row->humidity) ? $row->humidity : '',
            'temperature' => isset($row->temperature) ? $row->temperature : '',
            'EC' => isset($row->EC) ? $row->EC : '',
            'PH' => isset($row->PH) ? $row->PH : '',
            'N' => isset($row->N) ? $row->N : '',
            'P' => isset($row->P) ? $row->P : '',
            'K' => isset($row->K) ? $row->K : '',
            'power' => isset($row->power) ? $row->power : ''
        );
    }
    return array('datos' => $datos);
}

function respuestaGraficaIndustria($raw, $limite){
    $resultado = json_decode($raw);
    if ($resultado == null) {
        return array('msg' => 'No se encontraron datos', 'icono' => 'warning');
    }
    if (isset($resultado->code) && intval($resultado->code) != 200) {
        $texto = isset($resultado->error) ? $resultado->error : 'Parametros invalidos';
        return array('msg' => $texto, 'icono' => 'warning');
    }
    $lecturas = (isset($resultado->data) && is_array($resultado->data)) ? $resultado->data : array();
    if (count($lecturas) == 0) {
        return array('msg' => 'No se encontraron datos', 'icono' => 'warning');
    }
    $total = isset($resultado->total) ? intval($resultado->total) : count($lecturas);
    $msg = 'Datos obtenidos correctamente';
    if ($total >= intval($limite)) {
        $msg = 'Se muestran las '.$limite.' lecturas mas recientes del rango';
    }
    return array(
        'msg' => $msg,
        'icono' => 'success',
        'data' => serieGraficaIndustria($lecturas),
        'total' => $total
    );
}

function respuestaTablaIndustria($raw, $limite){
    $resultado = json_decode($raw);
    if ($resultado == null) {
        return array('msg' => 'No se encontraron datos', 'icon' => 'warning');
    }
    if (isset($resultado->code) && intval($resultado->code) != 200) {
        $texto = isset($resultado->error) ? $resultado->error : 'Parametros invalidos';
        return array('msg' => $texto, 'icon' => 'warning');
    }
    $lecturas = (isset($resultado->data) && is_array($resultado->data)) ? $resultado->data : array();
    if (count($lecturas) == 0) {
        return array('msg' => 'No se encontraron datos', 'icon' => 'warning');
    }
    $total = isset($resultado->total) ? intval($resultado->total) : count($lecturas);
    $msg = 'Datos encontrados';
    if ($total >= intval($limite)) {
        $msg = 'Se muestran las '.$limite.' lecturas mas recientes del rango';
    }
    return array(
        'msg' => $msg,
        'icon' => 'success',
        'data' => filasTablaIndustria($lecturas),
        'total' => $total
    );
}

