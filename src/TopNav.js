import React from "react";
import simple, {View} from "react-simple";

import Touchable from "./Touchable";
import {Sep, Button, addResultsFlag, Link} from "./core";

const FlexTouchable = simple(Touchable, {
    flex: 1,
});

const FlexLink = simple(Button.create(Link), {
    flex: 1,
});

const TopLink = props => (
    <FlexTouchable>
        <FlexLink {...props} />
    </FlexTouchable>
);

const Container = simple(View, {
    height: 50,
    flexDirection: "row",
    margin: 20,
    marginBottom: 0,
});

const Flex = simple(View, {
    flex: 1,
});

const BackNext = ({back, next, nextText}) => (
    <Container>
        {back ? <TopLink to={back}>Edellinen</TopLink> : <Flex />}
        <Sep />
        {next
            ? <TopLink to={next}>{nextText || "Seuraava"}</TopLink>
            : <Flex />}
    </Container>
);

const ResultsLink = () => (
    <Container>
        <TopLink to="tulos">Takaisin</TopLink>
    </Container>
);

var TopNav = ({hasResultsFlag, ...otherProps}) =>
    hasResultsFlag ? <ResultsLink /> : <BackNext {...otherProps} />;

TopNav = addResultsFlag(TopNav);

export default TopNav;
