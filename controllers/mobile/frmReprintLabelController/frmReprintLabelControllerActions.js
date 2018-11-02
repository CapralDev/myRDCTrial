define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_f6e5bad8f6b54b89a5a12f1fb73a6a90: function AS_Label_f6e5bad8f6b54b89a5a12f1fb73a6a90(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReprintLabelInit");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_eee19b1ca7ea4bddb4ebe115a2706a2e: function AS_Image_eee19b1ca7ea4bddb4ebe115a2706a2e(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonPrint **/
    AS_Button_je41ad09d1954490bb8ace74928c408c: function AS_Button_je41ad09d1954490bb8ace74928c408c(eventobject) {
        var self = this;
        this.onClickPrint(this.view.LabelLENUM.text);
    },
    /** preShow defined for frmReprintLabel **/
    AS_Form_ib1063db6d0c486dbf3ae0cdd6814f04: function AS_Form_ib1063db6d0c486dbf3ae0cdd6814f04(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow(glb_WM_REPLAB_CASE);
    }
});