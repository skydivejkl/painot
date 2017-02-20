import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import simple, {View} from "react-simple";
import {last, mapValues} from "lodash/fp";

import {Text, Button, Scroll, Title, Sep, fromRoot} from "./core";
import TopNav from "./TopNav";
import calculate, {dataInputs} from "./calculate";

const mapObValuesToFloats = mapValues(val => parseFloat(val, 10));

const Row = simple(
    View,
    {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        marginBottom: 20,
    },
    {
        small: {
            marginBottom: 10,
        },
    },
);

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

const Label = simple(Text, {
    width: 160,
    fontSize: 19,
});

const ValueText = simple(
    Text,
    {
        // backgroundColor: "red",
        fontSize: 20,
        width: 170,
        fontWeight: "bold",
        color: "#3cd03c",
    },
    {
        bad: {
            color: "red",
        },
    },
);

const Label2 = simple(Label, {
    fontSize: 12,
    padding: "auto",
    paddingLeft: 20,
});

const ValueText2 = simple(ValueText, {
    color: "black",
    fontSize: 15,
});

const ValueLink = simple(Button.create(Link), {
    fontSize: 12,
    fontWeight: "bold",
    padding: 10,
    width: 170,
});

const RestartLinkContainer = simple(View, {
    alignItems: "center",
    padding: "auto",
    paddingTop: 0,
    paddingBottom: 20,
    // backgroundColor: "red",
});

const RestartLink = simple(ValueLink, {
    width: 140,
});

export const Results = (
    {cargo, spare, total, gc, gcOk, mtow, cargoItems, plane, planeMoment},
) => (
    <Flex>
        <TopNav back={fromRoot(last(dataInputs).name)} />
        <Scroll>

            <Title>Tulokset</Title>

            <RestartLinkContainer>
                <RestartLink to="/">Alkuun</RestartLink>
            </RestartLinkContainer>

            <Row>
                <Label>Kokonaispaino</Label>
                <ValueText bad={mtow < total}>
                    {total.toFixed(1)} kg
                </ValueText>
            </Row>

            <Row small>
                <Label2>MTOW</Label2>
                <ValueText2>{mtow} kg</ValueText2>
            </Row>

            <Row small>
                <Label2>Peruspaino</Label2>
                <ValueText2>{plane} kg</ValueText2>
            </Row>

            <Row small>
                <Label2>Vapaana</Label2>
                <ValueText2 bad={spare < 0}>{spare.toFixed(1)} kg</ValueText2>
            </Row>

            <Row small>
                <Label2>Perusmomentti</Label2>
                <ValueText2>{planeMoment} kg</ValueText2>
            </Row>

            <Row>
                <Label>Massakeskipiste</Label>
                <ValueText bad={!gcOk}>{gc.toFixed(3)} m</ValueText>
            </Row>

            {cargoItems.map(item => (
                <Row key={item.name} small>
                    <Label2>{item.title}</Label2>
                    <ValueLink
                        to={{pathname: "/" + item.name, search: "?results=1"}}
                    >
                        {
                            `${item.mass.toFixed(
                                1,
                            )} kg / ${item.massMoment.toFixed(1)} kgm`
                        }
                    </ValueLink>
                </Row>
            ))}

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
