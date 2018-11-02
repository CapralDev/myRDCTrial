var barcodeTrigger = false;
define({ 

 //Type your controller code here 
    preShow:function()
    {
      this.view.LabelmyRDC.text = glbbuildname;
//Clear all values
      
      this.view.TextFromLocation.text = "";                //GWM20180731      
      
      printLog("Preshow:Barcode trigger for From Location:"+barcodeTrigger);
      if(!barcodeTrigger)
      	{
        	printLog("Preshow:Clear input values for From Location");
        	this.view.TextFromLocation.text = "";
      	}
      else
        {
          printLog("Skip clearing From Location input values and reset barcode trigger");
          barcodeTrigger=false;
        }                  
      
    },
  
    launchBarcode:function(){
      printLog("launchBarcode for From Location");
      barcodeTrigger = true; 
      printLog("launchBarcode for From Location");
      controllerScope = this;
      barcode.captureBarcode(controllerScope.barcodeSuccess.bind(this));          
    },     
     
    barcodeSuccess:function(barcodedata, androidScannedText)
    {
      printLog("barcode success:barcodedata:"+JSON.stringify(barcodedata));
      printLog("barcode success:androidScannedText:"+JSON.stringify(androidScannedText));
      var platformName = kony.os.deviceInfo().name;
      printLog("barcode success:platform:"+platformName);
      if (barcodeTrigger === true) {       
        if(kony.string.startsWith(platformName, "iphone", true)){
          this.view.TextFromLocation.text = (""+barcodedata.barcodestring).toUpperCase().trim();          
        }else if(kony.string.startsWith(platformName, "android", true)){
          this.view.TextFromLocation.text = androidScannedText.toUpperCase().trim();          
        }
        this.integrationCall();
      }
    },
    
  
    // When the From Location text field is manually changed - ON DONE
  
 	integrationCall:function()
    {
      printLog("From Location entered ="+this.view.TextFromLocation.text);   
      
      if(this.view.TextFromLocation.text ===null|| this.view.TextFromLocation.text ==="" ||this.view.TextFromLocation.text===0 )
      {
          alert("Please enter a From Location");
          return;
      }
      else
        {
          var nospacebin = this.view.TextFromLocation.text.toUpperCase().trim();        //GWM20180731
//        glbMLSFromLocation = this.view.TextFromLocation.text.toUpperCase().trim();    //GWM20180731
          glbMLSFromLocation = nospacebin.replace(/\s+/g, '');                          //GWM20180731              
          displayLoadingScreen("Read From Location ...");
          controllerScope = this;
          
          var data = {};
          data.lgpla = glbMLSFromLocation;
          data.qname = glbSAPUNAME.toUpperCase();
          data.activity = "MOVE LOC";
          printLog("data struc:"+JSON.stringify(data));

          WMGetFromLocation(data, this.successCallback.bind(this), function(err){
             dismissLoadingScreen();  
             alert("Error invoking integration call:"+JSON.stringify(err));        
              });
        }  
   },     

	// different fields from ZWM_BTB_STOCK table entries are used for selection list and material details
	// hence store all fields from table and access fields as required in consequent forms
  	// if more than one material found save ZWM_BTB_STOCK table as glbMLSMaterialList and goto to material selection form
	// otherwise save single ZWM_BTB_STOCK table entry glbMLSMaterial as glbMLSMaterial and goto material detail form

  
   successCallback:function(res){  
     var sapResponse;     
     var data = [];
     //
     // for some strange reason, for single entry it is structure not a table and table.length is undefined.
     // as workaround treat single entry as special case.
     //
     glbMLSactiveMaterial = {};
     glbMLSMaterialList =[];
     glbMLSskipselection = false;
     printLog("FM Scan From Location Return");
     
     if(res.WM_BTB_SCAN_LOCATION!==null)      
        { 
          printLog("FM Scan From  Location Success");
          var record = {};
          var working = JSON.parse(res.WM_BTB_SCAN_LOCATION);
         
          var ZWM_BTB_STOCK = working.ZWM_BTB_STOCK;
          var ZWM_BTB_CONF = working.ZWM_BTB_CONF;
          
          printLog("WM_BTB_SCAN_LOCATION:"+JSON.stringify(working));

          //Check for errors/warnings
          if(ZWM_BTB_CONF!==undefined)
          {
            if (ZWM_BTB_CONF.ERROR!=="" || ZWM_BTB_CONF.MSGTY == "E")
            alert(ZWM_BTB_CONF.ERROR);
            dismissLoadingScreen();
          }

          if(ZWM_BTB_STOCK!== undefined)
         	 {
                printLog("ZWM_BTB_STOCK structure:"+JSON.stringify(ZWM_BTB_STOCK));               
                  // workaround for single entry
                  if (ZWM_BTB_STOCK.length===undefined)
                    {
                      if (ZWM_BTB_STOCK.VERME > 0)
                        {
                          record = {};
                          printLog("verme"+ZWM_BTB_STOCK.VERME);
                          glbMLSskipselection = true;
                          record.ImageBitmap = {};
                          record.STOCK = ZWM_BTB_STOCK;
                          data.push(record);
                        }
                      else
                        {
                          alert("No available stock found in this location");
	                      dismissLoadingScreen();  
                          return;
                        }
                    }
                  else
                    {
                      printLog("table entries:"+ZWM_BTB_STOCK.length);
   					  //store material stock table
                      for(i=0;i<ZWM_BTB_STOCK.length; i++)
     					{
					      if (ZWM_BTB_STOCK[i].VERME > 0)
         					{
                              record = {};
	       					  record.STOCK = ZWM_BTB_STOCK[i];
    	   					  record.ImageBitmap = {};
						      printLog("record STOCK structure:"+JSON.stringify(record.STOCK));
           					  printLog("VERME"+record.STOCK.VERME);
           					  data.push(record);
         					}
     					}
                    }
               
				// if any available stock material is found, get section images

            //Get images from cache. Fetch from SAP if not exist in cache *******************************************************************
            if(data!== undefined)
            {
              printLog("Starting binary content retrieving");
              var x =0;
              controllerScope = this;
              
              //Recursive function - shouldn't define function inside loop
              var loopArray = function(data){
                printLog("Inside loop array index:"+x);
                var drawingID = data[x].STOCK.ZEINR;
                
                printLog("Retrieving image for drawing:"+drawingID);
                var cacheBinary = getImageCache(drawingID);
                if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
                  {
                    printLog("ImageCache found");
                     data[x].ImageBitmap = {"base64":cacheBinary};
                  
                       x++;
                       
                       if(x<data.length)
                         {
                           loopArray(data);
                         }
                       else
                       {
                         dismissLoadingScreen();
                  	 if (data.length == 1)
                    	{
                      	 glbMLSactiveMaterial = data[0];
                      	 navigateToForm("frmMoveLoose");
                    	}
                  	else
                    	{
                         glbMLSMaterialList = data;
                      	 navigateToForm("frmMoveLooseSelect");
                    	}
                         
                       }
                  }
                else
                  {
                    printLog("ImageCache not found. Attempt to get from SAP");
                    
                getBinaryContent(drawingID, 
                   //Success callback
                  function(res){ 
                       printLog("Successfull retrival for index:"+x);
                       data[x].ImageBitmap = {"base64":res};
                      
                       //Save graphic to cache
                       var cacheKey = data[x].lblDrawing;
                       setImageCache(cacheKey, res);
                  
                       x++;
                  
                       if(x<data.length)
                         {
                           loopArray(data);
                         }
                       else
                       {
                         dismissLoadingScreen();
                  	 if (data.length == 1)
                    	{
                      	 glbMLSactiveMaterial = data[0];
                      	 navigateToForm("frmMoveLoose");
                    	}
                  	else
                    	{
                         glbMLSMaterialList = data;                         
                      	 navigateToForm("frmMoveLooseSelect");
                    	}
                         
                       }
                	 }, 
                       //Error callback          
                       function(res){ 
                       printLog("Error callback for index:"+x);
                       data[x].ImageBitmap = {"base64":""};                             
                  
                       x++;
                       
                       if(x<data.length)
                         {
                           loopArray(data);
                         }
                       else
                       {
                         dismissLoadingScreen();
                  	 if (data.length == 1)
                    	{
                      	 glbMLSactiveMaterial = data[0];
                      	 navigateToForm("frmMoveLoose");
                    	}
                  	else
                    	{
                         glbMLSMaterialList = data;                          
                      	 navigateToForm("frmMoveLooseSelect");
                    	}
                         
                       }
                	 });
                  }
              };
              
              loopArray(data);
            //END Get images from cache. Fetch from SAP if not exist in cache ***************************************************************              
            }
         }
       
        }
     else
       {
         printLog("FM Scan From  Location Returns Null");
         alert("From  Location Retrieval Failed");
         dismissLoadingScreen();              
       }
  }, 
 

 });
