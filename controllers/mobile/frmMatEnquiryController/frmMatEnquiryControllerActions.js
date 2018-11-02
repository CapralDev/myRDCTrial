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
    AS_Label_b07156f0892a4cadaf70f867ae492b43: function AS_Label_b07156f0892a4cadaf70f867ae492b43(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmStockEnquiry");
        ntf.navigate();
    },
    /** onRowClick defined for SegmentMatList **/
    AS_Segment_eb267637c55e43eeb0d3f2ffb97e2ed6: function AS_Segment_eb267637c55e43eeb0d3f2ffb97e2ed6(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** preShow defined for frmMatEnquiry **/
    AS_Form_acc1bca53c9c4a698f9a47115aea74cf: function AS_Form_acc1bca53c9c4a698f9a47115aea74cf(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.view.LabelmyRDC.text = glbbuildname;
        this.preShow(glb_WM_ENQ_STOCK);
    }
});