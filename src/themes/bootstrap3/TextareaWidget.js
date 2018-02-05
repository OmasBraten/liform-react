import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Field} from "redux-form";

class RenderInput extends React.Component {

    componentDidMount() {
        if (this.props.input.value === "" && this.props.defaultValue) {
            this.setState({}, () => {
                this.props.input.onChange(this.props.defaultValue);
            });
        }
    }

    render() {
        const className = classNames([
            "form-group",
            {"has-error": this.props.meta.touched && this.props.meta.error}
        ]);
        return (
            <div className={className}>
                <label className="control-label" htmlFor={"this.props-" + this.props.name}>
                    {this.props.label}
                </label>
                {this.props.readOnly && <p className="form-control-static">{this.props.input.value}</p>}
                {!this.props.readOnly && (
                    <textarea
                        {...this.props.input}
                        className="form-control"
                        id={this.props.id}
                        required={this.props.required}
                        placeholder={this.props.placeholder}
                    />
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

const TextareaWidget = props => {
    return (
        <Field
            component={RenderInput}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={props.context.formName + "-field-" + props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            readOnly={props.readOnly}
            defaultValue={props.schema.default}
        />
    );
};

TextareaWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    theme: PropTypes.object,
    multiple: PropTypes.bool,
    required: PropTypes.bool
};

export default TextareaWidget;
