import React from "react";
import classNames from "classnames";
import {Field} from "redux-form";
import DateSelector from "./DateSelector";
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import {DateInput} from "./DateInput";

class CompatibleDate extends React.Component {
    componentDidMount() {
        if (!this.props.input.value) {
            if (this.props.schema.default) {
                this.setState({}, () => {
                    this.props.input.onChange(this.props.schema.default);
                });
            }
            else {
                this.setState({}, () => this.props.input.onChange(formatDate(new Date(), 'YYYY-MM-DD')));
            }
        }
    }

    render() {
        const field = this.props;
        const className = classNames([
            "form-group",
            {"has-error": field.meta.touched && field.meta.error}
        ]);

        if (this.props.schema.readOnly && !field.input.value) {
            return "";
        } else if (this.props.readOnly && !field.input.value) {
            return "";
        }

        return (
            <div className={className}>
                <label className="control-label" htmlFor={field.id}>
                    {field.label}
                </label>
                {field.readOnly && <p className="form-control-static">{formatDate(field.input.value, 'LL')}</p>}
                {!field.readOnly && (
                    <DayPickerInput onDayChange={day => field.input.onChange(formatDate(day, 'YYYY-MM-DD'))}
                                    inputProps={{
                                        id: this.props.id,
                                        required: this.props.required
                                    }}
                                    component={DateInput}
                                    overlayComponent={CustomOverlay}
                                    value={field.input.value ? formatDate(field.input.value, 'LL') : formatDate(new Date(), 'LL')}
                                    placeholder={formatDate(this.props.placeholder, 'LL')}
                                    dayPickerProps={{
                                        showOutsideDays: true,
                                        month: new Date(),
                                        fromMonth: new Date(),
                                    }}
                                    format={'LL'}
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                    />
                )}
                {field.meta.touched &&
                field.meta.error && (
                    <span className="help-block">{field.meta.error}</span>
                )}
                {field.description && (
                    <span className="help-block">{field.description}</span>
                )}
            </div>
        );
    }
}

const CustomOverlay = ({classNames, selectedDay, children}) => {
    return (
        <div className={classNames.overlayWrapper} style={{"zIndex": 100}}>
            <div className={classNames.overlay}>
                {children}
            </div>
        </div>
    );
};

const CompatibleDateWidget = props => {
    return (
        <Field
            component={CompatibleDate}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={props.context.formName + "-field-" + props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            startYear={props.schema["start-year"] || 1900}
            endYear={props.schema["end-year"] || new Date().getFullYear() + 5}
            type={props.type}
            readOnly={props.readOnly}
            schema={props.schema}
        />
    );
};

export default CompatibleDateWidget;
