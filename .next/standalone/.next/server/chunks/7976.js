exports.id = 7976;
exports.ids = [7976];
exports.modules = {

/***/ 77976:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Loading: () => (/* binding */ Loading),
  Number: () => (/* binding */ number_Number)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/qs/lib/index.js
var lib = __webpack_require__(22059);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/hooks/dist/chunk-CHB4ZXZG.mjs + 5 modules
var chunk_CHB4ZXZG = __webpack_require__(53136);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/react/dist/chunk-QAITB7GG.mjs + 6 modules
var chunk_QAITB7GG = __webpack_require__(93464);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs
var chunk_PULVB27S = __webpack_require__(18787);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/layout/dist/chunk-JARCRF6W.mjs
var chunk_JARCRF6W = __webpack_require__(93188);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/card/dist/chunk-YQO7BFFX.mjs + 1 modules
var chunk_YQO7BFFX = __webpack_require__(63663);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs
var chunk_KRPLQIP4 = __webpack_require__(32355);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs + 4 modules
var chunk_UVUR7MCU = __webpack_require__(35419);
// EXTERNAL MODULE: ./app/constant.ts
var constant = __webpack_require__(14751);
// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/umd/react-router-dom.production.min.js
var react_router_dom_production_min = __webpack_require__(5666);
;// CONCATENATED MODULE: ./app/icons/withdraw.svg
var _path, _path2, _path3;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgWithdraw = function SvgWithdraw(props) {
  return /*#__PURE__*/react_.createElement("svg", _extends({
    className: "withdraw_svg__icon",
    viewBox: "0 0 1322 1024",
    xmlns: "http://www.w3.org/2000/svg",
    width: 18,
    height: 22
  }, props), _path || (_path = /*#__PURE__*/react_.createElement("path", {
    d: "M952.047 837.888h-615.09a113.527 113.527 0 0 1-113.345-113.344V304.749h728.435a113.527 113.527 0 0 1 113.344 113.345v306.45a113.527 113.527 0 0 1-113.344 113.344zM278.367 359.14v365.039a58.771 58.771 0 0 0 58.59 58.589h615.09a58.771 58.771 0 0 0 58.588-58.59v-306.45a58.771 58.771 0 0 0-58.588-58.588z"
  })), _path2 || (_path2 = /*#__PURE__*/react_.createElement("path", {
    d: "M278.367 350.38h-54.755v-52.932a111.52 111.52 0 0 1 111.336-111.336h334.01a111.52 111.52 0 0 1 111.338 111.336v49.098H725.54v-49.098a56.764 56.764 0 0 0-56.581-56.58h-334.01a56.764 56.764 0 0 0-56.582 56.58zm759.829 354.452h-212.27a131.596 131.596 0 0 1 0-263.193h208.437v54.756H825.926a76.84 76.84 0 0 0 0 153.863h212.27z"
  })), _path3 || (_path3 = /*#__PURE__*/react_.createElement("path", {
    d: "M889.807 600.43h-65.342a27.378 27.378 0 0 1 0-54.755h65.342a27.378 27.378 0 0 1 0 54.756z"
  })));
};
/* harmony default export */ const withdraw = (SvgWithdraw);
// EXTERNAL MODULE: ./app/components/emoji.tsx + 1 modules
var emoji = __webpack_require__(6862);
// EXTERNAL MODULE: ./node_modules/@chakra-ui/system/dist/chunk-UIGT7YZF.mjs
var chunk_UIGT7YZF = __webpack_require__(69745);
;// CONCATENATED MODULE: ./app/components/tabs.tsx
/*
 * :file description: 
 * :name: /chatgpt/app/components/tabs.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 14:47:11
 * :last editor: 张德志
 * :date last edited: 2023-08-20 14:52:11
 */ 


function Tabs({ list, size = "md", activeId, onChange, ...props }) {
    console.log(list);
    const theme = (0,chunk_UIGT7YZF/* useTheme */.F)();
    const sizeMap = (0,react_.useMemo)(()=>{
        switch(size){
            case "sm":
                return {
                    fontSize: "sm",
                    outP: "3px",
                    inlineP: 1
                };
            case "md":
                return {
                    fontSize: "md",
                    outP: "4px",
                    inlineP: 1
                };
            case "lg":
                return {
                    fontSize: "lg",
                    outP: "5px",
                    inlineP: 2
                };
        }
    }, [
        size
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(chunk_JARCRF6W/* Grid */.r, {
        gridTemplateColumns: `repeat(${list.length},1fr)`,
        p: sizeMap.outP,
        borderRadius: "sm",
        fontSize: sizeMap.fontSize,
        ...props,
        children: (list || []).map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                py: sizeMap.inlineP,
                borderRadius: "sm",
                textAlign: "center",
                ...activeId === item?.id ? {
                    boxShadow: "0px 2px 2px rgba(137, 156, 171, 0.25)",
                    backgroundImage: theme.lgColor.primary2,
                    color: "white",
                    cursor: "default"
                } : {
                    cursor: "pointer"
                },
                onClick: ()=>{
                    if (activeId === item?.id) return;
                    onChange(item?.id);
                },
                children: item?.label
            }, item.id))
    });
}
/* harmony default export */ const tabs = ((/* unused pure expression or super */ null && (Tabs)));

// EXTERNAL MODULE: ./app/icons/bot.svg
var bot = __webpack_require__(64606);
// EXTERNAL MODULE: ./app/icons/three-dots.svg
var three_dots = __webpack_require__(39866);
// EXTERNAL MODULE: ./node_modules/next/dist/shared/lib/app-dynamic.js
var app_dynamic = __webpack_require__(47335);
var app_dynamic_default = /*#__PURE__*/__webpack_require__.n(app_dynamic);
// EXTERNAL MODULE: ./app/store/index.ts + 2 modules
var store = __webpack_require__(87079);
// EXTERNAL MODULE: ./app/api/user.ts
var user = __webpack_require__(11915);
// EXTERNAL MODULE: ./app/utils/index.ts
var utils = __webpack_require__(96516);
// EXTERNAL MODULE: ./app/theme.ts
var theme = __webpack_require__(85915);
// EXTERNAL MODULE: ./app/components/number.module.scss
var number_module = __webpack_require__(94080);
var number_module_default = /*#__PURE__*/__webpack_require__.n(number_module);
;// CONCATENATED MODULE: ./app/components/number.tsx
/*
 * :file description:
 * :name: /chatgpt/app/components/number.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 13:55:36
 * :last editor: 张德志
 * :date last edited: 2023-08-20 17:26:38
 */ 

















function Loading(props) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (number_module_default())["loading-content"] + " no-dark",
        children: [
            !props.noLogo && /*#__PURE__*/ jsx_runtime_.jsx(bot/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(three_dots/* default */.Z, {})
        ]
    });
}
const Bill = app_dynamic_default()(async ()=>(await Promise.all(/* import() */[__webpack_require__.e(1602), __webpack_require__.e(1984), __webpack_require__.e(1930), __webpack_require__.e(3857)]).then(__webpack_require__.bind(__webpack_require__, 53857))).Bill, {
    loadableGenerated: {
        modules: [
            "/Users/zhangdezhi/Documents/project/chatgpt/app/components/number.tsx -> " + "./bill"
        ]
    },
    loading: ()=>/*#__PURE__*/ jsx_runtime_.jsx(Loading, {
            noLogo: true
        })
});
const PayRecord = app_dynamic_default()(async ()=>(await Promise.all(/* import() */[__webpack_require__.e(1602), __webpack_require__.e(2780)]).then(__webpack_require__.bind(__webpack_require__, 62780))).PayRecord, {
    loadableGenerated: {
        modules: [
            "/Users/zhangdezhi/Documents/project/chatgpt/app/components/number.tsx -> " + "./pay-record"
        ]
    },
    loading: ()=>/*#__PURE__*/ jsx_runtime_.jsx(Loading, {
            noLogo: true
        })
});
const Promotion = app_dynamic_default()(async ()=>(await Promise.all(/* import() */[__webpack_require__.e(1602), __webpack_require__.e(1930), __webpack_require__.e(884)]).then(__webpack_require__.bind(__webpack_require__, 10884))).Promotion, {
    loadableGenerated: {
        modules: [
            "/Users/zhangdezhi/Documents/project/chatgpt/app/components/number.tsx -> " + "./promotion"
        ]
    },
    loading: ()=>/*#__PURE__*/ jsx_runtime_.jsx(Loading, {
            noLogo: true
        })
});
const Inform = app_dynamic_default()(async ()=>(await Promise.all(/* import() */[__webpack_require__.e(9051), __webpack_require__.e(1930), __webpack_require__.e(8784)]).then(__webpack_require__.bind(__webpack_require__, 88784))).Inform, {
    loadableGenerated: {
        modules: [
            "/Users/zhangdezhi/Documents/project/chatgpt/app/components/number.tsx -> " + "./inform"
        ]
    },
    loading: ()=>/*#__PURE__*/ jsx_runtime_.jsx(Loading, {
            noLogo: true
        })
});
function number_Number() {
    const navigate = (0,react_router_dom_production_min.useNavigate)();
    const hash = location.hash;
    const urlParse = lib_default().parse(hash?.split("?")?.[1]);
    const { copyData } = (0,utils/* useCopyData */.Z5)();
    const userInfo = (0,store/* useAccessStore */._X)();
    const config = (0,store/* useAppConfig */.MG)();
    const [tableType, setTableType] = (0,react_.useState)(urlParse.type);
    const { isOpen: isOpenWxConcat, onClose: onCloseWxConcat, onOpen: onOpenWxConcat } = (0,chunk_CHB4ZXZG/* useDisclosure */.q)();
    const [promotion, setPromotion] = (0,react_.useState)();
    const tableList = (0,react_.useRef)([
        {
            label: "账单",
            id: constant/* TableEnum */.fC.bill,
            Component: /*#__PURE__*/ jsx_runtime_.jsx(Bill, {})
        },
        {
            label: "充值",
            id: constant/* TableEnum */.fC.pay,
            Component: /*#__PURE__*/ jsx_runtime_.jsx(PayRecord, {})
        },
        {
            label: "佣金",
            id: constant/* TableEnum */.fC.promotion,
            Component: /*#__PURE__*/ jsx_runtime_.jsx(Promotion, {})
        },
        {
            label: "通知",
            id: constant/* TableEnum */.fC.inform,
            Component: /*#__PURE__*/ jsx_runtime_.jsx(Inform, {})
        }
    ]);
    const fetchgPromotionInitData = async ()=>{
        const res = await (0,user/* getPromotionInitData */.Km)();
        setPromotion({
            ...res
        });
    };
    (0,react_.useEffect)(()=>{
        fetchgPromotionInitData();
    }, []);
    const { historyAmount, invitedAmount, residueAmount } = promotion || {};
    return /*#__PURE__*/ jsx_runtime_.jsx(chunk_QAITB7GG/* ChakraProvider */.x, {
        theme: theme/* theme */.r,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_PULVB27S/* Box */.xu, {
            py: [
                5,
                10
            ],
            style: {
                padding: "16px"
            },
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_JARCRF6W/* Grid */.r, {
                    gridTemplateColumns: [
                        "1fr",
                        "3fr 300px"
                    ],
                    gridGap: 4,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_YQO7BFFX/* Card */.Z, {
                            px: 6,
                            py: 4,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_KRPLQIP4/* Flex */.k, {
                                    justifyContent: "space-between",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                            fontSize: "xl",
                                            fontWeight: "bold",
                                            children: "账号信息"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(chunk_UVUR7MCU/* Button */.z, {
                                            variant: "base",
                                            size: "xs",
                                            children: "退出登录"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_KRPLQIP4/* Flex */.k, {
                                    mt: 6,
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                            flex: "0 0 50px",
                                            children: "头像:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(emoji/* Avatar */.qE, {
                                            avatar: config.avatar
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_KRPLQIP4/* Flex */.k, {
                                    mt: 6,
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                            flex: "0 0 50px",
                                            children: "账号:"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                            children: userInfo?.username
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_PULVB27S/* Box */.xu, {
                                    mt: 6,
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_KRPLQIP4/* Flex */.k, {
                                            alignItems: "center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                                    flex: "0 0 50px",
                                                    children: "余额:"
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_PULVB27S/* Box */.xu, {
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                                            children: userInfo?.balance
                                                        }),
                                                        " 元"
                                                    ]
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx(chunk_UVUR7MCU/* Button */.z, {
                                                    size: [
                                                        "xs",
                                                        "sm"
                                                    ],
                                                    w: [
                                                        "70px",
                                                        "80px"
                                                    ],
                                                    ml: 5,
                                                    children: "充值"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                            fontSize: "xs",
                                            color: "blackAlpha.500",
                                            children: "如果填写了自己的 openai 账号，网页上 openai 模型对话不会计费。"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_YQO7BFFX/* Card */.Z, {
                            px: 6,
                            py: 4,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                    fontSize: "xl",
                                    fontWeight: "bold",
                                    children: "我的邀请"
                                }),
                                [
                                    {
                                        label: "佣金比例",
                                        value: `${userInfo?.promotion?.rate || 15}%`
                                    },
                                    {
                                        label: "已注册用户数",
                                        value: `${invitedAmount}人`
                                    },
                                    {
                                        label: "累计佣金",
                                        value: `￥${historyAmount}`
                                    },
                                    {
                                        label: "可用佣金",
                                        value: `￥${residueAmount}`
                                    }
                                ].map((item)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_KRPLQIP4/* Flex */.k, {
                                        alignItems: "center",
                                        mt: 4,
                                        justifyContent: "space-between",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                                w: "120px",
                                                children: item.label
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                                                fontWeight: "bold",
                                                children: item.value
                                            })
                                        ]
                                    }, item.label)),
                                /*#__PURE__*/ jsx_runtime_.jsx(chunk_UVUR7MCU/* Button */.z, {
                                    mt: 4,
                                    variant: "base",
                                    w: "100%",
                                    onClick: ()=>copyData(`${location.origin}/?inviterId=${userInfo?._id}`, "已复制邀请链接"),
                                    children: "复制邀请链接"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(chunk_UVUR7MCU/* Button */.z, {
                                    mt: 4,
                                    leftIcon: /*#__PURE__*/ jsx_runtime_.jsx(withdraw, {
                                        style: {
                                            fontSize: "22px"
                                        }
                                    }),
                                    px: 4,
                                    title: residueAmount < 50 ? "最低提现额度为50元" : "",
                                    isDisabled: residueAmount < 50,
                                    variant: "base",
                                    colorScheme: "myBlue",
                                    onClick: onOpenWxConcat,
                                    children: residueAmount < 50 ? "50元起提" : "提现"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(chunk_YQO7BFFX/* Card */.Z, {
                    mt: 4,
                    px: [
                        3,
                        6
                    ],
                    py: 4,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(Tabs, {
                            m: "auto",
                            w: "200px",
                            activeId: tableType,
                            size: "sm",
                            list: tableList.current,
                            onChange: (id)=>{
                                setTableType(id);
                                navigate(`${constant/* Path */.y$.Number}?type=${id}`);
                            }
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(chunk_PULVB27S/* Box */.xu, {
                            minH: "300px",
                            overflowY: "scroll",
                            maxH: "300px",
                            children: (tableList.current || []).map((item)=>{
                                return item.id === tableType ? item?.Component : null;
                            })
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 94080:
/***/ ((module) => {

// Exports
module.exports = {
	"loading-content": "number_loading-content__6Hdf8"
};


/***/ })

};
;