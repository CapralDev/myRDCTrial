define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchStart defined for ArrowLeft **/
    AS_Label_a2c70554bf854d0480ca69bd5c27751a: function AS_Label_a2c70554bf854d0480ca69bd5c27751a(eventobject, x, y) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmLogin");
        ntf.navigate();
    },
    /** onClick defined for ButtonLogout **/
    AS_Button_ja09f41b4c9f48f9a618019735572c61: function AS_Button_ja09f41b4c9f48f9a618019735572c61(eventobject) {
        var self = this;
        kony.application.exit();
    },
    /** onClick defined for ButtonBtoB **/
    AS_Button_h3d32042995f46ca83f7c5611fe9e863: function AS_Button_h3d32042995f46ca83f7c5611fe9e863(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmMenuBtoB");
        ntf.navigate();
    },
    /** onClick defined for ButtonPicking **/
    AS_Button_j3e31b57c86247e8a97b47df59d3a935: function AS_Button_j3e31b57c86247e8a97b47df59d3a935(eventobject) {
        var self = this;

        function SHOW_ALERT__b41999cad0474a659f0a49071394a8f2_True() {}
        function SHOW_ALERT__b41999cad0474a659f0a49071394a8f2_Callback() {
            SHOW_ALERT__b41999cad0474a659f0a49071394a8f2_True();
        }
        kony.ui.Alert({
            "alertType": constants.ALERT_TYPE_ERROR,
            "alertTitle": "Function Under Development",
            "alertIcon": "clear_input_icon.png",
            "message": "Menu option is unavailable",
            "alertHandler": SHOW_ALERT__b41999cad0474a659f0a49071394a8f2_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    },
    /** onClick defined for ButtonReceiving **/
    AS_Button_e0b6d607d4d845359914d572dcc1298e: function AS_Button_e0b6d607d4d845359914d572dcc1298e(eventobject) {
        var self = this;

        function SHOW_ALERT__eb1ef43ba7444445960df201cabdd5df_True() {}
        function SHOW_ALERT__eb1ef43ba7444445960df201cabdd5df_Callback() {
            SHOW_ALERT__eb1ef43ba7444445960df201cabdd5df_True();
        }
        kony.ui.Alert({
            "alertType": constants.ALERT_TYPE_ERROR,
            "alertTitle": "Function Under Development",
            "alertIcon": "clear_input_icon.png",
            "message": "Menu option is unavailable",
            "alertHandler": SHOW_ALERT__eb1ef43ba7444445960df201cabdd5df_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    },
    /** onClick defined for ButtonManifest **/
    AS_Button_abaed018720f4f46b3ddeaf3ffa6cc63: function AS_Button_abaed018720f4f46b3ddeaf3ffa6cc63(eventobject) {
        var self = this;

        function SHOW_ALERT__f6033d54acf147d98492e54c40e2115a_True() {}
        function SHOW_ALERT__f6033d54acf147d98492e54c40e2115a_Callback() {
            SHOW_ALERT__f6033d54acf147d98492e54c40e2115a_True();
        }
        kony.ui.Alert({
            "alertType": constants.ALERT_TYPE_ERROR,
            "alertTitle": "Function Under Development",
            "alertIcon": "clear_input_icon.png",
            "message": "Menu option is unavailable",
            "alertHandler": SHOW_ALERT__f6033d54acf147d98492e54c40e2115a_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    },
    /** onClick defined for ButtonEnquiry **/
    AS_Button_bf83a80e6f08426f9a5350f43d01fb72: function AS_Button_bf83a80e6f08426f9a5350f43d01fb72(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmStockEnquiry");
        ntf.navigate();
    },
    /** onClick defined for ButtonPrinting **/
    AS_Button_e3acc8b70e624e7d85744cb6a326601f: function AS_Button_e3acc8b70e624e7d85744cb6a326601f(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmReprintLabelInit");
        ntf.navigate();
    },
    /** onClick defined for ButtonCycleCount **/
    AS_Button_j940291ddf3f4c608a7e9a24f2739f89: function AS_Button_j940291ddf3f4c608a7e9a24f2739f89(eventobject) {
        var self = this;

        function SHOW_ALERT__i6d239ef4b6e40e7bdeb7709c550dea6_True() {}
        function SHOW_ALERT__i6d239ef4b6e40e7bdeb7709c550dea6_Callback() {
            SHOW_ALERT__i6d239ef4b6e40e7bdeb7709c550dea6_True();
        }
        kony.ui.Alert({
            "alertType": constants.ALERT_TYPE_ERROR,
            "alertTitle": "Function Under Development",
            "alertIcon": "clear_input_icon.png",
            "message": "Menu option is unavailable",
            "alertHandler": SHOW_ALERT__i6d239ef4b6e40e7bdeb7709c550dea6_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    },
    /** preShow defined for frmMenuMain **/
    AS_Form_f4324428f56440e4b240a6a802343cac: function AS_Form_f4324428f56440e4b240a6a802343cac(eventobject) {
        var self = this;
        kony.print("XXXXX" + "glbSAPUNAME=" + glbSAPUNAME);
        this.MMIntegrationCall();
        this.preShow();
    }
});