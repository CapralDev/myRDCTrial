define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_fc54e27795d94653be1c820b3462dd63: function AS_Label_fc54e27795d94653be1c820b3462dd63(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuBtoB");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_a72038a461594256a40229b683e4903e: function AS_Image_a72038a461594256a40229b683e4903e(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onDone defined for TextFromLocation **/
    AS_TextField_e22589f4309e4457b6a079ae2a3f920c: function AS_TextField_e22589f4309e4457b6a079ae2a3f920c(eventobject, changedtext) {
        var self = this;
        this.integrationCall();
    },
    /** onTouchStart defined for ImageLocationBarcode **/
    AS_Image_eeef955e3b6b41ef92113142118c47bc: function AS_Image_eeef955e3b6b41ef92113142118c47bc(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** preShow defined for frmMoveLooseInit **/
    AS_Form_c7bb07817a5546938aedfbc835751587: function AS_Form_c7bb07817a5546938aedfbc835751587(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toFixed(0);
        this.preShow();
    }
});