define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_e8faa38de3c84693b40057e99ea9d8e5: function AS_Label_e8faa38de3c84693b40057e99ea9d8e5(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for ImageHome **/
    AS_Image_a2dc53bc2d4c4047829c2621a40dca74: function AS_Image_a2dc53bc2d4c4047829c2621a40dca74(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onClick defined for ButtonLogout **/
    AS_Button_b354b65b539249b4b9a1eb0284dde59e: function AS_Button_b354b65b539249b4b9a1eb0284dde59e(eventobject) {
        var self = this;
        kony.application.exit();
    },
    /** onClick defined for ButtonStockEnquiry **/
    AS_Button_c4aba3624795486b81bc85d658135251: function AS_Button_c4aba3624795486b81bc85d658135251(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmStockEnquiry");
        ntf.navigate();
    },
    /** preShow defined for frmMenuEnquiry **/
    AS_Form_e1a4d5632a1543e8accf7839b064df07: function AS_Form_e1a4d5632a1543e8accf7839b064df07(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});