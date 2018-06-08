"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map3 = require("lodash/map");

var _map4 = _interopRequireDefault(_map3);

var _zipObject3 = require("lodash/zipObject");

var _zipObject4 = _interopRequireDefault(_zipObject3);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderSelect = function (_React$Component) {
    _inherits(RenderSelect, _React$Component);

    function RenderSelect() {
        _classCallCheck(this, RenderSelect);

        return _possibleConstructorReturn(this, (RenderSelect.__proto__ || Object.getPrototypeOf(RenderSelect)).apply(this, arguments));
    }

    _createClass(RenderSelect, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var optionNames = this.props.schema.enum_titles || this.props.schema.enum;
            if ((this.props.input.value === "" || optionNames.length === 1 && optionNames[0] !== this.props.input.value) && this.props.defaultValue) {
                this.setState({}, function () {
                    _this2.props.input.onChange(_this2.props.defaultValue);
                });
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var optionNames = nextProps.schema.enum_titles || nextProps.schema.enum;
            if ((nextProps.input.value === "" || optionNames.length === 1 && optionNames[0] !== nextProps.input.value) && nextProps.defaultValue) {
                this.setState({}, function () {
                    nextProps.input.onChange(nextProps.defaultValue);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var className = (0, _classnames2.default)(["form-group", { "has-error": this.props.meta.touched && this.props.meta.error }]);
            var options = this.props.schema.enum;
            var optionNames = this.props.schema.enum_titles || options;

            var selectOptions = (0, _zipObject4.default)(options, optionNames);

            if (options.length === 1 && optionNames[0] === this.props.schema.default) return '';

            if (this.props.schema.readOnly && !this.props.input.value) {
                return "";
            } else if (this.props.readOnly && !this.props.input.value) {
                return "";
            }

            return _react2.default.createElement(
                "div",
                { className: className },
                _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: this.props.id },
                    this.props.label
                ),
                this.props.readOnly && _react2.default.createElement(
                    "p",
                    { className: "form-control-static" },
                    this.props.input.value
                ),
                !this.props.readOnly && _react2.default.createElement(
                    "select",
                    _extends({}, this.props.input, {
                        value: !this.props.input.value && this.props.multiple ? [] : this.props.input.value,
                        className: "form-control",
                        id: this.props.id,
                        required: this.props.required,
                        multiple: this.props.multiple

                    }),
                    !this.props.multiple && !this.props.schema.default && _react2.default.createElement(
                        "option",
                        { key: "", value: "" },
                        this.props.placeholder
                    ),
                    (0, _map4.default)(selectOptions, function (name, value) {
                        return _react2.default.createElement(
                            "option",
                            { key: value, value: value },
                            name
                        );
                    })
                ),
                this.props.meta.touched && this.props.meta.error && _react2.default.createElement(
                    "span",
                    { className: "help-block" },
                    this.props.meta.error
                ),
                this.props.description && _react2.default.createElement(
                    "span",
                    { className: "help-block" },
                    this.props.description
                )
            );
        }
    }]);

    return RenderSelect;
}(_react2.default.Component);

var ChoiceWidget = function ChoiceWidget(props) {
    return _react2.default.createElement(_reduxForm.Field, {
        component: RenderSelect,
        label: props.label,
        name: props.fieldName,
        required: props.required,
        id: props.context.formName + "-field-" + props.fieldName,
        placeholder: props.schema.default,
        description: props.schema.description,
        schema: props.schema,
        multiple: props.multiple,
        readOnly: props.readOnly,
        defaultValue: props.schema.default
    });
};

ChoiceWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    fieldName: _propTypes2.default.string,
    label: _propTypes2.default.string,
    theme: _propTypes2.default.object,
    multiple: _propTypes2.default.bool,
    required: _propTypes2.default.bool,
    readOnly: _propTypes2.default.bool
};

exports.default = ChoiceWidget;