'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _DayPickerInput = require('react-day-picker/DayPickerInput');

var _DayPickerInput2 = _interopRequireDefault(_DayPickerInput);

require('react-day-picker/lib/style.css');

var _moment3 = require('react-day-picker/moment');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeRangeWidget = function (_React$Component) {
    _inherits(DateTimeRangeWidget, _React$Component);

    function DateTimeRangeWidget(props) {
        _classCallCheck(this, DateTimeRangeWidget);

        var _this = _possibleConstructorReturn(this, (DateTimeRangeWidget.__proto__ || Object.getPrototypeOf(DateTimeRangeWidget)).call(this, props));

        _this.handleFromChange = _this.handleFromChange.bind(_this);
        _this.handleToChange = _this.handleToChange.bind(_this);
        _this.state = {
            from: undefined,
            to: undefined
        };
        return _this;
    }

    _createClass(DateTimeRangeWidget, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timeout);
        }
    }, {
        key: 'focusTo',
        value: function focusTo() {
            var _this2 = this;

            // Focus to `to` field. A timeout is required here because the overlays
            // already set timeouts to work well with input fields
            this.timeout = setTimeout(function () {
                return _this2.to.getInput().focus();
            }, 0);
        }
    }, {
        key: 'showFromMonth',
        value: function showFromMonth() {
            var _state = this.state,
                from = _state.from,
                to = _state.to;

            if (!from) {
                return;
            }
            if ((0, _moment2.default)(to).diff((0, _moment2.default)(from), 'months') < 2) {
                this.to.getDayPicker().showMonth(from);
            }
        }
    }, {
        key: 'handleFromChange',
        value: function handleFromChange(from) {
            var _this3 = this;

            // Change the from date and focus the "to" input field
            this.setState({ from: from }, function () {
                if (!_this3.state.to) {
                    _this3.focusTo();
                }
            });
        }
    }, {
        key: 'handleToChange',
        value: function handleToChange(to) {
            this.setState({ to: to }, this.showFromMonth);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _state2 = this.state,
                from = _state2.from,
                to = _state2.to;

            var modifiers = { start: from, end: to };
            return _react2.default.createElement(
                'div',
                { className: 'InputFromTo' },
                _react2.default.createElement(_DayPickerInput2.default, {
                    value: from,
                    placeholder: 'From',
                    format: 'LL',
                    formatDate: _moment3.formatDate,
                    parseDate: _moment3.parseDate,
                    dayPickerProps: {
                        selectedDays: [from, { from: from, to: to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers: modifiers,
                        numberOfMonths: 2,
                        showOutsideDays: true
                    },
                    onDayChange: this.handleFromChange
                }),
                ' ',
                '\u2014',
                ' ',
                _react2.default.createElement(
                    'span',
                    { className: 'InputFromTo-to' },
                    _react2.default.createElement(_DayPickerInput2.default, {
                        ref: function ref(el) {
                            return _this4.to = el;
                        },
                        value: to,
                        placeholder: 'To',
                        format: 'LL',
                        formatDate: _moment3.formatDate,
                        parseDate: _moment3.parseDate,
                        dayPickerProps: {
                            selectedDays: [from, { from: from, to: to }],
                            disabledDays: { before: from },
                            modifiers: modifiers,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 2,
                            showOutsideDays: true
                        },
                        onDayChange: this.handleToChange
                    })
                )
            );
        }
    }]);

    return DateTimeRangeWidget;
}(_react2.default.Component);

exports.default = DateTimeRangeWidget;