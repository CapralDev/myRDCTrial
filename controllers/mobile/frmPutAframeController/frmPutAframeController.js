var barcodeTrigger = false;
define({ 

 //Type your controller code here
    preShow:function(data, diff)
    { 
      glbScrapForm = "frmPutAframe";
      this.view.LabelmyRDC.text = glbbuildname;
      // reset barcode 
      printLog("Preshow:Barcode trigger for A-Frame location:"+barcodeTrigger);
      if(!barcodeTrigger)
      	{
        	printLog("Preshow:Clear input values for A-frame location");
//        	this.view.TextNewLocation.text = "";
      	}
      else
        {
          printLog("Skip clearing A-frame location input values and reset barcode trigger");
          barcodeTrigger=false;
        }        
      // fill form with detail
        displayLoadingScreen("Read case ...");      
    	//check for a section and get drawing     
        if (data.ZEINR !== "" && data.ZEINR !== null && data.ZEINR !== undefined)
        	{
             	var section = data.ZEINR.toUpperCase(); 
                printLog("get section drawing="+section);
                this.getSectionDrawing(section);                      
            }
        else
          {            
                this.view.ImageBitmap.base64 = "";            
//              this.view.ImageBitmap = {"base64":""};             
          }
//set all values     
      printLog("Set all values="+data);  
      this.view.LabelCaseNum.text = data.VLENR.toString();
      this.view.LabelMatnr.text = data.MATNR.toString();      
      this.view.LabelMaktx.text = data.MAKTX;
      this.view.LabelBismt.text = data.BISMT;
      this.view.LabelWrkst.text = data.WRKST;
      this.view.LabelReqQtyNum.text = data.VSOLA.toFixed(3);
      this.view.LabelItemQtyUnit.text = data.MEINS;      
      this.view.LabelItemWtNum.text = data.BRGEW.toFixed(3);
//      this.view.TextConfirmedQty.text = " ";
//      this.view.TextScrapQty.text = " "; 
//      this.view.TextScrapReason.text = " ";
      printLog("Scrap code="+glbKZDIF);      
      if(glbKZDIF !== null)
        {
      	  this.view.TextScrapReason.text = glbKZDIF;
        }
      this.view.LabelToLocationNum.text = data.NLPLA.toUpperCase();
//      this.view.TextNewLocation.text = " "; 
      this.view.LabelTONum.text = data.TANUM.toString();  
      this.view.LabelTOItem.text = data.TAPOS.toString();      
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
	},
  
	onClickComplete:function()
  	{    
      displayLoadingScreen("Validating A-Frame Replenishment...");
      printLog("Complete A-frame function");      
      // trim all the entry text fields (remove white space)
      printLog("labelreqqty.text:"+this.view.LabelReqQtyNum.text);
      var ReqQtyTrim = (this.view.LabelReqQtyNum.text * 1);
      printLog("textconfirmedqty.text:"+this.view.TextConfirmedQty.text);
      var ConfirmQtyTrim;      
      if(this.view.TextConfirmedQty.text === null)
        {
        	ConfirmQtyTrim = 0;  
        }
      else
        {
            var ConfirmQtyRaw = this.view.TextConfirmedQty.text.replace(/\s+/g, '');   //GWM20180731
//        	ConfirmQtyTrim = (this.view.TextConfirmedQty.text * 1);                    //GWM20180731
            ConfirmQtyTrim = (ConfirmQtyRaw * 1);                                      //GWM20180731
          
        }
      printLog("textscrapqty.text:"+this.view.TextScrapQty.text);
      var ScrapQtyTrim;
      if(this.view.TextScrapQty.text === null)
        {
        	ScrapQtyTrim = 0;  
        }
      else
        {
            ScrapQtyRaw = this.view.TextScrapQty.text.replace(/\s+/g, '');            //GWM20180731
//        	ScrapQtyTrim = (this.view.TextScrapQty.text * 1);                         //GWM20180731
        	ScrapQtyTrim = (ScrapQtyRaw * 1);                                         //GWM20180731   
          
        }      
      // scrap reason code
      var ScrapRsn;
      var ScrapRsnTrim;      
      if(this.view.TextScrapReason.text === null)
        {
          	ScrapRsnTrim = " ";          
        }
      else
        {
          	ScrapRsn = this.view.TextScrapReason.text.toUpperCase();
      		ScrapRsnTrim = ScrapRsn.trim();            
        }
      // bin locations
      var ToLocation = this.view.LabelToLocationNum.text.toUpperCase();
      var ToLocationTrim = ToLocation.trim();          
      var NewLocation; 
      var NewLocationTrim;
      if( this.view.TextNewLocation.text === null)
        {
          	NewLocationTrim = " ";
        }
      else
        {
			NewLocation = this.view.TextNewLocation.text.toUpperCase();          
//     		NewLocationTrim = NewLocation.trim();                         //GWM20180731
            NewLocationTrim = NewLocation.replace(/\s+/g, '');            //GWM20180731
          
        }        
      printLog("ReqQtyTrim="+ReqQtyTrim);
      printLog("ConfirmQtyTrim="+ConfirmQtyTrim);
      printLog("ScrapQtyTrim="+ScrapQtyTrim);
      printLog("ToLocationTrim="+ToLocationTrim);
      printLog("NewLocationTrim="+NewLocationTrim);
      printLog("ScrapRsnTrim="+ScrapRsnTrim);      
      // validate the entered information
      this.performValidate(ReqQtyTrim, ConfirmQtyTrim, ScrapQtyTrim, ToLocationTrim, NewLocationTrim, ScrapRsnTrim);
    },
 
//  validate the A-frame replenishment details  
    performValidate:function(ReqQty, ConfirmQty, ScrapQty, ToLocation, NewLocation, ScrapRsn)
  	{
     	var errorCount = "0";
        var putdata = {}; 
      	printLog("validation before posting");
      	var TotalQty = ScrapQty + ConfirmQty;
        printLog("Total Quantity ="+TotalQty);
     	// Scrap qty + confirmed qty must equal requested qty      
        if(ReqQty !== TotalQty)
        	{
            	errorCount = errorCount + 1;
            	printLog("Incorrect Qty:"+ReqQty+":"+TotalQty);          
        		alert("Error: Full Case Quantity must be processed.");
            	dismissLoadingScreen();          
            	return; 
        	}
      	// If Scrap qty then must have a scrap reason
        printLog("Validate ScrapRsn ="+ScrapRsn);  
        printLog("Validate ScrapQty ="+ScrapQty);       
      	if(ScrapQty > 0)
        	{
        		if(ScrapRsn == " " || ScrapRsn === null)
              		{
              			errorCount = errorCount + 1;
                		printLog("Scrap Reason is blank:"+ScrapRsn);
        	    		alert("Error: Missing Scrap Reason Code.");
                		dismissLoadingScreen();                
                		return; 
             		}
          		else
              		{
              			//validate the scrap reason code
                		printLog("Read glb_WM_BTB_DIFF Table:"+JSON.stringify(glb_WM_BTB_DIFF));
                		var ScrapCode;
              			for(i=0;i<glb_WM_BTB_DIFF.length; i++)
           					{
                       			ScrapCode = glb_WM_BTB_DIFF[i].KZDIF.toUpperCase();
                       			if(ScrapCode == ScrapRsn)
                         			{
                           				putdata.KZDIF = ScrapCode;
                           				putdata.LGTYP = glb_WM_BTB_DIFF[i].LGTYP.toString();
                           				putdata.LGPLA = glb_WM_BTB_DIFF[i].LGPLA.toString();
                           				putdata.KZVPL = glb_WM_BTB_DIFF[i].KZVPL.toString();                           
                         			}                                                         
            		 		}
                        printLog("putdata.KZDIF ="+putdata.KZDIF);
                		if(putdata.KZDIF == " " || putdata.KZDIF === null || putdata.KZDIF === undefined)
                  			{
                  				errorCount = errorCount + 1;
                    			printLog("Invalid Scrap Reason:"+ScrapCode);
        	        			alert("Error: Invalid Scrap Reason Code.");
                    			dismissLoadingScreen();                    
                   				return; 
                  			}
              		}
        	}
    	// Destination Location must equal Scanned location
        // Only if the whole case is not being scrapped
        if(ReqQty == ScrapQty && ConfirmQty == "0")
          {
            	NewLocation = ToLocation;
          }
      	else
          {
          		if(ToLocation !== NewLocation)
        			{
            			errorCount = errorCount + 1;
            			printLog("Incorrect Bin:"+ToLocation+":"+NewLocation);
        				alert("Error: Incorrect Scanned Location.");
            			dismissLoadingScreen();          
            			return;
        			}   
          }
      	//
      	if(errorCount == "0")
        	{
                var str = "" + glb_WM_BTB_SCAN.VLENR;
                var pad = "00000000000000000000";
                var lenum = pad.substring(0, pad.length - str.length) + str;
            	putdata.VLENR = lenum; 
      			putdata.W_UNAME = glbSAPUNAME.toUpperCase();
            	putdata.LGNUM = glb_WM_BTB_SCAN.LGNUM; 
            	putdata.TANUM = glb_WM_BTB_SCAN.TANUM; 
            	putdata.TAPOS = glb_WM_BTB_SCAN.TAPOS;
            	putdata.CONF_QTY = ConfirmQty;
            	putdata.CONF_SCRAP = ScrapQty;
            	putdata.MEINS = glb_WM_BTB_SCAN.MEINS;
              	putdata.CONF_NLPLA = NewLocation;               
            	printLog("Comfirmed Structure:"+putdata);
//***********   start temporary code for testing
//***********   alert("Test: Reached Post A-frame Replenishment.");
//***********   dismissLoadingScreen();          
//***********   return;  
//***********   end temporary code for testing              
            	//call replenish A-frame post function
            	WMPutAframe(putdata, this.successCallback.bind(this), function(err){
               	dismissLoadingScreen();  
               	alert("Error invoking integration call:"+JSON.stringify(err));        
              });            
        	}
      	else
          {
          		printLog("Cannot Post - error count:"+errorCount);
        		alert("Error: Unable to Post A-frame Replenishment.");
            	dismissLoadingScreen();          
            	return;  
          }
    },
  
  
   successCallback:function(res){  
     printLog("FM Replenish A-frame Return");
     if(res.WM_BTB_REPPUT_CONF!==null)      
        { 
          // return msgty = S for success and E for error?          
          printLog("FM Replenish A-frame has not returned null");
          printLog("Replenish A-frame result ="+JSON.stringify(res.WM_BTB_REPPUT_CONF));          
          var working = JSON.parse(res.WM_BTB_REPPUT_CONF);
          var ZWM_BTB_CONF = working.ZWM_BTB_CONF;
          var MSGTY = ZWM_BTB_CONF.MSGTY.toUpperCase();
          var ERROR = ZWM_BTB_CONF.ERROR;
          printLog("Replenish A-frame result ="+JSON.stringify(ZWM_BTB_CONF)); 
          if(MSGTY == "S")
         	 {
                // posting success? 
                printLog("Success="+ERROR);
                alert(ERROR);
                dismissLoadingScreen();
            	this.view.TextNewLocation.text = "";
      			this.view.TextConfirmedQty.text = " ";
      			this.view.TextScrapQty.text = " "; 
      			this.view.TextScrapReason.text = " ";               
                navigateToForm("frmPutAframeInit");             
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
          printLog("FM Replenish A-frame Returns Null");
          alert("ERROR: Replenish A-frame Failed");
          dismissLoadingScreen();
         }
  	 },   
 
 });