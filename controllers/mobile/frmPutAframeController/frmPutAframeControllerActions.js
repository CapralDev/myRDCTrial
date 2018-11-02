define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_b8d06f74914441239d3d30843548cec4: function AS_Label_b8d06f74914441239d3d30843548cec4(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPutAframeInit");
        ntf.navigate();
        //clear entry fields on back rather than in preshow
        this.view.TextNewLocation.text = "";
        this.view.TextConfirmedQty.text = "";
        this.view.TextScrapQty.text = "";
        this.view.TextScrapReason.text = "";
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_d394cf5445f549a7bda8c1d412ce4ed8: function AS_Image_d394cf5445f549a7bda8c1d412ce4ed8(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonComplete **/
    AS_Button_b86655466fc443fe909707e7d09e7f3f: function AS_Button_b86655466fc443fe909707e7d09e7f3f(eventobject) {
        var self = this;
        this.onClickComplete();
    },
    /** onTouchStart defined for ImageLocationBarcode **/
    AS_Image_b3190bedb69749218e62adb1ecf0b51d: function AS_Image_b3190bedb69749218e62adb1ecf0b51d(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** onTouchStart defined for ImageRsnDropdown **/
    AS_Image_f609f32b76c34655bb3173bfe487ef3d: function AS_Image_f609f32b76c34655bb3173bfe487ef3d(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmScrapRsn");
        ntf.navigate();
    },
    /** preShow defined for frmPutAframe **/
    AS_Form_ada13672b763404abd8b7d71ed736eb1: function AS_Form_ada13672b763404abd8b7d71ed736eb1(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow(glb_WM_BTB_SCAN, glb_WM_BTB_DIFF);
    }
});