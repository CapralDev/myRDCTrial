//Type your code here
   var controllerScope = null;
//*********************** Start of Code for Georg **********************
   function CSGetUserDetails(Name, successCallback, errorCallback)
    {
      printLog("About to call service:"+glbIntegrationServiceName);
      printLog("user="+Name);      
       var integrationClient = null;
       var serviceName = glbIntegrationServiceName;
       var operationName = "getCSMYRDCUSERDETAIL";
       var params = { "UNAME" : Name }; 
       var headers = {};
       var sdkClient = new kony.sdk.getCurrentInstance();         
        
       try{
          printLog("Inside CSMYRDCUSERDETAIL");
          printLog("Params:"+JSON.stringify(params));
          printLog("sdkClient:"+sdkClient);             
          integrationClient = sdkClient.getIntegrationService(serviceName);
          integrationClient.invokeOperation(operationName, headers, params, successCallback , errorCallback); 

       }catch(e){

           alert(JSON.stringify(e));
           printLog("FM read failed"+Name);                

       } 
    }
//*********************** End of Code for Georg **********************


