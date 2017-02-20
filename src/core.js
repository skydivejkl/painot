import React from "react";
import simple, {View} from "react-simple";
import {withRouter} from "react-router-dom";
import {compose, mapProps} from "recompose";

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

export const Scroll = simple(View, {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    overflowX: "auto",
});

export const Title = simple(Text, {
    fontSize: 35,
    height: 100,
    overflow: "hidden",
    textAlign: "center",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
});

export const fromRoot = s => s ? "/" + s : null;

export const withRouterProps = mapper => compose(
    mapProps(props => ({originalProps: props})),
    withRouter,
    mapProps(({originalProps, ...router}) => {
        return {
            ...originalProps,
            ...mapper(router),
        };
    }),
);

export const addResultsFlag = withRouterProps(router => ({
    hasResultsFlag: router.location.search === "?results=1",
}));
