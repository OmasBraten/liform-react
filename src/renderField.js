import React from "react";
import deepmerge from "deepmerge";

const guessWidget = (fieldSchema, theme) => {
    if (fieldSchema.widget && theme[fieldSchema.widget]) {
        return fieldSchema.widget;
    } else if (fieldSchema.hasOwnProperty("enum")) {
        return "choice";
    } else if (fieldSchema.hasOwnProperty("oneOf")) {
        return "oneOf";
    } else if (fieldSchema.format === "date") {
        return "compatible-date";
    } else if (fieldSchema.format === "date-time") {
        return "compatible-datetime";
    } else if (fieldSchema.format === "date-time-range") {
        return "date-time-range";
    } else if (theme[fieldSchema.format]) {
        return fieldSchema.format;
    }
    return fieldSchema.type || "object";
};

const renderField = (fieldSchema,
                     fieldName,
                     readOnly,
                     theme,
                     prefix = "",
                     context = {},
                     required = false) => {
    if (fieldSchema.hasOwnProperty("allOf")) {
        fieldSchema = {...fieldSchema, ...deepmerge.all(fieldSchema.allOf)};
        delete fieldSchema.allOf;
    }

    const widget = guessWidget(fieldSchema, theme);

    if (!theme[widget]) {
        throw new Error("liform: " + widget + " is not defined in the theme");
    }

    const newFieldName = prefix ? prefix + fieldName : fieldName;

    return React.createElement(theme[widget], {
        key: fieldName,
        fieldName: widget === "oneOf" ? fieldName : newFieldName,
        label: fieldSchema.showLabel === false ? "" : fieldSchema.title || fieldName,
        required: required,
        schema: fieldSchema,
        readOnly: readOnly || fieldSchema.readOnly,
        theme,
        context,
        prefix
    });
};

export default renderField;
