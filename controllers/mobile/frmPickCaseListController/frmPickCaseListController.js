
define({ 
  
 //Type your controller code here 
    preShow:function()
    {
      this.view.LabelmyRDC.text = glbbuildname;
      glb_WM_BTB_REPLEN = {};
      this.view.SegmentCaseList.removeAll();       
      printLog("Preshow SegmentCaseList");            
      displayLoadingScreen("Retrieving data ...");
      controllerScope = this;
      var uname = {};
      uname.W_UNAME = glbSAPUNAME.toUpperCase();
      
      WMGetReplenishPickList(uname, controllerScope.onSuccessCallback.bind(this), function(err){
         dismissLoadingScreen();  
         alert("Error invoking integration call:"+JSON.stringify(err));
          });
     },

  
  onSuccessCallback:function(res){
      kony.print("onSuccessCallback["+JSON.stringify(res)+"]");
      var sapResponse;
      
      var data = [];
    
      if(res.WM_BTB_REPPICK_GET_TO !== null)
        {                  
          var working = JSON.parse(res.WM_BTB_REPPICK_GET_TO);
          var ZWM_BTB_CONF = working.ZWM_BTB_CONF;
          var ZWM_OPEN_TO = working.ZWM_OPEN_TO;
          var msgty = ZWM_BTB_CONF.MSGTY;
          var error = ZWM_BTB_CONF.ERROR;                             
          printLog("msgty ="+msgty);
          printLog("error ="+error);          
          printLog("WM_BTB_REPPICK_GET_TO:"+JSON.stringify(working));
          
          this.view.SegmentCaseList.removeAll();
 
//        message type S indicates success          
          if (msgty !== "S")
          	{
            	alert(error); 
                dismissLoadingScreen();                  
            } 
          
          if(ZWM_OPEN_TO !== undefined)
          {
            var record = {};
            printLog("ZWM_OPEN_TO length:"+ZWM_OPEN_TO.length);
            //single item, not array
            if(ZWM_OPEN_TO.length === undefined)
              {
                 printLog("ZWM_OPEN_TO structure:"+JSON.stringify(ZWM_OPEN_TO));
                 record = {};
                 record.LabelTO = "Ticket:";
                 record.LabelTONum = ZWM_OPEN_TO.TANUM.toString();
                 record.LabelTOPos = ZWM_OPEN_TO.TAPOS.toString();
                 record.LabelFromLocation = "Pick From Location:";
                 record.LabelFromLocationNum = ZWM_OPEN_TO.VLPLA;  
                 record.LabelKg = "Total Kg:";                  
                 record.LabelKgNum = ZWM_OPEN_TO.BRGEW.toFixed(3); 
                 record.LabelRightArrow = ">"; 
                 // add the remaining structure fields
                 record.LabelLGNUM = ZWM_OPEN_TO.LGNUM;
                 record.LabelTANUM = ZWM_OPEN_TO.TANUM;  
                 record.LabelVLTYP = ZWM_OPEN_TO.VLTYP; 
                 record.LabelVLPLA = ZWM_OPEN_TO.VLPLA;
                 record.LabelMATNR = ZWM_OPEN_TO.MATNR;
                 record.LabelMAKTX = ZWM_OPEN_TO.MAKTX;
                 record.LabelWRKST = ZWM_OPEN_TO.WRKST; 
                 record.LabelBISMT = ZWM_OPEN_TO.BISMT;  
                 record.LabelFERTH = ZWM_OPEN_TO.FERTH; 
                 record.LabelZEINR = ZWM_OPEN_TO.ZEINR; 
                 record.LabelVLENR = ZWM_OPEN_TO.VLENR;  
                 record.LabelVSOLA = ZWM_OPEN_TO.VSOLA;   
                 record.LabelMEINS = ZWM_OPEN_TO.MEINS;  
                 record.LabelGEWEI = ZWM_OPEN_TO.GEWEI;
                 record.LabelNLTYP = ZWM_OPEN_TO.NLTYP; 
                 record.LabelNLPLA = ZWM_OPEN_TO.NLPLA;                
                 // append the structure to the table
                 data.push(record);                               
              }
            else
              {
              	 for(i=0;i<ZWM_OPEN_TO.length; i++)
           			 {
             			record = {};
                        record.LabelTO = "Ticket:";                       
                        record.LabelTONum = ZWM_OPEN_TO[i].TANUM.toString();
                        record.LabelTOPos = ZWM_OPEN_TO[i].TAPOS.toString();  
                        record.LabelFromLocation = "Pick From Location:";                       
                        record.LabelFromLocationNum = ZWM_OPEN_TO[i].VLPLA.toUpperCase();
                        record.LabelKg = "Total Kg:";                         
                        record.LabelKgNum = ZWM_OPEN_TO[i].BRGEW.toFixed(3);
                        record.LabelRightArrow = ">";
                        // add the remaining structure fields
                        record.LabelLGNUM = ZWM_OPEN_TO[i].LGNUM;
                        record.LabelTANUM = ZWM_OPEN_TO[i].TANUM;  
                        record.LabelVLTYP = ZWM_OPEN_TO[i].VLTYP; 
                        record.LabelVLPLA = ZWM_OPEN_TO[i].VLPLA;
                        record.LabelMATNR = ZWM_OPEN_TO[i].MATNR;
                        record.LabelMAKTX = ZWM_OPEN_TO[i].MAKTX;
                        record.LabelWRKST = ZWM_OPEN_TO[i].WRKST; 
                        record.LabelBISMT = ZWM_OPEN_TO[i].BISMT;  
                        record.LabelFERTH = ZWM_OPEN_TO[i].FERTH; 
                        record.LabelZEINR = ZWM_OPEN_TO[i].ZEINR; 
                        record.LabelVLENR = ZWM_OPEN_TO[i].VLENR;  
                        record.LabelVSOLA = ZWM_OPEN_TO[i].VSOLA;   
                        record.LabelMEINS = ZWM_OPEN_TO[i].MEINS;  
                        record.LabelGEWEI = ZWM_OPEN_TO[i].GEWEI;
                        record.LabelNLTYP = ZWM_OPEN_TO[i].NLTYP; 
                        record.LabelNLPLA = ZWM_OPEN_TO[i].NLPLA;                        
                        // append the structure to the table                      
                        data.push(record);                                                            
            		 }
           	  }
            this.view.SegmentCaseList.addAll(data);
          }
        }
        dismissLoadingScreen();
  },
  
  onRowClick:function()
  {
    var selectedRow = this.view.SegmentCaseList.selectedRowItems;  
    glb_WM_BTB_REPLEN = {};
    // build the structure with the selected row data    
    // visible form fields
    glb_WM_BTB_REPLEN.TANUM = selectedRow[0].LabelTONum;
    glb_WM_BTB_REPLEN.TAPOS = selectedRow[0].LabelTOPos; 
    glb_WM_BTB_REPLEN.VLPLA = selectedRow[0].LabelFromLocationNum;
    glb_WM_BTB_REPLEN.BRGEW = selectedRow[0].LabelKgNum;    
    // hidden form fields
    glb_WM_BTB_REPLEN.LGNUM = selectedRow[0].LabelLGNUM; 
    glb_WM_BTB_REPLEN.VLTYP = selectedRow[0].LabelVLTYP; 
    glb_WM_BTB_REPLEN.MATNR = selectedRow[0].LabelMATNR;
    glb_WM_BTB_REPLEN.MAKTX = selectedRow[0].LabelMAKTX;
    glb_WM_BTB_REPLEN.WRKST = selectedRow[0].LabelWRKST; 
    glb_WM_BTB_REPLEN.BISMT = selectedRow[0].LabelBISMT;  
    glb_WM_BTB_REPLEN.FERTH = selectedRow[0].LabelFERTH; 
    glb_WM_BTB_REPLEN.ZEINR = selectedRow[0].LabelZEINR; 
    glb_WM_BTB_REPLEN.VLENR = selectedRow[0].LabelVLENR;  
    glb_WM_BTB_REPLEN.VSOLA = selectedRow[0].LabelVSOLA;   
    glb_WM_BTB_REPLEN.MEINS = selectedRow[0].LabelMEINS;  
    glb_WM_BTB_REPLEN.GEWEI = selectedRow[0].LabelGEWEI;
    glb_WM_BTB_REPLEN.NLTYP = selectedRow[0].LabelNLTYP; 
    glb_WM_BTB_REPLEN.NLPLA = selectedRow[0].LabelNLPLA; 
    
    // lock the record in SAP    
    printLog("Lock Case Item");            
    displayLoadingScreen("Retrieving Item data ...");
    controllerScope = this;
    var lockrecord = {};
    lockrecord.W_UNAME = glbSAPUNAME.toUpperCase();
    lockrecord.W_LGNUM = glb_WM_BTB_REPLEN.LGNUM.toString();
    lockrecord.W_TANUM = glb_WM_BTB_REPLEN.TANUM.toString();
    lockrecord.W_TAPOS = glb_WM_BTB_REPLEN.TAPOS.toString();
      
    WMGetLockTO(lockrecord, controllerScope.onLockSuccess.bind(this), function(err){
    dismissLoadingScreen();  
    alert("Error invoking integration call:"+JSON.stringify(err));
       });
 
  },    
    
    onLockSuccess:function(res){
      kony.print("onLockSuccess["+JSON.stringify(res)+"]");
//      var sapResponse;      
//      var lockdata = [];
    
      if(res.WM_LOCK_TO !== null)
        {                  
          var lock_working = JSON.parse(res.WM_LOCK_TO);
          var lock_ZWM_BTB_CONF = lock_working.ZWM_BTB_CONF;
          var lock_msgty = lock_ZWM_BTB_CONF.MSGTY;
          var lock_error = lock_ZWM_BTB_CONF.ERROR;                             
          printLog("lock msgty ="+lock_msgty);
          printLog("lock error ="+lock_error);          
          printLog("WM_LOCK_TO:"+JSON.stringify(lock_working));          
 
//        message type S indicates lock success          
          if (lock_msgty !== "S")
          	{
            	alert(lock_error); 
                dismissLoadingScreen();                  
            } 
          else
            {
    			//upload section drawing into cache
   				if ( glb_WM_BTB_REPLEN.ZEINR !== null &&  glb_WM_BTB_REPLEN.ZEINR !== "" && 
                     glb_WM_BTB_REPLEN.ZEINR !== undefined)
    			{
      				this.loadSectionToCache(glb_WM_BTB_REPLEN.ZEINR);
    			}
    			else
     			{
    				navigateToForm("frmPickCaseItem");        
      			}
   
    			printLog("glb_WM_BTB_REPLEN="+JSON.stringify(glb_WM_BTB_REPLEN));              
            }
        }
      else
        {
          alert("TO Lock Failed. Please select another TO");
          dismissLoadingScreen();           
        }
      
  }, 
     
  
  loadSectionToCache:function(sectionName)
  { 
    printLog("Retrieving cache image for:"+sectionName);
    var cacheBinary = getImageCache(sectionName);
    //printLog("ImageCache length for "+sectionName+":"+cacheBinary.length);
    if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
    {
      printLog("ImageCache found");
      printLog("imagecachelength="+cacheBinary.length); 
      navigateToForm("frmPickCaseItem");
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
        navigateToForm("frmPickCaseItem");        
      }, 
                       //Error callback          
                       function(res){ 
        printLog("Error callback for drawing:"+sectionName); 
        navigateToForm("frmPickCaseItem");        
      });       
    }      
  },   

 });