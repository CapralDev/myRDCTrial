define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_fe04092fe082435c88c6d924fd2bd608: function AS_Label_fe04092fe082435c88c6d924fd2bd608(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPutAframe");
        ntf.navigate();
    },
    /** onRowClick defined for SegmentScrapRsn **/
    AS_Segment_h7f595f9f55745afacbf8237dd27033c: function AS_Segment_h7f595f9f55745afacbf8237dd27033c(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.onRowClick();
    },
    /** preShow defined for frmScrapRsn **/
    AS_Form_icd109f9a2fd4e63a0bb039abe86591c: function AS_Form_icd109f9a2fd4e63a0bb039abe86591c(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});