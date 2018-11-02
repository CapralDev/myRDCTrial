define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_i222a465a4854bf890ca31d219ec0479: function AS_Label_i222a465a4854bf890ca31d219ec0479(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuBtoB");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_ee5af65845594049807b423a531ad4bd: function AS_Image_ee5af65845594049807b423a531ad4bd(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onDone defined for TextCase **/
    AS_TextField_e151c54cce344de69595798bff378eea: function AS_TextField_e151c54cce344de69595798bff378eea(eventobject, changedtext) {
        var self = this;
        this.onDone();
    },
    /** onTouchStart defined for ImageCaseBarcode **/
    AS_Image_e816afaaa5ca43e199fc012a62bb644a: function AS_Image_e816afaaa5ca43e199fc012a62bb644a(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** preShow defined for frmPutAframeInit **/
    AS_Form_eb35032c1f3d4a01bd1031ced02174d3: function AS_Form_eb35032c1f3d4a01bd1031ced02174d3(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});