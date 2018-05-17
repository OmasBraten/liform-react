"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require("redux-form");

var _DateSelector = require("./DateSelector");

var _DateSelector2 = _interopRequireDefault(_DateSelector);

require("react-day-picker/lib/style.css");

var _DayPickerInput = require("react-day-picker/DayPickerInput");

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

var _moment = require("react-day-picker/moment");

var _DateInput = require("./DateInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompatibleDate = function (_React$Component) {
    _inherits(CompatibleDate, _React$Component);

    function CompatibleDate() {
        _classCallCheck(this, CompatibleDate);

        return _possibleConstructorReturn(this, (CompatibleDate.__proto__ || Object.getPrototypeOf(CompatibleDate)).apply(this, arguments));
    }

    _createClass(CompatibleDate, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            if (!this.props.input.value) {
                if (this.props.schema.default) {
                    this.setState({}, function () {
                        _this2.props.input.onChange(_this2.props.schema.default);
                    });
                } else {
                    this.setState({}, function () {
                        return _this2.props.input.onChange((0, _moment.formatDate)(new Date(), 'YYYY-MM-DD'));
                    });
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            var field = this.props;
            var className = (0, _classnames2.default)(["form-group", { "has-error": field.meta.touched && field.meta.error }]);

            if (this.props.schema.readOnly && !field.input.value) {
                return "";
            } else if (this.props.readOnly && !field.input.value) {
                return "";
            }

            return _react2.default.createElement(
                "div",
                { className: className },
                _react2.default.createElement(
                    "label",
                    { className: "control-label", htmlFor: field.id },
                    field.label
                ),
                field.readOnly && _react2.default.createElement(
                "p",
                {className: "form-control-static"},
                (0, _moment.formatDate)(field.input.value, 'LL')
                ),
                !field.readOnly && _react2.default.createElement(_DayPickerInput2.default, {
                    onDayChange: function onDayChange(day) {
                        return field.input.onChange((0, _moment.formatDate)(day, 'YYYY-MM-DD'));
                    },
                    inputProps: {
                        id: this.props.id,
                        required: this.props.required
                    },
                    component: _DateInput.DateInput,
                    overlayComponent: CustomOverlay,
                    value: field.input.value ? (0, _moment.formatDate)(field.input.value, 'LL') : (0, _moment.formatDate)(new Date(), 'LL'),
                    placeholder: (0, _moment.formatDate)(this.props.placeholder, 'LL'),
                    dayPickerProps: {
                        showOutsideDays: true,
                        month: new Date(),
                        fromMonth: new Date()
                    },
                    format: 'LL',
                    formatDate: _moment.formatDate,
                    parseDate: _moment.parseDate
                }),
                field.meta.touched && field.meta.error && _react2.default.createElement(
                    "span",
                    { className: "help-block" },
                    field.meta.error
                ),
                field.description && _react2.default.createElement(
                    "span",
                    { className: "help-block" },
                    field.description
                )
            );
        }
    }]);

    return CompatibleDate;
}(_react2.default.Component);

var CustomOverlay = function CustomOverlay(_ref) {
    var classNames = _ref.classNames,
        selectedDay = _ref.selectedDay,
        children = _ref.children;

    return _react2.default.createElement(
        "div",
        {className: classNames.overlayWrapper, style: {"zIndex": 100}},
        _react2.default.createElement(
            "div",
            {className: classNames.overlay},
            children
        )
    );
};

var CompatibleDateWidget = function CompatibleDateWidget(props) {
    return _react2.default.createElement(_reduxForm.Field, {
        component: CompatibleDate,
        label: props.label,
        name: props.fieldName,
        required: props.required,
        id: props.context.formName + "-field-" + props.fieldName,
        placeholder: props.schema.default,
        description: props.schema.description,
        startYear: props.schema["start-year"] || 1900,
        endYear: props.schema["end-year"] || new Date().getFullYear() + 5,
        type: props.type,
        readOnly: props.readOnly,
        schema: props.schema
    });
};

exports.default = CompatibleDateWidget;