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
    AS_Label_fdaba1e725e7429b8f176d30210f5070: function AS_Label_fdaba1e725e7429b8f176d30210f5070(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuBtoB");
        ntf.navigate();
    },
    /** onRowClick defined for SegmentCaseList **/
    AS_Segment_dc59a764e7e84158ad787e6c2026692e: function AS_Segment_dc59a764e7e84158ad787e6c2026692e(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** preShow defined for frmPickCaseList **/
    AS_Form_d3e38af4383e47aea9a08da3ed1ec68a: function AS_Form_d3e38af4383e47aea9a08da3ed1ec68a(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});