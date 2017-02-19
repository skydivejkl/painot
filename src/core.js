import React from "react";
import simple, {View} from "react-simple";

import * as c from "./colors";

export const Text = simple(View, {
    fontFamily: "helvetica",
});

export const Input = simple(Text.create("input"), {
    backgroundColor: c.shade1,
    color: c.shade4,
    padding: 10,
    textAlign: "center",
    outline: "none",
    fontSize: 50,
});
