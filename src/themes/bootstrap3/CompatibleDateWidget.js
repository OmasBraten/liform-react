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
    return extractDateToken(value, 0);
};
const extractMonth = value => {
    return extractDateToken(value, 1);
};
const extractDay = value => {
    return extractDateToken(value, 2);
};

const extractDateToken = (value, index) => {
    if (!value) {
        return "";
    }
    const tokens = value.split(/-/);
    if (tokens.length !== 3) {
        return "";
    }
    return tokens[index];
};

class CompatibleDate extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            year: null,
            month: null,
            day: null
        };
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidMount() {
        if (!this.props.input.value && this.props.schema.default) {
            this.props.input.value = this.props.schema.default;
            this.setState({
                year: extractYear(this.props.schema.default),
                month: extractMonth(this.props.schema.default),
                day: extractDay(this.props.schema.default)
            }, () => {
                this.props.input.onChange(this.buildRfc3339Date());
            });
        }
    }

    // Produces a RFC 3339 full-date from the state
    buildRfc3339Date() {
        const year = this.state.year || "";
        const month = this.state.month || "";
        const day = this.state.day || "";
        return year + "-" + month + "-" + day;
    }

    getStaticFieldText() {
        if (this.state.year === null || this.state.month === null || this.state.day === null)
            return "";
        return `${this.state.year}.${this.state.month}.${this.state.day}`
    }

    onChangeField(field, e) {
        const value = e.target.value;
        let changeset = {};
        changeset[field] = value;
        this.setState(changeset, () => {
            this.props.input.onChange(this.buildRfc3339Date());
        });
    }

    onBlur() {
        this.props.input.onBlur(this.buildRfc3339Date());
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
                    <ul className="list-inline" readOnly={field.readOnly}>
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

// Only for testing purposes
export {extractDateToken};
