import React from "react";
import {Link, Redirect} from "react-router-dom";
import simple, {View, css} from "react-simple";
import {Route} from "react-router-dom";
import {getOr} from "lodash/fp";

import Touchable from "./Touchable";
import TopNav from "./TopNav";
import InputConnect from "./InputConnect";
import {Text, Input, Sep} from "./core";
import * as c from "./colors";

css.global("body, html", {
    padding: 0,
    margin: 0,
    backgroundColor: c.shade2,
});

const Container = simple(View, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: c.shade4,
    alignItems: "center",
    // justifyContent: "center",
});

const Wrap = simple(View, {
    padding: 20,
    backgroundColor: c.shade2,
    flex: 1,
    "@media (min-width: 400px)": {
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
    color: c.shade3,
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

const Main = () => (
    <Container>
        <Wrap>

            <Route exact path="/" render={() => <Redirect to="/pilotti" />} />

            {inputs.map((item, index, array) => (
                <Route
                    key={item.name}
                    path={"/" + item.name}
                    render={() => (
                        <View>
                            <TopNav
                                back={getOr(false, [index - 1, "name"], array)}
                                nextText={item.nextText}
                                next={
                                    item.next ||
                                        getOr(false, [index + 1, "name"], array)
                                }
                            />

                            <Title>{item.title}</Title>

                            <NumInput
                                autoFocus
                                name={item.name}
                                placeholder="0"
                            />

                            <Sep />

                            <Description>
                                {item.description}
                            </Description>
                        </View>
                    )}
                />
            ))}
        </Wrap>
    </Container>
);

export default Main;
