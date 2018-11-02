define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ImageHome **/
    AS_Image_j242d2bc113542e8b4c032d8046480a9: function AS_Image_j242d2bc113542e8b4c032d8046480a9(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onTouchStart defined for LabelBack **/
    AS_Label_h4bf01dcfa2c4e3ca64462866f975ebd: function AS_Label_h4bf01dcfa2c4e3ca64462866f975ebd(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuMain");
        ntf.navigate();
    },
    /** onDone defined for TextCase **/
    AS_TextField_a914beb15acd4c9194d84a2c602996da: function AS_TextField_a914beb15acd4c9194d84a2c602996da(eventobject, changedtext) {
        var self = this;
        this.onDone();
    },
    /** onTouchStart defined for ImageCaseBarcode **/
    AS_Image_a8f2e16886f64e7397f5b608ab5d45ba: function AS_Image_a8f2e16886f64e7397f5b608ab5d45ba(eventobject, x, y) {
        var self = this;
        this.launchBarcode();
    },
    /** preShow defined for frmReprintLabelInit **/
    AS_Form_f564e37bebc34adab35327f0298cc665: function AS_Form_f564e37bebc34adab35327f0298cc665(eventobject) {
        var self = this;
        this.view.LabelUname.text = glbSAPLONGNAME;
        this.view.LabelLgnum.text = glbSAPLGNUM.toString();
        this.preShow();
    }
});