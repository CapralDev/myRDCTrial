define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ImageHome **/
    AS_Image_b4e162e6025e43519cd13305896811c5: function AS_Image_b4e162e6025e43519cd13305896811c5(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_ba12e7dddd64449da015f2c84c732013: function AS_Label_ba12e7dddd64449da015f2c84c732013(eventobject, x, y) {
        var self = this;
        this.
        return (glbStockEnqForm);
    },
    /** preShow defined for frmStockEnquiryDet **/
    AS_Form_a483198be372497b82c4ef1060451c4e: function AS_Form_a483198be372497b82c4ef1060451c4e(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.view.LabelmyRDC.text = glbbuildname;
        this.preShow(glb_WM_ENQ_STOCK1);
    }
});