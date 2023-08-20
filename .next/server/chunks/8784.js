"use strict";
exports.id = 8784;
exports.ids = [8784];
exports.modules = {

/***/ 88784:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Inform: () => (/* binding */ Inform)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(93464);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18787);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43804);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(30061);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33579);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32355);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3921);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(77061);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22134);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85915);
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11915);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(96516);
/*
 * :file description:
 * :name: /chatgpt/app/components/inform.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-20 16:48:58
 * :last editor: 张德志
 * :date last edited: 2023-08-20 17:07:26
 */ 





function Inform() {
    const [informs, setInforms] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const fetchInforms = async ()=>{
        const res = await (0,_api_user__WEBPACK_IMPORTED_MODULE_3__/* .getInforms */ .Qj)({
            pageNum: 1,
            pageSize: 10
        });
        const { data, total } = res || {};
        setInforms(data);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetchInforms();
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__/* .ChakraProvider */ .x, {
        theme: _theme__WEBPACK_IMPORTED_MODULE_2__/* .theme */ .r,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Box */ .xu, {
            mt: 2,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__/* .Accordion */ .U, {
                    defaultIndex: [
                        0,
                        1,
                        2
                    ],
                    allowMultiple: true,
                    children: informs.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__/* .AccordionItem */ .Q, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__/* .AccordionButton */ .K, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__/* .Flex */ .k, {
                                            alignItems: "center",
                                            flex: "1",
                                            textAlign: "left",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Box */ .xu, {
                                                    fontWeight: "bold",
                                                    position: "relative",
                                                    children: [
                                                        !item.read && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Box */ .xu, {
                                                            w: "5px",
                                                            h: "5px",
                                                            borderRadius: "10px",
                                                            bg: "myRead.600",
                                                            position: "absolute",
                                                            top: 1,
                                                            left: "-5px"
                                                        }),
                                                        item.title
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Box */ .xu, {
                                                    ml: 2,
                                                    color: "myGray.500",
                                                    children: (0,_utils_index__WEBPACK_IMPORTED_MODULE_4__/* .formatTimeToChatTime */ .V4)(item.time)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__/* .AccordionIcon */ .X, {})
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__/* .AccordionPanel */ .H, {
                                    pb: 4,
                                    children: item.content
                                })
                            ]
                        }, item._id))
                }),
                informs?.length === 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__/* .Flex */ .k, {
                    h: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: "100px",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__/* .Icon */ .J, {
                            as: (__webpack_require__(81930)/* ["default"] */ .Z),
                            name: "empty",
                            w: "48px",
                            h: "48px",
                            color: "transparent"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__/* .Box */ .xu, {
                            mt: 2,
                            color: "myGray.500",
                            children: "暂无通知~"
                        })
                    ]
                })
            ]
        })
    });
}


/***/ })

};
;