"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setError = exports.DefaultTheme = exports.processSubmitErrors = exports.renderField = exports.renderFields = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bootstrap = require("./themes/bootstrap3");

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _reduxForm = require("redux-form");

var _renderFields = require("./renderFields");

var _renderFields2 = _interopRequireDefault(_renderFields);

var _renderField = require("./renderField");

var _renderField2 = _interopRequireDefault(_renderField);

var _processSubmitErrors = require("./processSubmitErrors");

var _processSubmitErrors2 = _interopRequireDefault(_processSubmitErrors);

var _buildSyncValidation = require("./buildSyncValidation");

var _buildSyncValidation2 = _interopRequireDefault(_buildSyncValidation);

var _compileSchema = require("./compileSchema");

var _compileSchema2 = _interopRequireDefault(_compileSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseForm = function BaseForm(props) {
    var schema = props.schema,
        handleSubmit = props.handleSubmit,
        theme = props.theme,
        error = props.error,
        submitting = props.submitting,
        context = props.context,
        readOnly = props.readOnly;

    return _react2.default.createElement(
        "form",
        { onSubmit: handleSubmit },
        (0, _renderField2.default)(schema, null, readOnly, theme, "", context),
        _react2.default.createElement(
            "div",
            null,
            error && _react2.default.createElement(
                "strong",
                null,
                error
            )
        ),
        _react2.default.createElement(
            "button",
            { className: "btn btn-primary", type: "submit", disabled: submitting },
            "Submit"
        )
    );
};

var Liform = function (_React$Component) {
    _inherits(Liform, _React$Component);

    function Liform() {
        _classCallCheck(this, Liform);

        return _possibleConstructorReturn(this, (Liform.__proto__ || Object.getPrototypeOf(Liform)).apply(this, arguments));
    }

    _createClass(Liform, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            this.props.schema.showLabel = false;
            var schema = (0, _compileSchema2.default)(this.props.schema);
            var formName = this.props.formKey || this.props.schema.title || "form";
            var FinalForm = (0, _reduxForm.reduxForm)({
                form: this.props.formKey || this.props.schema.title || "form",
                validate: this.props.syncValidation || (0, _buildSyncValidation2.default)(schema, this.props.ajv),
                initialValues: this.props.initialValues,
                context: _extends({}, this.props.context, { formName: formName }),
                readOnly: this.props.readOnly,
                destroyOnUnmount: false
            })(this.props.baseForm || BaseForm);
            return _react2.default.createElement(FinalForm, _extends({
                ref: function ref(form) {
                    return _this2.form = form;
                },
                renderFields: _renderField2.default.bind(this)
            }, this.props, {
                schema: schema
            }));
        }
    }, {
        key: "values",
        value: function values() {
            return this.form.values;
        }
    }]);

    return Liform;
}(_react2.default.Component);

Liform.propTypes = {
    schema: _propTypes2.default.object,
    onSubmit: _propTypes2.default.func,
    initialValues: _propTypes2.default.object,
    syncValidation: _propTypes2.default.func,
    formKey: _propTypes2.default.string,
    baseForm: _propTypes2.default.func,
    context: _propTypes2.default.object,
    ajv: _propTypes2.default.object,
    typeIdentifier: _propTypes2.default.string
};

exports.default = Liform;
exports.renderFields = _renderFields2.default;
exports.renderField = _renderField2.default;
exports.processSubmitErrors = _processSubmitErrors2.default;
exports.DefaultTheme = _bootstrap2.default;
exports.setError = _buildSyncValidation.setError;