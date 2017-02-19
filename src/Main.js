import React from "react";
import {Link} from "react-router-dom";
import simple, {View, css} from "react-simple";
import {Route} from "react-router-dom";
import {getOr} from "lodash/fp";

import Touchable from "./Touchable";
import TopNav from "./TopNav";
import InputConnect from "./InputConnect";
import {Text, Input} from "./core";
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
    backgroundColor: c.shade2,
});

const Title = simple(Text, {
    fontSize: 30,
    fontWeigth: "bold",
    color: c.shade3,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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

const Pilot = () => (
    <View>
        <TopNav next="/jumper1" />

        <Title>
            Pilotin paino
        </Title>

        <NumInput name="pilot" placeholder="100 kg" />
    </View>
);

const inputs = [
    {name: "pilot", title: "Pilotin paino"},
    {name: "jumper1", title: '"Mesun paikka"'},
    {name: "jumper2", title: "Ovella"},
    {name: "jumper3", title: "Pilotin penkin takana"},
    {name: "jumper4", title: "Perällä"},
];

const Main = () => (
    <Container>
        {inputs.map((item, index, array) => (
            <Route
                key={item.name}
                path={"/" + item.name}
                render={() => (
                    <View>
                        <TopNav
                            back={getOr(false, [index - 1, "name"], array)}
                            next={getOr(false, [index + 1, "name"], array)}
                        />

                        <Title>{item.title}</Title>

                        <NumInput
                            autoFocus
                            name={item.name}
                            placeholder="100 kg"
                        />
                    </View>
                )}
            />
        ))}
    </Container>
);

export default Main;
