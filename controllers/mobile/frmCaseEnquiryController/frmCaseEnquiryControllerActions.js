define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ImageHome **/
    AS_Image_e5d5270a3e5e408d9c4634b512b2f239: function AS_Image_e5d5270a3e5e408d9c4634b512b2f239(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for BackArrow **/
    AS_Label_c4a16ce90beb46328a829f4d3fa71172: function AS_Label_c4a16ce90beb46328a829f4d3fa71172(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmStockEnquiry");
        ntf.navigate();
    },
    /** onRowClick defined for SegmentBinList **/
    AS_Segment_af09ce297a9640318715122002c238a1: function AS_Segment_af09ce297a9640318715122002c238a1(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** preShow defined for frmCaseEnquiry **/
    AS_Form_ac739c56d6fd4197ab8f7307ffcbeb1d: function AS_Form_ac739c56d6fd4197ab8f7307ffcbeb1d(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.view.LabelmyRDC.text = glbbuildname;
        this.preShow(glb_WM_ENQ_STOCK);
    },
    /** onDeviceBack defined for frmCaseEnquiry **/
    AS_Form_aca1291aa70f43f4ae2501a26de4062c: function AS_Form_aca1291aa70f43f4ae2501a26de4062c(eventobject) {
        var self = this;
    }
});