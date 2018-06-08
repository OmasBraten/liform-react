"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isRequired = undefined;

var _renderField = require("./renderField");

var _renderField2 = _interopRequireDefault(_renderField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRequired = exports.isRequired = function isRequired(schema, fieldName) {
    if (!schema.required) {
        return false;
    }
    return schema.required.indexOf(fieldName) !== -1;
};

var renderFields = function renderFields(schema, theme, readOnly) {
    var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var context = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var props = [];
    for (var i in schema.properties) {
        props.push({ prop: i, propertyOrder: schema.properties[i].propertyOrder });
    }
    props = props.sort(function (a, b) {
        if (a.propertyOrder > b.propertyOrder) {
            return 1;
        } else if (a.propertyOrder < b.propertyOrder) {
            return -1;
        } else {
            return 0;
        }
    });
    return props.map(function (item) {
        var name = item.prop;
        var field = schema.properties[name];
        if (!field.hidden) {
            return (0, _renderField2.default)(field, name, readOnly, theme, prefix, context, isRequired(schema, name));
        }
    });
};

exports.default = renderFields;