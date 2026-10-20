const comandoListaDispositivos = document.getElementById('frmComandoListaDispositivos');
const grafica1 = document.getElementById("graficaFinal");

async function seleccionar_tipoD(){
    html = '';
    const http = new XMLHttpRequest();
    const url = base_url + 'Graph/listaSensoresUsda';
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const datos = JSON.parse(this.responseText);
            console.log('select');
            console.log(datos);
            html += `<option value="0">Seleccione un dispositivo</option>`;
            datos.forEach(element => {
                html += `<option value="${element.relacion}">${element.usda} - ${element.pallet = element.pallet == null ? '' : element.pallet}</option>`;
            });
            $('#listaDivece').html(html);

           
        }
    }

    /*
    $('#listaDivece').select2({
        ajax: {
            url: base_url + 'Graph/listaSensoresUsda',
            dataType: 'json',
            delay: 250,
            processResults: function (data) {
                return {
                    results: data.map(item => ({
                        id: item.relacion,
                        text: item.usda
                    }))
                };
            },
            cache: true
        },
        placeholder: 'Seleccione un sensor',
        allowClear: true,
        multiple: true
    });

    $('#listaDivece').on('change', function() {
        let selectedValues = $(this).val(); 
        let selectedObject = {
            values: selectedValues
        };
        console.log(selectedObject); 
        //seleccionar_genset(selectedObject);
    });*/
}
/*
async function  seleccionar_genset(value){
    console.log('------------')
    console.log(value)
    console.log('------------')
    /*
    html ='';
    htmlComando ='';
    //listaComandoAsignados.innerHTML = '';

    const config = {
        method: 'get',
        dataType: 'json',
        url : base_url + 'Graph/datosGraficoHoy/' + value
    }
     const buena =  await axios(config);
     const info = buena.data;
     console.log(info);
     graficaGenset(info);
     htmlReporte = `<button class="btn btn-success w-50" onclick="generarReporte(${value})">Reporte</button>`;
     $('#generar_reporte').html(htmlReporte);
     btnDownload = `<a id="bajarGraph" class="btn btn-outline-success btn-lg btn-block w-100" onclick="downloadGraph(${value})">DOWNLOAD GRAPH</a>`;
     $('#btn_download_graph').html(btnDownload);
    
     
}
*/
function validarAlarmas(value){
    value !='';
    if(value == ''){
        let contenido = 
        
        {
            table:{
                widths: ['50%', '50%'],
                body: [
                    [{ text: 'Sin alarmas', style: 'label' }]
                ]
            }
        }
        return contenido;
    }else{
        let tablaAlarmas = [
            [
                { text: 'Fecha' , bold: true, fontSize:7 },
                { text: 'Código', bold: true, fontSize:7 },
                { text: 'Alarma', bold: true, fontSize:7 }  
            ]
        ]
        //array de prueba para la tabla
        const alarmas = [
            { fecha: '2021-09-01 12:00:00', codigo: 'A1', alarma: 'Alarma 1' },
            { fecha: '2021-09-01 12:00:00', codigo: 'A2', alarma: 'Alarma 2' },
            { fecha: '2021-09-01 12:00:00', codigo: 'A3', alarma: 'Alarma 3' }
        ];
        
        value = alarmas;

        value.forEach(element => {
            tablaAlarmas.push(
                [element.fecha, element.codigo, element.alarma]
            );
        });

        let contenido = 
        {
            table:{
                widths: ['*', '*', '*'],
                body: tablaAlarmas
            },
            fontSize:7
        }

        return contenido;
    }
}

function validarMensajes(value){
    value ='';
    if(value == ''){
        let contenido = 
        
        {
            table:{
                widths: ['50%', '50%'],
                body: [
                    [{ text: 'Sin mensajes', style: 'label' }]
                ]
            }
        }
        return contenido;
    }else{
        let tablaMensajes = [
            [
                { text: 'Fecha' , bold: true, fontSize:7 },
                { text: 'Código', bold: true, fontSize:7 },
                { text: 'Mensaje', bold: true, fontSize:7 }  
            ]
        ]
        //array de prueba para la tabla
        const mensajes = [
            { fecha: '2021-09-01 12:00:00', codigo: 'M1', mensaje: 'Mensaje 1' },
            { fecha: '2021-09-01 12:00:00', codigo: 'M2', mensaje: 'Mensaje 2' },
            { fecha: '2021-09-01 12:00:00', codigo: 'M3', mensaje: 'Mensaje 3' }
        ];
        
        value = mensajes;

        value.forEach(element => {
            tablaMensajes.push(
                [element.fecha, element.codigo, element.mensaje]
            );
        });

        let contenido = 
        {
            table:{
                widths: ['*', '*', '*'],
                body: tablaMensajes
            },
            fontSize:7
        }

        return contenido;
    }
}

async function generarReporte(value){
    const cabecera = await convertirImgBase64(base_url + 'Assets/img/cabecera.png');
    const pie_de_pagina = await convertirImgBase64(base_url + 'Assets/img/pie_de_pagina.png');
    const grafico = await obtenerGraficoBase64();
    const http = new XMLHttpRequest();
    const url = base_url + 'Graph/datosTablaHoy/' + value;
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const datos = JSON.parse(this.responseText);
            console.log(datos);
            //construccion de tabla
            
            let tablaDeDatos = [
                [
                { text: 'Fecha', bold: true, fontSize:7 }, 
                { text: 'Voltaje de batería', bold: true, fontSize:7 }, 
                { text: 'Temp. motor', bold: true, fontSize:7 }, 
                { text:'Frecuencia de Arranque', bold: true, fontSize:7 },
                { text: 'Nivel de combustible', bold: true, fontSize:7 },
                { text: 'Voltaje entregado', bold: true, fontSize:7 },
                { text: 'Corriente del rotor', bold: true, fontSize:7 },
                { text: 'Corriente de campo', bold: true, fontSize:7 },
                { text: 'Velocidad', bold: true, fontSize:7 },
                //{ text: 'Eco Power', bold: true, fontSize:7 },
                { text: 'RPM', bold: true, fontSize:7 },
                { text: 'Horómetro', bold: true, fontSize:7 }]
            ];
            datos.forEach(element => {
                //element.ecopower = 'ON';
                tablaDeDatos.push(
                [   element.fecha_r, 
                    element.Dv_Voltage, 
                    element.Dv_Water, 
                    element.Dv_Frequency,
                    element.Dv_Fuel,
                    element.Rt_Voltaje2,
                    element.Rt_Rotor,
                    element.Rt_Field,
                    element.velocidad,
                    //element.ecopower,
                    element.Dv_rpm,
                    element.Tr_Timer2

                ]);
            });
            let docDefinition = {
                pageMargins: [40, 60, 40, 60],
                header: {
                    image: cabecera,
                    width: 585,
                    height: 55,
                    alignment: 'center',
                    margin: [0, 5, 0, 0]
                },
                footer: {
                    image: pie_de_pagina,
                    width: 585,
                    height: 55,
                    alignment: 'center',
                    margin: [0, -10, 0, 0]
                },
                content: [
                    {
                        columns: [
                            {
                                width: '100%',
                                table: {
                                    widths: ['*'],
                                    body: [
                                        [
                                            {
                                                layout: 'noBorders',
                                                table: {
                                                    widths: ['33%', '33%', '33%'],
                                                    body: [
                                                        [
                                                            {
                                                                width: '33%',
                                                                stack: [
                                                                    { text: 'DATOS DEL CLIENTE', style: 'subheader', margin: [0, 0, 0, 5] },
                                                                    {
                                                                        table: {
                                                                            widths: ['50%', '50%'],
                                                                            body: [
                                                                                [{ text: 'Nombre:', style: 'label' }, { text: 'Nombre', bold:true, style: 'input' }],
                                                                                [{ text: 'Apellido:', style: 'label' }, { text: 'Apellido', bold:true, style: 'input' }],
                                                                                [{ text: 'Correo:', style: 'label' }, { text: 'Correo', bold:true, style: 'input' }]
                                                                            ]
                                                                        },
                                                                        layout: 'noBorders'
                                                                    }
                                                                ],
                                                                margin: [0, 0, 0, 0]
                                                            },
                                                            {
                                                                width: '33%',
                                                                stack: [
                                                                    { text: ' ', style: 'subheader', margin: [0, 0, 0, 5] },
                                                                    {
                                                                        table: {
                                                                            widths: ['50%', '50%'],
                                                                            body: [
                                                                                [{ text: 'RUC:', style: 'label' }, { text: 'RUC', bold:true, style: 'input' }],
                                                                                [{ text: 'Empresa:', style: 'label' }, { text: 'Empresa', bold:true, style: 'input' }],
                                                                                [{ text: 'Inicio de Suscripción:', style: 'label' }, { text: 'Inicio Suscrip', bold:true, style: 'input' }]
                                                                            ]
                                                                        },
                                                                        layout: 'noBorders'
                                                                    }
                                                                ],
                                                                margin: [0, 0, 0, 0]
                                                            },
                                                            {
                                                                width: '33%',
                                                                stack: [
                                                                    { text: ' ', style: 'subheader', margin: [0, 0, 0, 5] },
                                                                    {
                                                                        table: {
                                                                            widths: ['50%', '50%'],
                                                                            body: [
                                                                                [{ text: 'Tiempo de Suscripción:', style: 'label' }, { text: 'Tiempo de Suscrip', bold:true, style: 'input' }],
                                                                                [{ text: 'Estado:', style: 'label' }, { text: 'Estado', bold:true, style: 'input' }]
                                                                            ]
                                                                        },
                                                                        layout: 'noBorders'
                                                                    }
                                                                ],
                                                                margin: [0, 0, 0, 0]
                                                            }
                                                        ]
                                                    ]
                                                },
                                                border: [true, true, true, true]
                                            }
                                        ]
                                    ]
                                },
                                margin: [0, 5, 0, 0]
                            }
                        ]
                    },
                    {
                        columns:[
                            {
                                image: grafico,
                                height: 280,
                                width: 530,
                                margin: [0, 0, 0, 0],
                                alignment: 'center'
                            }
                        ]
                    },
                    {
                    
                        columns:[
                            {
                                width: '20%',
                                stack: [
                                    {
                                        text:[
                                            { text: 'Horas Encendidas: ',style: 'label', margin: [0, 5, 0, 10] }
                                        ],
                                        margin: [0, 10, 0, 0] 
                                    }
                                ]
                            },
                            {
                                width: '13%',
                                table: {
                                    widths: ['80%'],
                                    body: [
                                        [
                                            { text: '0', bold: true, style: 'input', border: [true, true, true, true] }
                                        ]
                                    ]
                                },
                              
                                margin: [0, 5, 0, 0]
                            },
                            {
                                width: '20%',
                                stack: [
                                    {
                                        text:[
                                            { text: 'Horas Apagadas:',style: 'label', margin: [0, 5, 0, 10] }
                                        ],
                                        margin: [0, 10, 0, 0]
                                    }
                                ]
                            },
                            {
                                width: '13%',
                                table: {
                                    widths: ['80%'],
                                    body: [
                                        [
                                            { text: '12', bold: true, style: 'input', border: [true, true, true, true] }
                                        ]
                                    ]
                                },
                              
                                margin: [0, 5, 0, 0]
                            },
                            {
                                width: '20%',
                                stack: [
                                    {
                                        text:[
                                            { text: 'Horómetro:',style: 'label', margin: [0, 5, 0, 10] }
                                        ],
                                        margin: [0, 10, 0, 10]
                                    }
                                ]
                            },
                            {
                                width: '13%',
                                table: {
                                    widths: ['80%'],
                                    body: [
                                        [
                                            { text: '27', bold: true, style: 'input', border: [true, true, true, true] }
                                        ]
                                    ]
                                },
                              
                                margin: [0, 5, 0, 0]
                            },
                        ]
                    },
                    {
                    
                        columns:[
                            {
                                width: '20%',
                                stack: [
                                    {
                                        text:[
                                            { text: 'Alarmas: ',style: 'label', margin: [0, 5, 0, 10] }
                                        ],
                                        margin: [0, 10, 0, 0] 
                                    }
                                ]
                            },
                            {
                                width: '13%',
                                table: {
                                    widths: ['80%'],
                                    body: [
                                        [
                                            { text: '0', bold: true, style: 'input', border: [true, true, true, true] }
                                        ]
                                    ]
                                },
                              
                                margin: [0, 5, 0, 0]
                            },
                            {
                                width: '20%',
                                stack: [
                                    {
                                        text:[
                                            { text: 'Mensajes:',style: 'label', margin: [0, 5, 0, 10] }
                                        ],
                                        margin: [0, 10, 0, 0]
                                    }
                                ]
                            },
                            {
                                width: '13%',
                                table: {
                                    widths: ['80%'],
                                    body: [
                                        [
                                            { text: '0', bold: true, style: 'input', border: [true, true, true, true] }
                                        ]
                                    ]
                                },
                              
                                margin: [0, 5, 0, 0]
                            },
                            {
                                width: '20%',
                                stack: [
                                    {
                                        text:[
                                            { text: 'Próximo mantenimiento:',style: 'label', margin: [0, 5, 0, 10] }
                                        ],
                                        margin: [0, 10, 0, 10]
                                    }
                                ]
                            },
                            {
                                width: '13%',
                                table: {
                                    widths: ['80%'],
                                    body: [
                                        [
                                            { text: 'N.A.', bold: true, style: 'input', border: [true, true, true, true] }
                                        ]
                                    ]
                                },
                              
                                margin: [0, 5, 0, 0]
                            },
                        ]
                    },
                    {
                        columns:[
                            {
                                table: {
                                    headerRows: 1,
                                    widths: ['*', '*', '*','*', '*', '*', '*','*', '*', '*', '*'],
                                    body: tablaDeDatos
                                },
                                layout: {
                                    fillColor: function (rowIndex, node, columnIndex) {
                                        return (rowIndex === 0) ? '#CCCCCC' : null;
                                    }
                                },
                                fontSize: 7,
                                margin: [0, 5, 0, 5]
                            },  
                        ],
                        pageBreak: 'after'
                    },
                    {
                        columns:[
                            {
                                layout: 'noBorders',
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [
                                            {
                                                width: '100%',
                                                stack: [
                                                    { text: 'Alarmas', style: 'subheader', margin: [0, 0, 0, 5] },
                                                    validarAlarmas(value),
                                                ],
                                                margin: [0, 0, 0, 0]
                                            }
                                        ]
                                    ]
                                },
                                border: [true, true, true, true]
                            }
                        ]
                    },
                    {
                        columns:[
                            {
                                layout: 'noBorders',
                                table: {
                                    widths: ['100%'],
                                    body: [
                                        [
                                            {
                                                width: '100%',
                                                stack: [
                                                    { text: 'Mensajes', style: 'subheader', margin: [0, 0, 0, 5] },
                                                    validarMensajes(value),
                                                ],
                                                margin: [0, 0, 0, 0]
                                            }
                                        ]
                                    ]
                                },
                                border: [true, true, true, true]
                            }
                        ]
                    }
                ],
                styles: {
                    label:{
                        fontSize: 8,
                        bold: false
                    },
                    subheader:{
                        fontSize: 10,
                        bold: true
                    },
                    input:{
                        fontSize: 8,
                        bold: true
                    }
                }
            }
            pdfMake.createPdf(docDefinition).open();
            $('#generar_reporte').html('');
        }
    }
    
}

function convertirImgBase64(rutaImagen) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result);
            }
            reader.onerror = function(error) {
                reject(error);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = function() {
            reject(new Error('Error al cargar la imagen.'));
        };
        xhr.open('GET', rutaImagen);
        xhr.responseType = 'blob';
        xhr.send();
    });
}


async function graficaGenset(info){
    let html = '';
    if (typeof w !== 'undefined') { w.destroy();}
    //multiplo de 10 
    function datosSimplificados(dato, multiplo){
        let datos = [];
        for(let i = 0; i < dato.length; i++){
            if(i % multiplo == 0){
                datos.push(dato[i]);
            }
        }
        return datos;
    }

    const dataHumidity = {
        label : 'Humedad',
        data : datosSimplificados(info.humidity, 10),
        backgroundColor: '#23c0a1', // Color de fondo
        borderColor: '#23c0a1', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }

    const dataTemperature = {
        label : 'Temperatura',
        data : datosSimplificados(info.temperature, 10),
        backgroundColor: '#eac82b', // Color de fondo
        borderColor: '#eac82b', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }
    
    const dataEC = {
        label : 'EC',
        data : datosSimplificados(info.EC, 10),
        backgroundColor: '#95a5a6', // Color de fondo
        borderColor: '#95a5a6', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }

    const dataPH = {
        label : 'PH',
        data : datosSimplificados(info.PH, 10),
        backgroundColor: '#551dd6', // Color de fondo
        borderColor: '#551dd6', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }

    const dataN = {
        label : 'N',
        data : datosSimplificados(info.N, 10),
        backgroundColor: '#d355ea', // Color de fondo
        borderColor:  '#d355ea', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }

    const dataP = {
        label : 'P',
        data : datosSimplificados(info.P, 10),
        backgroundColor: '#cb2762', // Color de fondo
        borderColor:  '#cb2762', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }

    const dataK = {
        label : 'K',
        data : datosSimplificados(info.K, 10),
        backgroundColor: '#7c2121', // Color de fondo
        borderColor: '#7c2121', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }

    const dataPower = {
        label : 'Power',
        data : datosSimplificados(info.power, 10),
        backgroundColor: '#ee2e2e', // Color de fondo
        borderColor: '#ee2e2e', // Color del borde
        borderWidth: 3,
        yAxisID : 'y',
        pointRadius: 0,
        cubicInterpolationMode: 'monotone',
        tension: -0.2,
        spanGaps: true,
        datalabels: {
            align: 'top', 
            clamp: true, 
            clip: false,  
            display: 'auto'
        }
    }

    w = new Chart(grafica1, {
        type: 'line',// Tipo de gráfica            
        data: {
            labels: datosSimplificados(info.fecha, 10),
            datasets: [
                dataHumidity,
                dataTemperature, 
                dataEC, 
                dataPH,
                dataN,
                dataP,
                dataK,
                dataPower]
        },
        options: {
            animation: {
                onComplete: function () {
                },
            },
            responsive : true,
            maintainAspectRatio:false,
            interaction :{
                mode : 'index',
                intersect :false,
            },
            stacked :false,                  
            scales: {
                x: {
                    type: 'time',
                    alignToPixels:true,
                    time: {
                       minUnit: 'minute'
                    },
                    title: {
                        display: true,
                        text: 'ZTRACK - Live Telematic',
                        color: '#212529',
                        font: { 
                            size: 20,
                            style: 'normal',
                            lineHeight: 1.1
                        },
                        padding: {top: -5, left: 0, right: 0, bottom: 0}
                      },
                    clip :false,
                    ticks:{
                        major:{
                            enabled:true,
                            width:4
                        },
                        font :(context)=>{
                            const boldedTicks = context.tick && context.tick.major ? 'bold' :'';
                            return {weight:boldedTicks}
                        }
                    }
                },
                
                y: {
                    position: 'left',
                    display: true,
                    title: {
                        display: true,
                        text: '',
                        color: '#1a2c4e',
                        font: {
                        //family: 'Times',
                        size: 20,
                        style: 'normal',
                        lineHeight: 1.2
                        },
                        padding: {top: 30, left: 0, right: 0, bottom: 0}
                    },
                    suggestedMin: 0,
                    suggestedMax: 60
                },
                y: {    
                    position: 'left',
                    display: true,
                    suggestedMin: 0,
                    suggestedMax: 2
                }
            },
            plugins: {
            /*
            annotation: {
                annotations:[
                    {
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x',
                        value: info.fecha[0],
                        borderColor: 'black',
                        borderWidth: 2
                    },
                    {
                        type: 'line',
                        mode: 'vertical',
                        scaleID: 'x',
                        value: info.fecha[info.fecha.length - 1],
                        borderColor: 'black',
                        borderWidth: 2
                    }

                ]

            },*/
            title: {
                display: true,
                //text: 'Genset Monitoring Data : '+info.genset.nombre_generador ,
                text: 'USDA MONITORING DATA : ',

                color: '#1a2c4e',
                font: {
                    //family: 'Times',
                    size: 20,
                    style: 'normal',
                    lineHeight: 1.2
                },
                padding: {top: 30, left: 0, right: 0, bottom: 0}
                },
            customCanvasBackgroundColor : {
                color :'#fff',
            },
            zoom: {
                limits: {
                    x: {min: 'original', max: 'original',minRange:2}
                 },
                pan :{
                    enabled :true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                        speed:0.05
                    },
                    pinch: {
                        enabled: true
                    },
                    drag:{
                        enabled:false
                    },
                    mode: 'x'
                }
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333',
                    usePointStyle: true
                }
            }
            }
        },
        plugins : [ChartDataLabels],
    });
}

$(document).ready(function(){
    //obtenemos la fecha actual
    let f_inicio = new Date();
    let f_fin = new Date();

    //calculo de la fecha de inicio - 6 horas de la fecha actual
    f_inicio.setHours(f_inicio.getHours() - 12);
    f_inicio.setMinutes(f_inicio.getMinutes() - f_inicio.getTimezoneOffset());
    $('#f_inicio').val(f_inicio.toISOString().slice(0, 16));
    //calculo de la fecha de fin
    f_fin.setMinutes(f_fin.getMinutes() - f_fin.getTimezoneOffset());
    $('#f_fin').val(f_fin.toISOString().slice(0, 16));
});

document.addEventListener("DOMContentLoaded", async function(){
    try {
        //grafico();
         //seleccionar_tipoD();
    } catch (err) {
        alert(err);
    }
});

async function grafico(){
        const response = await fetch(base_url + "Graph/DatosDispositivo", { method: 'GET' });
        const data = await response.json();
        console.log(data);
        const labels = data.map(item => item.created_at);
        const b_voltage = data.map(item => item.b_voltage);
        const w_tmp = data.map(item => item.w_tmp);
        const r_freq = data.map(item => item.r_freq);
        const f_lvl = data.map(item => item.f_lvl);
        const v_msr = data.map(item => item.v_msr);
        const r_current = data.map(item => item.r_current);
        const f_current = data.map(item => item.f_current);
        const speed = data.map(item => item.speed);
        const eco_pwr = data.map(item => item.eco_pwr);
        const rpm = data.map(item => item.rpm);
        const horometro = data.map(item => item.horometro);
        //const modelo = data.map(item => item.modelo);
        const latitud = data.map(item => item.latitud);
        const longitud = data.map(item => item.longitud);
        const alarma = data.map(item => item.alarma);
        const evento = data.map(item => item.evento);
        //const rfr_con = data.map(item => item.rfr_con);
        const set_point = data.map(item => item.set_point);
        const tmp_supply = data.map(item => item.tmp_supply);
        const return_air = data.map(item => item.return_air);

        // Crear el gráfico
        const ctx = document.getElementById("graficaFinal").getContext("2d");
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'B Voltage',
                        data: b_voltage,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'W Tmp',
                        data: w_tmp,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'R Freq',
                        data: r_freq,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'F Lvl',
                        data: f_lvl,
                        borderColor: 'rgba(255, 206, 86, 1)',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'V Msr',
                        data: v_msr,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'R Current',
                        data: r_current,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'F Current',
                        data: f_current,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Speed',
                        data: speed,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Eco Pwr',
                        data: eco_pwr,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'RPM',
                        data: rpm,
                        borderColor: 'rgba(255, 206, 86, 1)',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Horometro',
                        data: horometro,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Latitud',
                        data: latitud,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Longitud',
                        data: longitud,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Alarma',
                        data: alarma,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Evento',
                        data: evento,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Set Point',
                        data: set_point,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Tmp Supply',
                        data: tmp_supply,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: 'Return Air',
                        data: return_air,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute'
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                //plugin para mostrar el valor en el grafico
                plugins:{
                    tooltip:{
                        mode: 'index',
                        intersect: false
                    }
                },
                animation:{
                    onComplete: function(){
                        console.log(myChart.toBase64Image());
                    }
                }
            }
        });
        myChart.update();
}
async function graficoPorFecha(data){
    const labels = data.map(item => item.created_at);
    const b_voltage = data.map(item => item.b_voltage);
    const w_tmp = data.map(item => item.w_tmp);
    const r_freq = data.map(item => item.r_freq);
    const f_lvl = data.map(item => item.f_lvl);
    const v_msr = data.map(item => item.v_msr);
    const r_current = data.map(item => item.r_current);
    const f_current = data.map(item => item.f_current);
    const speed = data.map(item => item.speed);
    const eco_pwr = data.map(item => item.eco_pwr);
    const rpm = data.map(item => item.rpm);
    const horometro = data.map(item => item.horometro);
    //const modelo = data.map(item => item.modelo);
    const latitud = data.map(item => item.latitud);
    const longitud = data.map(item => item.longitud);
    const alarma = data.map(item => item.alarma);
    const evento = data.map(item => item.evento);
    //const rfr_con = data.map(item => item.rfr_con);
    const set_point = data.map(item => item.set_point);
    const tmp_supply = data.map(item => item.tmp_supply);
    const return_air = data.map(item => item.return_air);

    // Crear el gráfico
    const ctx = document.getElementById("graficaFinal").getContext("2d");
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'B Voltage',
                    data: b_voltage,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'W Tmp',
                    data: w_tmp,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'R Freq',
                    data: r_freq,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'F Lvl',
                    data: f_lvl,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'V Msr',
                    data: v_msr,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'R Current',
                    data: r_current,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'F Current',
                    data: f_current,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Speed',
                    data: speed,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Eco Pwr',
                    data: eco_pwr,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'RPM',
                    data: rpm,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Horometro',
                    data: horometro,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Latitud',
                    data: latitud,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Longitud',
                    data: longitud,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Alarma',
                    data: alarma,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Evento',
                    data: evento,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Set Point',
                    data: set_point,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Tmp Supply',
                    data: tmp_supply,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Return Air',
                    data: return_air,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            //plugin para mostrar el valor en el grafico
            plugins:{
                tooltip:{
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
    myChart.update();
}
function alertas(msg, icono) {
    Swal.fire({
        position: 'center',
        icon: icono,
        title: msg,
        showConfirmButton: false,
        timer: 3000
    })
}

$(document).ready(function(){
    let f_inicio = new Date();
    let f_fin = new Date();
    f_inicio.setHours(f_inicio.getHours() - 12);
    f_inicio.setMinutes(f_inicio.getMinutes() - f_inicio.getTimezoneOffset());
    $('#f_inicio').val(f_inicio.toISOString().slice(0, 16));
    f_fin.setMinutes(f_fin.getMinutes() - f_fin.getTimezoneOffset());
    $('#f_fin').val(f_fin.toISOString().slice(0, 16));
});

function buscarGraph(e){
    e.preventDefault();
    const http = new XMLHttpRequest();
    const url = base_url + 'Graph/DatosDispositivoPorFecha';
    const frm = document.getElementById('frmGraph');
    const data = new FormData(frm);
    const dispositivo = document.getElementById('listaDivece').value;
    const f_inicio = document.getElementById('f_inicio').value;
    const f_fin = document.getElementById('f_fin').value;
    http.open("POST", url);
    http.send(data);
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const datos = JSON.parse(this.responseText);
            console.log('----------------')
            console.log(datos)
            if(datos.icono == 'success'){
                alertas(datos.msg, datos.icono);
                btnDownload = `<a id="bajarGraph" class="btn btn-outline-success btn-lg btn-block w-100" onclick="downloadGraph2('${dispositivo}', '${f_inicio}', '${f_fin}')">DOWNLOAD GRAPH</a>`;
                $('#btn_download_graph').html(btnDownload);
                setTimeout(() => {
                    graficaGenset(datos.data);
                }, 1000);
            }else{
                alertas(datos.msg, datos.icono);
                //destruye grafica
                if (typeof w !== 'undefined') { w.destroy();}
            }
        }
    }
}

function obtenerHoraPeru() {
    const fechaActual = new Date();
    const opciones = {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formatoPeru = new Intl.DateTimeFormat('es-PE', opciones).formatToParts(fechaActual);
    const partes = {};
    formatoPeru.forEach(({ type, value }) => {
        partes[type] = value;
    });

    const nombre = `${partes.year}-${partes.month}-${partes.day}_${partes.hour}-${partes.minute}-${partes.second}`;
    return nombre;
}

function obtenerHoraPeruMenos12H(){
    const fechaActual = new Date();
    fechaActual.setHours(fechaActual.getHours() - 12);
    const opciones = {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const formato = new Intl.DateTimeFormat('es-PE', opciones).formatToParts(fechaActual);
    const partes = {};
    formato.forEach(({ type, value }) => {
        partes[type] = value;
    });
    const nombre = `${partes.year}-${partes.month}-${partes.day}_${partes.hour}-${partes.minute}-${partes.second}`;
    return nombre;
}


function downloadGraph(dispositivo) {
    let graph = document.getElementById('bajarGraph');
    graph.href = document.getElementById('graficaFinal').toDataURL();

    const fecha_a = obtenerHoraPeru();
    const fecha_p = obtenerHoraPeruMenos12H();

    const nombre = dispositivo + '_' + fecha_p + '_' + fecha_a + '.jpg';
    graph.download = nombre;

    $('#btn_download_graph').html('');
}

function downloadGraph2(dispositivo, f_inicio, f_fin) {
    let graph2 = document.getElementById('bajarGraph');
    graph2.href = document.getElementById('graficaFinal').toDataURL();

    //2024-12-02T11:53 quitar la t y reemplazar por un '_'
    const fecha_inicio = f_inicio.replace('T', '_');
    const fecha_fin = f_fin.replace('T', '_');
    const nombre = `${dispositivo}_${fecha_inicio}_${fecha_fin}.png`;
    graph2.download = nombre;
    $('#btn_download_graph').html('');
}


async function obtenerGraficoBase64(){
    const canvas = document.getElementById('graficaFinal');
    const dataURL = canvas.toDataURL();
    return dataURL;
}