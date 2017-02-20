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

        this.input.focus();

        if (typeof this.input.select === "function") {
            this.input.select();
        }

        if (typeof this.input.setSelectionRange === "function") {
            try {
                this.input.setSelectionRange(0, 999);
            } catch (error) {
                // console.error(error);
            }
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

export const Button = simple(Text.create("button"), {
    backgroundColor: "#DDD",
    color: "black",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
});

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
