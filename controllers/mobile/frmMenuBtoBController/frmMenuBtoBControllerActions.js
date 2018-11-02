define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_b51fc8e1b4b4412885b26aab2e00b0b5: function AS_Label_b51fc8e1b4b4412885b26aab2e00b0b5(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_feb4d0a4a087437c95b70c61c0337a93: function AS_Image_feb4d0a4a087437c95b70c61c0337a93(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonLogout **/
    AS_Button_d3d8a180e67b4716bada6a578a955cfe: function AS_Button_d3d8a180e67b4716bada6a578a955cfe(eventobject) {
        var self = this;
        kony.application.exit();
    },
    /** onClick defined for ButtonMoveCase **/
    AS_Button_fe9ca61e21d140d4aef7825f08b74607: function AS_Button_fe9ca61e21d140d4aef7825f08b74607(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMoveCaseInit");
        ntf.navigate();
    },
    /** onClick defined for ButtonMoveLoose **/
    AS_Button_i3756ee1cb4a43dd9c01bc7654000411: function AS_Button_i3756ee1cb4a43dd9c01bc7654000411(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMoveLooseInit");
        ntf.navigate();
    },
    /** onClick defined for ButtonReplenishFrCase **/
    AS_Button_i51657f7993c4c6b96262afdb968120b: function AS_Button_i51657f7993c4c6b96262afdb968120b(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPickCaseList");
        ntf.navigate();
    },
    /** onClick defined for ButtonReplenishFrStock **/
    AS_Button_i180970789da4c5eb8d0e297b3cbde06: function AS_Button_i180970789da4c5eb8d0e297b3cbde06(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPutAframeInit");
        ntf.navigate();
    },
    /** preShow defined for frmMenuBtoB **/
    AS_Form_ee9f29581edb49e49263706a8188bfb1: function AS_Form_ee9f29581edb49e49263706a8188bfb1(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});