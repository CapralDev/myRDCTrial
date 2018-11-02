define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_bca8099947ae4f63a7d7347c8606f8b1: function AS_Label_bca8099947ae4f63a7d7347c8606f8b1(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMoveLooseInit");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_jb0386f99551457d94e3d1e275ba8b25: function AS_Image_jb0386f99551457d94e3d1e275ba8b25(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onDone defined for TextQuantityToMove **/
    AS_TextField_b6e0ff52c0ad4476965f436934e22f9c: function AS_TextField_b6e0ff52c0ad4476965f436934e22f9c(eventobject, changedtext) {
        var self = this;
        this.checkQuantity();
    },
    /** onTouchStart defined for ImageNewLocationBarcode **/
    AS_Image_d7a863a1d8e34e84aebfee1678f4d71c: function AS_Image_d7a863a1d8e34e84aebfee1678f4d71c(eventobject, x, y) {
        var self = this;
        this.locationLaunchBarcode();
    },
    /** onClick defined for ButtonConfirmBin **/
    AS_Button_b469cc5d09924cac9b81212c6e94b900: function AS_Button_b469cc5d09924cac9b81212c6e94b900(eventobject) {
        var self = this;
        this.onClickConfirm(this.view.TextQuantityToMove.text, this.view.TextNewLocation.text);
    },
    /** preShow defined for frmMoveLoose **/
    AS_Form_j954d325cefd4583aa824ec2ddbb2565: function AS_Form_j954d325cefd4583aa824ec2ddbb2565(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toFixed(0);
        printLog("calling preshow");
        this.preShow();
    }
});