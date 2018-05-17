"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reduxForm = require("redux-form");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

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

var processFile = function processFile(onChange, e) {
    var files = e.target.files;
    return new Promise(function () {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            onChange(reader.result);
        }, false);
        reader.readAsDataURL(files[0]);
    });
};

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

            if (!this.props.input.value && this.props.defaultValue) {
                this.setState({}, function () {
                    _this2.props.input.onChange(_this2.props.defaultValue);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var className = (0, _classnames2.default)(["form-group", {"has-error": this.props.meta.touched && this.props.meta.error}]);

            if (this.props.schema.readOnly && !this.props.input.value) {
                return "";
            } else if (this.props.readOnly && !this.props.input.value) {
                return "";
            }

            return _react2.default.createElement(
                "div",
                {className: className},
                _react2.default.createElement(
                    "label",
                    {className: "control-label", htmlFor: this.props.id},
                    this.props.label
                ),
                this.props.readOnly && _react2.default.createElement(
                "p",
                {className: "form-control-static"},
                this.props.input.value
                ),
                !this.props.readOnly && _react2.default.createElement("input", {
                    name: this.props.name,
                    onBlur: this.props.onBlur,
                    onChange: processFile.bind(this, this.props.input.onChange),
                    required: this.props.required,
                    className: "form-control",
                    type: "file",
                    id: this.props.id
                }),
                this.props.meta.touched && this.props.meta.error && _react2.default.createElement(
                "span",
                {className: "help-block"},
                this.props.meta.error
                ),
                this.props.description && _react2.default.createElement(
                "span",
                null,
                this.props.description
                )
            );
        }
    }]);

    return RenderInput;
}(_react2.default.Component);

var FileWidget = function FileWidget(props) {
    return _react2.default.createElement(_reduxForm.Field, {
        component: function component(field) {
            return _react2.default.createElement(RenderInput, field);
        },
        label: props.label,
        name: props.fieldName,
        required: props.required,
        id: props.context.formName + "-field-" + props.fieldName,
        placeholder: props.schema.default,
        description: props.schema.description,
        type: props.type,
        readOnly: props.readOnly,
        defaultValue: props.defaultValue,
        schema: props.schema
    });
};

exports.default = FileWidget;