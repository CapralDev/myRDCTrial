define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for BackArrow **/
    AS_Label_g0617bd354b843e78ea0bae121462bb0: function AS_Label_g0617bd354b843e78ea0bae121462bb0(eventobject, x, y) {
        var self = this;
        this.returnToTOList();
    },
    /** onTouchStart defined for BackToMenuMain **/
    AS_Image_b81dd411e1c84091b4aa8da3bbc868c5: function AS_Image_b81dd411e1c84091b4aa8da3bbc868c5(eventobject, x, y) {
        var self = this;
        this.returnToMainMenu();
    },
    /** onClick defined for ButtonConfirm **/
    AS_Button_ffda89b94759409fbac5e4c133bacb2c: function AS_Button_ffda89b94759409fbac5e4c133bacb2c(eventobject) {
        var self = this;
        this.onClickConfirm();
    },
    /** preShow defined for frmPickCaseItem **/
    AS_Form_g31ad44b3f964d7dab370217f7ed8063: function AS_Form_g31ad44b3f964d7dab370217f7ed8063(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    },
    /** onDeviceBack defined for frmPickCaseItem **/
    AS_Form_e603d680679b48e8b23978ae88d34572: function AS_Form_e603d680679b48e8b23978ae88d34572(eventobject) {
        var self = this;
        this.returnToTOList();
    }
});