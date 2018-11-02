define({ 

 //Type your controller code here 
    preShow:function(data)
    {
  		this.view.LabelmyRDC.text = glbbuildname;
    },
  
    MMIntegrationCall:function()
    {
      printLog("SAP Username ="+glbSAPUNAME);   
      
      if(glbSAPUNAME ===null|| glbSAPUNAME ==="" )
      {
          alert("Missing SAP Username");
          return;
      }
      else
        {            
      displayLoadingScreen("Please Wait ...");
       controllerScope = this;
       activeUser = glbSAPUNAME; 
      
        CSGetUserDetails(activeUser, controllerScope.MMSuccessCallback.bind(this), function(err){
         dismissLoadingScreen();  
         alert("Error invoking integration call:"+JSON.stringify(err));        
          });
        }
      
   
   },     
  
   MMSuccessCallback:function(res){    
      var sapResponse;     
      var data = []; 
    
     if(res.CS_MYRDC_USER_DETAIL!==null)      
        {                  
          var working = JSON.parse(res.CS_MYRDC_USER_DETAIL);
          var _RETURN = working._RETURN;          
          printLog("Full User Name="+working.NAME_TEXTC);
//        store the full longname
          glbSAPLONGNAME = working.NAME_TEXTC;
          this.view.LabelUname.text = working.NAME_TEXTC;
//        store the default warehouse          
          glbSAPLGNUM = working.LGNUM;
          this.view.LabelLgnum.text = working.LGNUM; 
          this.view.LabelLgnum.text = glbSAPLGNUM.toString();          
          dismissLoadingScreen();                     
               
         if (_RETURN!==undefined && _RETURN.MESSAGE!=="")
          {
               alert(_RETURN.MESSAGE); 
          }  
        }         

  }, 
  
 });