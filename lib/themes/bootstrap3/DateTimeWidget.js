"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _BaseInputWidget = require("./BaseInputWidget");

var _BaseInputWidget2 = _interopRequireDefault(_BaseInputWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimeWidget = function DateTimeWidget(props) {
  return _react2.default.createElement(_BaseInputWidget2.default, _extends({ type: "datetime-local" }, props));
};

exports.default = DateTimeWidget;