import React from "react";
import simple, {View} from "react-simple";

export const Text = simple(View, {
    fontFamily: "helvetica",
});

class AutoSelect extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
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
    backgroundColor: "#DDD",
    padding: 10,
    textAlign: "center",
    outline: "none",
    width: "100%",
    fontSize: 50,
});

export const Sep = simple(View, {
    width: 10,
    height: 10,
});
