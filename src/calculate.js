const JET_A = 0.804; // JET A tiheys
const MTOW = 1338; // CHQ suurin lentoonlähtöpaino (kg)
const PLANE = 839; // CHQ kuivapaino (kg)
const PLANE_MOMENT = 800; // CHQ perusmomentti (EI TARKASTETTU punnitustodistuksesta)

// Momenttikertoimet
const FUEL_P = 1.22;
const PILOT_P = 0.932;
const JUMPER1_P = 0.949;
const JUMPER2_P = 1.375;
const JUMPER3_P = 1.507;
const JUMPER4_P = 1.957;

export function isCGinSMALimits(mass, gc) {
    // suurin gc taulukossa
    if (gc > 1.17) {
        return false;
    }

    // suurin paino taulukossa
    if (mass > 1338) {
        return false;
    }

    const bottomLimit = 0.92 + 0.08 * (mass - 1040) / (1338 - 1040);

    if (mass > 1040 && mass <= 1338) {
        // console.log("LIMIT", gc, ">", bottomLimit);
        return gc > bottomLimit;
    }

    if (mass <= 1040) {
        return gc > 0.92;
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

    return {
        cargo: cargo,
        total: PLANE + cargo,
        spare: MTOW - (PLANE + cargo),
        gc: gc,
    };
}
