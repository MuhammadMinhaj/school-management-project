/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/styles/admin/style.css");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/adminCreate.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/adminCreate.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"@font-face {\\n\\tfont-family: 'Georgia';\\n\\tsrc: url('/fonts/Georgia/Georgia.woff') format('woff'); /* Modern Browsers */\\n\\tfont-weight: normal;\\n\\tfont-style: normal;\\n}\\n.admin-create-title{\\n    color:#dee2e6;\\n    font-family: 'Georgia';\\n}\\n/* .admin-create-sub-title{\\n\\tfont-family:Georgia;\\n\\tcolor:#dee2e6;\\n} */\\n.input-style{\\n\\tborder:1px solid #28a74552;\\n\\twidth:100%;\\n\\tfont-size:14px;\\n\\tborder-radius:5rem;\\n\\toutline:none;\\n\\tpadding:5px 15px;\\n}\\n.input-style:focus {\\n\\t/* box-shadow: 0 0 3pt 2pt green;  */\\n\\tbox-shadow: 0 0 3pt 0pt green; \\n}\\n.text-style{\\n\\tfont-family:Georgia;\\n\\tfont-size:14px;\\n\\ttext-transform: lowercase;\\n\\tmargin-right:8px;\\n\\tmargin-left:4px;\\n}\\n.border-style{\\n\\tborder-radius:10px;\\n\\tborder:1px solid #00800054\\n}\\n\\n.admin-show-scroll-style{\\n\\n\\theight:380px;\\n\\toverflow-Y: scroll;\\n\\tscroll-behavior: smooth;\\n\\tmargin-right:1px;\\n\\n}\\n.admin-show-scroll-style::-webkit-scrollbar{\\n\\twidth:3px; \\n\\theight:4px;\\n}\\n.admin-show-scroll-style::-webkit-scrollbar-track{\\n\\tbackground:white;\\n\\tborder-radius: 25px\\n}\\n.admin-show-scroll-style::-webkit-scrollbar-thumb{\\n\\tbackground:linear-gradient(#6200ea,#4a148c,#6200ea);\\n\\tborder-radius: 25px\\n}\\ntable{\\n\\tfont-size: 12px;\\n}\\n\\n.admin-show-card{\\n\\tborder-radius:10px;\\n}\\n.admin-show-card-body{\\n\\tpadding:0rem!important\\n}\\n.adminCreateBtn{\\n\\t\\n\\toutline:none!important;\\n\\tbackground:#0000001a;\\n\\tborder: 1px solid #e9ecef6e;\\n\\tborder-radius:8px;\\n\\tcolor:#dee2e6;\\n}\\n.adminCreateBtn:hover{\\n\\tbackground:#6c757d;\\n}\\n#createAdminBtn{\\n\\tbackground: #495057;\\n\\t\\n    width: 100%;\\n    border: none;\\n    outline: none!important;\\n    border-radius: 6px;\\n\\tcolor: white;\\n\\tpadding:4px 0px;\\n}\\n#createAdminBtn:hover{\\n\\tbackground: #343a40;\\n    color: #dee2e6;\\n}\\n.closeModalBtn{\\n\\tfloat: right;\\n    font-size: 1.5rem;\\n    font-weight: bold;\\n    line-height: 1;\\n    color: #bd2130;\\n\\tbackground:transparent;\\n\\tborder:none;\\n\\toutline: none!important;\\n\\tborder-radius:4px\\n}\\n.closeModalBtn:hover{\\n\\tbackground:#495057;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/adminCreate.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/administratorAccount.css":
/*!********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/administratorAccount.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"/* .administrator-account{\\n   \\n} */\\n\\n\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/administratorAccount.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/createMenu.css":
/*!**********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/createMenu.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"@font-face {\\n\\tfont-family: 'Georgia';\\n\\tsrc: url('/fonts/Georgia/Georgia.woff') format('woff'); /* Modern Browsers */\\n\\tfont-weight: normal;\\n\\tfont-style: normal;\\n}\\n.input-focus-style:focus {\\n\\tbox-shadow: 0pt 0pt 2pt 1px #0072ff8f;\\n}\\n\\n.menu-title {\\n\\tfont-family: roboto;\\n\\tfont-weight: bold;\\n\\tletter-spacing: 4px;\\n\\tcolor: #dee2e6;\\n}\\n.menu-title > h5 {\\n\\tfont-size: 20px;\\n}\\n.menu-header {\\n\\tborder-top: 8px solid #007bff40;\\n\\tborder-top-right-radius: 10px;\\n\\tborder-top-left-radius: 10px;\\n\\tbackground: #495057;\\n}\\n.menu-seacrh-item {\\n\\tmax-width: 200px;\\n\\tbackground: #e0e0e026;\\n\\tpadding: 5px;\\n\\tborder-radius: 15px;\\n}\\n\\n.menu-search-item-input > input {\\n\\tborder: none;\\n\\tfont-size: 12px;\\n\\tpadding: 5px 2px;\\n\\toutline: none;\\n\\tborder-radius: 10px 0px 0px 10px;\\n\\tbackground: #adb5bd8a;\\n}\\n.menu-search-item-input > input::placeholder {\\n\\tcolor: #000000;\\n}\\n.menu-search-icon {\\n\\tcolor: #ffffff99;\\n\\tpadding: 4px 8px;\\n\\tfont-size: 12px;\\n\\tborder-radius: 0px 5px 5px 0px;\\n\\tcursor: pointer;\\n\\tborder: 1px solid #ffffff59;\\n}\\n.fa-exchange-alt {\\n\\tfont-size: 10px;\\n\\tcolor: #0000007a;\\n}\\n.create_menu_style {\\n\\tdisplay: block;\\n\\twidth: 100%;\\n\\tborder-radius: 15px;\\n\\tborder: 1px solid #00000026;\\n\\tpadding: 5px 8px;\\n\\toutline: none;\\n\\tfont-weight: bold;\\n\\tfont-size: 15px;\\n}\\n.create_menu_style:focus {\\n\\tbox-shadow: 0pt 0pt 3pt #007bff;\\n}\\n.dropHeader {\\n\\tbackground: #6c757d;\\n}\\n.droptitle {\\n\\tfont-weight: bold;\\n\\tfont-size: 15px;\\n\\tfont-family: Arial, Helvetica, sans-serif;\\n}\\n.dropInputStyle {\\n\\tborder: 1px solid #00000038;\\n\\tmax-width: 55%;\\n\\theight: 25px;\\n\\tmargin-top: 3px;\\n\\tborder-radius: 6px;\\n\\tpadding: 10px;\\n\\tfont-size: 15px;\\n\\tfont-weight: bold;\\n\\tfont-family: Arial;\\n\\toutline: none;\\n}\\n.dropInputStyle:focus {\\n\\tbox-shadow: 0pt 0pt 3pt #007bff;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/createMenu.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/createPage.css":
/*!**********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/createPage.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".panel-heading {\\n    border-bottom:1px solid #0000002e;\\n}\\n.note-dropdown-menu{\\n    padding:10px;\\n    list-style:none!important;\\n\\n}\\n\\n.note-dropdown-menu>li>a{\\n    text-decoration: none!important;\\n    color:black;\\n}\\n\\n.note-dropdown-menu>li:hover{\\n    background:#0000001c;\\n    border-radius:5px;\\n}\\n.note-dropdown-menu>li>a>p{\\n    color:#00000082;\\n    font-size:15px;\\n    \\n}\\n\\n.note-dropdown-menu>li>a>pre{\\n    border:1px solid #0000001f;\\n    border-radius:10px;\\n}\\n.note-dropdown-menu>li>a>blockquote{\\n    border-left:4px solid #6d6e6f;\\n    \\n}\\n\\n.note-dropdown-menu>li>a>h1{\\n    font-size:2rem!important;\\n}\\n.note-dropdown-menu>li>a>h2{\\n    font-size:1.75rem!important;\\n\\n}\\n.note-dropdown-menu>li>a>h3{\\n    font-size:1.5rem!important;\\n\\n}\\n.note-dropdown-menu>li>a>h4{\\n    font-size:1.25rem!important;\\n\\n}\\n.note-dropdown-menu>li>a>h5{\\n    font-size:1rem!important;\\n\\n}\\n.note-dropdown-menu>li>a>h6{\\n    font-size:15px!important;\\n \\n}\\n.note-btn{\\n\\n    border:1px solid #0000001f;\\n    padding:5px 10px;\\n}\\n.note-editor{\\n    background:white;\\n    color:#343a40;\\n}\\n.page-title{\\n    background: #495057;\\n    border-radius:4px;\\n    border:1px solid #f8f9fa80;\\n    color:#dee2e6;\\n    text-transform: uppercase;\\n    font-weight: bold;\\n\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/createPage.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/dashboard.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/dashboard.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"@font-face {\\n\\tfont-family: 'Georgia';\\n\\tsrc: url('/fonts/Georgia/Georgia.woff') format('woff'); /* Modern Browsers */\\n\\tfont-weight: normal;\\n\\tfont-style: normal;\\n}\\n@font-face {\\n\\tfont-family: 'myfont';\\n\\tsrc: url('/fonts/baskerville/BaskervilleBT.woff') format('woff'); /* Modern Browsers */\\n\\tfont-weight: normal;\\n\\tfont-style: normal;\\n}\\nbody {\\n\\toverflow-x: hidden;\\n}\\nbody::-webkit-scrollbar {\\n\\twidth: 10px;\\n}\\nbody::-webkit-scrollbar-track {\\n\\tborder: 2px solid rgb(201, 58, 32);\\n}\\nbody::-webkit-scrollbar-thumb {\\n\\tbackground: linear-gradient(blue, #1f9411, blue);\\n\\twidth: 5px;\\n\\tborder: 1px solid rgb(201, 58, 32);\\n\\tborder-radius: 5px;\\n}\\nhtml {\\n\\tscroll-behavior: smooth;\\n}\\n\\n.paddingRemover{\\n\\tpadding-right: 13px!important;\\n\\tpadding-left: 0px!important;\\n}\\n/* Admin Dashboard Sidebar Head Content */\\n.admin-head-brand-container {\\n\\t/* border-bottom:1px solid #ffffff33; */\\n\\tborder-bottom: 1px dashed #ffffff2b;\\n\\tborder-right: 1px dashed #ffffff2b;\\n}\\n.admin-head-brand {\\n\\tborder-bottom: 2px solid #1e7e34;\\n\\tborder-bottom-left-radius: 20px;\\n\\tborder-bottom-right-radius: 20px;\\n}\\n.admin-head-brand > h1 {\\n\\tcolor: #dee2e6;\\n\\tfont-family: Georgia;\\n}\\n/* Admin Sidebar Scroll Designed */\\n@media (min-width: 576px) {\\n\\t.sidebar {\\n\\t\\theight: 562px;\\n\\t\\toverflow-y: auto;\\n\\t\\tscroll-behavior: smooth;\\n\\t}\\n\\t.sidebar::-webkit-scrollbar {\\n\\t\\twidth: 2px;\\n\\t}\\n\\t.sidebar::-webkit-scrollbar-track {\\n\\t\\tbackground: #212529;\\n\\t}\\n\\t.sidebar::-webkit-scrollbar-thumb {\\n\\t\\tbackground:#adb5bd;\\n\\t\\tborder-radius: 8px;\\n\\t}\\n}\\n/* Admin Sidebar Menu Content */\\n.sidebar-menu-item {\\n\\t/* display:flex;\\n    justify-content:space-around; */\\n\\tcursor: pointer;\\n\\tborder-bottom: 1px dashed #6c757d;\\n\\tborder-bottom-right-radius: 20px;\\n\\tmargin: 6px 0px;\\n}\\n.sidebar-menu-item >  div > a {\\n\\ttext-decoration: none;\\n\\tcolor: #dee2e6;\\n\\tfont-family: Arial, Helvetica, sans-serif;\\n\\tfont-size: 15px;\\n\\tfont-weight: bold;\\n}\\n.sidebar-menu-item > div > i {\\n\\tcolor: #ffffffc2;\\n\\ttransform: rotate(90deg);\\n}\\n.sidebar-menu-item:hover {\\n\\ttransform: translateX(15px);\\n\\ttransition: transform 0.5s;\\n\\tborder-right: 1px dashed orange;\\n\\tborder-top: 1px dashed orange;\\n\\tborder-bottom:1px dashed orange;\\n}\\n\\n.clickToStyle {\\n\\n\\tborder-right: 1px dashed #f8f9fa;\\n    border-top: 1px dashed #f8f9fa;\\n    border-bottom: 1px dashed #f8f9fa;\\n}\\n\\n/* ANCHOR  Sub Menu Of Page */\\n.pages-menu-container {\\n\\tborder-top: 1px solid #ececec1f;\\n\\tbackground: #0000001f;\\n\\tborder-bottom-right-radius: 15px;\\n\\tdisplay: none;\\n\\ttransition: all 1s;\\n}\\n.pages-menu {\\n\\tlist-style: none;\\n\\tpadding-left: 28px!important;\\n}\\n.pages-menu > li {\\n\\t/* color: #acb9c6; */\\n\\tfont-family: Arial, Helvetica, sans-serif;\\n\\tfont-size: 15px;\\n\\tmargin: 5px 0px;\\n\\tfont-weight: bold;\\n}\\n.pages-menu > li:hover {\\n\\ttransform: scale(0.96);\\n\\ttransition: transform 0.5s;\\n\\t/* background: red; */\\n}\\n.pages-menu > li > a {\\n\\twidth: 100%;\\n\\tbackground: #adb5bd;\\n\\tcolor: #343a40;\\n\\tborder: none;\\n\\tpadding: 5px;\\n\\toutline: none;\\n\\t/* border-bottom: 1px solid #ffffff2e; */\\n\\t/* border: 1px solid #1e7e34; */\\n\\tfont-size: 14px;\\n\\tdisplay: block;\\n\\ttext-decoration: none;\\n\\ttext-align: center;\\n\\tborder-radius: 5px;\\n}\\n.pages-menu > li > a:hover {\\n\\t/* box-shadow: 1pt 0pt 0pt #07ad4aab; */\\n\\tbackground: #e9ecef;\\n\\tcolor: #1e7e34;\\n}\\n.pages-menu > li > a:focus {\\n\\tbox-shadow: 1pt 0pt 0pt #07ad4aab;\\n}\\n.page-create-btn {\\n\\tborder-radius: 4px;\\n\\t/* border: 1px solid #2cca6b3d; */\\n\\tbackground: #f8f9fa;\\n\\tfont-family: arial;\\n\\tdisplay: block;\\n\\ttext-align: center;\\n\\tcolor: #007bff;\\n\\tfont-weight: bold;\\n\\twidth: 86%;\\n\\tfloat: right;\\n\\tpadding: 2px 0px;\\n}\\n.page-create-btn:hover {\\n\\ttext-decoration: none;\\n\\tcolor: #495057;\\n}\\n.page-create-btn:focus {\\n\\tbox-shadow: 0pt 0pt 6pt 0pt #10525d;\\n}\\n\\n.newsBtn {\\n\\tcolor: red !important;\\n}\\n\\n/* Admin Dashboard Content Head */\\n.admin-content-head {\\n\\tpadding: 21px 0px;\\n}\\n.admin-content-head-administrator {\\n\\tfont-family: Georgia;\\n}\\n\\n.admin-content-head-administrator > button {\\n\\tborder: 1px solid black;\\n}\\n\\n.admin-head-search > form > input {\\n\\twidth: 16rem !important;\\n\\theight: 30px !important;\\n\\tborder-radius: 15px;\\n\\tbackground: transparent;\\n\\tborder: 1px dashed orange;\\n}\\n.admin-head-search > form > button {\\n\\tborder-radius: 50%;\\n\\tbackground: transparent;\\n\\tborder: 1px dashed orange;\\n\\tcolor: #ffffff94;\\n}\\n.admin-head-icon {\\n\\tfont-family: Georgia;\\n}\\n.admin-head-icon > button {\\n\\tborder: 1px solid black;\\n}\\n\\n.admin-head-icon > button > i {\\n\\tfont-size: 17px;\\n}\\n.admin-head-icon > form {\\n\\tdisplay: inline-block;\\n}\\n.admin-head-icon > form > button {\\n\\tborder: 1px solid black;\\n}\\n\\n/* Admin Dashboard Content Body */\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/dashboard.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/emails.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/emails.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".pre__custom__style{\\n    font-family: Arial, Helvetica, sans-serif;\\n    white-space: pre-wrap;\\n    font-size: 16px;\\n    color:#212529\\n}\\n.bold__text__style{\\n    font-size: 15px;\\n}\\n.crossBtn{\\n    /* border: 1px solid #00000021; */\\n    box-shadow: 0pt 0pt 3pt 0pt #00000038;\\n    border-radius: 6px;\\n    color: #f60707;\\n    outline: none;\\n    border: none;\\n    transition: all 0.5s;\\n    background: #f8f9fa;\\n}\\n.crossBtn:hover{\\n    transform: scale(0.97);\\n    background: #4950572b;\\n}\\n.crossBtn:focus{\\n    outline:none!important\\n}\\n.custom__input__style{\\n    width: 100%;\\n    padding: 6px;\\n    outline: none;\\n    border: none;\\n    border-bottom: 1px solid #adb5bd9e;\\n    transition: all 0.5s;\\n    resize: none;\\n}\\n.circulerStyle {\\n    display: inline-block;\\n    padding: 5px 12px;\\n    border-radius: 12px;\\n    box-shadow: 0pt 0pt 3pt 0pt #00000057;\\n    transition: all 0.5s;\\n    cursor: pointer;\\n}\\n.circulerStyle:hover{\\n    background:black;\\n    color:#fff;\\n\\n}\\n.status__btn{\\n    color:#fff;\\n}\\n.status__btn:hover{\\n    color:#fff;\\n    text-decoration: none;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/emails.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/multipleStyle.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/multipleStyle.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#parentProfilePicPreview{\\n    position: relative;\\n}\\n\\n\\n.editProfilePicsEditBtn{\\n    position: absolute;\\n    top: 0px;\\n    right: 2px;\\n    font-size: 1.25rem;\\n    color: #e9ecef;\\n    cursor: pointer;\\n    display: none;\\n\\n}\\n.updateProfilePicPreview{\\n    position: relative;\\n}\\n.updateProfilePicsEditBtn{\\n    position: absolute;\\n    top: 0px;\\n    right: 2px;\\n    font-size: 1.25rem;\\n    color: #e9ecef;\\n    cursor: pointer;\\n    display: none;\\n}\\n\\n.inputGroupCustomStyle{\\n    border: none;\\n    outline: none;\\n    border-bottom: 1px solid #0000004d;\\n    width: 100%;\\n    background: transparent;\\n    padding: 3px;\\n}\\n.inputGroupCustomStyle:focus{\\n    border-bottom:1px solid #e9ecef;\\n}\\n\\n.fileBrowserStyle{\\n    border: 1px solid #0000004d;\\n    background: transparent;\\n}\\n.fileBrowserStyle::after{\\n    background: transparent;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/multipleStyle.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/navbar.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/navbar.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"@font-face {\\n\\tfont-family: 'Georgia';\\n\\tsrc: url('/fonts/Georgia/Georgia.woff') format('woff'); /* Modern Browsers */\\n\\tfont-weight: normal;\\n\\tfont-style: normal;\\n}\\n.setting-menu{\\n    left:25%;\\n    min-width:7rem!important;\\n}\\n.setting-account{\\n    padding:5px;\\n \\n    font-size:13px;\\n    text-align:center\\n}\\n.account-name{\\n    font-weight: bold;\\n    \\n}\\n.setting-item{\\n    margin-bottom:2px;\\n    padding:2px;\\n    text-align: center;\\n   \\n}\\n.setting-application{\\n    border-top:1px solid #00000029;\\n}\\n.setting-application>a{\\n    color:black;\\n    text-decoration: none;\\n    font-size:14px;\\n    font-family:Arial, Helvetica, sans-serif;\\n}\\n.setting-item:hover{\\n    /* transform:translateX(10px);\\n    transition: transform 1s; */\\n    background:#00000026;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/navbar.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/notice.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/notice.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".custom-card{\\n    height:100%;\\n    background: #495057;\\n    border-top: 6px solid #adb5bd;\\n    /* box-shadow: 0pt -4pt 0pt 0px #545b62; */\\n    border-radius: 10px 10px 0px 0px;\\n}\\n.latestNewsTitle{\\n    width:100%;\\n    /* border-radius:6px; */\\n    /* padding:5px; */\\n    border-bottom: 1px solid #00000038;\\n    background: #0000000d;\\n    color:#495057;\\n    font-weight: bold;\\n    font-family:arial;\\n    transition:all 0.5s;\\n}\\n.latestNewsText{\\n    width:100%;\\n    height:200px;\\n    /* border-radius:6px; */\\n    padding:5px;\\n    border-bottom: 1px solid #0000003d;\\n    background: #0000000d;\\n    color:#495057;\\n    font-family:arial black;\\n    transition:all 0.5s;\\n}\\n.latestNewsTitle:focus{\\n    border-bottom:2px solid #6c757d;\\n}\\n.latestNewsText:focus{\\n    border-bottom:2px solid #6c757d;\\n}\\n.dateCustomStyle:focus{\\n    box-shadow: none;\\n    border-bottom:2px solid #6c757d!important;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/notice.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/setting.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/setting.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".table-custom-style { \\n    border-collapse: separate; \\n    border-spacing: 0 10px; \\n    margin-top: -10px; /* correct offset on first border spacing if desired */\\n    \\n}\\n.td-custom-style {\\n    /* border: solid 1px #0003; */\\n    /* border-style: solid none; */\\n    padding: 10px;\\n    background-color: #495057;\\n    color: #dee2e6;\\n    \\n    border:none!important;\\n}\\n.td-custom-style:first-child {\\n    /* border-left-style: solid; */\\n    border-top-left-radius: 10px; \\n    border-bottom-left-radius: 10px;\\n}\\n.td-custom-style:last-child {\\n    /* border-right-style: solid; */\\n    border-bottom-right-radius: 10px; \\n    border-top-right-radius: 10px; \\n}\\n\\n.setting-title{\\n    /* background: #343a40; */\\n    color: #adb5bd;\\n    padding: 5px;\\n    margin: 3px 10px 0px 0px;\\n    /* border-radius: 8px; */\\n    font-family: roboto;\\n    text-transform: uppercase;\\n    letter-spacing: 1px;\\n    box-shadow:0pt 1pt 0pt 0px #fd9801;\\n}\\n.setting-title-radius{\\n    border-radius: 10px 10px 0px 0px;\\n}\\n.slider-title{\\n    background: #6c757d;\\n    color: #fafcffe0;\\n    padding: 5px;\\n    /* border-radius:5px 5px 0px 0px; */\\n    font-family: roboto;\\n    text-align:center;\\n}\\n.btn-upload{\\n    border: 1px solid #343a4059;\\n    border-radius: 10px;\\n}\\n.btn-upload:hover{\\n    background:black;\\n    color:white;\\n    transition:all 1s;\\n}\\n.btn-upload:focus{\\n    box-shadow:0pt 0pt 4pt #0da02d\\n}\\n.btn-upload>i{\\n   font-size:18px\\n}\\n.editInputStyle{\\n    border-radius: 10px;\\n    border: 1px solid #00000033;\\n    outline: none;\\n    width: 100%;\\n    padding: 5px;\\n    color:#007bff;\\n}\\n.editInputStyle:focus{\\n    box-shadow: 0pt 0pt 4pt #9a9598\\n}\\n.socialIconsStyle{\\n    display: flex;\\n    justify-content:center;\\n    align-items:center;\\n    border:1px solid #00000026;\\n    border-radius:8px;\\n    transition:all 1s;\\n    color:#6c757d;\\n}\\n.socialIconsStyle:hover{\\n    background:#545b62;\\n    color:white;\\n}\\n.socialIconsStyle>i{\\n    font-size:20px; \\n}\\n.aboutInputStyle{\\n    display: block;\\n    width: 100%;\\n    /* background: #0000000a; */\\n    border-radius: 8px;\\n    border: none;\\n    border-bottom: 1px solid #00000024;\\n    outline: none;\\n    padding:10px 10px;\\n    font-size:16px;\\n}\\n.aboutInputStyle:focus{\\n    border-bottom: 1px solid #d39e00;\\n}\\n\\n\\ntextarea {\\n    border: none;\\n    outline: none;\\n    -webkit-box-shadow: none;\\n    -moz-box-shadow: none;\\n    box-shadow: none;\\n    resize: none; /*remove the resize handle on the bottom right*/\\n}\\ntextarea::-webkit-scrollbar{\\n    width:5px; \\n}\\ntextarea::-webkit-scrollbar-track{\\n    background:rgba(94, 93, 93, 0.26);\\n    border-radius: 25px\\n}\\ntextarea::-webkit-scrollbar-thumb{\\n    /* background:linear-gradient(#6200ea,#4a148c,#6200ea); */\\n    background:#adb5bd;\\n    border-radius: 25px\\n}\\n\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/setting.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/admin/style.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/admin/style.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./navbar.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/navbar.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_1___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./dashboard.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/dashboard.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_2___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./createMenu.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/createMenu.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_3___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./administratorAccount.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/administratorAccount.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_4___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./adminCreate.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/adminCreate.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_5___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./createPage.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/createPage.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_6___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./setting.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/setting.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_7___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./notice.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/notice.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_8___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./multipleStyle.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/multipleStyle.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_9___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!../user/resultsdesign.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/user/resultsdesign.css\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_10___ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./emails.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/emails.css\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_1___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_2___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_3___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_4___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_5___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_6___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_7___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_8___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_9___);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_10___);\n// Module\nexports.push([module.i, \"\\n/* @import './login.css'; */\\n/* Defaullt Scroll Style */\\n@media (min-width:576px){\\n    html{\\n        overflow-y: hidden;\\n    }\\n    .scroll-style{\\n        height:563px;\\n        overflow-y: scroll;\\n        scroll-behavior: smooth;\\n        margin-right:1px;\\n    }\\n    .scroll-style::-webkit-scrollbar{\\n        width:5px; \\n    }\\n    .scroll-style::-webkit-scrollbar-track{\\n        background:#263238;\\n        border-radius: 25px\\n    }\\n    .scroll-style::-webkit-scrollbar-thumb{\\n        background:linear-gradient(#6200ea,#4a148c,#6200ea);\\n        border-radius: 25px\\n    }\\n};\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/admin/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./public/styles/user/resultsdesign.css":
/*!************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./public/styles/user/resultsdesign.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".result-content{\\n    border:4px dashed #1e7e34;\\n    outline:4px solid #1e7e34;\\n   \\n}\\nhtml{\\n    font-size:1em!important;\\n}\\n/* .result-header{\\n\\n} */\\n@-ms-viewport{\\n    width: device-width;\\n  }\\n.custom-table{\\n    display: grid;\\n}\\n.custom-table-col-1{\\n    grid-template-columns: auto;\\n}\\n.custom-table-head-col-2{\\n    grid-template-columns: 25% 75%;\\n}\\n.custom-table-head-col-4{\\n    grid-template-columns: 25% 25% 25% 25%;\\n}\\n.custom-table-col-5{\\n    grid-template-columns: auto auto auto auto auto;\\n}\\n.res-large{\\n    /* font-size: 1.75vw; */\\n    font-size: 1em;\\n}\\n.res-small{\\n    font-size:1vw;\\n}\\n.res-text-normal{\\n    font-size:0.75vw;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./public/styles/user/resultsdesign.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\n\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./public/styles/admin/style.css":
/*!***************************************!*\
  !*** ./public/styles/admin/style.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./public/styles/admin/style.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./public/styles/admin/style.css?");

/***/ })

/******/ });