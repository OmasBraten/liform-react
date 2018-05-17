"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require("redux-form");

require("react-day-picker/lib/style.css");

var _DayPickerInput = require("react-day-picker/DayPickerInput");

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

var _moment = require("react-day-picker/moment");

var _reactSimpleTimefield = require("react-simple-timefield");

var _reactSimpleTimefield2 = _interopRequireDefault(_reactSimpleTimefield);

var _DateInput = require("./DateInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompatibleDateTime = function (_React$Component) {
    _inherits(CompatibleDateTime, _React$Component);

    function CompatibleDateTime(props, context) {
        _classCallCheck(this, CompatibleDateTime);

        var _this = _possibleConstructorReturn(this, (CompatibleDateTime.__proto__ || Object.getPrototypeOf(CompatibleDateTime)).call(this, props, context));

        _this.state = {
            day: undefined,
            time: undefined
        };
        return _this;
    }

    _createClass(CompatibleDateTime, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (!this.props.input.value) {
                if (this.props.schema.default) {
                    this.updateState(this.props.schema.default);
                } else {
                    this.updateState(new Date());
                }
            } else {
                this.updateState(this.props.input.value);
            }
        }
    }, {
        key: "onChange",
        value: function onChange(data, key) {
            var newState = this.state;
            if (key === "day") newState[key] = (0, _moment.formatDate)(data, "YYYY-MM-DD");
            this.updateState(newState.day, newState.key);
        }
    }, {
        key: "updateState",
        value: function updateState(day) {
            var _this2 = this;

            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : day;

            this.setState({
                day: (0, _moment.formatDate)(day, 'YYYY-MM-DD'),
                time: (0, _moment.formatDate)(time, 'HH:mm')
            }, function () {
                _this2.props.input.onChange((0, _moment.formatDate)(_this2.state.day + " " + _this2.state.time, "YYYY-MM-DDTHH:mm:00") + 'Z');
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

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
                (0, _moment.formatDate)(field.input.value, 'LLLL')
                ),
                !field.readOnly && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_DayPickerInput2.default, {
                    onDayChange: function onDayChange(day) {
                        return _this3.onChange(day, "day");
                    },
                    inputProps: {
                        id: this.props.id + '-day',
                        required: this.props.required
                    },
                    component: _DateInput.DateInput,
                    overlayComponent: CustomOverlay,
                    value: (0, _moment.formatDate)(field.input.value, 'LL'),
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
                _react2.default.createElement(_reactSimpleTimefield2.default, {
                    value: (0, _moment.formatDate)(field.input.value, 'HH:mm'),
                    onChange: function onChange(time) {
                        return _this3.onChange(time, "time");
                    },
                    input: _react2.default.createElement(TimeInput, {id: this.props.id + '-time'})
                })
                ),
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

    return CompatibleDateTime;
}(_react2.default.Component);

var TimeInput = function TimeInput(props) {
    return _react2.default.createElement(
        "div",
        {className: "input-group"},
        _react2.default.createElement("input", _extends({}, props, {
            type: "text",
            className: "form-control"
        })),
        _react2.default.createElement(
            "span",
            {className: "input-group-addon"},
            _react2.default.createElement("span", {className: "fa fa-clock"})
        )
    );
};

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

var CompatibleDateTimeWidget = function CompatibleDateTimeWidget(props) {
    return _react2.default.createElement(_reduxForm.Field, {
        component: CompatibleDateTime,
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

exports.default = CompatibleDateTimeWidget;