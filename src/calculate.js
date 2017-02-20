import {getOr} from "lodash/fp";

const pass = val => val;

const JET_A = 0.804; // JET A tiheys
const MTOW = 1338; // CHQ suurin lentoonlähtöpaino (kg)

// OH-CHQ punnitustodistuksesta 25.3.2015
const PLANE = 838.98; // CHQ kuivapaino (kg)
const PLANE_MOMENT = 782.87; // CHQ perusmomentti

// Taulukon arvot
// https://raw.githubusercontent.com/skydivejkl/painot/master/img/sma-gc-limits.png
const MAX_GC = 1.17;
const MAX_MASS = 1338;
const SLOPE_START = 1040;
const SLOPE = 0.08;
const MIN_GC = 0.92;

export const dataInputs = [
    {
        name: "fuel",
        title: "JET A",
        description: "Tankattu JET A litroissa",
        position: 1.22,
        convert(value) {
            return parseFloat(value, 10) * JET_A;
        },
    },
    {
        name: "pilot",
        title: "pilotti",
        description: "Pilotin paino pelastusvarjoineen (kg)",
        position: 0.932,
    },
    {
        name: "jumper1",
        title: '"mesun paikalla"',
        description: 'ns. "mesun paikalla" istuvan hyppääjän exit paino jolla on selkä menosuuntaan. (kg)',
        position: 0.949,
    },
    {
        name: "jumper2",
        title: "ovella",
        description: "Oven vieressä istuva hyppääjä exit paino jolla on naama menosuuntaan (kg)",
        position: 1.375,
    },
    {
        name: "jumper3",
        title: "pilotin penkin takana",
        description: "Pilotin penkin takana istuva hyppääjän exit paino (kg)",
        position: 1.507,
    },
    {
        name: "jumper4",
        title: "perällä",
        next: "/tulos",
        nextText: "Tulokset",
        description: "Ihan perällä istuva hyppääjän exit paino (kg)",
        position: 1.957,
    },
];

export function isCGinSMALimits(mass, gc) {
    // suurin gc taulukossa
    if (gc > MAX_GC) {
        return false;
    }

    // suurin paino taulukossa
    if (mass > MAX_MASS) {
        return false;
    }

    if (mass > SLOPE_START && mass <= MAX_MASS) {
        const bottomLimit = MIN_GC +
            SLOPE * (mass - SLOPE_START) / (MAX_MASS - SLOPE_START);
        return gc > bottomLimit;
    }

    if (mass <= SLOPE_START) {
        return gc > MIN_GC;
    }

    console.error("Failed to calculate GC limit for", mass, gc);
    return false;
}

export default function calculate(data) {
    const cargoItems = dataInputs.map(input => {
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
    const gc = (PLANE_MOMENT + cargoMoment) / (PLANE + cargo);

    const total = PLANE + cargo;

    return {
        cargoItems,
        cargo,
        total,
        spare: MTOW - (PLANE + cargo),
        mtow: MTOW,
        gc,
        gcOk: isCGinSMALimits(total, gc),
    };
}
