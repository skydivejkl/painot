import React from "react";
import {Link} from "react-router-dom";
import simple, {View} from "react-simple";

import Touchable from "./Touchable";
import {Text, Sep, Button} from "./core";

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

const TopNav = ({back, next, nextText}) => (
    <Container>
        {back ? <TopLink to={back}>Edellinen</TopLink> : <Flex />}
        <Sep />
        {next
            ? <TopLink to={next || "/"}>{nextText || "Seuraava"}</TopLink>
            : <Flex />}
    </Container>
);

export default TopNav;
