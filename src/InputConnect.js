import React from "react";
import {connectLean} from "lean-redux";
import {omit, get} from "lodash/fp";

const omitConnectProps = omit(["serialize", "deserialize"]);

let InputConnect = ({component, ...props}) => {
    const Component = component;

    return <Component {...omitConnectProps(props)} />;
};
InputConnect = connectLean({
    mapState(state, props) {
        var value = state[props.name] || "";

        value = typeof props.deserialize === "function"
            ? props.deserialize(value)
            : value;

        return {value};
    },

    onChange(e) {
        const value = typeof this.props.serialize === "function"
            ? this.props.serialize(e)
            : e.target.value;

        this.setState({
            [this.props.name]: value,
        });
    },
})(InputConnect);

const defaultValidate = v => String(v || "").trim() !== "";

export const createValidator = (scope, keys, validate = defaultValidate) =>
    state => keys.every(key => validate(get([scope, key], state)));

export default InputConnect;
