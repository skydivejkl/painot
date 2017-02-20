const JET_A = 0.804; // JET A tiheys
const MTOW = 1338; // CHQ suurin lentoonlähtöpaino (kg)

// OH-CHQ punnitustodistuksesta 25.3.2015
const PLANE = 838.98; // CHQ kuivapaino (kg)
const PLANE_MOMENT = 782.87; // CHQ perusmomentti

// Momenttikertoimet
const FUEL_P = 1.22;
const PILOT_P = 0.932;
const JUMPER1_P = 0.949;
const JUMPER2_P = 1.375;
const JUMPER3_P = 1.507;
const JUMPER4_P = 1.957;

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
    },
    {
        name: "pilot",
        title: "pilotti",
        description: "Pilotin paino pelastusvarjoineen (kg)",
    },
    {
        name: "jumper1",
        title: '"mesun paikalla"',
        description: 'ns. "mesun paikalla" istuvan hyppääjän exit paino jolla on selkä menosuuntaan. (kg)',
    },
    {
        name: "jumper2",
        title: "ovella",
        description: "Oven vieressä istuva hyppääjä exit paino jolla on naama menosuuntaan (kg)",
    },
    {
        name: "jumper3",
        title: "pilotin penkin takana",
        description: "Pilotin penkin takana istuva hyppääjän exit paino (kg)",
    },
    {
        name: "jumper4",
        title: "perällä",
        next: "/tulos",
        nextText: "Tulokset",
        description: "Ihan perällä istuva hyppääjän exit paino (kg)",
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

    throw new Error("programmer error :)");
}

export default function calculate(
    {
        fuel = 0, // tankattu JET A litroissa
        pilot = 0, // kg
        jumper1 = 0, // kg
        jumper2 = 0, // kg
        jumper3 = 0, // kg
        jumper4 = 0, // kg
    },
) {
    var cargo = fuel * JET_A + pilot + jumper1 + jumper2 + jumper3 + jumper4;

    var cargoMoment = fuel * JET_A * FUEL_P +
        pilot * PILOT_P +
        jumper1 * JUMPER1_P +
        jumper2 * JUMPER2_P +
        jumper3 * JUMPER3_P +
        jumper4 * JUMPER4_P;

    // center of gravity
    var gc = (PLANE_MOMENT + cargoMoment) / (PLANE + cargo);

    var total = PLANE + cargo;

    return {
        cargo: cargo,
        total: total,
        spare: MTOW - (PLANE + cargo),
        mtow: MTOW,
        gc: gc,
        gcOk: isCGinSMALimits(total, gc),
    };
}
