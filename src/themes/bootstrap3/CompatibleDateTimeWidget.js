import React from "react";
import classNames from "classnames";
import {Field} from "redux-form";
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import TimeField from "react-simple-timefield";
import {DateInput} from "./DateInput";

class CompatibleDateTime extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            day: undefined,
            time: undefined
        };
    }

    componentDidMount() {
        if (!this.props.input.value) {
            if (this.props.schema.default) {
                this.updateState(this.props.schema.default);
            }
            else {
                this.updateState(new Date());
            }
        } else {
            this.updateState(this.props.input.value);
        }
    }

    onChange(data, key) {
        let newState = this.state;
        if (key === "day")
            newState[key] = formatDate(data, "YYYY-MM-DD");
        this.updateState(newState.day, newState.key);
    }

    updateState(day, time = day) {
        this.setState({
            day: formatDate(day, 'YYYY-MM-DD'),
            time: formatDate(time, 'HH:mm')
        }, () => {
            this.props.input.onChange(formatDate(this.state.day + " " + this.state.time, "YYYY-MM-DDTHH:mm:00") + 'Z');
        });
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
                {field.readOnly && <p className="form-control-static">{formatDate(field.input.value, 'LLLL')}</p>}
                {!field.readOnly && (
                    <div>
                        <DayPickerInput onDayChange={day => this.onChange(day, "day")}
                                        inputProps={{
                                            id: this.props.id + '-day',
                                            required: this.props.required
                                        }}
                                        component={DateInput}
                                        overlayComponent={CustomOverlay}
                                        value={formatDate(field.input.value, 'LL')}
                                        placeholder={formatDate(this.props.placeholder, 'LL')}
                                        dayPickerProps={{
                                            showOutsideDays: true,
                                            month: new Date(),
                                            fromMonth: new Date()
                                        }}
                                        format={'LL'}
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                        />
                        <TimeField
                            value={formatDate(field.input.value, 'HH:mm')}
                            onChange={(time) => this.onChange(time, "time")}
                            input={<TimeInput id={this.props.id + '-time'}/>}/>
                    </div>
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

const TimeInput = (props) => {
    return (
        <div className="input-group">
            <input
                {...props}
                type="text"
                className="form-control"
            />
            <span className="input-group-addon"><span className={"fa fa-clock"}/></span>
        </div>
    );
};

const CustomOverlay = ({classNames, selectedDay, children}) => {
    return (
        <div className={classNames.overlayWrapper} style={{"zIndex": 100}}>
            <div className={classNames.overlay}>
                {children}
            </div>
        </div>
    );
};

const CompatibleDateTimeWidget = props => {
    return (
        <Field
            component={CompatibleDateTime}
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

export default CompatibleDateTimeWidget;
