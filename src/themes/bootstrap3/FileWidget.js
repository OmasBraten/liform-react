import React from "react";
import {Field} from "redux-form";
import classNames from "classnames";

const processFile = (onChange, e) => {
    const files = e.target.files;
    return new Promise(() => {
        let reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                onChange(reader.result);
            },
            false
        );
        reader.readAsDataURL(files[0]);
    });
};

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
                    <input
                        name={this.props.name}
                        onBlur={this.props.onBlur}
                        onChange={processFile.bind(this, this.props.input.onChange)}
                        required={this.props.required}
                        className="form-control"
                        type="file"
                        id={this.props.id}
                    />
                )}
                {this.props.meta.touched &&
                this.props.meta.error && (
                    <span className="help-block">{this.props.meta.error}</span>
                )}
                {this.props.description && <span>{this.props.description}</span>}
            </div>
        );
    }
}

const FileWidget = props => {
    return (
        <Field
            component={(field) => <RenderInput {...field}/>}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={props.context.formName + "-field-" + props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            type={props.type}
            readOnly={props.readOnly}
            defaultValue={props.defaultValue}
            schema={props.schema}
        />
    );
};

export default FileWidget;
