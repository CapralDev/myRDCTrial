var barcodeTrigger = false;
define({ 

 //Type your controller code here 
    preShow:function(data)
    {
      this.view.LabelmyRDC.text = glbbuildname;
      // reset barcode 
      printLog("Preshow:Barcode trigger for location:"+barcodeTrigger);
      if(!barcodeTrigger)
      	{
        	printLog("Preshow:Clear input values for location");
        	this.view.TextNewLocation.text = "";
      	}
      else
        {
          printLog("Skip clearing location input values and reset barcode trigger");
          barcodeTrigger=false;
        }        
      // fill form with detail
        displayLoadingScreen("Read case ...");
        printLog("preshow section="+data.ZEINR);
        printLog("preshow section length="+data.ZEINR.length);
    	//check for a section and get drawing       
        if (data.ZEINR !== " " && data.ZEINR !== null && data.ZEINR !== undefined && data.ZEINR !=="")
        	{
             	var section = data.ZEINR.toUpperCase(); 
                printLog("get section drawing="+section);
                this.getSectionDrawing(section);                      
            }
        else
          {
                printLog("clear section drawing");
                this.view.ImageBitmap.base64 = "";                  
//              this.view.ImageBitmap = {"base64":""};             
          }
//set all values
      printLog("Set all values="+data);  
//      if(typeof data.MATNR == "number")
      this.view.LabelMatnr.text = data.MATNR.toString();      
      this.view.LabelMaktx.text = data.MAKTX;
      this.view.LabelBismt.text = data.BISMT;
      this.view.LabelWrkst.text = data.WRKST;
      this.view.LabelCaseQtyNum.text = data.VSOLA.toFixed(3);
      this.view.LabelCaseQtyUnit.text = data.MEINS;      
      this.view.LabelCaseWtNum.text = data.BRGEW.toFixed(3);
      this.view.LabelRecommendedBin.text = data.NLPLA;
      this.view.TextNewLocation.text = "";
      this.view.LabelCaseNumber.text = data.LENUM.toString();
      dismissLoadingScreen();                    
      
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
//          controllerScope.view.TextNewLocation.text = (""+barcodedata.barcodestring).toUpperCase();
          this.view.TextNewLocation.text = (""+barcodedata.barcodestring).toUpperCase();          
        }else if(kony.string.startsWith(platformName, "android", true)){
//          controllerScope.view.TextNewLocation.text = androidScannedText.toUpperCase();
          this.view.TextNewLocation.text = androidScannedText.toUpperCase();          
        }
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
         this.view.ImageBitmap.base64 = cacheBinary; 
       }
       else
       {     
         this.view.ImageBitmap.base64 = "";            
//       this.view.ImageBitmap = {"base64":""};          
       }
	},
  
	onClickConfirm:function(casenum, newbin)
  	{
      displayLoadingScreen("Processing case ..."); 
      printLog("New Bin="+newbin);
      if(newbin ===null|| newbin ==="" ||newbin === undefined)
      	{
          alert("Please enter a New Location.");
//          return;
          navigateToForm("frmMoveCase");
      	}
      else
        {           
          //populate SAP structure
          var data = {};     
          var str = "" +casenum;
          var pad = "00000000000000000000";
          var lenum = pad.substring(0, pad.length - str.length) + str;  
          var noblanknewbin = newbin.replace(/\s+/g, '');            //GWM20180731
//        var newbinup = newbin.toUpperCase();                       //GWM20180731
          var newbinup =  noblanknewbin.toUpperCase();               //GWM20180731          
          data.lenum = lenum;
          data.lgnum = glbSAPLGNUM;
          data.matnr = " ";
          data.maktx = " ";
          data.wrkst = " ";
          data.bismt = " ";
          data.ferth = " ";
          data.zeinr = " ";
          data.vsola = " ";
          data.meins = " ";  
          data.brgew = " ";
          data.gewei = " ";
          data.nltyp = " ";
          data.nlpla = " ";          
          data.conf_nlpla = newbinup;
          data.qname = glbSAPUNAME.toUpperCase();
          data.activity = "MOVE CASE";
          data.msgty = " ";   
          data.error = " ";          
          //call move case posting function
          WMMoveCase(data, this.successCallback.bind(this), function(err){
             dismissLoadingScreen();  
             alert("Error invoking integration call:"+JSON.stringify(err));        
              });          
 
        }
    },
  
  
   successCallback:function(res){  
//     var sapResponse;     
//     var data = [];
     printLog("FM Move Case Return");
     if(res.WM_BTB_MOVE_CASE!==null)      
        { 
          // return msgty = S for success and E for error?          
          printLog("FM Move Case has not returned null");
          printLog("Move Case result ="+JSON.stringify(res.WM_BTB_MOVE_CASE));          
          var working = JSON.parse(res.WM_BTB_MOVE_CASE);
          var ZWM_BTB_CONF = working.ZWM_BTB_CONF;
          var MSGTY = ZWM_BTB_CONF.MSGTY.toUpperCase();
          var ERROR = ZWM_BTB_CONF.ERROR;
          printLog("Move Case result ="+JSON.stringify(ZWM_BTB_CONF)); 
          if(MSGTY == "S")
         	 {
                // posting success? 
                printLog("Success="+ERROR);
                alert(ERROR);
                dismissLoadingScreen();
                navigateToForm("frmMoveCaseInit");             
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
          printLog("FM Move Case Returns Null");
          alert("ERROR: Move Case Failed");
          dismissLoadingScreen();
         }
  	 },   
 
 });