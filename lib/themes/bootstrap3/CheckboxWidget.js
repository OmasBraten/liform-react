"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var RenderInput = function (_React$Component) {
    _inherits(RenderInput, _React$Component);

    function RenderInput() {
        _classCallCheck(this, RenderInput);

        return _possibleConstructorReturn(this, (RenderInput.__proto__ || Object.getPrototypeOf(RenderInput)).apply(this, arguments));
    }

    _createClass(RenderInput, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.input.value === "" && this.props.defaultValue) {
                this.setState({}, function () {
                    _this2.props.input.onChange(_this2.props.defaultValue);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var className = (0, _classnames2.default)(["form-group", {"has-error": this.props.meta.touched && this.props.meta.error}]);
            var staticClassname = (0, _classnames2.default)(["glyphicon", {"glyphicon-ok": this.props.input.value}, {"glyphicon-remove": !this.props.input.value}]);
            return _react2.default.createElement(
                "div",
                {className: className},
                _react2.default.createElement(
                    "div",
                    {className: "checkbox"},
                    this.props.readOnly && _react2.default.createElement(
                    "p",
                    {className: "form-control-static"},
                    _react2.default.createElement("span", {className: staticClassname}),
                    " ",
                    this.props.label
                    ),
                    !this.props.readOnly && _react2.default.createElement(
                    "label",
                    null,
                    _react2.default.createElement("input", _extends({}, this.props.input, {
                        type: "checkbox"
                        //required={this.props.required}
                        , id: this.props.id,
                        checked: this.props.input.value
                    })),
                    " ",
                    this.props.label
                    )
                ),
                this.props.meta.touched && this.props.meta.error && _react2.default.createElement(
                "span",
                {className: "help-block"},
                this.props.meta.error
                ),
                this.props.description && _react2.default.createElement(
                "span",
                {className: "help-block"},
                this.props.description
                )
            );
        }
    }]);

    return RenderInput;
}(_react2.default.Component);

var CheckboxWidget = function CheckboxWidget(props) {
    return _react2.default.createElement(_reduxForm.Field, {
        component: RenderInput,
        label: props.label,
        name: props.fieldName,
        required: props.required,
        id: props.context.formName + "-field-" + props.fieldName,
        placeholder: props.schema.default,
        description: props.schema.description,
        readOnly: props.readOnly,
        defaultValue: props.schema.default
    });
};

CheckboxWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    fieldName: _propTypes2.default.string,
    label: _propTypes2.default.string,
    theme: _propTypes2.default.object,
    readOnly: _propTypes2.default.bool
};

exports.default = CheckboxWidget;