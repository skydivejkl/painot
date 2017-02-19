const JET_A = 0.804; // JET A tiheys
const MTOW = 1338; // CHQ suurin lentoonlähtöpaino (kg)
const PLANE = 831; // CHQ kuivapaino (kg)

// Momenttikertoimet
const FUEL_P = 1.22;
const PILOT_P = 0.932;
const JUMPER1_P = 0.949;
const JUMPER2_P = 1.375;
const JUMPER3_P = 1.507;
const JUMPER4_P = 1.957;

export default function calculate(
    {
        pilot = 0, // kg
        fuel = 0, // tankattu JET A litroissa
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

    return {
        cargo: cargo,
        spare: MTOW - (PLANE + cargo),
        spareMoment: MTOW - (PLANE + cargoMoment),
    };
}
