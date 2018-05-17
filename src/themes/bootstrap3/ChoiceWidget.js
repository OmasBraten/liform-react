import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Field} from "redux-form";
import {zipObject as _zipObject, map as _map} from "lodash";

class RenderSelect extends React.Component {
    componentDidMount() {
        const optionNames = this.props.schema.enum_titles || this.props.schema.enum;
        if ((this.props.input.value === "" || (optionNames.length === 1 && optionNames[0] !== this.props.input.value)) && this.props.defaultValue) {
            this.setState({}, () => {
                this.props.input.onChange(this.props.defaultValue);
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const optionNames = nextProps.schema.enum_titles || nextProps.schema.enum;
        if ((nextProps.input.value === "" || (optionNames.length === 1 && optionNames[0] !== nextProps.input.value)) && nextProps.defaultValue) {
            this.setState({}, () => {
                nextProps.input.onChange(nextProps.defaultValue);
            });
        }
    }

    render() {
        const className = classNames([
            "form-group",
            {"has-error": this.props.meta.touched && this.props.meta.error}
        ]);
        const options = this.props.schema.enum;
        const optionNames = this.props.schema.enum_titles || options;

        const selectOptions = _zipObject(options, optionNames);

        if (options.length === 1 && optionNames[0] === this.props.schema.default)
            return ('');

        if (this.props.schema.readOnly && !this.props.input.value) {
            return "";
        } else if (this.props.readOnly && !this.props.input.value) {
            return "";
        }

        return (
            <div className={className}>
                <label className="control-label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                {this.props.readOnly && (<p className="form-control-static">{this.props.input.value}</p>)}
                {!this.props.readOnly && (
                    <select
                        {...this.props.input}
                        value={!this.props.input.value && this.props.multiple ? [] : this.props.input.value}
                        className="form-control"
                        id={this.props.id}
                        required={this.props.required}
                        multiple={this.props.multiple}

                    >
                        {!this.props.multiple && !this.props.schema.default && (
                            <option key={""} value={""}>
                                {this.props.placeholder}
                            </option>
                        )}
                        {_map(selectOptions, (name, value) => {
                            return (
                                <option key={value} value={value}>
                                    {name}
                                </option>
                            );
                        })}
                    </select>
                )}

                {this.props.meta.touched &&
                this.props.meta.error && (
                    <span className="help-block">{this.props.meta.error}</span>
                )}
                {this.props.description && (
                    <span className="help-block">{this.props.description}</span>
                )}
            </div>
        );
    }
}

const ChoiceWidget = props => {
    return (
        <Field
            component={RenderSelect}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={props.context.formName + "-field-" + props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            schema={props.schema}
            multiple={props.multiple}
            readOnly={props.readOnly}
            defaultValue={props.schema.default}
        />
    );
};

ChoiceWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    theme: PropTypes.object,
    multiple: PropTypes.bool,
    required: PropTypes.bool,
    readOnly: PropTypes.bool
};

export default ChoiceWidget;
