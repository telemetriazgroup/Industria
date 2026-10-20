function updateForm() {
    var form = FormApp.openById('1J_F9v1KIuBINY7fcIl-RTCi5H2QZqZCVtkVCfqn2rWU'); 
    var sheet = SpreadsheetApp.openById('1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY'); 
  
    // Obtener coti disponibles con estado CREADO
    var dataCoti = sheet.getSheetByName('REGISTRO_DE_SOLICITUD').getRange('B2:S').getValues();
    var cotiDisponibles = [];
    for (var i = 0; i < dataCoti.length; i++) {
      if (dataCoti[i][15] === "CREADO") {
        cotiDisponibles.push(dataCoti[i][0]);
      }
    }
    //console.log(cotiDisponibles);
  
    // Obtener placas disponibles 
    var dataPlaca = sheet.getSheetByName('REGISTRO_DE_PLACAS').getRange('B2:J').getValues(); 
    var placasDisponibles = [];
    for (var i = 0; i < dataPlaca.length; i++) {
      if (dataPlaca[i][7] === "DISPONIBLE") { 
        placasDisponibles.push(dataPlaca[i][1]);
      }
    }
    //console.log(placasDisponibles);
    
    // Obtener chips disponibles
    var dataChip = sheet.getSheetByName('REGISTRO_DE_CHIP').getRange('B2:G').getValues(); 
    var chipsDisponibles = [];
    for (var i = 0; i < dataChip.length; i++) {
      if (dataChip[i][2] === "DISPONIBLE") { 
        chipsDisponibles.push(dataChip[i][0]);
      }
    }
    //console.log(chipsDisponibles);
  
    // Actualizar opciones de coti en el formulario
    var items = form.getItems(FormApp.ItemType.LIST); 
    var listItemCoti = items[0].asListItem();
    if (cotiDisponibles.length > 0) {
      listItemCoti.setChoiceValues(cotiDisponibles);
      //console.log('Opciones de coti actualizadas: ' + cotiDisponibles);
    } else {
      //console.log('No hay opciones de coti disponibles para actualizar.');
      listItemCoti.setChoiceValues(['No hay opciones disponibles']);
    }
  
    // Actualizar opciones de placa en el formulario
    var listItemPlaca = items[1].asListItem(); 
    if (placasDisponibles.length > 0) {
      listItemPlaca.setChoiceValues(placasDisponibles);
      //console.log('Opciones de placa actualizadas: ' + placasDisponibles);
    } else {
      //console.log('No hay opciones de placa disponibles para actualizar.');
      listItemPlaca.setChoiceValues(['No hay opciones disponibles']);
    }
  
    // Actualizar opciones de chip en el formulario
    var listItemChip = items[2].asListItem();
    if (chipsDisponibles.length > 0) {
      listItemChip.setChoiceValues(chipsDisponibles);
      //console.log('Opciones de chip actualizadas: ' + chipsDisponibles);
    } else {
      //console.log('No hay opciones de chip disponibles para actualizar.');
      listItemChip.setChoiceValues(['No hay opciones disponibles']);
    }
  }
  
  
  function updateForm2(){
    var form = FormApp.openById('1aHR6TCdMhhq7DD91KInXW4hgJyXlAqMojIy9fP1RAyo');
    var sheet = SpreadsheetApp.openById('1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY');
  
    //obtener cotizaciones
    var coti = sheet.getSheetByName('REGISTRO_DE_ASIGNACIONES').getRange('B2:J').getValues(); 
    //var cotiDisponibles = [];
    var otDisponibles = [];
    for (var i = 0; i < coti.length; i++) {
      if (coti[i][3] === "ASIGNADO") { 
        //cotiDisponibles.push(coti[i][0]);
        otDisponibles.push(coti[i][4])
      }
    }
    console.log(otDisponibles);
    //console.log(cotiDisponibles);
    var items = form.getItems(FormApp.ItemType.LIST);
  
    //insercion de cotis
    /*
    var listaItemsCoti = items[0].asListItem();
    if(cotiDisponibles.length>0){
      listaItemsCoti.setChoiceValues(cotiDisponibles);
    }else{
      listaItemsCoti.setChoiceValues(['No hay opciones disponibles']);
    }*/
    //insercion de ots
    var listaItemsOt = items[0].asListItem();
    if(otDisponibles.length>0){
      listaItemsOt.setChoiceValues(otDisponibles);
    }else{
      listaItemsOt.setChoiceValues(['No hay opciones disponibles']);
    }
  }
  
  function updateForm3(){
    var form = FormApp.openById('1IIKgWve9AR9PES7B_m3kpzboFFfFpJSV7A4098mcO64');
    var sheet = SpreadsheetApp.openById('1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY');
  
    //obtener ot de REGISTRO_DE_ASIGNACIONES
    var ot = sheet.getSheetByName('REGISTRO_DE_ASIGNACIONES').getRange('B2:J').getValues();
    var otDisponibles = [];
    var placasDisponibles = [];
    var chipDisponibles = [];
    for (var i = 0; i < ot.length; i++){
      if(ot[i][3] === "ASIGNADO"){
        otDisponibles.push(ot[i][4]);
        placasDisponibles.push(ot[i][1]);
        chipDisponibles.push(ot[i][2]);
      }
    }
  
    
  
    console.log(otDisponibles);
    console.log(placasDisponibles);
    console.log(chipDisponibles);
    
    var items = form.getItems(FormApp.ItemType.LIST);
    //primer desplegable
    var listaItemsOt = items[0].asListItem();
    if(otDisponibles.length>0){
      listaItemsOt.setChoiceValues(otDisponibles);
    }else{
      listaItemsOt.setChoiceValues(['No hay opciones disponibles']);
    }
    //segundo desplegable
    var listaPlacas = items[1].asListItem();
    if(placasDisponibles.length>0){
      listaPlacas.setChoiceValues(placasDisponibles);
    }else{
      listaPlacas.setChoiceValues(['No hay opciones disponibles']);
    }
    //tercer desplegable
    var listaChips = items[2].asListItem();
    if(chipDisponibles.length>0){
      listaChips.setChoiceValues(chipDisponibles);
    }else{
      listaChips.setChoiceValues(['No hay opciones disponibles']);
    }
  }
  
  function updateForm4(){
    var form = FormApp.openById('1PRsiBX1phvPtMmFSsInu0yCFJsB_lIwDXqmn5JgAOws');
    var sheet = SpreadsheetApp.openById('1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY');
  
    //obtener ot de REGISTRO_DE_ASIGNACIONES
    var ot = sheet.getSheetByName('REGISTRO_DE_INSTALACION').getRange('B2:N').getValues();
    var otDisponibles = [];
   
    for (var i = 0; i < ot.length; i++){
      if(ot[i][11] === "INSTALADO"){
        otDisponibles.push(ot[i][3]);
       
      }
    }
    
    var items = form.getItems(FormApp.ItemType.LIST);
    //primer desplegable
    var listaItemsOt = items[0].asListItem();
    if(otDisponibles.length>0){
      listaItemsOt.setChoiceValues(otDisponibles);
    }else{
      listaItemsOt.setChoiceValues(['No hay opciones disponibles']);
    }
    
  }
  function onFormSubmit(e) {
      //var submittedFormId = e.source.getId();
      var responses = e.values; 
      var formId = responses[responses.length - 1];
      console.log(formId);
  
      if (formId === "1J_F9v1KIuBINY7fcIl-RTCi5H2QZqZCVtkVCfqn2rWU") {
          handleForm1Submit(e);
          handleForm1SubmitPlaca(e);
          handleForm1SubmitChip(e);
      } else if (formId === "1aHR6TCdMhhq7DD91KInXW4hgJyXlAqMojIy9fP1RAyo") {
          handleForm2Submit(e);
      } else if (formId === "1IIKgWve9AR9PES7B_m3kpzboFFfFpJSV7A4098mcO64"){
          handleForm3Submit(e);
      } else if (formId === "1PRsiBX1phvPtMmFSsInu0yCFJsB_lIwDXqmn5JgAOws"){
          handleForm4Submit(e);
      }
  }
  
  function handleForm1Submit(e) {
      var form = FormApp.openById("1J_F9v1KIuBINY7fcIl-RTCi5H2QZqZCVtkVCfqn2rWU");
      var responses = form.getResponses();
      var latestResponse = responses[responses.length - 1]; 
      var items = latestResponse.getItemResponses();
      var cotizacionId = items[0].getResponse();  
      var sheet = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_SOLICITUD"); 
      var data = sheet.getDataRange().getValues(); 
      
      for (var i = 0; i < data.length; i++) {
        if (data[i][1] == cotizacionId) {  
          /*
          sheet.getRange(i + 1, 17).setValue("ASIGNADO");  
          break; */
          var solicitudValue = data[i][18];
          if(solicitudValue>0){
            solicitudValue--;
            sheet.getRange(i + 1,19).setValue(solicitudValue);
            //sheet.getRange(i+1,17).setValue("CREADO");
            if(solicitudValue == 0){
              sheet.getRange(i + 1,17).setValue("ASIGNADO");
            }
          }
          break;
        }
      }
  }
  
  function handleForm1SubmitPlaca(e) {
      var form = FormApp.openById("1J_F9v1KIuBINY7fcIl-RTCi5H2QZqZCVtkVCfqn2rWU");
      var responses = form.getResponses();
      var latestResponse = responses[responses.length - 1]; 
      var items = latestResponse.getItemResponses();
      var placaValue = items[1].getResponse();  
      var sheet = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_PLACAS");
      var data = sheet.getDataRange().getValues(); 
      
      for (var i = 0; i < data.length; i++) {
        if (data[i][2] == placaValue) {  
          sheet.getRange(i + 1, 9).setValue("ASIGNADO");  
          break; 
        }
      }
  }
  
  function handleForm1SubmitChip(e) {
      var form = FormApp.openById("1J_F9v1KIuBINY7fcIl-RTCi5H2QZqZCVtkVCfqn2rWU");
      var responses = form.getResponses();
      var latestResponse = responses[responses.length - 1]; 
      var items = latestResponse.getItemResponses();
      var chipValue = items[2].getResponse();  
      var sheet = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_CHIP");
      var data = sheet.getDataRange().getValues(); 
      
      for (var i = 0; i < data.length; i++) {
        if (data[i][1] == chipValue) {  
          sheet.getRange(i + 1, 4).setValue("ASIGNADO");  
          break; 
        }
      }
  }
  
  function handleForm2Submit(e) {
      var form = FormApp.openById("1aHR6TCdMhhq7DD91KInXW4hgJyXlAqMojIy9fP1RAyo");
      var responses = form.getResponses();
      var latestResponse = responses[responses.length - 1]; 
      var items = latestResponse.getItemResponses();
      var otValue = items[2].getResponse();
      var sheet = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_SOLICITUD");  
      var sheet2 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_ASIGNACIONES");
      var data = sheet.getDataRange().getValues(); 
      
      for (var i = 0; i < data.length; i++) {
        if (data[i][1] == otValue) {  
          sheet.getRange(i + 1, 17).setValue("COMPLETADO"); 
          break; 
        }
      }
  
      var data2 = sheet2.getDataRange().getValues();
      
      for (var i = 0; i < data2.length; i++) {
        if (data2[i][5] == otValue) {  
          sheet2.getRange(i + 1, 5).setValue("COMPLETADO");  
          break; 
        }
      }
  }
  
  function handleForm3Submit(e){
      var form = FormApp.openById("1IIKgWve9AR9PES7B_m3kpzboFFfFpJSV7A4098mcO64");
      var responses = form.getResponses();
      var latestResponse = responses[responses.length - 1]; 
      var items = latestResponse.getItemResponses();
      var otValue = items[0].getResponse();
      var placaValue = items[1].getResponse();
      var chipValue = items[2].getResponse();
  
      var hoja1 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_ASIGNACIONES");  
      var hoja2 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_PLACAS");
      var hoja3 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_CHIP");
  
      var data = hoja1.getDataRange().getValues();
      var data2 = hoja2.getDataRange().getValues();
      var data3 = hoja3.getDataRange().getValues();
  
      for (var i = 0; i < data.length; i++) {
        if (data[i][5] == otValue) {  
          hoja1.getRange(i + 1, 5).setValue("CANCELADO"); 
          break; 
        }
      }
  
      for (var i = 0; i < data2.length; i++) {
        if (data2[i][2] == placaValue) {  
          hoja2.getRange(i + 1, 9).setValue("DISPONIBLE"); 
          break; 
        }
      }
  
      for (var i = 0; i < data3.length; i++) {
        if (data3[i][1] == chipValue) {  
          hoja3.getRange(i + 1, 4).setValue("DISPONIBLE"); 
          break; 
        }
      }
  
  }
  
  function handleForm4Submit(e){
    var form = FormApp.openById("1PRsiBX1phvPtMmFSsInu0yCFJsB_lIwDXqmn5JgAOws");
    var responses = form.getResponses();
    var latestResponse = responses[responses.length - 1]; 
    var items = latestResponse.getItemResponses();
    var otValue = items[0].getResponse();
  
    var hoja1 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_ASIGNACIONES"); 
    var hoja2 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_PLACAS");
    var hoja3 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_CHIP");
    var hoja4 = SpreadsheetApp.openById("1PYstz6NjiTltYVv9AycptvVcVntNzDkBA47gR6f-oZY").getSheetByName("REGISTRO_DE_INSTALACION");
  
    var data = hoja1.getDataRange().getValues();
    var data2 = hoja2.getDataRange().getValues();
    var data3 = hoja3.getDataRange().getValues();
    var data4 = hoja4.getDataRange().getValues();
  
    var fechaActual = new Date();
    //Formato dd/mm/yyyy
    var fechaFormateada = Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), "dd/MM/yyyy");
  
  
    var chipValue;
    var placaValue;
    for (var i = 0; i < data.length; i++) {
      if (data[i][5] == otValue) {  
        chipValue = data[i][3]; 
        placaValue = data[i][2];
        break; 
      }
    }
  
    if (chipValue && placaValue) {
      var data2 = hoja2.getDataRange().getValues();
      for (var i = 0; i < data2.length; i++) {
        if (data2[i][2] == placaValue) {  
          hoja2.getRange(i + 1, 9).setValue("DISPONIBLE"); 
          break; 
        }
      }
  
      var data3 = hoja3.getDataRange().getValues();
      for (var i = 0; i < data3.length; i++) {
        if (data3[i][1] == chipValue) {  
          hoja3.getRange(i + 1, 4).setValue("DISPONIBLE"); 
          break; 
        }
      }
    }
  
    for (var i = 0; i < data4.length; i++) {
      if (data4[i][4] == otValue) {  
        hoja4.getRange(i + 1, 13).setValue("INSTALADO-D");
        hoja4.getRange(i + 1, 7).setValue(fechaFormateada);
        break; 
      }
    }
  
  
   
    
  }
  