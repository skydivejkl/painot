const JET_A = 0.804; // JET A tiheys per litra
const MTOW = 1338; // CHQ maksimi lentoonlähtö paino (kg)
const PLANE = 831; // CHQ kuivapaino (kg)

export default function calculate(
    {
        pilotti = 0,
        polttoaine = 0,
        hyppaaja1 = 0,
        hyppaaja2 = 0,
        hyppaaja3 = 0,
        hyppaaja4 = 0,
    },
) {
    var cargo = polttoaine * JET_A +
        pilotti +
        hyppaaja1 +
        hyppaaja2 +
        hyppaaja3 +
        hyppaaja4;

    var cargoMoment = polttoaine * JET_A +
        pilotti * 0.932 +
        hyppaaja1 * 0.949 +
        hyppaaja2 * 1.375 +
        hyppaaja3 * 1.507 +
        hyppaaja4 * 1.957;

    return {
        cargo: cargo,
        spare: MTOW - (PLANE + cargo),
        spareMoment: MTOW - (PLANE + cargoMoment),
    };
}
