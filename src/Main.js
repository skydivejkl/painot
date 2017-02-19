import React from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import simple, {View, css} from "react-simple";
import {Route} from "react-router-dom";
import {get, omit, last} from "lodash/fp";
import {compose, withHandlers, mapProps} from "recompose";

import Touchable from "./Touchable";
import TopNav from "./TopNav";
import InputConnect from "./InputConnect";
import {Text, Input, Sep} from "./core";

css.global("body, html", {
    padding: 0,
    margin: 0,
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
    padding: 20,
    flex: 1,
    width: "100%",
    "@media (min-width: 400px)": {
        width: 400,
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
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
    color: "silver",
    fontSize: 12,
});

var NumInput = props => (
    <InputConnect
        component={Input}
        type="number"
        pattern="[0-9]*"
        inputMode="numeric"
        scope="paino"
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
        name: "polttoaine",
        title: "Polttoaine",
        description: "Tankattu polttoaine litroissa",
    },
    {name: "pilotti", title: "Pilotti", description: "Lentäjän paino (kg)"},
    {
        name: "hyppaaja1",
        title: '"Mesun paikka"',
        description: "ns. mesun paikalla olevan hyppääjän paino joka on selkä menosuuntaan. (kg)",
    },
    {
        name: "hyppaaja2",
        title: "Ovella",
        description: "Oven vieressä oleva hyppääjä, jossa ensimmäisenä lähtevä oppilas yleensä istuu (kg)",
    },
    {
        name: "hyppaaja3",
        title: "Pilotin penkin takana",
        description: "Lentäjän penkin takana istuva hyppääjä (kg)",
    },
    {
        name: "hyppaaja4",
        title: "Perällä",
        next: "/tulos",
        nextText: "Tulokset",
        description: "Takimmainen hyppääjä koneessa (kg)",
    },
];

const Flex = simple(View, {
    flex: 1,
});

const Form = ({back, next, nextText, title, name, description}) => (
    <Flex>
        <TopNav back={back} nextText={nextText} next={next} />

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
    </Flex>
);

const Results = () => (
    <Flex>
        <TopNav back={fromRoot(last(inputs).name)} next="/" nextText="Alkuun" />

        <Title>Tulokset</Title>

        <Description>
            lalalaa
        </Description>
    </Flex>
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
