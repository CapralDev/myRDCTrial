define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_d7eb16ea14dd4b959fce9485b8459e4d: function AS_Label_d7eb16ea14dd4b959fce9485b8459e4d(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuBtoB");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_b8266550177846fe8f6a953edd2c2ebf: function AS_Image_b8266550177846fe8f6a953edd2c2ebf(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onDone defined for TextCase **/
    AS_TextField_e73f1171356d454eadd8b641ff24ae5f: function AS_TextField_e73f1171356d454eadd8b641ff24ae5f(eventobject, changedtext) {
        var self = this;
        this.onDone();
    },
    /** onTouchStart defined for ImageCaseBarcode **/
    AS_Image_i41ea1ff80da418b82d63de82811ff3a: function AS_Image_i41ea1ff80da418b82d63de82811ff3a(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** preShow defined for frmMoveCaseInit **/
    AS_Form_dfe0bc4e011042f2bafffed7e9e14ea7: function AS_Form_dfe0bc4e011042f2bafffed7e9e14ea7(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});