"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map3 = require("lodash/map");

var _map4 = _interopRequireDefault(_map3);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require("redux-form");

var _reactRedux = require("react-redux");

var _renderField = require("../../renderField");

var _renderField2 = _interopRequireDefault(_renderField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OneOfChoiceWidget = function (_Component) {
    _inherits(OneOfChoiceWidget, _Component);

    function OneOfChoiceWidget(props) {
        _classCallCheck(this, OneOfChoiceWidget);

        var _this = _possibleConstructorReturn(this, (OneOfChoiceWidget.__proto__ || Object.getPrototypeOf(OneOfChoiceWidget)).call(this, props));

        _this.state = {
            choice: 0,
            oneOfProp: ""
        };
        _this.renderOption = _this.renderOption.bind(_this);
        _this.selectItem = _this.selectItem.bind(_this);
        _this.selectIndex = _this.selectIndex.bind(_this);
        return _this;
    }

    _createClass(OneOfChoiceWidget, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props = this.props,
                fieldName = _props.fieldName,
                prefix = _props.prefix,
                state = _props.state,
                schema = _props.schema,
                context = _props.context;

            var selector = (0, _reduxForm.formValueSelector)(context.formName);
            var val = selector(state, fieldName ? prefix + fieldName + ".@type" : prefix + "@type");
            if (val) {
                var index = schema.oneOf.findIndex(function (o) {
                    return o.properties["@type"].default === val;
                });
                this.selectIndex(index);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var field = this.props;
            var className = (0, _classnames2.default)(["form-group"]);
            var schema = field.schema;
            var options = schema.oneOf;

            return _react2.default.createElement(
                "div",
                { className: className },
                _react2.default.createElement(
                    "div",
                    { className: className },
                    (schema.disableSelect || field.readOnly) && _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            "label",
                            { className: "control-label", htmlFor: "field-" + field.fieldName },
                            "Type"
                        ),
                        _react2.default.createElement(
                            "p",
                            { className: "form-control-static" },
                            options[this.state.choice].title
                        )
                    ),
                    !schema.disableSelect && !field.readOnly && _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        schema.showLabel && _react2.default.createElement(
                            "label",
                            { className: "control-label", htmlFor: "field-" + field.fieldName },
                            schema.title ? schema.title : field.fieldName
                        ),
                        _react2.default.createElement(
                            "select",
                            {
                                className: "form-control",
                                onChange: this.selectItem.bind(this),
                                id: field.context.formName + "-field-" + field.fieldName,
                                required: field.required,
                                multiple: false,
                                value: this.state.choice
                            },
                            (0, _map4.default)(options, function (item, idx) {
                                return _react2.default.createElement(
                                    "option",
                                    { key: options.indexOf(item), value: idx },
                                    item.title || idx
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    this.renderOption()
                ),
                field.description && _react2.default.createElement(
                    "span",
                    { className: "help-block" },
                    field.description
                )
            );
        }
    }, {
        key: "renderOption",
        value: function renderOption() {
            var field = this.props;
            var schema = field.schema.oneOf[this.state.choice];

            if (schema.properties && Object.keys(schema.properties).length === 1 && schema.properties[this.props.fieldName]) return;
            //if (schema.properties && schema.properties.length > 0)
            if (schema.type === 'object') schema.showLabel = false;
            return (0, _renderField2.default)(schema, field.fieldName, field.readOnly, field.theme, field.prefix, field.context, field.required);
        }
    }, {
        key: "selectItem",
        value: function selectItem(e) {
            this.selectIndex(e.target.value);
        }
    }, {
        key: "selectIndex",
        value: function selectIndex(index) {
            var _props2 = this.props,
                schema = _props2.schema,
                context = _props2.context,
                dispatch = _props2.dispatch,
                prefix = _props2.prefix,
                state = _props2.state;

            var currentProps = schema.oneOf[this.state.choice].properties;
            var nextProps = schema.oneOf[index].properties;
            for (var property in currentProps) {
                if (property === "@type") {
                    dispatch((0, _reduxForm.change)(context.formName, prefix + property, nextProps["@type"]["default"]));
                } else if (property in nextProps) {
                    var selector = (0, _reduxForm.formValueSelector)(context.formName);
                    var val = selector(state, prefix + property);
                    if (val === currentProps[property].default && nextProps[property].default) dispatch((0, _reduxForm.change)(context.formName, prefix + property, nextProps[property].default));
                } else if (!property in nextProps) {
                    dispatch((0, _reduxForm.change)(context.formName, prefix + property, null));
                }
            }
            this.setState({ choice: index });
        }
    }]);

    return OneOfChoiceWidget;
}(_react.Component);

OneOfChoiceWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    fieldName: _propTypes2.default.string,
    label: _propTypes2.default.string,
    theme: _propTypes2.default.object,
    multiple: _propTypes2.default.bool,
    required: _propTypes2.default.bool,
    readOnly: _propTypes2.default.bool
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return { state: state };
})(OneOfChoiceWidget);