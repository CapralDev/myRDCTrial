var barcodeTrigger = false;
define({ 

 //Type your controller code here 
    preShow:function()
    {
     	this.view.LabelmyRDC.text = glbbuildname; 
//Clear all values
      
      this.view.TextCase.text = "";
      
      printLog("Preshow:Barcode trigger for case:"+barcodeTrigger);
      if(!barcodeTrigger)
      	{
        	printLog("Preshow:Clear input values for case");
        	this.view.TextCase.text = "";
      	}
      else
        {
          printLog("Skip clearing case input values and reset barcode trigger");
          barcodeTrigger=false;
        }                  
      
    },
  
    launchBarcode:function(){
      printLog("launchBarcode for case");
      barcodeTrigger = true; 
      printLog("launchBarcode for case");
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
//          controllerScope.view.TextCase.text = (""+barcodedata.barcodestring).toUpperCase();
          this.view.TextCase.text = (""+barcodedata.barcodestring).toUpperCase();          
        }else if(kony.string.startsWith(platformName, "android", true)){
//          controllerScope.view.TextCase.text = androidScannedText.toUpperCase();
          this.view.TextCase.text = androidScannedText.toUpperCase();          
        }
        this.integrationCall();
      }
    },
    
  
    // When the Case text field is manually changed
    onDone:function()
    {      
      
//    var caseNumber = this.view.TextCase.text;                      //GWM20180731
      var rawCaseNumber = this.view.TextCase.text;                   //GWM20180731
      var caseNumber = rawCaseNumber.replace(/\s+/g, '');            //GWM20180731
      
      
      
      if(caseNumber===null || caseNumber==="")
      {
        return;
      }
      else
        {
          this.integrationCall();
        }  
    },
  
 	integrationCall:function()
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
           data.qname = glbSAPUNAME.toUpperCase();
           data.activity = "MOVE CASE";

           WMGetReprintLabel(data, this.successCallback.bind(this), function(err){
             dismissLoadingScreen();  
             alert("Error invoking integration call:"+JSON.stringify(err));        
              });
        }  
   },     
  
   successCallback:function(res){  
     var sapResponse;     
     var data = [];
     glb_WM_REPLAB_CASE = "";
     printLog("FM Reprint Case Return");
     if(res.WM_REPLAB_SCAN_CASE!==null)      
        { 
          printLog("FM reprint Case Success");
          var working = JSON.parse(res.WM_REPLAB_SCAN_CASE);
          var ZWM_REPLAB_CASE = working.ZWM_BTB_MOVE;
          glb_WM_REPLAB_CASE = working.ZWM_BTB_MOVE;          
          if(ZWM_REPLAB_CASE!== undefined)
         	 {
                printLog("ZWM_REPLAB_CASE structure:"+JSON.stringify(ZWM_REPLAB_CASE));               
                var msgty = ZWM_REPLAB_CASE.MSGTY;
                var error = ZWM_REPLAB_CASE.ERROR;                             
                printLog("msgty ="+msgty);
                printLog("error ="+error);
               if (msgty == "E")
                {
                  alert(error); 
                  dismissLoadingScreen();                  
                } 
               else
                {                  
                  //check for a section and get drawing                  
                  if (ZWM_REPLAB_CASE.ZEINR !== "" && ZWM_REPLAB_CASE.ZEINR !== null && 
                      ZWM_REPLAB_CASE.ZEINR !== " " && ZWM_REPLAB_CASE.ZEINR !== undefined )
                    {
                       var section = ZWM_REPLAB_CASE.ZEINR.toUpperCase(); 
                       printLog("get section drawing="+section);
                       this.getSectionDrawing(section);                      
                    }
                  else
                    {
                       printLog("No section drawing");
                       dismissLoadingScreen();          
                       navigateToForm("frmReprintLabel");
                    }
               }
            }
         }
       else
         {
          printLog("FM Reprint Case Returns Null");
          alert("Case Retrieval Failed");
          dismissLoadingScreen();              
         }
  	 }, 
  
//  retrieve the section drawing
//*************** note on section bitmaps **************** 
//* For reasons unknown, the section bitmap will only display
//* when read from cache.  New section bitmaps must be written
//* to cache and then extracted for display on the screen.  
//*************** note on section bitmaps ****************  
    getSectionDrawing:function(sectionName)
  	{ 
       printLog("Retrieving cache image for:"+sectionName);
       var cacheBinary = getImageCache(sectionName);
       //printLog("ImageCache length for "+sectionName+":"+cacheBinary.length);
       if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
       {
         printLog("ImageCache found");
         printLog("imagecachelength="+cacheBinary.length); 
         dismissLoadingScreen();          
         navigateToForm("frmReprintLabel");
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
         dismissLoadingScreen();          
         navigateToForm("frmReprintLabel");              
         }, 
         //Error callback          
         function(res){ 
         printLog("Error callback for drawing:"+sectionName); 
         dismissLoadingScreen();          
         navigateToForm("frmReprintLabel");            
         });       
       }      
	}, 
 
 });