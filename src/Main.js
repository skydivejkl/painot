import React from "react";
import {Route, Redirect} from "react-router-dom";
import simple, {View, css} from "react-simple";
import {get, omit, pick} from "lodash/fp";
import {compose, withHandlers, mapProps} from "recompose";

import {dataInputs} from "./calculate";
import TopNav from "./TopNav";
import Results from "./Results";
import InputConnect from "./InputConnect";
import {
    Scroll,
    Text,
    Input,
    Sep,
    Title,
    fromRoot,
    addResultsFlag,
    withRouterProps,
} from "./core";

css.global("body, html", {
    padding: 0,
    margin: 0,
    backgroundColor: "black",
});

const Container = simple(View, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
});

const Flex = simple(View, {
    flex: 1,
});

const Wrap = simple(View, {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    // overflowX: "auto",
    "@media (min-width: 450px)": {
        width: 450,
    },
});

const Description = simple(Text, {
    textAlign: "center",
    color: "black",
    fontSize: 12,
});

var NumInput = props => (
    <InputConnect
        component={Input}
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        scope="painot"
        {...props}
    />
);

NumInput = compose(
    withRouterProps(pick("push")),
    addResultsFlag,
    withHandlers({
        onKeyDown: props => e => {
            if (props.hasResultsFlag) {
                if (e.key === "Enter" || e.key === "Escape") {
                    e.preventDefault();
                    props.push("/tulos");
                }

                return;
            }

            if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                props.push(props.nextNavigate);
            }

            if (e.shiftKey && e.key === "Tab") {
                e.preventDefault();
                props.push(props.backNavigate);
            }
        },
    }),
    mapProps(omit(["nextNavigate", "backNavigate", "hasResultsFlag", "push"])),
)(NumInput);

const Form = ({back, next, nextText, title, name, description}) => (
    <Flex>
        <TopNav back={back} nextText={nextText} next={next} />
        <Scroll>
            <Title>{title}</Title>

            <NumInput
                autoFocus
                name={name}
                placeholder="0"
                nextNavigate={next}
                backNavigate={back}
            />

            <Sep />

            <Description>{description}</Description>
        </Scroll>
    </Flex>
);

const Main = () => (
    <Container>
        <Wrap>
            <Route
                exact
                path="/"
                render={() => <Redirect to={"/" + dataInputs[0].name} />}
            />

            {dataInputs.map((item, index, array) => {
                const next =
                    item.next || fromRoot(get([index + 1, "name"], array));
                const back = fromRoot(get([index - 1, "name"], array));
                return (
                    <Route
                        key={item.name}
                        path={"/" + item.name}
                        render={() => (
                            <Form {...item} next={next} back={back} />
                        )}
                    />
                );
            })}

            <Route path="/tulos" component={Results} />
        </Wrap>
    </Container>
);

export default Main;
