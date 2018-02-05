import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Field, change} from "redux-form";

class RenderInput extends React.Component {
    componentDidMount() {
        if (!this.props.input.value && this.props.defaultValue) {
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
        const style = {
            color: this.props.type === 'color' ? this.props.input.value : ""
        };

        return (
            <div className={className}>
                <label className="control-label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                {this.props.readOnly ?
                    <p className="form-control-static" style={style}>{this.props.input.value}</p> :
                    <input {...this.props.input}
                           id={this.props.id}
                           type={this.props.type}
                           required={this.props.required}
                           className="form-control"
                           placeholder={this.props.placeholder}
                           readOnly={this.props.readOnly}/>
                }
                {this.props.meta.touched && this.props.meta.error && (
                    <span className="help-block">{this.props.meta.error}</span>
                )}
                {this.props.description && (
                    <span className="help-block">{this.props.description}</span>
                )}
            </div>
        );
    }
}

const BaseInputWidget = props => {
    return (
        <Field
            component={RenderInput}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={props.context.formName + "-field-" + props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            type={props.type}
            normalize={props.normalizer}
            readOnly={props.readOnly}
            defaultValue={props.schema.default}
        />
    );
};

BaseInputWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    fieldName: PropTypes.string,
    label: PropTypes.string,
    normalizer: PropTypes.func,
    readOnly: PropTypes.bool
};

export default BaseInputWidget;
