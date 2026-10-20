<?php include "Views/templates/navbar.php"; ?>
<div class="px-2 py-2">
    <div class="col-12">
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <img src="<?php echo base_url.'Assets'; ?>/img/sensor_NPK.png" alt="Contenedor" class="img_contenedor">
                        </div>
                        <div class="d-flex flex-wrap justify-content-center mt-5" id="contenidoPrincipal">
                            <!-- contenido principal -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- MODAL -->
<div class="modal fade" id="modalDispositivo" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-secondary text-white">
                <h5 class="modal-title">Detalles del sensor</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalDetalles">
                <div class="row" style="padding-left: 0px;padding-right: 0px;">
                    <div class="col-12 col-lg-12" id="modalContenido">
                        <div class="container" style="padding-left: 0px;padding-right: 0px;">
                            <div class="row">
                            <h1 id="sensor" class="fw-bold text-center fs-3"></h1>
                            <!--<div id="legend-container" class="container" style="padding-left: 2px;padding-right: 2px;"></div>-->
                            <div class="col-1"></div>
                            <div class="col-12">
                                <canvas align ="center" id="graficaSensor" style="height:300px; width:100%;"></canvas>
                            </div>
                            <div class="col-1"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <a id="bajarGraph" class="btn btn-outline-success btn-lg btn-block">DOWNLOAD GRAPH</a>
            </div>
        </div>
    </div>
</div>
<!-- MODAL ALARMA-->
<div class='modal fade' id='modalAlarma' tabindex='-1' aria-labelledby='my-modal-title' aria-hidden='true'>
    <div class='modal-dialog modal-xl'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='title'>ALARMAS</h5>
                <button class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                <div class="table-responsive">
                    <table class="table table-bordered" id="tblAlarma" width="100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Código</th>
                                <th>Alarma</th>
                                <th>Equipo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- MODAL MENSAJE-->
<div class='modal fade' id='modalMensaje' tabindex='-1' aria-labelledby='my-modal-title' aria-hidden='true'>
    <div class='modal-dialog modal-xl'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='title'>MENSAJES</h5>
                <button class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                <div class="table-responsive">
                    <table class="table table-bordered" id="tblMensaje" width="100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Código</th>
                                <th>Mensaje</th>
                                <th>Equipo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- MODAL HORAS -->
<div class='modal fade' id='modalHoras' tabindex='-1' aria-labelledby='my-modal-title' aria-hidden='true'>
    <div class='modal-dialog modal-xl'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='title'>HORAS</h5>
                <button class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                <div class="table-responsive">
                    <table class="table table-bordered" id="tblHoras" width="100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Desde</th>
                                <th>Hora actual</th>
                                <th>Duración</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- MODAL EDITAR LATITUD & LONGITUD -->
<div class='modal fade' id='modalEditarLatLong' tabindex='-1' aria-labelledby='my-modal-title' aria-hidden='true'>
    <div class='modal-dialog modal-sm'>
        <div class='modal-content'>
            <div class='modal-header'>
                <h5 class='modal-title' id='title'>EDITAR LATITUD & LONGITUD</h5>
                <button class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div class='modal-body'>
                <div class="row">
                    <div class="col-12 col-lg-12" id="modalEditarLatLongContenido">
                        <!-- CONTENIDO-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<a href="https://wa.me/51908947564" class="whatsapp" target="_blank">
    <i class="ri-whatsapp-fill whatsapp-icon"></i>
</a>
<?php include "Views/templates/footer.php"; ?>