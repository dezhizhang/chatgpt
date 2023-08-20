"use strict";
exports.id = 2301;
exports.ids = [2301];
exports.modules = {

/***/ 42301:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegisterForm: () => (/* binding */ RegisterForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14751);
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11915);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(66558);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5666);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _hooks_useToast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41373);
/* harmony import */ var _hooks_useSendCode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31730);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18787);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3838);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(72923);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(93460);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(32355);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(35419);
/*
 * :file description:
 * :name: /chatgpt/app/components/register-form.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 16:12:11
 * :last editor: 张德志
 * :date last edited: 2023-08-16 04:24:49
 */ 








const inputStyle = {
    maxWidth: "100%",
    borderRadius: "4px",
    textAlign: "left"
};
function RegisterForm({ setPageType }) {
    const [requesting, setRequesting] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { register, handleSubmit, getValues, trigger, formState: { errors } } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_5__/* .useForm */ .cI)({
        mode: "onBlur"
    });
    const { toast } = (0,_hooks_useToast__WEBPACK_IMPORTED_MODULE_6__/* .useToast */ .p)();
    const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
    const { codeSending, sendCodeText, sendCode, codeCountDown } = (0,_hooks_useSendCode__WEBPACK_IMPORTED_MODULE_4__/* .useSendCode */ .A)();
    const onclickSendCode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ()=>{
        const check = await trigger("username");
        if (!check) return;
        sendCode({
            username: getValues("username"),
            type: "register"
        });
    }, [
        getValues,
        sendCode,
        trigger
    ]);
    const onclickRegister = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ({ username, password, code })=>{
        setRequesting(true);
        const res = await (0,_api_user__WEBPACK_IMPORTED_MODULE_3__/* .postRegister */ .pi)({
            username,
            code,
            password,
            inviterId: localStorage.getItem("inviterId") || ""
        });
        if (res.code === 200) {
            toast({
                title: `注册成功`,
                status: "success"
            });
            setPageType(_constant__WEBPACK_IMPORTED_MODULE_2__/* .PageTypeEnum */ .DZ.login);
            return;
        }
        toast({
            title: res.message || "注册异常",
            status: "error"
        });
        setRequesting(false);
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__/* .Box */ .xu, {
                fontWeight: "bold",
                fontSize: "2xl",
                textAlign: "center",
                children: "注册千知GPT账号"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                onSubmit: handleSubmit(onclickRegister),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .NI, {
                        mt: 5,
                        isInvalid: !!errors.username,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__/* .Input */ .I, {
                                placeholder: "邮箱/手机号",
                                style: inputStyle,
                                ...register("username", {
                                    required: "邮箱/手机号不能为空",
                                    pattern: {
                                        value: /(^1[3456789]\d{9}$)|(^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$)/,
                                        message: "邮箱/手机号格式错误"
                                    }
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__/* .FormErrorMessage */ .J1, {
                                position: "absolute",
                                fontSize: "xs",
                                children: !!errors.username && errors.username.message
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .NI, {
                        mt: 8,
                        isInvalid: !!errors.username,
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__/* .Flex */ .k, {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__/* .Input */ .I, {
                                        flex: 1,
                                        placeholder: "验证码",
                                        ...register("code", {
                                            required: "验证码不能为空"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__/* .Button */ .z, {
                                        ml: 5,
                                        w: "145px",
                                        maxW: "50%",
                                        onClick: onclickSendCode,
                                        isDisabled: codeCountDown > 0,
                                        isLoading: codeSending,
                                        children: sendCodeText
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__/* .FormErrorMessage */ .J1, {
                                position: "absolute",
                                fontSize: "xs",
                                children: !!errors.code && errors.code.message
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .NI, {
                        mt: 8,
                        isInvalid: !!errors.password,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__/* .Input */ .I, {
                                style: inputStyle,
                                type: "password",
                                placeholder: "密码",
                                ...register("password", {
                                    required: "密码不能为空",
                                    minLength: {
                                        value: 4,
                                        message: "密码最少4位最多12位"
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "密码最少4位最多12位"
                                    }
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__/* .FormErrorMessage */ .J1, {
                                position: "absolute",
                                fontSize: "xs",
                                children: !!errors.password && errors.password.message
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__/* .FormControl */ .NI, {
                        mt: 8,
                        isInvalid: !!errors.password2,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__/* .Input */ .I, {
                                style: inputStyle,
                                type: "password",
                                placeholder: "确认密码",
                                ...register("password2", {
                                    validate: (val)=>getValues("password") === val ? true : "两次密码不一致"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__/* .FormErrorMessage */ .J1, {
                                position: "absolute",
                                fontSize: "xs",
                                children: !!errors.password2 && errors.password2.message
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__/* .Box */ .xu, {
                        float: "right",
                        fontSize: "sm",
                        mt: 2,
                        color: "myBlue.600",
                        cursor: "pointer",
                        _hover: {
                            textDecoration: "underline"
                        },
                        onClick: ()=>setPageType(_constant__WEBPACK_IMPORTED_MODULE_2__/* .PageTypeEnum */ .DZ.login),
                        children: "已有账号，去登录"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__/* .Button */ .z, {
                        type: "submit",
                        mt: 5,
                        w: "100%",
                        size: [
                            "md",
                            "lg"
                        ],
                        colorScheme: "blue",
                        isLoading: requesting,
                        children: "确认注册"
                    })
                ]
            })
        ]
    });
}


/***/ })

};
;