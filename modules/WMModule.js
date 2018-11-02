//Type your code here
   var controllerScope = null;
//*********************** Start of Code for Georg **********************
   function WMGetCase(data, successCallback, errorCallback)
    {
  /*
       "data" is the structure of items for reading SAP
       The structure consist of the following:    
       lenum   		- Case Number
       qname        - SAP Username
       activity     - "MOVE CASE"
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBSCANCASE";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMBTBSCANCASE");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){

           alert(JSON.stringify(e));
           printLog("FM Scan Case Failed");         

       }
    }
      
   function WMMoveCase(data, successCallback, errorCallback)
    {
  /*
       "data" is the structure of items for posting in SAP
       "data = glb_WM_BTB_MOVE    
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBMOVECASE";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMMoveCase");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){
           printLog("FM Move Case Failed");
           alert(JSON.stringify(e));
         

       }
    } 

	function WMGetReplenishPickList(data, successCallback, errorCallback)
	{
/*
       "data" is the SAP username
       "data = glbSAPUNAME    
*/
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBREPPICKGETTO";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMGetReplenishPickList");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){
           printLog("FM Replenish from Case Failed");
           alert(JSON.stringify(e));
         

       }      
    }

	function WMRepPickConfirm(data, successCallback, errorCallback)
	{
/*
       "data" is the SAP username and SAP structure ZWM_OPEN_TO    
*/
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBREPPICKCONF";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMGetRepPickConfirm");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){
           printLog("FM Replenish Confirmation Failed");
           alert(JSON.stringify(e));
         

       }      
    }


	function WMGetLockTO(data, successCallback, errorCallback)
	{
/*
       "data" is the lockrecord
       "data" = W_UNAME, W_LGNUM, W_TANUM, W_TAPOS    
*/
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMLOCKTO";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMGetLockTO");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){
           printLog("FM Lock TO Failed");
           alert(JSON.stringify(e));
         

       }      
    }

	function WMGetUnlockTO(data, successCallback, errorCallback)
	{
/*
       "data" is the lockrecord
       "data" = W_UNAME, W_LGNUM, W_TANUM, W_TAPOS    
*/
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMUNLOCKTO";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMGetUnlockTO");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){
           printLog("FM Unlock TO Failed");
           alert(JSON.stringify(e));
         

       }      
    }

   function WMGetRepCase(data, successCallback, errorCallback)
    {
  /*
       "data" is the structure of items for reading SAP
       The structure consist of the following:    
       lenum   		- Case Number
       qname        - SAP Username
       activity     - "MOVE CASE"
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBREPPUTSCAN";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMBTBREPPUTSCAN");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){

           alert(JSON.stringify(e));
           printLog("FM Scan Replenish Case Failed");         

       }
    }

   function WMPutAframe(data, successCallback, errorCallback)
    {
  /*
       "data" is the structure of items for replenishing A-frame in SAP
       The structure consist of the following:
       W_UNAME      - SAP Username
       ZWM_CONF_TO  - input structure
       ZWM_BTB_CONF - output structure
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBREPPUTCONF";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMBTBREPPUTCONF");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){

           alert(JSON.stringify(e));
           printLog("FM Put into A-frame Failed");         

       }
    }


   function WMStockEnquiry(data, successCallback, errorCallback)
    {
  /*
       "data" is the stock enquiry structure in SAP
       The function module consists of the following:
       ZWM_ENQ_SCAN_SEL - input structure
       ZWM_ENQ_CONF     - error structure
	   ZWM_ENQ_STOCK    - output structure   
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMENQSCANSTK";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMENQSCANSTK");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){

           alert(JSON.stringify(e));
           printLog("FM Stock Enquiry Failed");         

       }
    }

   function WMGetReprintLabel(data, successCallback, errorCallback)
    {
  /*
       "data" is the structure of items for reading SAP
       The structure consist of the following:    
       lenum   		- Case Number
       qname        - SAP Username
       activity     - "MOVE CASE"
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMREPLABSCANCASE";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMREPLABSCANCASE");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){

           alert(JSON.stringify(e));
           printLog("FM Scan Case Failed");         

       }
    }
      
   function WMPrintLabel(data, successCallback, errorCallback)
    {
  /*
       "data" is the structure of items for posting in SAP
       "data = glb_WM_BTB_MOVE    
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMREPLABPRINT";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMPrintLabel");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){
           printLog("FM Print Label");
           alert(JSON.stringify(e));
         
       }
    } 

//*********************** End of Code for Georg **********************
//*********************** Start of Code for Liz **********************
   var glbMLSFromLocation = null;
   var glbMLSactiveMaterial = {};
   var glbMLSMaterialList = [];
   var glbMLSskipselection = false;

   function WMGetFromLocation(data, successCallback, errorCallback)
    {
  /*
       "data" is the structure of items for reading SAP
       The structure consist of the following:    
       lgpla   		- Storage Bin
       qname        - SAP Username
       activity     - "MOVE LOC"
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBSCANLOCATION";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMBTBSCANLOCATION");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){

           alert(JSON.stringify(e));
           printLog("FM Scan From Location Failed");         

       }
    }

   function WMMoveLocation(data, successCallback, errorCallback)
	{
  /*
       "data" is the structure of items for posting in SAP
  */      
       printLog("About to call service:"+glbIntegrationServiceName);
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getWMBTBMOVELOCATION";
       var params = data;
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance(); 
       
       try{
          printLog("Inside WMMoveLocation");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);    
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback);         

       }catch(e){
           printLog("FM Move Location Failed");
           alert(JSON.stringify(e));

       }
    }

//*********************** End of Code for Liz **********************