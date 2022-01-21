"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _plugin = require("@parcel/plugin");

var _namerDefault = _interopRequireDefault(require("@parcel/namer-default"));

/*
 * @description: parcel namer plugin
 * @Author: Gomi
 * @Date: 2022-01-14 23:14:13
 */
var CONFIG = Symbol["for"]("parcel-plugin-config");

var _default = new _plugin.Namer({
  name: function name(_ref) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var bundle, bundleGraph, logger, oldName, nameArr, newName;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              bundle = _ref.bundle, bundleGraph = _ref.bundleGraph, logger = _ref.logger;
              _context.next = 3;
              return _namerDefault["default"][CONFIG].name({
                bundle: bundle,
                bundleGraph: bundleGraph,
                logger: logger
              });

            case 3:
              oldName = _context.sent;

              if (bundle.needsStableName) {
                _context.next = 10;
                break;
              }

              nameArr = oldName.split(".");
              nameArr.splice(nameArr.length - 2, 1);
              newName = nameArr.join(".");
              logger.log({
                message: "".concat(oldName, " -> ").concat(newName)
              });
              return _context.abrupt("return", newName);

            case 10:
              return _context.abrupt("return", oldName);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});

exports["default"] = _default;