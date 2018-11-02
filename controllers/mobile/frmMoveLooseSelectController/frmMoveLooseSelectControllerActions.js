define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_c88175389f4f4faca52293063b4bc5d9: function AS_Label_c88175389f4f4faca52293063b4bc5d9(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMoveLooseInit");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_b970cba00ed14bd29c8ed84f0da807df: function AS_Image_b970cba00ed14bd29c8ed84f0da807df(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onRowClick defined for SegmentMaterial **/
    AS_Segment_f6b1b070e2a54c61a1514555b68edaa9: function AS_Segment_f6b1b070e2a54c61a1514555b68edaa9(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** preShow defined for frmMoveLooseSelect **/
    AS_Form_fb73424be5c34191b3560ececbb0093a: function AS_Form_fb73424be5c34191b3560ececbb0093a(eventobject) {
        var self = this;
        printLog("calling preshow move loose select");
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toFixed(0);
        this.preShow();
    }
});