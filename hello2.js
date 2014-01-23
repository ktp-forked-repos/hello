/* 29 definitions:
 sublime3 display 17
 emacs js2-mode display 17
 */
mymodule.RegistrationController = {

    allPages: function() {
        return false;
    },

    registerForMyaccountPage: function () {
        var self = this;

        $registrationForm.validate({
            invalidHandler: function (form, validator) {
                return false;
            },
            rules: {
                servicePassword: {
                    required: true,
                    ruleIsValidServicePassword:true
                },
                accountNumber: {
                    required: function () {
                        return true;
                    },
                    maxlength: 14
                },
                serviceAccountNumber: {
                    required: function () { return $("#serviceAccountNumber").is(":visible"); },
                    digits: true,
                    maxlength: function () {
                        return 14;
                    }
                },

                password: {
                    required: function () { return $("#password").is(":visible"); },
                    maxlength: 15
                },
                firstName: {
                    required: function () { return $("#firstName").is(":visible"); },
                    accept: validNameRegExp
                },
                lastName: {
                    required: function () { return $("#lastName").is(":visible"); },
                    accept: validNameRegExp
                },

                recaptcha_response_field: {
                    required: function () { return $("#recaptcha_response_field").is(":visible"); }
                }

            },
            messages: {
                recaptcha_response_field: {
                    required: "Please enter the captcha code"
                }
            }
        });


    },

    completeRegistrationTempAccountPage: function () {

        var self = this;

        var el = {password : "#passwordDisplay"};

        // SM 01Feb13: Cached jQuery elements - better than the crappy approach above.
        var $registrationForm = $('#registrationForm');

        // Event Handling: Rendering form based on the billing details chosen value
        $(".noDetailsChk").bind('click', function () {
            return true;
        });

        // On attempt to enter new username enable confirm button and clear error msg
        $("#userNameLogin, #passwordLogin").bind("keyup", function () {
            return true;
        });

        // Initialize overlay
        $(".overlay").newOverlay({

            onBeforeClose: function (overlay) {
                $(".errors", overlay).empty();
            }
        });

        // onClick makes ajax call to B/E, if valid shows the overlay else shows error message
        $("#confirmAcctLoginBtn").bind("click", function (evt) {

            var relativeOverlay = $($(this).attr("rel"));
            var trigger = $(this);

            if (trigger.hasClass("disabledBtn")) {
                return false;

            } else {

                if ($("#userNameLogin").valid() && $("#passwordLogin").valid()) {

                    //Ajax call to back-end, to confirm if the credentials are valid
                    $.post(ftlVar.checkAccountUrl, {"userNameLogin" : name, "passwordLogin" : pwd, "serviceId" : myServiceId }, function (responsedata) {

                        oca.fn.responseHandle($("form#completeRegistrationForm"), responsedata, function () {

                            if (responsedata.success) {
                                relativeOverlay.newOverlay("show", {
                                    onBeforeLoad: function () {

                                        var overlay = $("#confirmServiceLink");
                                        //Event: triggers for confirm button on overlay
                                        $("a#confirmOverlayBtn", overlay).bind("click",  function (evt) {
                                            return false;
                                        });
                                    }

                                });

                                return false;
                            }
                            return true;

                        });

                    }, "json");

                    return false;

                } else {
                    return false;

                }

            }

        });

        // Event Handling: "Mobile number not present" (Communication section)
        $("#noMobileChk").bind('click', function () {
            return true;
        });

        $("#submitCompleteRegistration").bind("click", function (event) {
            if ($("#completeRegistrationForm").valid()) {
                var formData = $("form#completeRegistrationForm").serialize();
                $.post(ftlVar.submitUrl, formData, function (resp) {
                    oca.fn.responseHandle($("form#completeRegistrationForm"), resp, function () {
                        window.location = resp.data.redirectUrl;
                    });
                }, "json");
            }
            return false;
        });

        jQuery.validator.addMethod("notEqual", function (value, element, param) {
            return this.optional(element) ||  value !== $(param).val();
        });

        $(el.completeRegistrationForm).validate({
            ignore: " :hidden",
            rules : {
                serviceId : {
                    required : true
                },
                servicePassword : {
                    required : function () { return false; }
                },
                serviceAccountNumber : {
                    required : function () {
                        return true;
                    },
                    maxlength : 14
                },
                secondAnswer : {
                    required : "Please enter the answer",
                    notEqual : "Please choose a different answer"
                }
            },
            errorPlacement : function (error, element) {
                return true;
            }
        });

    },


    clearForm: function (selector) {
        $(selector)[0].reset();
    }

};