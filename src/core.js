import React from "react";
import simple, {View} from "react-simple";

import * as c from "./colors";

export const Text = simple(View, {
    fontFamily: "helvetica",
});

class AutoSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.select();
    }

    select() {
        if (!this.props.autoFocus) {
            return;
        }

        if (!this.input) {
            return;
        }

        if (typeof this.input.select === "function") {
            this.input.select();
        }
    }

    render() {
        return (
            <input
                ref={input => {
                    this.input = input;
                }}
                onFocus={this.select}
                {...this.props}
            />
        );
    }
}

export const Input = simple(Text.create(AutoSelect), {
    backgroundColor: c.shade1,
    color: c.shade4,
    padding: 10,
    textAlign: "center",
    outline: "none",
    fontSize: 50,
});
