define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** loginSuccessEvent defined for login **/
    AS_UWI_a45946bd8ee5498d883ce31e77458bac: function AS_UWI_a45946bd8ee5498d883ce31e77458bac(response) {
        var self = this;
        glbSAPUNAME = this.view.login.getUsername();
        navigateToForm("frmMenuMain");
    },
    /** preShow defined for frmLogin **/
    AS_Form_ff7acc3196244fa38d84de3970f14ce8: function AS_Form_ff7acc3196244fa38d84de3970f14ce8(eventobject) {
        var self = this;
        this.preShow();
    }
});