define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxTouchId **/
    AS_FlexContainer_e96185af36cc4020ab80b03f476862b1: function AS_FlexContainer_e96185af36cc4020ab80b03f476862b1(eventobject) {
        var self = this;
        this.invokeTouchID();
    },
    /** onClick defined for flxFacebook **/
    AS_FlexContainer_d8c88f47dfd34781a9ef94eff15f8a8a: function AS_FlexContainer_d8c88f47dfd34781a9ef94eff15f8a8a(eventobject) {
        var self = this;
        kony.store.setItem("inputType", "social");
        this.invokeIdentityService("reusableFacebookLogin");
    },
    /** onClick defined for flxLinkedin **/
    AS_FlexContainer_a1361a3f3a6a421b955b37ce2c63dea6: function AS_FlexContainer_a1361a3f3a6a421b955b37ce2c63dea6(eventobject) {
        var self = this;
        kony.store.setItem("inputType", "social");
        this.invokeIdentityService("reusableLinkedinLogin");
    },
    /** onClick defined for flxGoogle **/
    AS_FlexContainer_e6c32ec2ba264244b7c6763873e64a22: function AS_FlexContainer_e6c32ec2ba264244b7c6763873e64a22(eventobject) {
        var self = this;
        kony.store.setItem("inputType", "social");
        this.invokeIdentityService("reusableGoogleLogin");
    },
    /** onClick defined for flxOffice365 **/
    AS_FlexContainer_a94fa4ebfd68400aa4dc8073ab3d7fc5: function AS_FlexContainer_a94fa4ebfd68400aa4dc8073ab3d7fc5(eventobject) {
        var self = this;
        kony.store.setItem("inputType", "social");
        this.invokeIdentityService("reusableOffice365Login");
    },
    /** onDone defined for tbxUsername **/
    AS_TextField_b2ac61ff8cc3478f8c73f51ae4b78536: function AS_TextField_b2ac61ff8cc3478f8c73f51ae4b78536(eventobject, changedtext) {
        var self = this;
        this.onDoneCredentials(this.view.lblUsername);
    },
    /** onDone defined for tbxPassword **/
    AS_TextField_a464699e002f407da25f7855767bfae3: function AS_TextField_a464699e002f407da25f7855767bfae3(eventobject, changedtext) {
        var self = this;
        this.onDoneCredentials(this.view.lblPassword);
    },
    /** onClick defined for flxRememberMe **/
    AS_FlexContainer_ac359e73dcfb4f5aaa3f24c0ff445638: function AS_FlexContainer_ac359e73dcfb4f5aaa3f24c0ff445638(eventobject) {
        var self = this;
        this.remembermeSelection();
    },
    /** onClick defined for btnLogin **/
    AS_Button_b95b522aac76408487a06d11856791ee: function AS_Button_b95b522aac76408487a06d11856791ee(eventobject) {
        var self = this;
        this.invokeButtonClick();
    },
    /** onClick defined for flxLblUsername **/
    AS_FlexContainer_a0dafabe973d42878270c4f8c8906556: function AS_FlexContainer_a0dafabe973d42878270c4f8c8906556(eventobject) {
        var self = this;
        if (this.view.lblUsername.top == "6%") {
            this.view.flxLblUsername.isVisible = false;
            this.invokeTouch(this.view.lblUsername, "-1%");
        }
        this.view.forceLayout();
    },
    /** onClick defined for flxLblPassword **/
    AS_FlexContainer_c58a2cce11a2475fa394ee76f79dccc7: function AS_FlexContainer_c58a2cce11a2475fa394ee76f79dccc7(eventobject) {
        var self = this;
        if (this.view.lblPassword.top == "23%") {
            this.view.flxLblPassword.isVisible = false;
            this.invokeTouch(this.view.lblPassword, "16%");
        }
        this.view.forceLayout();
    },
    /** onClick defined for btnEnable **/
    AS_Button_c12a117cd68c4e6ba3d975ee7f71ae20: function AS_Button_c12a117cd68c4e6ba3d975ee7f71ae20(eventobject) {
        var self = this;
        this.touchEnableAction();
    },
    /** onClick defined for btnCancel **/
    AS_Button_h97f02f6a8d14670bca668d5ae5a79ef: function AS_Button_h97f02f6a8d14670bca668d5ae5a79ef(eventobject) {
        var self = this;
        this.touchCancelAction();
    },
    /** onClick defined for btnTouchCancel **/
    AS_Button_a197154ff3bd4f3f8368f5a8d1c9f3c2: function AS_Button_a197154ff3bd4f3f8368f5a8d1c9f3c2(eventobject) {
        var self = this;
        this.cancelTouchID();
    },
    /** onClick defined for flxClose **/
    AS_FlexContainer_b1486af2d3bc40b595c92c7f95b32d42: function AS_FlexContainer_b1486af2d3bc40b595c92c7f95b32d42(eventobject) {
        var self = this;
        this.view.flxIdentity.isVisible = false;
        this.view.brwsrIdentity.htmlString = "<html>Please wait !!</html>"
    }
});