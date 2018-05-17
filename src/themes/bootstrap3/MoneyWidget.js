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

        if (this.props.schema.readOnly && !this.props.input.value) {
            return "";
        } else if (this.props.readOnly && !this.props.input.value) {
            return "";
        }

        return (
            <div className={className}>
                <label className="control-label" htmlFor={"this.props-" + this.props.name}>
                    {this.props.label}
                </label>
                {this.props.readOnly && <p className="form-control-static">{this.props.input.value} €</p>}
                {!this.props.readOnly && (
                    <div className="input-group">
                        <span className="input-group-addon">€ </span>
                        <input
                            {...this.props.input}
                            type="number"
                            className="form-control"
                            id={this.props.id}
                            required={this.props.required}
                            placeholder={this.props.placeholder}
                        />
                    </div>
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

const MoneyWidget = props => {
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
            schema={props.schema}
            defaultValue={props.schema.default}
        />
    );
};

MoneyWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    theme: PropTypes.object,
    multiple: PropTypes.bool,
    required: PropTypes.bool
};

export default MoneyWidget;
