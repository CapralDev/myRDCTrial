define({ 

 //Type your controller code here 
 preShow:function(WM_ENQ_STOCK)
    {
      var data = [];
      var lgpla = "";
      this.view.SegmentBinList.removeAll();
      printLog("WM_ENQ_STOCK BIN entries ="+WM_ENQ_STOCK.length);      
      if (WM_ENQ_STOCK.length > 0)
        {
            for(i=0;i<WM_ENQ_STOCK.length; i++)
            	{
                	printLog("WM_ENQ_STOCK:"+JSON.stringify(WM_ENQ_STOCK[i]));
                	lgpla = WM_ENQ_STOCK[i].LGPLA;
                    record = {};
                 
                    record.LabelMaterial = "Material:";                       
                    record.LabelCase = "Case:";
                    record.LabelArrow = ">";
                    record.Labelindex = i;
                    record.LabelQtyStock = "Qty in Stock:";
                    record.LabelQtyAvail = "Available:";                 
                    record.LabelMATNR = WM_ENQ_STOCK[i].MATNR.toString();
                    record.LabelMAKTX = WM_ENQ_STOCK[i].MAKTX;
                    record.LabelLENUM = WM_ENQ_STOCK[i].LENUM.toString();                  
                    record.LabelGESME = WM_ENQ_STOCK[i].GESME;                  
                    record.LabelVERME = WM_ENQ_STOCK[i].VERME;
//                  record.ImageBitmap = WM_ENQ_STOCK[i].BITMAP;                           
                    if (WM_ENQ_STOCK[i].ZEINR !== "" && 
                        WM_ENQ_STOCK[i].ZEINR !== " " &&                        
                        WM_ENQ_STOCK[i].ZEINR !== null &&
                        WM_ENQ_STOCK[i].ZEINR !== undefined )
                      {
                         //try and retrieve from cache
                         printLog("bin enquiry drawing = none");
                         var drawingID = WM_ENQ_STOCK[i].ZEINR.toUpperCase();   
                         var cacheBinary = getImageCache(drawingID);
                         if (cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
                           { 
                             record.ImageBitmap = {"base64":cacheBinary}; 
                           } 
                         else
                           {
                             record.ImageBitmap = {"base64":""};                               
                           }
                      }
                    else
                      {
                         record.ImageBitmap = {"base64":""};                        
                      }                      
//                    record.LabelColour = " ";
//                    record.LabelColour.opacity=0;
                    // check for warning colour                   
                    if (WM_ENQ_STOCK[i].S_STATUS !== " " &&
                        WM_ENQ_STOCK[i].S_STATUS !== null &&
                        WM_ENQ_STOCK[i].S_STATUS !== undefined &&
                        WM_ENQ_STOCK[i].S_STATUS !== "")
                      {
                          printLog("s_status="+WM_ENQ_STOCK[i].S_STATUS);
                          record.LabelColour = " ";                        
//                        record.LabelColour.opacity=30;                
                      }  
                    if (WM_ENQ_STOCK[i].B_STATUS !== " " &&
                        WM_ENQ_STOCK[i].B_STATUS !== null &&
                        WM_ENQ_STOCK[i].B_STATUS !== undefined &&
                        WM_ENQ_STOCK[i].B_STATUS !== "")
                      {
                          printLog("b_status="+WM_ENQ_STOCK[i].B_STATUS); 
                          record.LabelColour = " ";                          
//                        record.LabelColour.opacity=30;                
                      } 
                    if (WM_ENQ_STOCK[i].I_STATUS !== " " &&
                        WM_ENQ_STOCK[i].I_STATUS !== null &&
                        WM_ENQ_STOCK[i].I_STATUS !== undefined &&
                        WM_ENQ_STOCK[i].I_STATUS !== "")
                      {
                          printLog("i_status="+WM_ENQ_STOCK[i].I_STATUS);
                          record.LabelColour = " ";                          
//                        record.LabelColour.opacity=30;                
                      }                    
                    printLog("bitmap="+WM_ENQ_STOCK[i].BITMAP);
                    // append the structure to the table 
                    printLog("append bin record"+i);                       
                    data.push(record);                                    
                    
                }
        } 
            printLog("load screen frmBinEnquiry");
            var isANumber = isNaN(lgpla) === false;
            if (isANumber)
              {
                this.view.LabelLGPLA.text = lgpla.toString();
              }
            else
              {
                this.view.LabelLGPLA.text = lgpla;                
              }
            this.view.SegmentBinList.addAll(data); 
            dismissLoadingScreen();       
     },
  
 onRowClick:function()
  {
    var selectedRow = this.view.SegmentBinList.selectedRowItems;  
//  glb_WM_ENQ_STOCK1 = {};
    glb_WM_ENQ_STOCK1 = "";
    var rowindex = selectedRow[0].Labelindex;
    if (glb_WM_ENQ_STOCK.length > 0)
      {
        for(i=0;i<glb_WM_ENQ_STOCK.length; i++)
          {
            printLog("glb_WM_ENQ_STOCK:"+JSON.stringify(glb_WM_ENQ_STOCK[i]));
            if (i == rowindex)
              {
                printLog("glb_WM_ENQ_STOCK:"+JSON.stringify(glb_WM_ENQ_STOCK[i]));                
                glb_WM_ENQ_STOCK1 = glb_WM_ENQ_STOCK[i];
              }                    
          }
        if (glb_WM_ENQ_STOCK1 !== undefined && glb_WM_ENQ_STOCK1 !== null &&
            glb_WM_ENQ_STOCK1 !== "")
          {
//          goto the stock detail screen  
            glbStockEnqForm = "frmBinEnquiry";
            dismissLoadingScreen();
            navigateToForm("frmStockEnquiryDet");             
          }
      } 
 
  },
  
 });