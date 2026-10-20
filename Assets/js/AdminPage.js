let contenidoPrincipal = document.getElementById('contenidoPrincipal');
let modalComando = 1;

let tituloGrafica = document.getElementById('tituloGrafica');
document.addEventListener("DOMContentLoaded", async function(){
    
    try{
        const response = await fetch(base_url + "AdminPage/ListaDispositivoEmpresa",{method: 'GET'});
        const data = await response.json();
        contenidoPrincipal.innerHTML  =data.text;
        console.log(data);
    }catch(err){alert(err);}
    
    //cada 10 segundos ejecutar 
    //setInterval( async function(){ cambio =  await dataTableNestle();}, 60000);
    //setInterval( async function(){ tst =  await mostrarMenosContenido();}, 1000);
    //setInterval( async function(){ tst2 =  await mostrarMasContenido();}, 1000);

})

function registrarRespuesta(e) {
    e.preventDefault();
    const url = base_url + "AdminPage/registrar";
    const frm = document.getElementById("frmRegistrar");
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                frm.reset();
                tblFormulario.ajax.reload();
                alertas(res.msg, res.icono);
        }
    }
}