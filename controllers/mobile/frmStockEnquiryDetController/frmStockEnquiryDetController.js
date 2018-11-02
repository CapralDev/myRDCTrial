define({ 

 //Type your controller code here 
 preShow:function(WM_ENQ_STOCK1)
    {   
      printLog("stock detail structure="+JSON.stringify(WM_ENQ_STOCK1));
//    Bin details 
      var isANumber = isNaN(WM_ENQ_STOCK1.LGTYP) === false;
      if (isANumber)
        {
          this.view.LabelLGTYP.text = WM_ENQ_STOCK1.LGTYP.toString();
        }
      else
        {
         this.view.LabelLGTYP.text = WM_ENQ_STOCK1.LGTYP; 
        } 
      var isANumber2 = isNaN(WM_ENQ_STOCK1.LGPLA) === false;
      if (isANumber2)
        {
          this.view.LabelLGPLA.text = WM_ENQ_STOCK1.LGPLA.toString();
        }
      else
        {
         this.view.LabelLGPLA.text = WM_ENQ_STOCK1.LGPLA; 
        }              
//    Case details
      this.view.LabelLENUM.text = WM_ENQ_STOCK1.LENUM.toString();
      var isANumber3 = isNaN(WM_ENQ_STOCK1.CHARG) === false;
      if (isANumber3)
      {
        this.view.LabelCHARG.text = WM_ENQ_STOCK1.CHARG.toString();
      }
      else
      {
      this.view.LabelCHARG.text = WM_ENQ_STOCK1.CHARG;               
      }      
//    Material details
      this.view.LabelMATNR.text = WM_ENQ_STOCK1.MATNR.toString();
      this.view.LabelMAKTX.text = WM_ENQ_STOCK1.MAKTX;
      this.view.LabelBISMT.text = WM_ENQ_STOCK1.BISMT;
      this.view.LabelWRKST.text = WM_ENQ_STOCK1.WRKST;       
//    Drawing     
      printLog("ZEINR="+WM_ENQ_STOCK1.ZEINR);
      if (WM_ENQ_STOCK1.ZEINR !== "" && WM_ENQ_STOCK1.ZEINR !== " " && 
          WM_ENQ_STOCK1.ZEINR !== null && WM_ENQ_STOCK1.ZEINR !== undefined )
        {
          var zeinr = WM_ENQ_STOCK1.ZEINR.toUpperCase();
          var cacheBinary = getImageCache(zeinr);  
          if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
           {
             this.view.ImageBitmap.base64 = cacheBinary; 
           }
           else
           {            
             this.view.ImageBitmap.base64 = "";                               
           }           
        }
      else
        { 
          this.view.ImageBitmap.base64 = "";            
        }
//    Quantity details
      this.view.LabelGESME.text = WM_ENQ_STOCK1.GESME;  
      this.view.LabelMGEWI.text = WM_ENQ_STOCK1.MGEWI.toString();
      this.view.LabelVERME.text = WM_ENQ_STOCK1.VERME;
      this.view.LabelEINME.text = WM_ENQ_STOCK1.EINME;      
//    Stock details
      var isANumber4 = isNaN(WM_ENQ_STOCK1.WERKS) === false;
      if (isANumber4)
        {      
          this.view.LabelWERKS.text = WM_ENQ_STOCK1.WERKS.toString();
        }
      else
        {
          this.view.LabelWERKS.text = WM_ENQ_STOCK1.WERKS;          
        }
      this.view.LabelLGORT.text = WM_ENQ_STOCK1.LGORT.toString();
      this.view.LabelSONUM.text = WM_ENQ_STOCK1.SONUM;      
      printLog("B Status ="+WM_ENQ_STOCK1.B_STATUS);
      printLog("S Status ="+WM_ENQ_STOCK1.S_STATUS);
      printLog("I Status ="+WM_ENQ_STOCK1.I_STATUS);      
//    remove background colour if not applicable       
      if(WM_ENQ_STOCK1.B_STATUS ===null|| WM_ENQ_STOCK1.B_STATUS ===" "||
         WM_ENQ_STOCK1.B_STATUS ===""|| WM_ENQ_STOCK1.B_STATUS === undefined)
        {           
          this.view.LabelBStatus.opacity=0;             
        }
      else
        {
          this.view.LabelBStatus.text = WM_ENQ_STOCK1.B_STATUS;
          this.view.LabelBStatus.opacity=100;           
        }
      if(WM_ENQ_STOCK1.S_STATUS ===null|| WM_ENQ_STOCK1.S_STATUS ===" "|| 
         WM_ENQ_STOCK1.S_STATUS ===""||  WM_ENQ_STOCK1.S_STATUS === undefined)
        {        
          this.view.LabelSStatus.opacity=0;
        }
      else
        {
          this.view.LabelSStatus.text = WM_ENQ_STOCK1.S_STATUS;
          this.view.LabelSStatus.opacity=100;
        }
      if(WM_ENQ_STOCK1.I_STATUS ===null|| WM_ENQ_STOCK1.I_STATUS ===" "|| 
         WM_ENQ_STOCK1.I_STATUS ===""|| WM_ENQ_STOCK1.I_STATUS === undefined)
        {         
          this.view.LabelIStatus.opacity=0;
        }
      else
        {
          this.view.LabelIStatus.text = WM_ENQ_STOCK1.I_STATUS; 
          this.view.LabelIStatus.opacity=100;          
        }
      dismissLoadingScreen();
     },
  
  return:function(StockEnqForm)
  {
     printLog("return to:"+StockEnqForm);
     navigateToForm(StockEnqForm);  
  },

 });