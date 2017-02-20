import React from "react";
import {connect} from "react-redux";
import simple, {View} from "react-simple";
import {last, mapValues} from "lodash/fp";

import {Text, Button, Scroll, Title, Sep, fromRoot} from "./core";
import TopNav from "./TopNav";
import calculate, {dataInputs} from "./calculate";

const mapObValuesToFloats = mapValues(val => parseFloat(val, 10));

const Row = simple(View, {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
});

const Flex = simple(View, {
    flex: 1,
});

const Img = simple(View.create("img"), {
    margin: "auto",
    marginTop: 20,
    width: "100%",
});

const Zoom = simple(Button.create("a"), {
    padding: 15,
    margin: 10,
    width: "50%",
    fontSize: 15,
    alignSelf: "center",
});

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

export const Results = ({cargo, spare, total, gc, gcOk, mtow}) => (
    <Flex>
        <TopNav
            back={fromRoot(last(dataInputs).name)}
            next="/"
            nextText="Alkuun"
        />
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

export default connect(state => calculate(mapObValuesToFloats(state.painot)))(
    Results,
);
