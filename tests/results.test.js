import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from "react-router";

import {Results} from "../src/Results";
import calculate from "../src/calculate";

test("render results", () => {
    const data = {
        fuel: 50,
        pilot: 80,
        jumper1: 105,
        jumper2: 90,
        jumper3: 85,
        jumper4: 85,
    };

    const tree = renderer
        .create(
            <MemoryRouter>
                <Results {...calculate(data)} />
            </MemoryRouter>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
