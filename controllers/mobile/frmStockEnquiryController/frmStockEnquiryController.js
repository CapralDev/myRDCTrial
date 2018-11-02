var barcodeTriggerCase = false;
var barcodeTriggerMat = false;
var barcodeTriggerBin = false;
var stkEnq = " ";
define({ 

 //Type your controller code here 
    preShow:function()
    {
     	this.view.LabelmyRDC.text = glbbuildname; 
//Clear all values
//      glb_WM_ENQ_STOCK = {};
//      glb_WM_ENQ_STOCK1 = [];  
        glb_WM_ENQ_STOCK = "";
        glb_WM_ENQ_STOCK1 = "";         
      this.view.TextCase.text = "";
      this.view.TextMaterial.text = "";
      this.view.TextBin.text = "";      
//barcode for case      
      printLog("Preshow:Barcode trigger for case:"+barcodeTriggerCase);
      if(!barcodeTriggerCase)
      	{
        	printLog("Preshow:Clear input values for case");
        	this.view.TextCase.text = "";
      	}
      else
        {
          printLog("Skip clearing case input values and reset barcode trigger");
          barcodeTriggerCase=false;
        }  
//barcode for material      
      printLog("Preshow:Barcode trigger for material:"+barcodeTriggerMat);
      if(!barcodeTriggerMat)
      	{
        	printLog("Preshow:Clear input values for material");
        	this.view.TextMaterial.text = "";
      	}
      else
        {
          printLog("Skip clearing material input values and reset barcode trigger");
          barcodeTriggerMat=false;
        } 
//barcode for bin location      
      printLog("Preshow:Barcode trigger for bin:"+barcodeTriggerBin);
      if(!barcodeTriggerBin)
      	{
        	printLog("Preshow:Clear input values for bin");
        	this.view.TextBin.text = "";
      	}
      else
        {
          printLog("Skip clearing bin input values and reset barcode trigger");
          barcodeTriggerBin=false;
        }        
      
    },
 
//process barcode for case  
    launchBarcodeCase:function(){
      printLog("launchBarcode for case");
      barcodeTriggerCase = true; 
      printLog("launchBarcode for case");
      controllerScope = this;
      barcode.captureBarcode(controllerScope.barcodeSuccessCase.bind(this));          
    },
  
    barcodeSuccessCase:function(barcodedata, androidScannedText)
    {
      printLog("barcode success case:barcodedata:"+JSON.stringify(barcodedata));
      printLog("barcode success case:androidScannedText:"+JSON.stringify(androidScannedText));
      var platformName = kony.os.deviceInfo().name;
      printLog("barcode success case:platform:"+platformName);
      if (barcodeTriggerCase === true) {  
        stkEnq = "CASE";
        if(kony.string.startsWith(platformName, "iphone", true)){
//          controllerScope.view.TextCase.text = (""+barcodedata.barcodestring).toUpperCase();
          this.view.TextCase.text = (""+barcodedata.barcodestring).toUpperCase();          
        }else if(kony.string.startsWith(platformName, "android", true)){
//          controllerScope.view.TextCase.text = androidScannedText.toUpperCase();
          this.view.TextCase.text = androidScannedText.toUpperCase();          
        }
        this.integrationCallCase();
      }
    },

  
    // When the Case text field is manually changed
    onDoneCase:function()
    {      
      
      var rawCaseNumber = this.view.TextCase.text;                   
      var caseNumber = rawCaseNumber.replace(/\s+/g, '');            
      stkEnq = "CASE";
      
      if(caseNumber===null || caseNumber==="")
      {
        return;
      }
      else
        {
          this.integrationCallCase();
        }  
    },
  
 	integrationCallCase:function()
    {
      printLog("Case entered ="+this.view.TextCase.text);   
      
      if(this.view.TextCase.text ===null|| this.view.TextCase.text ==="" ||this.view.TextCase.text===0 )
      {
          alert("Please enter a Case No.");
          return;
      }
      else
        {            
           displayLoadingScreen("Read case ...");
    //     controllerScope = this;
           var rawstr = this.view.TextCase.text;        
           var str = rawstr.replace(/\s+/g, '');        
           var pad = "00000000000000000000";
           var lenum = pad.substring(0, pad.length - str.length) + str;
           var data = {};
           data.lenum = lenum;
           data.lgpla = " ";
           data.matnr = " ";
           data.qname = glbSAPUNAME.toUpperCase();
           data.activity = "ENQ CASE";
//         printLog("Interfaced Case ="+data); 
           printLog("Interfaced Case ="+JSON.stringify(data));           
           WMStockEnquiry(data, this.successCallback.bind(this), function(err){
             dismissLoadingScreen();  
             alert("Error invoking Case Enquiry integration call:"+JSON.stringify(err));        
              });
        }  
   },     
  
 
//process barcode for material  
    launchBarcodeMat:function(){
      printLog("launchBarcode for material");
      barcodeTriggerMat = true; 
      printLog("launchBarcode for material");
      controllerScope = this;
      barcode.captureBarcode(controllerScope.barcodeSuccessMat.bind(this));          
    },  
  
    barcodeSuccessMat:function(barcodedata, androidScannedText)
    {
      printLog("barcode success case:barcodedata:"+JSON.stringify(barcodedata));
      printLog("barcode success case:androidScannedText:"+JSON.stringify(androidScannedText));
      var platformName = kony.os.deviceInfo().name;
      printLog("barcode success Material:platform:"+platformName);
      if (barcodeTriggerMat === true) {
        stkEnq = "MAT";
        if(kony.string.startsWith(platformName, "iphone", true)){
//          controllerScope.view.TextMaterial.text = (""+barcodedata.barcodestring).toUpperCase();
          this.view.TextMaterial.text = (""+barcodedata.barcodestring).toUpperCase();          
        }else if(kony.string.startsWith(platformName, "android", true)){
//          controllerScope.view.TextMaterial.text = androidScannedText.toUpperCase();
          this.view.TextMaterial.text = androidScannedText.toUpperCase();          
        }
        this.integrationCallMat();
      }
    },

  
    // When the Material text field is manually changed
    onDoneMat:function()
    {      
      stkEnq = "MAT";
      var rawMatNumber = this.view.TextMaterial.text;                   
      var matNumber = rawMatNumber.replace(/\s+/g, '');            
      
      
      if(matNumber===null || matNumber==="")
      {
        return;
      }
      else
        {
          this.integrationCallMat();
        }  
    },
  
 	integrationCallMat:function()
    {
      printLog("Material entered ="+this.view.TextMaterial.text);   
      
      if(this.view.TextMaterial.text ===null|| this.view.TextMaterial.text ==="" ||this.view.TextMaterial.text===0 )
      {
          alert("Please enter a Material No.");
          return;
      }
      else
        {            
           displayLoadingScreen("Read Material ...");
    //     controllerScope = this;
           var data = {};
           var isANumber = isNaN(this.view.TextMaterial.text) === false;
           if (isANumber)
            {
              	var matstr = this.view.TextMaterial.text;
                var numstr = matstr.replace(/\s+/g, '');              
                printLog(numstr+":Material is numeric");
                printLog("Numeric length="+numstr.length);              
           		var pad = "000000000000000000";
                printLog("Pad length="+pad.length);              
           		var matnr = pad.substring(0, pad.length - numstr.length) + numstr;
                printLog("Material number ="+matnr);              
           		data.matnr = matnr; 
            }
           else
            {
           		var rawstr = this.view.TextMaterial.text;
        		var upstr = rawstr.toUpperCase();
           		var str = upstr.replace(/\s+/g, ''); 
                printLog(str+":Material is not numeric");               
                data.matnr = str;                 
            }
           data.lenum = " ";
           data.lgpla = " ";
           data.qname = glbSAPUNAME.toUpperCase();
           data.activity = "ENQ MAT";
//         printLog("Interfaced Mat ="+data); 
           printLog("Interfaced Mat ="+JSON.stringify(data));           
            WMStockEnquiry(data, this.successCallback.bind(this), function(err){
             dismissLoadingScreen();  
             alert("Error invoking Material Enquiry integration call:"+JSON.stringify(err));        
              });
        }  
   },     
 
  
//process barcode for bin location  
    launchBarcodeBin:function(){
      printLog("launchBarcode for bin");
      barcodeTriggerBin = true; 
      printLog("launchBarcode for bin");
      controllerScope = this;
      barcode.captureBarcode(controllerScope.barcodeSuccessBin.bind(this));          
    }, 
  
    barcodeSuccessBin:function(barcodedata, androidScannedText)
    {
      printLog("barcode success bin:barcodedata:"+JSON.stringify(barcodedata));
      printLog("barcode success bin:androidScannedText:"+JSON.stringify(androidScannedText));
      var platformName = kony.os.deviceInfo().name;
      printLog("barcode success bin:platform:"+platformName);
      if (barcodeTriggerBin === true) {
        stkEnq = "BIN";
        if(kony.string.startsWith(platformName, "iphone", true)){
//          controllerScope.view.TextBin.text = (""+barcodedata.barcodestring).toUpperCase();
          this.view.TextBin.text = (""+barcodedata.barcodestring).toUpperCase();          
        }else if(kony.string.startsWith(platformName, "android", true)){
//          controllerScope.view.TextBin.text = androidScannedText.toUpperCase();
          this.view.TextBin.text = androidScannedText.toUpperCase();          
        }
        this.integrationCallBin();
      }
    },

  
    // When the Bin text field is manually changed
    onDoneBin:function()
    {      
      stkEnq = "BIN";
      var rawBinNumber = this.view.TextBin.text;                   
      var binNumber = rawBinNumber.replace(/\s+/g, '');            
      
      
      if(binNumber===null || binNumber==="")
      {
        return;
      }
      else
        {
          this.integrationCallBin();
        }  
    },
  
 	integrationCallBin:function()
    {
      printLog("Bin entered ="+this.view.TextBin.text);   
      
      if(this.view.TextBin.text ===null|| this.view.TextBin.text ==="" ||this.view.TextBin.text===0 )
      {
          alert("Please enter a Location");
          return;
      }
      else
        {            
           displayLoadingScreen("Read location ...");
    //     controllerScope = this;      
           var data = {};
           var isANumber = isNaN(this.view.TextBin.text) === false;
           if (isANumber)
            {
              	var binstr = this.view.TextBin.text;
                var numstr = binstr.replace(/\s+/g, '');              
                printLog(numstr+":Bin is numeric");
                printLog("Numeric length="+numstr.length);              
           		var pad = "0000000000";
                printLog("Pad length="+pad.length);              
           		var binnr = pad.substring(0, pad.length - numstr.length) + numstr;
                printLog("Bin number ="+binnr);              
           		data.lgpla = binnr; 
            }
           else
            {
           		var rawstr = this.view.TextBin.text;
        		var upstr = rawstr.toUpperCase();
           		var str = upstr.replace(/\s+/g, ''); 
                printLog(str+":Bin is not numeric");               
                data.lgpla = str;                 
            }          
          
           data.lenum = " ";
           data.matnr = " ";          
           data.qname = glbSAPUNAME.toUpperCase();
           data.activity = "ENQ BIN";
//         printLog("Interfaced Bin ="+data);
           printLog("Interfaced Bin ="+JSON.stringify(data));           
            WMStockEnquiry(data, this.successCallback.bind(this), function(err){
             dismissLoadingScreen();  
             alert("Error invoking Bin Enquiry integration call:"+JSON.stringify(err));        
              });
        }  
   },
  
   successCallback:function(res){  
     var sapResponse;     
     var data = [];
     glb_WM_ENQ_STOCK = " ";
     glb_WM_ENQ_STOCK1 = " ";
     glb_WM_ENQ_STOCK_list = true;
     glbStockEnqForm = " ";
     printLog("FM Scan Stock Return");     
     //
     // for some strange reason, for single entry it is structure not a table and table.length is undefined.
     // as workaround treat single entry as special case.
     //
     if(res.WM_ENQ_SCAN_STK!==null)      
        { 
          printLog("FM Scan Stock Success");
          var record = {};         
          var working = JSON.parse(res.WM_ENQ_SCAN_STK);
         
          var ZWM_ENQ_STOCK = working.ZWM_ENQ_STOCK;
          var ZWM_ENQ_CONF = working.ZWM_ENQ_CONF;
          
          printLog("WM_ENQ_SCAN_STK:"+JSON.stringify(working));

          //Check for errors/warnings
          if(ZWM_ENQ_CONF!==undefined)
          {
            if (ZWM_ENQ_CONF.ERROR!=="" || ZWM_ENQ_CONF.MSGTY == "E")
            alert(ZWM_ENQ_CONF.ERROR);
            dismissLoadingScreen();
          }

          if(ZWM_ENQ_STOCK!== undefined)
         	 {
                printLog("ZWM_ENQ_STOCK structure:"+JSON.stringify(ZWM_ENQ_STOCK));               
                  // single entry
                  if (ZWM_ENQ_STOCK.length===undefined)
                    {
                      printLog("Single Stock Extracted");
                      glb_WM_ENQ_STOCK_list = false;
//                    fill the structure with data and call the detail screen                      
                      glb_WM_ENQ_STOCK1 = ZWM_ENQ_STOCK;
//                    printLog("glb_WM_ENQ_STOCK1 structure:"+JSON.stringify(glb_WM_ENQ_STOCK1));                         
//                    copy the bitmap image to cache
                      if (glb_WM_ENQ_STOCK1.ZEINR !== "" && glb_WM_ENQ_STOCK1.ZEINR !== " " && 
                          glb_WM_ENQ_STOCK1.ZEINR !== null && glb_WM_ENQ_STOCK1.ZEINR !== undefined )
                        {
                           var section = glb_WM_ENQ_STOCK1.ZEINR.toUpperCase(); 
                           printLog("get section drawing="+section);
                           this.getSectionDrawing(section);                      
                        }
                      else
                        {
//                         goto the stock detail screen
                           glbStockEnqForm = "frmStockEnquiry";                          
                           dismissLoadingScreen();
                           navigateToForm("frmStockEnquiryDet");
                        }  
                    }
                  else
                    {   
                      printLog("Stock List Entries="+ZWM_ENQ_STOCK.length);
                      glb_WM_ENQ_STOCK_list = true;                       
                      // if query by material, only retrieve the drawing for the first row
                      if (stkEnq == "MAT")
                        {
                           if (ZWM_ENQ_STOCK[0].ZEINR !== "" && ZWM_ENQ_STOCK[0].ZEINR !== null &&
                               ZWM_ENQ_STOCK[0].ZEINR !== undefined)
                             {
                               var sectionM =  ZWM_ENQ_STOCK[0].ZEINR.toUpperCase();
                               printLog("material ="+ZWM_ENQ_STOCK[0].MATNR);
                               printLog("get material section drawing="+sectionM);
                               this.loadCache(sectionM);                               
                             }
                        }                      
                      for(i=0;i<ZWM_ENQ_STOCK.length; i++)
     					{
                          if (stkEnq !== "MAT" && ZWM_ENQ_STOCK[i].ZEINR !== "" && 
                              ZWM_ENQ_STOCK[i].ZEINR !== " " && ZWM_ENQ_STOCK[i].ZEINR !== null &&
                              ZWM_ENQ_STOCK[i].ZEINR !== undefined)
                            {
                              var sectionL = ZWM_ENQ_STOCK[i].ZEINR.toUpperCase(); 
//                            printLog("get section drawing="+sectionL+"row="+i);
                              this.loadCache(sectionL);                                                              
                            }
                          record = {};                          
	       				  record = ZWM_ENQ_STOCK[i];                        
//						  printLog("Save stock record:"+JSON.stringify(record));                          
           				  data.push(record);                          
     					} 
                      if (data.length >0 && glb_WM_ENQ_STOCK_list === true)
                        {
                          printLog("enquiry type ="+stkEnq);
                          glb_WM_ENQ_STOCK = data;                           
                          if (stkEnq == "CASE")
                            {
                              //go to the case list screen  
                              glb_StockEnqForm = "frmCaseEnquiry";
                              dismissLoadingScreen();
                              navigateToForm("frmCaseEnquiry");   
                            }
                          else
                            {
                              if (stkEnq == "BIN")
                                {
                                  //go to the location list screen 
                                  glb_StockEnqForm = "frmBinEnquiry";                                    
                                  dismissLoadingScreen();                                 
                                  navigateToForm("frmBinEnquiry");
                                }
                              else
                                {
                                    if (stkEnq == "MAT")
                                      {
                                        //go to the material list screen
                                        glb_StockEnqForm = "frmMatEnquiry";                                        
                                        dismissLoadingScreen();                                        
                                        navigateToForm("frmMatEnquiry");
                                      }
                                    else
                                      {
                                        alert("No Stock found");
                                        return; 
                                      }
                                }
                             }                             
                       	 }
                       else
                         {
                            alert("No Stock found");
        					return; 
                         }
                    }               //end of stock list
             }                      //end of stock return
          else
            {
              alert("No Stock found");
              return; 
            }          
        }                          //end of SAP return
      else
        {
          alert("No Stock found");
          return; 
        }
    },                               
  
//  retrieve the section drawing
//*************** note on section bitmaps **************** 
//* For reasons unknown, the section bitmap will only display
//* when read from cache.  New section bitmaps must be written
//* to cache and then extracted for display on the screen.  
//*************** note on section bitmaps ****************
  
    loadCache:function(sectionName)
  	{ 
       printLog("Retrieving cache image for:"+sectionName);
       var cacheBinary = getImageCache(sectionName);
       //printLog("ImageCache length for "+sectionName+":"+cacheBinary.length);
       if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
       {
         printLog("ImageCache found");
       }
       else
       {
         printLog("ImageCache not found - get from SAP:"+sectionName);         
         getBinaryContent(sectionName, 
                          //Success callback
                          function(res){ 
           printLog("Successfull drawing retrieval:"+sectionName);            
           //Save graphic to cache          
           var cacheKey = sectionName;
           setImageCache(cacheKey, res);  
           printLog("saved cache");                
         }, 
                          //Error callback          
                          function(res){ 
           printLog("Error callback for drawing:"+sectionName);        
         });       
       }
	},   
  
    getSectionDrawing:function(sectionName)
  	{ 
       printLog("Retrieving cache image for:"+sectionName);
       var cacheBinary = getImageCache(sectionName);
       //printLog("ImageCache length for "+sectionName+":"+cacheBinary.length);
       if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
       {
         printLog("ImageCache found");
         printLog("imagecachelength="+cacheBinary.length);
         if (glb_WM_ENQ_STOCK_list===false)
           {
//             goto the stock detail screen
               glbStockEnqForm = "frmStockEnquiry";             
               dismissLoadingScreen();            
               navigateToForm("frmStockEnquiryDet");             
           }
       }
       else
       {
         printLog("ImageCache not found - get from SAP:"+sectionName);         
         getBinaryContent(sectionName, 
                          //Success callback
                          function(res){ 
           printLog("Successfull drawing retrieval:"+sectionName);            
           //Save graphic to cache
           var cacheKey = sectionName;
           setImageCache(cacheKey, res);
           printLog("saved cache");
           if (glb_WM_ENQ_STOCK_list===false)
           {
             //goto the stock detail screen 
             glbStockEnqForm = "frmStockEnquiry";             
             dismissLoadingScreen();           
             navigateToForm("frmStockEnquiryDet");             
           }                 
         }, 
                          //Error callback          
                          function(res){ 
           printLog("Error callback for drawing:"+sectionName); 
           if (glb_WM_ENQ_STOCK_list===false)
           {
             //goto the stock detail screen  
             glbStockEnqForm = "frmStockEnquiry";
             dismissLoadingScreen();          
             navigateToForm("frmStockEnquiryDet");             
           }        
         });       
       }
	}, 

 });   
  
