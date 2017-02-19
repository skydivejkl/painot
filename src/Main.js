import React from "react";
import {connect} from "react-redux";
import {Link, Redirect, withRouter} from "react-router-dom";
import simple, {View, css} from "react-simple";
import {Route} from "react-router-dom";
import {get, omit, last, mapValues} from "lodash/fp";
import {compose, withHandlers, mapProps} from "recompose";

import Touchable from "./Touchable";
import TopNav from "./TopNav";
import InputConnect from "./InputConnect";
import {Text, Input, Sep, Button} from "./core";
import calculate from "./calculate";

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

const Wrap = simple(View, {
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    // overflowX: "auto",
    "@media (min-width: 450px)": {
        width: 450,
    },
});

const Title = simple(Text, {
    fontSize: 35,
    height: 100,
    overflow: "hidden",
    textAlign: "center",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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

const omitRouterProps = omit([
    "nextNavigate",
    "backNavigate",
    "length",
    "location",
    "createHref",
    "push",
    "replace",
    "go",
    "goBack",
    "goForward",
    "block",
    "listen",
    "match",
]);
NumInput = compose(
    withRouter,
    withHandlers({
        onKeyDown: props => e => {
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
    mapProps(omitRouterProps),
)(NumInput);

const inputs = [
    {
        name: "fuel",
        title: "Polttoaine",
        description: "Tankattu JET A litroissa",
    },
    {name: "pilot", title: "Pilotti", description: "Lentäjän paino (kg)"},
    {
        name: "jumper1",
        title: '"Mesun paikka"',
        description: 'ns. "mesun paikalla" istuvan hyppääjän exit paino jolla on selkä menosuuntaan. (kg)',
    },
    {
        name: "jumper2",
        title: "Ovella",
        description: "Oven vieressä istuva hyppääjä jolla on naama menosuuntaan (kg)",
    },
    {
        name: "jumper3",
        title: "Pilotin penkin takana",
        description: "Lentäjän penkin takana istuva hyppääjän exit paino (kg)",
    },
    {
        name: "jumper4",
        title: "Perällä",
        next: "/tulos",
        nextText: "Tulokset",
        description: "Ihan perällä istuva hyppääjän exit paino (kg)",
    },
];

const Flex = simple(View, {
    flex: 1,
});

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

            <Description>
                {description}
            </Description>
        </Scroll>
    </Flex>
);

const TotalText = simple(Text, {
    width: 150,
    fontSize: 19,
});

const ResultText = simple(
    Text,
    {
        fontSize: 25,
        width: 150,
        fontWeight: "bold",
        color: "#3cd03c",
    },
    {
        bad: {
            color: "red",
        },
    },
);

const mapObValuesToFloats = mapValues(val => parseFloat(val, 10));

const Row = simple(View, {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
});

const Img = simple(View.create("img"), {
    margin: "auto",
    marginTop: 20,
    width: "100%",
});

const Scroll = simple(View, {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    overflowX: "auto",
});

const Zoom = simple(Button.create("a"), {
    padding: 15,
    margin: 10,
    width: "50%",
    fontSize: 15,
    alignSelf: "center",
});

var Results = ({cargo, spare, total, gc, gcOk, mtow}) => (
    <Flex>
        <TopNav back={fromRoot(last(inputs).name)} next="/" nextText="Alkuun" />
        <Scroll>

            <Title>Tulokset</Title>

            <Row>
                <TotalText>Kuorma</TotalText>
                <ResultText bad={total > mtow}>
                    {cargo.toFixed(2)} kg
                </ResultText>
            </Row>

            <Sep />

            <Row>
                <TotalText>Kokonaispaino</TotalText>
                <ResultText bad={mtow < total}>
                    {total.toFixed(2)} kg
                </ResultText>
            </Row>

            <Sep />

            <Row>
                <TotalText>Vapaana</TotalText>
                <ResultText bad={spare < 0}>{spare.toFixed(2)} kg</ResultText>
            </Row>

            <Sep />

            <Row>
                <TotalText>Massakeskipiste</TotalText>
                <ResultText bad={!gcOk}>{gc.toFixed(3)} m</ResultText>
            </Row>

            <Img
                src="https://raw.githubusercontent.com/skydivejkl/painot/master/img/sma-gc-limits.png"
            />

            <Zoom
                href="https://raw.githubusercontent.com/skydivejkl/painot/master/img/sma-gc-limits.png"
            >
                ZOOM
            </Zoom>
        </Scroll>
    </Flex>
);
Results = connect(state => calculate(mapObValuesToFloats(state.painot)))(
    Results,
);

const fromRoot = s => s ? "/" + s : null;

const Main = () => (
    <Container>
        <Wrap>

            <Route
                exact
                path="/"
                render={() => <Redirect to={"/" + inputs[0].name} />}
            />

            {inputs.map((item, index, array) => {
                const next = item.next ||
                    fromRoot(get([index + 1, "name"], array));
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
