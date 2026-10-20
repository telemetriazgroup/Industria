<?php include "Views/templates/navbar.php"; ?>
<div class="px-2 py-2">
    <div class="col-12">
        <div class="row">
            <div class="col-12 col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Registro de Sensores</h5>
                        <form id="frmRegistro" onsubmit="registroSensores(event)">
                            <div class="col-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <div class="form-group col-12 col-md-4 col-lg-4">
                                        <label for="pallet">Pallet:</label>
                                        <select class="form-control" id="pallet" name="pallet"></select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 col-lg-4">
                                        <label for="empresa">Empresa:</label>
                                        <select class="form-control" id="empresa" name="empresa"></select>
                                    </div>
                                    <div class="form-group col-12 col-md-4 col-lg-4">
                                        <button class="btn btn-primary mt-4 w-100" type="submit">Registrar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include "Views/templates/footer.php"; ?>