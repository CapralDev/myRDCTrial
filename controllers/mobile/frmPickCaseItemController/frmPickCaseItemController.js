var barcodeTrigger = false;
define({ 
  
 //Type your controller code here 
    preShow:function()
    {
      this.view.LabelmyRDC.text = glbbuildname;
		//Clear barcode scan trigger
      
      printLog("Preshow:Barcode trigger for case:"+barcodeTrigger);
      if(!barcodeTrigger)
      	{
        	printLog("Preshow:Clear input values for case");
      		this.view.TextScanCaseNum.text = " ";
      	}
      else
        {
          printLog("Skip clearing case input values and reset barcode trigger");
          barcodeTrigger=false;
        }           
      
      printLog("Preshow PickCaseItem");     
      printLog("Preshow glb_WM_BTB_REPLEN="+JSON.stringify(glb_WM_BTB_REPLEN));       
      displayLoadingScreen("Retrieving data ...");  
     
      //container1 (source bin)
      this.view.LabelFromLocationNum.text = glb_WM_BTB_REPLEN.VLPLA.toUpperCase(); 
      //container2 (source case) & barcode scan button
      this.view.LabelPickCaseNum.text = glb_WM_BTB_REPLEN.VLENR.toString();
      this.view.TextScanCaseNum.text = " ";
      //container3 (material)
      this.view.LabelMaterialNum.text = glb_WM_BTB_REPLEN.MATNR.toString(); 
      this.view.LabelMaterialText.text = glb_WM_BTB_REPLEN.MAKTX;
      this.view.LabelMaterialOld.text = glb_WM_BTB_REPLEN.BISMT;      
      this.view.LabelMaterialBasic.text = glb_WM_BTB_REPLEN.WRKST;       
      //container4 (quantity)
      this.view.LabelCaseQtyNum.text = glb_WM_BTB_REPLEN.VSOLA.toFixed(3);     
      this.view.LabelCaseQtyUnit.text = glb_WM_BTB_REPLEN.MEINS;
      this.view.LabelCaseQtyKg.text = glb_WM_BTB_REPLEN.GEWEI;
      printLog("weight="+glb_WM_BTB_REPLEN.BRGEW);
      printLog("TO="+glb_WM_BTB_REPLEN.TANUM);
      printLog("TO Item="+glb_WM_BTB_REPLEN.TAPOS);      
//      this.view.LabelCaseQtyWeight.text = glb_WM_BTB_REPLEN.BRGEW.toFixed(3);
      this.view.LabelCaseQtyWeight.text = glb_WM_BTB_REPLEN.BRGEW.toString();           
      //container5 (section bitmap)      
      //container6 (Destination)
      this.view.LabelToLocationNum.text = glb_WM_BTB_REPLEN.NLPLA.toUpperCase();       
      //container7 (Ticket = TO number) & confirm button        
      this.view.LabelTONum.text = glb_WM_BTB_REPLEN.TANUM.toString();
      this.view.LabelTOPos.text = glb_WM_BTB_REPLEN.TAPOS.toString();          

      //get the section drawing
      if (glb_WM_BTB_REPLEN.ZEINR !== null && glb_WM_BTB_REPLEN.ZEINR !== "" && glb_WM_BTB_REPLEN.ZEINR !== undefined)
        {
         	this.getSectionDrawing(glb_WM_BTB_REPLEN.ZEINR);
        }
      else
        {
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
         	this.view.ImageItemDrawing.base64 = cacheBinary; 
         	dismissLoadingScreen();            
       	}
      else
        {
            this.view.ImageItemDrawing.base64 = "";                       
//          this.view.ImageItemDrawing = {"base64":""};          
         	dismissLoadingScreen();          
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
          this.view.TextScanCaseNum.text = (""+barcodedata.barcodestring).toUpperCase();          
        }else if(kony.string.startsWith(platformName, "android", true)){
          this.view.TextScanCaseNum.text = androidScannedText.toUpperCase();          
        }
		// no automated process after case barcode is scanned
      }
    },  
  
    onClickConfirm:function()
	{
		// check that required and scanned case number is the same
        var scancase = this.view.TextScanCaseNum.text;
        var pickcase = this.view.LabelPickCaseNum.text;
//      var trimscancase = scancase.trim();               //GWM20180731
        var trimscancase = scancase.replace(/\s+/g, '');  //GWM20180731                               
        var trimpickcase = pickcase.trim(); 
        printLog("Scan Case="+trimscancase);
        printLog("Pick Case="+trimpickcase);        
		if (trimscancase !== trimpickcase)      
          {
          	alert("Error: Scanned Case is not the same as the Pick Case.");
            return;
          }
        else
          {
            // scan and pick case is the same - confirm the pick
      		displayLoadingScreen("Confirming the TO ..."); 
            printLog("Confirm Case Pick ="+glb_WM_BTB_REPLEN.VLENR);          
            //zero fill the case number
            var todata = {};     
            var str = "" +glb_WM_BTB_REPLEN.VLENR;
            var pad = "00000000000000000000";
            var lenum = pad.substring(0, pad.length - str.length) + str;
            //populate SAP structure
            todata.W_UNAME = glbSAPUNAME.toUpperCase();
            todata.LGNUM = glb_WM_BTB_REPLEN.LGNUM.toString();
            todata.TANUM = glb_WM_BTB_REPLEN.TANUM.toString();
            todata.TAPOS = glb_WM_BTB_REPLEN.TAPOS.toString();            
            todata.VLTYP = glb_WM_BTB_REPLEN.VLTYP;
            todata.VLPLA = glb_WM_BTB_REPLEN.VLPLA;
            todata.MATNR = glb_WM_BTB_REPLEN.MATNR;
            todata.MAKTX = glb_WM_BTB_REPLEN.MAKTX;
            todata.WRKST = glb_WM_BTB_REPLEN.WRKST;
            todata.BISMT = glb_WM_BTB_REPLEN.BISMT;
            todata.FERTH = glb_WM_BTB_REPLEN.FERTH;
            todata.ZEINR = glb_WM_BTB_REPLEN.ZEINR;
            todata.VLENR = lenum;
            todata.VSOLA = glb_WM_BTB_REPLEN.VSOLA;
            todata.MEINS = glb_WM_BTB_REPLEN.MEINS;
            todata.BRGEW = glb_WM_BTB_REPLEN.BRGEW;
            todata.GEWEI = glb_WM_BTB_REPLEN.GEWEI;
            todata.NLTYP = glb_WM_BTB_REPLEN.NLTYP;
            todata.NLPLA = glb_WM_BTB_REPLEN.NLPLA;
            todata.DELETE = " ";         
            //call confirm TO function
            WMRepPickConfirm(todata, this.reppickSuccess.bind(this), function(err){
               dismissLoadingScreen();  
               alert("Error invoking integration call:"+JSON.stringify(err));        
                });          
             
          }
	},
  
  
    reppickSuccess:function(res){
      kony.print("reppickSuccess["+JSON.stringify(res)+"]");
//      var sapResponse;      
//      var lockdata = [];
    
      if(res.WM_BTB_REPPICK_CONF !== null)     
        { 
          // return msgty = S for success and E for error?          
          printLog("FM Confirm Replenish Pick Case has not returned null");
          printLog("Pick Case result ="+JSON.stringify(res.WM_BTB_REPPICK_CONF));          
          var working = JSON.parse(res.WM_BTB_REPPICK_CONF);
          var ZWM_BTB_CONF = working.ZWM_BTB_CONF;
          var MSGTY = ZWM_BTB_CONF.MSGTY.toUpperCase();
          var ERROR = ZWM_BTB_CONF.ERROR;
          printLog("Confirm Replenish Pick result ="+JSON.stringify(ZWM_BTB_CONF)); 
          if(MSGTY == "S")
         	 {
                // posting success? 
                printLog("RepPick Confirmed="+ERROR);
                alert(ERROR);
                dismissLoadingScreen();
                navigateToForm("frmPickCaseList");             
             }            
          else
             {
                // posting error                           
                printLog("RepPick Confirmation Error ="+MSGTY+" "+ERROR);
                alert(ERROR); 
                dismissLoadingScreen();             
             }
         }
       else
         {
          // posting failed? 
          printLog("FM RepPick Confirmation Returns Null");
          alert("ERROR: Replenish from Case Failed");
          dismissLoadingScreen();
         }            
  },    
  
  returnToTOList:function()
  {  
    // lock the record in SAP      
    printLog("UnLock Case Item");            
    displayLoadingScreen("Returning to TO List ...");
    controllerScope = this;
    var unlockrecord = {};
    unlockrecord.W_UNAME = glbSAPUNAME.toUpperCase();
    unlockrecord.W_LGNUM = glb_WM_BTB_REPLEN.LGNUM.toString();
    unlockrecord.W_TANUM = glb_WM_BTB_REPLEN.TANUM.toString();
    unlockrecord.W_TAPOS = glb_WM_BTB_REPLEN.TAPOS.toString();
      
    WMGetUnlockTO(unlockrecord, controllerScope.onUnlockSuccess.bind(this), function(err){
    dismissLoadingScreen();  
    alert("Error invoking integration call:"+JSON.stringify(err));
       });      
  },
  
    onUnlockSuccess:function(res){
      kony.print("onUnlockSuccess["+JSON.stringify(res)+"]");
//      var sapResponse;      
//      var lockdata = [];
    
      if(res.WM_UNLOCK_TO !== null)
        {                  
          var unlock_working = JSON.parse(res.WM_UNLOCK_TO);
          var unlock_ZWM_BTB_CONF = unlock_working.ZWM_BTB_CONF;
          var unlock_msgty = unlock_ZWM_BTB_CONF.MSGTY;
          var unlock_error = unlock_ZWM_BTB_CONF.ERROR;                             
          printLog("unlock msgty ="+unlock_msgty);
          printLog("unlock error ="+unlock_error);          
          printLog("WM_UNLOCK_TO:"+JSON.stringify(unlock_working));          
 
//        message type S indicates lock success          
          if (unlock_msgty !== "S")
          	{
                alert("TO UnLock Failed.");
                dismissLoadingScreen();               
                navigateToForm("frmPickCaseList");              
            } 
          else
            {
                dismissLoadingScreen(); 
    			navigateToForm("frmPickCaseList");        
      		}
        }
      else
        {
          alert("TO UnLock Failed.");
          dismissLoadingScreen();           
          navigateToForm("frmPickCaseList");                     
        }      
  },
  

  returnToMainMenu:function()
  {  
    // lock the record in SAP      
    printLog("UnLock MM Case Item");            
    displayLoadingScreen("Returning to Main Menu ...");
    controllerScope = this;
    var unlockMMrecord = {};
    unlockMMrecord.W_UNAME = glbSAPUNAME.toUpperCase();
    unlockMMrecord.W_LGNUM = glb_WM_BTB_REPLEN.LGNUM.toString();
    unlockMMrecord.W_TANUM = glb_WM_BTB_REPLEN.TANUM.toString();
    unlockMMrecord.W_TAPOS = glb_WM_BTB_REPLEN.TAPOS.toString();
      
    WMGetUnlockTO(unlockMMrecord, controllerScope.onUnlockMMSuccess.bind(this), function(err){
    dismissLoadingScreen();  
    alert("Error invoking integration call:"+JSON.stringify(err));
       });      
  },
  
    onUnlockMMSuccess:function(res){
      kony.print("onUnlockMMSuccess["+JSON.stringify(res)+"]");
//      var sapResponse;      
//      var lockdata = [];
    
      if(res.WM_UNLOCK_TO !== null)
        {                  
          var unlockMM_working = JSON.parse(res.WM_UNLOCK_TO);
          var unlockMM_ZWM_BTB_CONF = unlockMM_working.ZWM_BTB_CONF;
          var unlockMM_msgty = unlockMM_ZWM_BTB_CONF.MSGTY;
          var unlockMM_error = unlockMM_ZWM_BTB_CONF.ERROR;                             
          printLog("unlockMM msgty ="+unlockMM_msgty);
          printLog("unlockMM error ="+unlockMM_error);          
          printLog("WM_UNLOCK_TO:"+JSON.stringify(unlockMM_working));          
 
//        message type S indicates lock success          
          if (unlockMM_msgty !== "S")
          	{
                alert("TO UnLock Failed.");
                dismissLoadingScreen();              
                navigateToForm("frmMenuMain");              
            } 
          else
            {
                dismissLoadingScreen();              
    			navigateToForm("frmMenuMain");        
      		}
        }
      else
        {
          alert("TO UnLock Failed.");
          dismissLoadingScreen();           
          navigateToForm("frmMenuMain");                     
        }      
  },  

 });