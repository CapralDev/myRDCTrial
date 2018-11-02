var barcodeTrigger = false;
define({ 

 //Type your controller code here 
    preShow:function()
    {
      this.view.LabelmyRDC.text = glbbuildname;
            // reset barcode 
      printLog("Preshow:Barcode trigger for new location:"+barcodeTrigger);
      if(!barcodeTrigger)
      	{
        	printLog("Preshow:Clear input values for new location");
        	this.view.TextNewLocation.text = "";
      	}
      else
        {
          printLog("Skip clearing new location input values and reset barcode trigger");
          barcodeTrigger=false;
        }        
      
	//set all values and clear input fields
      printLog("preshow moveloose");
      displayLoadingScreen("get material details ...");
      this.view.LabelFromLocationNumber.text = glbMLSFromLocation;
      this.view.LabelMatnr.text = glbMLSactiveMaterial.STOCK.MATNR.toString();
      this.view.LabelMaktx.text = glbMLSactiveMaterial.STOCK.MAKTX;
      this.view.LabelBismt.text = glbMLSactiveMaterial.STOCK.BISMT;
      this.view.LabelWrkst.text = glbMLSactiveMaterial.STOCK.WRKST;
      this.view.LabelVerme.text = glbMLSactiveMaterial.STOCK.VERME;
      this.view.LabelMeins.text = glbMLSactiveMaterial.STOCK.MEINS;      
      this.view.LabelBrgew.text = glbMLSactiveMaterial.STOCK.BRGEW.toString();
      this.view.LabelGewei.text = glbMLSactiveMaterial.STOCK.GEWEI;
      this.view.LabelQtyTMUnit.text = glbMLSactiveMaterial.STOCK.MEINS;         //GWM20180803 
      this.view.TextQuantityToMove.text = "";
      this.view.TextNewLocation.text = "";
      this.view.ImageBitmap.base64 = glbMLSactiveMaterial.ImageBitmap.base64;
      
/* skipping ccheck and get for section drwaing as below "getSectionDrawing" function does not find an image, ie cacheBinary returned is "null"
      //check for a section and get drawing                  
      if (glbMLSactiveMaterial.STOCK.ZEINR !== "" && glbMLSactiveMaterial.STOCK.ZEINR !== null && glbMLSactiveMaterial.STOCK.ZEINR !== undefined)
        {
          var section = glbMLSactiveMaterial.STOCK.ZEINR.toUpperCase(); 
          printLog("get section drawing="+section);
          this.getSectionDrawing(section);                      
        }
      else
        {
          this.view.ImageBitmap = {"base64":""};             
        }
printLog("view image"+JSON.stringify(this.view.ImageBitmap));
*/
      
	  dismissLoadingScreen();                    
    },

    locationLaunchBarcode:function(){
      printLog("launchBarcode for new location");
      barcodeTrigger = true; 
      printLog("launchBarcode for new location");
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
          this.view.TextNewLocation.text = (""+barcodedata.barcodestring).toUpperCase().trim();          
        }else if(kony.string.startsWith(platformName, "android", true)){
          this.view.TextNewLocation.text = androidScannedText.toUpperCase().trim();          
        }
      }
    },  
    
  onClickConfirm:function(quantity, newlocation)
  	{
      printLog("New Location="+newlocation);
      if(newlocation ===null|| newlocation ==="" ||newlocation === undefined)
      	{
          alert("Please enter a New Location.");
          return;
      	}
      else
        {
          var newlocationup = newlocation.toUpperCase().trim();
          if (newlocationup == glbMLSFromLocation)
            {
          	 alert("Please enter a different location.");
          	 return;              
            }
      else
        {
          if (quantity <= 0 || quantity > glbMLSactiveMaterial.STOCK.VERME)
            {
          	  alert("Quantity must not be less than or equal zero and must not be greater than available stock");
              this.view.TextQuantityToMove.setFocus(true);
          	  return;             
            }
      	 else
           {
            displayLoadingScreen("Processing..."); 
             
          	//populate SAP structure
            // pad the material number with leading zeros
           	var str = "" + glbMLSactiveMaterial.STOCK.MATNR;
           	var pad = "000000000000000000";
           	var Matnr = pad.substring(0, pad.length - str.length) + str;
             
          	var data = {};     
          	data.lgnum = glbSAPLGNUM;
            data.lgtyp = glbMLSactiveMaterial.STOCK.LGTYP;
            data.lgpla = glbMLSactiveMaterial.STOCK.LGPLA;
            data.matnr = Matnr;
          	data.werks = glbMLSactiveMaterial.STOCK.WERKS;
          	data.lgort = glbMLSactiveMaterial.STOCK.LGORT;
          	data.charg = glbMLSactiveMaterial.STOCK.CHARG;
          	data.bestq = glbMLSactiveMaterial.STOCK.BESTQ;
          	data.sobkz = glbMLSactiveMaterial.STOCK.SOBKZ;
          	data.sonum = glbMLSactiveMaterial.STOCK.SONUM;
          	data.lenum = " ";  
          	data.maktx = null;
          	data.wrkst = null;
          	data.bismt = null;
          	data.ferth = null;
            data.zeinr = null;
            data.meins = glbMLSactiveMaterial.STOCK.MEINS;
            data.gesme = null;
            data.verme = null;
            data.brgew = null;
            data.gewei = null;
            data.conf_qty = quantity;
          	data.conf_lgpla = newlocationup;
            data.qname = glbSAPUNAME.toUpperCase();
            data.activity = "MOVE LOC";
          	//call move location posting function
          	WMMoveLocation(data, this.successCallback.bind(this), function(err){
             dismissLoadingScreen();  
             alert("Error invoking integration call:"+JSON.stringify(err));        
              });          
        }
      }
      }
    },
  
  
   successCallback:function(res){  
//     var sapResponse;     
//     var data = [];
     printLog("FM Move Location Return");
     if(res.WM_BTB_MOVE_LOCATION!==null)      
        { 
          // return msgty = S for success and E for error?          
          printLog("FM Move Location has not returned null");
          printLog("Move Location result ="+JSON.stringify(res.WM_BTB_MOVE_LOCATION));          
          var working = JSON.parse(res.WM_BTB_MOVE_LOCATION);
          var ZWM_BTB_CONF = working.ZWM_BTB_CONF;
          var MSGTY = ZWM_BTB_CONF.MSGTY.toUpperCase();
          var ERROR = ZWM_BTB_CONF.ERROR;
          printLog("Move Location conf ="+JSON.stringify(ZWM_BTB_CONF)); 
          if(MSGTY == "S")
         	 {
                // posting success? 
                printLog("Success="+ERROR);
                alert(ERROR);
                dismissLoadingScreen();
                navigateToForm("frmMoveLooseInit");             
             }            
          else
             {
                // posting error                           
                printLog("Error ="+MSGTY+" "+ERROR);
                alert(ERROR); 
                dismissLoadingScreen();             
             }
         }
       else
         {
          // posting failed? 
          printLog("FM Move Location Returns Null");
          alert("ERROR: Move Location Failed");
          dismissLoadingScreen();
         }
  	 },   
 
  
/*  
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
printLog("ImageCache length for "+sectionName+":"+cacheBinary);
       if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
       {
         printLog("ImageCache found");
         printLog("imagecachelength="+cacheBinary.length);
//         this.view.ImageBitmap.base64 = cacheBinary;
         this.view.ImageBitmap = {"base64":cacheBinary};
       }     
	},
*/  
  
  checkQuantity:function()
  {
    var chk = Number(this.view.TextQuantityToMove.text);
    if (isNaN(chk))
    {
        alert("invalid quantity - please re-enter");
        this.view.TextQuantityToMove.text = null;
        this.view.TextQuantityToMove.setFocus(true);
      }
  }
 });