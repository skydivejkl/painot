import React from "react";
import {Link} from "react-router-dom";
import simple, {View} from "react-simple";

import Touchable from "./Touchable";
import {Text} from "./core";
import * as c from "./colors";

const FlexTouchable = simple(Touchable, {
    flex: 1,
});

const FlexLink = simple(Text.create(Link), {
    flex: 1,
    backgroundColor: c.shade1,
    color: c.shade4,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
});

const TopLink = props => (
    <FlexTouchable>
        <FlexLink {...props} />
    </FlexTouchable>
);

const Container = simple(View, {
    height: 50,
    flexDirection: "row",
});

const TopNav = ({back, next}) => (
    <Container>
        <TopLink to={back || "/"}>Edellinen</TopLink>
        <TopLink to={next || "/"}>Seuraava</TopLink>
    </Container>
);

export default TopNav;
