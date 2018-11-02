define({ 

 //Type your controller code here 

  
   preShow:function()
    {
      this.view.LabelmyRDC.text = glbbuildname;
	printLog("preshow movelooseselect");
      var segdata = [];
      
      this.view.SegmentMaterial.removeAll();
      this.view.LabelFromLocationNumber.text =  glbMLSFromLocation;
      
      // construct segments list for materail selection
      for(i=0;i<glbMLSMaterialList.length; i++)
    	  {
           var segrec = {};
           segrec.ImageBitmap = glbMLSMaterialList[i].ImageBitmap;
           // assuming selection index may not correspond to global stock table index, store index for later lookup
           segrec.LabelGlbIndex = i;
           segrec.LabelMATNR = glbMLSMaterialList[i].STOCK.MATNR.toString();
           segrec.LabelMAKTX = glbMLSMaterialList[i].STOCK.MAKTX;
           segrec.LabelGESME = glbMLSMaterialList[i].STOCK.GESME;
           segrec.LabelVERME = glbMLSMaterialList[i].STOCK.VERME;
           segrec.LabelMaterial = "Material";
           segrec.LabelQtyinstock = "Qty in stock:";
           segrec.Labelavailable = "Available to move:";
           segdata.push(segrec);
          }
                  
      this.view.SegmentMaterial.addAll(segdata);
    },

  onRowClick:function()
  {    
    var selectedRow = this.view.SegmentMaterial.selectedRowItems;
    var matindex = selectedRow[0].LabelGlbIndex;
    glbMLSactiveMaterial = {};
    glbMLSactiveMaterial = glbMLSMaterialList[matindex];
    navigateToForm("frmMoveLoose");
  },
  
 });  
