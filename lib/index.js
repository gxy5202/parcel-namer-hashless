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
var MODE;
(function (MODE) {
  MODE["ALL"] = "all";
  MODE["DEVELOPMENT"] = "development";
  MODE["PRODUCTION"] = "production";
})(MODE || (MODE = {}));
function matchFileName(configs, newName) {
  return Array.isArray(configs) && (configs === null || configs === void 0 ? void 0 : configs.some(function (v) {
    var reg = new RegExp(v);
    return reg.test(newName);
  }));
}
function buildNameWithoutHash(_ref) {
  var bundle = _ref.bundle,
    oldName = _ref.oldName,
    logger = _ref.logger,
    include = _ref.include,
    exclude = _ref.exclude;
  try {
    // if filename has hash,
    if (!(bundle !== null && bundle !== void 0 && bundle.needsStableName)) {
      var nameArr = oldName.split(".");
      nameArr.splice(nameArr.length - 2, 1);
      var newName = nameArr.join(".");
      if (matchFileName(exclude, newName)) {
        return oldName;
      }
      if (matchFileName(include, newName)) {
        logger.log({
          message: "".concat(oldName, " -> ").concat(newName)
        });
        return newName;
      }
      if (Array.isArray(include)) {
        return oldName;
      }
      logger.log({
        message: "".concat(oldName, " -> ").concat(newName)
      });
      return newName;
    }
  } catch (err) {
    console.error(err);
  }
  return oldName;
}
var _default = new _plugin.Namer({
  loadConfig: function loadConfig(_ref2) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var config, packageJson, namerConfig;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            config = _ref2.config;
            _context.next = 3;
            return config.getPackage();
          case 3:
            packageJson = _context.sent;
            namerConfig = packageJson === null || packageJson === void 0 ? void 0 : packageJson['parcel-namer-hashless']; // if parcel-namer-hashless config is matched
            if (!(Object.prototype.toString.call(namerConfig) === '[object Object]')) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", Promise.resolve(namerConfig));
          case 7:
            return _context.abrupt("return", Promise.resolve({}));
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  name: function name(_ref3) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var bundle, bundleGraph, logger, options, config, oldName, configMode, include, exclude, mode;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            bundle = _ref3.bundle, bundleGraph = _ref3.bundleGraph, logger = _ref3.logger, options = _ref3.options, config = _ref3.config;
            _context2.next = 3;
            return _namerDefault["default"][CONFIG].name({
              bundle: bundle,
              bundleGraph: bundleGraph,
              logger: logger
            });
          case 3:
            oldName = _context2.sent;
            configMode = config.mode, include = config.include, exclude = config.exclude;
            mode = options.mode;
            if (!(configMode === mode || configMode === MODE.ALL)) {
              _context2.next = 8;
              break;
            }
            return _context2.abrupt("return", buildNameWithoutHash({
              bundle: bundle,
              oldName: oldName,
              logger: logger,
              include: include,
              exclude: exclude
            }));
          case 8:
            if (configMode) {
              _context2.next = 12;
              break;
            }
            if (!(mode === MODE.DEVELOPMENT)) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return", oldName);
          case 11:
            return _context2.abrupt("return", buildNameWithoutHash({
              bundle: bundle,
              oldName: oldName,
              logger: logger,
              include: include,
              exclude: exclude
            }));
          case 12:
            return _context2.abrupt("return", oldName);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  }
});
exports["default"] = _default;