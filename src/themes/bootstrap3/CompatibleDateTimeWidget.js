import React from "react";
import classNames from "classnames";
import {Field} from "redux-form";
import DateSelector from "./DateSelector";

// produces an array [start..end-1]
const range = (start, end) =>
    Array.from({length: end - start}, (v, k) => k + start);

// produces an array [start..end-1] padded with zeros, (two digits)
const rangeZeroPad = (start, end) =>
    Array.from({length: end - start}, (v, k) => ("0" + (k + start)).slice(-2));

const extractYear = value => {
    return extractDateTimeToken(value, 0);
};
const extractMonth = value => {
    return extractDateTimeToken(value, 1);
};
const extractDay = value => {
    return extractDateTimeToken(value, 2);
};
const extractHour = value => {
    return extractDateTimeToken(value, 3);
};
const extractMinute = value => {
    return extractDateTimeToken(value, 4);
};
const extractSecond = value => {
    return extractDateTimeToken(value, 5);
};

const extractDateTimeToken = (value, index) => {
    if (!value) {
        return "";
    }
    // Remove timezone Z
    value = value.substring(0, value.length - 1);
    const tokens = value.split(/[-T:]/);
    if (tokens.length !== 6) {
        return "";
    }
    return tokens[index];
};

class CompatibleDateTime extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            year: null,
            month: null,
            day: null,
            hour: null,
            minute: null,
            second: null
        };
        this.onBlur = this.onBlur.bind(this);
    }

    // Produces a RFC 3339 full-date from the state
    buildRfc3339Date() {
        const year = this.state.year || "";
        const month = this.state.month || "";
        const day = this.state.day || "";
        return year + "-" + month + "-" + day;
    }

    componentDidMount() {
        if (!this.props.input.value && this.props.schema.default) {
            this.props.input.value = this.props.schema.default;
            this.setState({
                year: extractYear(this.props.schema.default),
                month: extractMonth(this.props.schema.default),
                day: extractDay(this.props.schema.default),
                hour: extractHour(this.props.schema.default),
                minute: extractMinute(this.props.schema.default),
                second: extractSecond(this.props.schema.default),
            }, () => {
                this.props.input.onChange(this.buildRfc3339DateTime());
            });
        }
    }

    // Produces a RFC 3339 datetime from the state
    buildRfc3339DateTime() {
        const date = this.buildRfc3339Date();
        const hour = this.state.hour || "";
        const minute = this.state.minute || "";
        const second = this.state.second || "";
        return date + "T" + hour + ":" + minute + ":" + second + "Z";
    }

    getStaticFieldText() {
        return `${this.getStaticYearText()} ${this.getStaticTimeText()}`
    }

    getStaticYearText() {
        if (this.state.year === null || this.state.month === null || this.state.day === null)
            return "";
        return `${this.state.year}.${this.state.month}.${this.state.day}`
    }

    getStaticTimeText() {
        let result = "";
        if (this.state.hour !== null)
            result += `${this.state.hour}:`;
        if (this.state.minute !== null)
            result += `${this.state.minute}:`;
        if (this.state.second !== null)
            result += `${this.state.second}`;
        return result;
    }

    onChangeField(field, e) {
        const value = e.target.value;
        let changeset = {};
        changeset[field] = value;
        this.setState(changeset, () => {
            this.props.input.onChange(this.buildRfc3339DateTime());
        });
    }

    onBlur() {
        this.props.input.onBlur(this.buildRfc3339DateTime());
    }

    render() {
        const field = this.props;
        const className = classNames([
            "form-group",
            {"has-error": field.meta.touched && field.meta.error}
        ]);
        return (
            <div className={className}>
                <label className="control-label" htmlFor={field.id}>
                    {field.label}
                </label>
                {field.readOnly && <p className="form-control-static">{this.getStaticFieldText()}</p>}
                {!field.readOnly && (
                    <ul className="list-inline">
                        <li>
                            <DateSelector
                                extractField={extractYear}
                                range={range(field.startYear, field.endYear)}
                                emptyOption="year"
                                onBlur={this.onBlur}
                                onChange={this.onChangeField.bind(this, "year")}
                                idx={`${this.props.id}-year`}
                                {...field}
                            />
                        </li>
                        <li>
                            <DateSelector
                                extractField={extractMonth}
                                range={rangeZeroPad(1, 13)}
                                emptyOption="month"
                                onBlur={this.onBlur}
                                onChange={this.onChangeField.bind(this, "month")}
                                idx={`${this.props.id}-month`}
                                {...field}
                            />
                        </li>
                        <li>
                            <DateSelector
                                extractField={extractDay}
                                range={rangeZeroPad(1, 32)}
                                emptyOption="day"
                                onBlur={this.onBlur}
                                onChange={this.onChangeField.bind(this, "day")}
                                idx={`${this.props.id}-day`}
                                {...field}
                            />
                        </li>
                        <li>
                            <DateSelector
                                extractField={extractHour}
                                range={rangeZeroPad(1, 25)}
                                emptyOption="hour"
                                onBlur={this.onBlur}
                                onChange={this.onChangeField.bind(this, "hour")}
                                idx={`${this.props.id}-hour`}
                                {...field}
                            />
                        </li>
                        <li>
                            <DateSelector
                                extractField={extractMinute}
                                range={rangeZeroPad(1, 61)}
                                emptyOption="minute"
                                onBlur={this.onBlur}
                                onChange={this.onChangeField.bind(this, "minute")}
                                idx={`${this.props.id}-minute`}
                                {...field}
                            />
                        </li>
                        <li>
                            <DateSelector
                                extractField={extractSecond}
                                range={rangeZeroPad(1, 61)}
                                emptyOption="second"
                                onBlur={this.onBlur}
                                onChange={this.onChangeField.bind(this, "second")}
                                idx={`${this.props.id}-second`}
                                {...field}
                            />
                        </li>
                    </ul>
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

const CompatibleDateTimeWidget = props => {
    return (
        <Field
            component={CompatibleDateTime}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={"field-" + props.fieldName}
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

// Only for testing purposes
export {extractDateTimeToken};
