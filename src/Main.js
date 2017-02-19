import React from "react";
import {Link} from "react-router-dom";
import simple, {View, css} from "react-simple";
import {Route} from "react-router-dom";

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

const NumInput = props => (
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

const Jumper1 = () => (
    <View>
        <TopNav back="/" next="/jumper2" />

        <Title>
            "Mesun paikka"
        </Title>

        <NumInput name="jumper1" placeholder="100 kg" />
    </View>
);

const Main = () => (
    <Container>
        <Route path="/" exact component={Pilot} />
        <Route path="/jumper1" component={Jumper1} />
    </Container>
);

export default Main;
