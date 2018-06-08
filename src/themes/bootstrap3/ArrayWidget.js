import React from "react";
import PropTypes from "prop-types";
import renderField from "../../renderField";
import {FieldArray} from "redux-form";
import {times as _times} from "lodash";
import ChoiceWidget from "./ChoiceWidget";
import classNames from "classnames";

const renderArrayFields = (count,
                           schema,
                           readOnly,
                           theme,
                           fieldName,
                           remove,
                           context,
                           swap) => {
    const prefix = fieldName + ".";
    if (count) {
        return _times(count, idx => {
            return (
                <div className="panel panel-default" key={idx}>
                    <div className="panel-heading clearfix">
                        <h4 className="panel-title pull-left">{schema.title ? schema.title : fieldName}-{idx}</h4>
                        {!readOnly && (
                            <div className="btn-group btn-group-sm pull-right">
                                {idx !== count - 1 && count > 1 && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={e => {
                                            e.preventDefault();
                                            swap(idx, idx + 1);
                                        }}
                                    >
                                        <span className="glyphicon glyphicon-arrow-down"/>
                                    </button>
                                )}
                                {idx !== 0 && count > 1 && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={e => {
                                            e.preventDefault();
                                            swap(idx, idx - 1);
                                        }}
                                    >
                                        <span className="glyphicon glyphicon-arrow-up"/>
                                    </button>
                                )}
                                {(schema.minItems ? count > schema.minItems : true) && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={e => {
                                            e.preventDefault();
                                            remove(idx);
                                        }}
                                    >
                                        <span className="glyphicon glyphicon-trash"/>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="panel-body">
                        {renderField(
                            {...schema.items, showLabel: false},
                            idx.toString(),
                            readOnly,
                            theme,
                            prefix,
                            context
                        )}
                    </div>
                </div>
            )
        });
    } else {
        return "";
    }
};

const renderInput = field => {
    const className = classNames([
        "arrayType",
        {"has-error": field.meta.submitFailed && field.meta.error}
    ]);
    return (
        <div className={className}>
            <legend className="control-label">{field.label}</legend>
            {field.meta.submitFailed &&
            field.meta.error && (
                <span className="help-block">{field.meta.error}</span>
            )}
            {renderArrayFields(
                field.fields.length,
                field.schema,
                field.readOnly,
                field.theme,
                field.fieldName,
                idx => field.fields.remove(idx),
                field.context,
                (a, b) => {
                    field.fields.swap(a, b);
                }
            )}
            {!field.readOnly && (field.schema.maxItems ? field.fields.length < field.schema.maxItems : true) && (
                <button
                    type="button"
                    className="pull-right btn btn-primary"
                    onClick={() => field.fields.push()}
                >
                    Add
                </button>
            )}
            <div className="clearfix"/>
        </div>
    );
};

const CollectionWidget = props => {
    return (
        <FieldArray
            component={renderInput}
            label={props.label}
            name={props.fieldName}
            fieldName={props.fieldName}
            schema={props.schema}
            values={props.values}
            theme={props.theme}
            context={props.context}
            readOnly={props.readOnly}
        />
    );
};

const ArrayWidget = props => {
    // Arrays are tricky because they can be multiselects or collections
    if (
        props.schema.items.hasOwnProperty("enum") &&
        props.schema.hasOwnProperty("uniqueItems") &&
        props.schema.uniqueItems
    ) {
        return ChoiceWidget({
            ...props,
            schema: props.schema.items,
            multiple: true
        });
    } else {
        return CollectionWidget(props);
    }
};

ArrayWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    theme: PropTypes.object,
    context: PropTypes.object,
    readOnly: PropTypes.bool
};

export default ArrayWidget;
