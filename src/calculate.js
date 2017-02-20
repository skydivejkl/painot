import {connect} from "react-redux";
import {mapValues, getOr} from "lodash/fp";
import {compose, withProps, mapProps} from "recompose";

import {withRouterProps} from "./core";

import * as CHQ from "./oh-chq";

const PLANES = {
    chq: CHQ,
};

var prev = "chq";
export const addCurrentPlane = withRouterProps(router => {
    console.log("initial", getOr(null, ["match", "params", "plane"], router));
    const name = getOr(prev, ["match", "params", "plane"], router);
    prev = name;
    console.log("name", name);

    return {
        plane: {
            name,
            ...PLANES[name],
        },
    };
});

export const PLANE_KEYS = Object.keys(PLANES);

const pass = val => val;
const mapValuesToFloats = mapValues(val => parseFloat(val, 10));

export const addResults = compose(
    addCurrentPlane,
    connect((state, props) => {
        return {
            data: mapValuesToFloats(state[props.plane.name]),
        };
    }),
    mapProps(({data, plane}) => {
        const cargoItems = plane.items.map(input => {
            const convert = input.convert || pass;

            const mass = convert(getOr(0, input.name, data)) || 0;
            const massMoment = mass * (input.position || 1);

            return {
                name: input.name,
                title: input.title,
                position: input.position,
                description: input.description,
                mass,
                massMoment,
            };
        });

        const cargo = cargoItems.reduce((sum, item) => sum + item.mass, 0);
        const cargoMoment = cargoItems.reduce(
            (sum, item) => sum + item.massMoment,
            0,
        );

        // center of gravity
        const gc = (plane.PLANE_MOMENT + cargoMoment) / (plane.PLANE + cargo);

        const total = plane.PLANE + cargo;

        return {
            cargoItems,
            cargo,
            total,
            planeMass: plane.PLANE,
            planeMoment: plane.PLANE_MOMENT,
            spare: plane.MTOW - (plane.PLANE + cargo),
            mtow: plane.MTOW,
            gc,
            gcOk: plane.isGCWithinLimits(total, gc),
        };
    }),
);
