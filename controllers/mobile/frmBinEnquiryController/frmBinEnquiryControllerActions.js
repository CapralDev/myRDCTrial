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
    AS_Label_fccc7e25aa8e47b8a7a4aed4c2f5fbef: function AS_Label_fccc7e25aa8e47b8a7a4aed4c2f5fbef(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmStockEnquiry");
        ntf.navigate();
    },
    /** onRowClick defined for SegmentBinList **/
    AS_Segment_af65feaeb6244926a425ba1b313f3dc7: function AS_Segment_af65feaeb6244926a425ba1b313f3dc7(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** preShow defined for frmBinEnquiry **/
    AS_Form_eb270bc057e44f199212f77f48fe0b2c: function AS_Form_eb270bc057e44f199212f77f48fe0b2c(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.view.LabelmyRDC.text = glbbuildname;
        this.preShow(glb_WM_ENQ_STOCK);
    },
    /** onDeviceBack defined for frmBinEnquiry **/
    AS_Form_aefe7144a9aa4c24b2125269635340c2: function AS_Form_aefe7144a9aa4c24b2125269635340c2(eventobject) {
        var self = this;
    }
});