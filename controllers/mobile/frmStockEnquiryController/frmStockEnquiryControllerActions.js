define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_ae2fa6884c2f473c8948382dfb5ecde1: function AS_Label_ae2fa6884c2f473c8948382dfb5ecde1(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_b4e162e6025e43519cd13305896811c5: function AS_Image_b4e162e6025e43519cd13305896811c5(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onDone defined for TextCase **/
    AS_TextField_d9c2727591554405a35d3644d5b3b4e9: function AS_TextField_d9c2727591554405a35d3644d5b3b4e9(eventobject, changedtext) {
        var self = this;
        this.onDoneCase();
    },
    /** onTouchStart defined for ImageCaseBarcode **/
    AS_Image_ic9d281025c74b4faffd95856f004f3c: function AS_Image_ic9d281025c74b4faffd95856f004f3c(eventobject, x, y) {
        var self = this;
        this.launchBarcodeCase();
    },
    /** onDone defined for TextMaterial **/
    AS_TextField_ge9f6ac339064943b21182ef4779c101: function AS_TextField_ge9f6ac339064943b21182ef4779c101(eventobject, changedtext) {
        var self = this;
        this.onDoneMat();
    },
    /** onTouchStart defined for ImageMaterialBarcode **/
    AS_Image_iae25f824aa643d5926f035c1908f5d6: function AS_Image_iae25f824aa643d5926f035c1908f5d6(eventobject, x, y) {
        var self = this;
        this.launchBarcodeMat();
    },
    /** onDone defined for TextBin **/
    AS_TextField_f81786902bfc49e3883e778715074be3: function AS_TextField_f81786902bfc49e3883e778715074be3(eventobject, changedtext) {
        var self = this;
        this.onDoneBin();
    },
    /** onTouchStart defined for ImageBinBarcode **/
    AS_Image_aa0e181fb2844d7aa697e845dbb7d43c: function AS_Image_aa0e181fb2844d7aa697e845dbb7d43c(eventobject, x, y) {
        var self = this;
        this.launchBarcodeBin();
    },
    /** preShow defined for frmStockEnquiry **/
    AS_Form_f1845636b1614b0f80f69f31eed9d604: function AS_Form_f1845636b1614b0f80f69f31eed9d604(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});