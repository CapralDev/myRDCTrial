define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_f2f7c7d9693d47d9a1f5cf87c7bacfcf: function AS_Label_f2f7c7d9693d47d9a1f5cf87c7bacfcf(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMoveCaseInit");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_gff484de30264fa9b812643d4ce7bf6a: function AS_Image_gff484de30264fa9b812643d4ce7bf6a(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonConfirmBin **/
    AS_Button_a2d65f4846794c6ca8437f9be04cf4e0: function AS_Button_a2d65f4846794c6ca8437f9be04cf4e0(eventobject) {
        var self = this;
        this.onClickConfirm(this.view.LabelCaseNumber.text, this.view.TextNewLocation.text);
    },
    /** onTouchStart defined for ImageLocationBarcode **/
    AS_Image_ad7657940c074fbc9a032ee12985541b: function AS_Image_ad7657940c074fbc9a032ee12985541b(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** preShow defined for frmMoveCase **/
    AS_Form_ca8aa339a3594b3ca12c475f4665364e: function AS_Form_ca8aa339a3594b3ca12c475f4665364e(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow(glb_WM_BTB_MOVE);
    }
});