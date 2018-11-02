define({ 

 //Type your controller code here 
    preShow:function(data)
    {
      this.view.LabelmyRDC.text = glbbuildname;       
      // fill form with detail
        displayLoadingScreen("Read case ...");
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
      this.view.LabelMATNR.text = data.MATNR.toString();      
      this.view.LabelMAKTX.text = data.MAKTX;
      this.view.LabelBISMT.text = data.BISMT;
      this.view.LabelWRKST.text = data.WRKST;
      this.view.LabelVSOLA.text = data.VSOLA.toFixed(3);
      this.view.LabelMEINS.text = data.MEINS;      
      this.view.LabelBRGEW.text = data.BRGEW.toFixed(3);
      this.view.LabelNLPLA.text = data.NLPLA;
      this.view.LabelLENUM.text = data.LENUM.toString();
      dismissLoadingScreen();                        
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
  
	onClickPrint:function(casenum)
  	{
      displayLoadingScreen("Processing print ...");           
      //populate SAP structure
      var data = {};     
      var str = "" +casenum;
      var pad = "00000000000000000000";
      var lenum = pad.substring(0, pad.length - str.length) + str;                          
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
      data.conf_nlpla = " ";
      data.qname = glbSAPUNAME.toUpperCase();
      data.activity = "PRINTLABEL";
      data.msgty = " ";   
      data.error = " ";          
      //call print label function
      WMPrintLabel(data, this.successCallback.bind(this), function(err){
        dismissLoadingScreen();  
        alert("Error invoking integration call:"+JSON.stringify(err));        
      });          
         
    },
  
  
   successCallback:function(res){  
//     var sapResponse;     
//     var data = [];
     printLog("FM print Label Return");
     if(res.WM_REPLAB_PRINT!==null)      
        { 
          // return msgty = S for success and E for error?          
          printLog("FM print label has not returned null");
          printLog("print label result ="+JSON.stringify(res.WM_REPLAB_PRINT));          
          var working = JSON.parse(res.WM_REPLAB_PRINT);
          var ZWM_BTB_CONF = working.ZWM_BTB_CONF;
          var MSGTY = ZWM_BTB_CONF.MSGTY.toUpperCase();
          var ERROR = ZWM_BTB_CONF.ERROR;
          printLog("Print Label result ="+JSON.stringify(ZWM_BTB_CONF)); 
          if(MSGTY == "S" || MSGTY == "W")
         	 {
                // posting success? 
                printLog("Success="+ERROR);
                alert(ERROR);
                dismissLoadingScreen();
                navigateToForm("frmReprintLabelInit");             
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
          printLog("FM Print Label Returns Null");
          alert("ERROR: Print Label Failed");
          dismissLoadingScreen();
         }
  	 },   
 
 });