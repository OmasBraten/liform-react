"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zipObject = function zipObject(props, values) {
    return props.reduce(function (prev, prop, i) {
        return Object.assign(prev, _defineProperty({}, prop, values[i]));
    }, {});
};

var renderChoice = function renderChoice(field) {
    var className = (0, _classnames2.default)(["form-group", { "has-error": field.meta.touched && field.meta.error }]);
    var options = field.schema.enum;
    var optionNames = field.schema.enum_titles || options;

    var selectOptions = zipObject(options, optionNames);
    return _react2.default.createElement(
        "div",
        { className: className },
        _react2.default.createElement(
            "label",
            { className: "control-label", htmlFor: "field-" + field.name },
            field.label
        ),
        field.readOnly && _react2.default.createElement(
            "p",
            { className: "form-control-static" },
            field.value
        ),
        field.readOnly && Object.entries(selectOptions).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                value = _ref2[0],
                name = _ref2[1];

            return _react2.default.createElement(
                "div",
                { className: "radio", key: value },
                _react2.default.createElement(
                    "label",
                    null,
                    _react2.default.createElement("input", {
                        type: "radio",
                        name: field.input.name,
                        id: field.id,
                        value: value,
                        checked: field.input.value === value,
                        onChange: function onChange(e) {
                            return field.input.onChange(value);
                        }
                    }),
                    name
                )
            );
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
};

var ChoiceExpandedWidget = function ChoiceExpandedWidget(props) {
    return _react2.default.createElement(_reduxForm.Field, {
        component: renderChoice,
        label: props.label,
        name: props.fieldName,
        required: props.required,
        id: props.context.formName + "-field-" + props.fieldName,
        placeholder: props.schema.default,
        description: props.schema.description,
        schema: props.schema,
        multiple: props.multiple,
        readOnly: props.readOnly
    });
};

exports.default = ChoiceExpandedWidget;