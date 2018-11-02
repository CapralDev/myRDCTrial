define({ 

 //Type your controller code here 
 preShow:function(WM_ENQ_STOCK)
    {
//    get material details from first record      
      this.view.LabelMATNR.text = WM_ENQ_STOCK[0].MATNR.toString(); 
      this.view.LabelMAKTX.text = WM_ENQ_STOCK[0].MAKTX;  
      this.view.LabelBISMT.text = WM_ENQ_STOCK[0].BISMT;  
      this.view.LabelWRKST.text = WM_ENQ_STOCK[0].WRKST;
//    get material section drawing          
      if ( WM_ENQ_STOCK[0].ZEINR !== "" && WM_ENQ_STOCK[0].ZEINR !== " " &&  
           WM_ENQ_STOCK[0].ZEINR !== null &&  WM_ENQ_STOCK[0].ZEINR !== undefined)
        {         
          printLog("MatEnq, Retrieving cache image for:"+WM_ENQ_STOCK[0].ZEINR);
          var cacheBinary = getImageCache(WM_ENQ_STOCK[0].ZEINR.toUpperCase());
          //printLog("ImageCache length for "+sectionName+":"+cacheBinary.length);
          if(cacheBinary!==undefined && cacheBinary!==null && cacheBinary.length>0)
          {
            this.view.ImageBitmap.base64 = cacheBinary;           
          }
          else
          {
            printLog("MatEnq, ImageCache not found:"+WM_ENQ_STOCK[0].ZEINR);         
            this.view.ImageBitmap.base64 = "";                            
          }        
        }
      else
        {
          this.view.ImageBitmap.base64 = "";   
        } 
      var data = [];
      this.view.SegmentMatList.removeAll();
      printLog("WM_ENQ_STOCK MAT entries ="+WM_ENQ_STOCK.length);    
      if (WM_ENQ_STOCK.length > 0)
        {
          for(i=0;i<WM_ENQ_STOCK.length; i++)
          {
            printLog("WM_ENQ_STOCK:"+JSON.stringify(WM_ENQ_STOCK[i]));                  
            record = {};
            record.LabelLocation = "Location:";                       
            record.LabelCase = "Case:";
            record.LabelArrow = ">";
            record.Labelindex = i;
            record.LabelQtyStock = "Qty in Stock:";
            record.LabelQtyAvail = "Available:";                 
            record.LabelLENUM = WM_ENQ_STOCK[i].LENUM.toString();
            record.LabelLGPLA = WM_ENQ_STOCK[i].LGPLA.toString();                   
            record.LabelGESME = WM_ENQ_STOCK[i].GESME;                  
            record.LabelVERME = WM_ENQ_STOCK[i].VERME;                 
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
            // append the structure to the table 
            printLog("append mat record"+i);                       
            data.push(record);                                                        
          }
        }             
      printLog("load screen frmMatEnquiry");             
      this.view.SegmentMatList.addAll(data); 
      dismissLoadingScreen();                       
      
  },  
  
 onRowClick:function()
  {
    var selectedRow = this.view.SegmentMatList.selectedRowItems;  
//  glb_WM_ENQ_STOCK1 = {};
    glb_WM_ENQ_STOCK1 = "";
    var rowindex = selectedRow[0].Labelindex;
    if (glb_WM_ENQ_STOCK.length > 0)
      {
        for(i=0;i<glb_WM_ENQ_STOCK.length; i++)
          {
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
            glbStockEnqForm = "frmMatEnquiry";
            dismissLoadingScreen();
            navigateToForm("frmStockEnquiryDet");             
          }
      } 
 
  },
 });