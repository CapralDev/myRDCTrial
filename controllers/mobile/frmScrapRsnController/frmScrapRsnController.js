
define({ 

 //Type your controller code here 
    preShow:function()
    {
        this.view.LabelmyRDC.text = glbbuildname;
        var data = [];
        this.view.SegmentScrapRsn.removeAll();
        displayLoadingScreen("Retrieving Scrap Codes ...");      
     	if(glb_WM_BTB_DIFF !== undefined && glb_WM_BTB_DIFF !== null && glb_WM_BTB_DIFF !== "")
          {
            var record = {};
            printLog("Scrap Reason Code Count:"+glb_WM_BTB_DIFF.length);
            //single item, not array
            if(glb_WM_BTB_DIFF.length === undefined)
              {
                 printLog("glb_WM_BTB_DIFF Structure:"+JSON.stringify(glb_WM_BTB_DIFF));
                 record = {};
                 record.LabelRsnInd = glb_WM_BTB_DIFF.KZDIF.toString();
                 record.LabelRsnText = glb_WM_BTB_DIFF.DTEXT;  
                 record.LabelRightArrow = ">";
                 // append the structure to the table
                 data.push(record);                               
              }
            else
              {
                 printLog("glb_WM_BTB_DIFF Table:"+JSON.stringify(glb_WM_BTB_DIFF));                
              	 for(i=0;i<glb_WM_BTB_DIFF.length; i++)
           			 {
             		   record = {};
                       record.LabelRsnInd = glb_WM_BTB_DIFF[i].KZDIF.toString();
                       record.LabelRsnText = glb_WM_BTB_DIFF[i].DTEXT;
                 	   record.LabelRightArrow = ">";                       
                       // append the structure to the table                      
                       data.push(record);                                                            
            		 }
           	  }
            this.view.SegmentScrapRsn.addAll(data);
          }
        else
          {
          	alert("Error Listing Scrap Codes");            
          }
        dismissLoadingScreen();     
    
  
    },
  
  onRowClick:function()
  {
    var selectedRow = this.view.SegmentScrapRsn.selectedRowItems;
    glbKZDIF = selectedRow[0].LabelRsnInd; 
    printLog("Selected scrap reason="+selectedRow[0].LabelRsnInd);
//  navigateToForm("frmPutAframe");        //GWM20180903 
    navigateToForm(glbScrapForm);          //GWM20180903     
  },   
 
 });