"use strict";
exports.id = 1730;
exports.ids = [1730];
exports.modules = {

/***/ 31730:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ useSendCode)
});

// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./app/api/user.ts
var user = __webpack_require__(11915);
// EXTERNAL MODULE: ./app/hooks/useToast.ts
var useToast = __webpack_require__(41373);
// EXTERNAL MODULE: ./app/utils/index.ts
var utils = __webpack_require__(96516);
;// CONCATENATED MODULE: ./app/utils/google.ts
/*
 * :file description: 
 * :name: /chatgpt/app/utils/google.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 21:21:08
 * :last editor: 张德志
 * :date last edited: 2023-08-13 21:21:09
 */ 

const getClientToken = (googleVerKey)=>{
    if (typeof grecaptcha === "undefined" || !grecaptcha?.ready) return "";
    return new Promise((resolve, reject)=>{
        grecaptcha.ready(async ()=>{
            try {
                const token = await grecaptcha.execute(googleVerKey, {
                    action: "submit"
                });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    });
};
// service run
const authGoogleToken = async (data)=>{
    const res = await axios.post(`https://www.recaptcha.net/recaptcha/api/siteverify?${Obj2Query(data)}`);
    if (res.data.success) {
        return Promise.resolve("");
    }
    return Promise.reject(res?.data?.["error-codes"]?.[0] || "非法环境");
};

;// CONCATENATED MODULE: ./app/hooks/useSendCode.ts
/*
 * :file description: 
 * :name: /chatgpt/app/hooks/useSendCode.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-13 21:23:04
 * :last editor: 张德志
 * :date last edited: 2023-08-15 23:41:36
 */ 



let timer;
const useSendCode = ()=>{
    const { toast } = (0,useToast/* useToast */.p)();
    const [codeSending, setCodeSending] = (0,react_.useState)(false);
    const [codeCountDown, setCodeCountDown] = (0,react_.useState)(0);
    const sendCodeText = (0,react_.useMemo)(()=>{
        if (codeCountDown >= 10) {
            return `${codeCountDown}s后重新获取`;
        }
        if (codeCountDown > 0) {
            return `0${codeCountDown}s后重新获取`;
        }
        return "获取验证码";
    }, [
        codeCountDown
    ]);
    const sendCode = (0,react_.useCallback)(async ({ username, type })=>{
        setCodeSending(true);
        try {
            await (0,user/* sendAuthCode */.oK)({
                username,
                type,
                googleToken: await getClientToken("123")
            });
            setCodeCountDown(60);
            timer = setInterval(()=>{
                setCodeCountDown((val)=>{
                    if (val <= 0) {
                        clearInterval(timer);
                    }
                    return val - 1;
                });
            }, 1000);
            toast({
                title: "验证码已发送",
                status: "success",
                position: "top"
            });
        } catch (error) {
            toast({
                title: error.message || "发送验证码异常",
                status: "error"
            });
        }
        setCodeSending(false);
    }, [
        toast
    ]);
    return {
        codeSending,
        sendCode,
        sendCodeText,
        codeCountDown
    };
};


/***/ })

};
;