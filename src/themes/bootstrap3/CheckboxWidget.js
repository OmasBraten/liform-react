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
        const staticClassname = classNames([
            "glyphicon",
            {"glyphicon-ok": this.props.input.value},
            {"glyphicon-remove": !this.props.input.value}
        ]);
        return (
            <div className={className}>
                <div className="checkbox">
                    {this.props.readOnly && (
                        <p className="form-control-static"><span className={staticClassname}/> {this.props.label}</p>)}
                    {!this.props.readOnly && (
                        <label>
                            <input
                                {...this.props.input}
                                type="checkbox"
                                //required={this.props.required}
                                required={false}
                                id={this.props.id}
                                checked={this.props.input.value}
                            />
                            {" "}
                            {this.props.label}
                        </label>
                    )}
                </div>
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

const CheckboxWidget = props => {
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

CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    theme: PropTypes.object,
    readOnly: PropTypes.bool
};

export default CheckboxWidget;
