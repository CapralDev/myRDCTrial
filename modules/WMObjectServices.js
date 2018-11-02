//Type your code here



function getBinaryContent(binaryname, successcallback, errcallback){
  printLog("launching getBinaryContent");
  var objSvc = kony.sdk.getCurrentInstance().getObjectService(glbObjectServiceName, {"access":"online"});
  var dataObject = new kony.sdk.dto.DataObject("media");
  //primary key details to get media object
  dataObject.addField("name", binaryname);

  objSvc.getBinaryContent(
    {"dataObject":dataObject, "binaryAttrName": "data"}, successcallback, errcallback);
  
}