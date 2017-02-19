const JET_A = 0.804; // JET A tiheys per litra
const MTOW = 1338; // CHQ maksimi lentoonlähtö paino (kg)
const PLANE_WEIGHT = 831; // CHQ kuivapaino (kg)

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
    var kuorma = polttoaine * JET_A +
        pilotti +
        hyppaaja1 +
        hyppaaja2 +
        hyppaaja3 +
        hyppaaja4;

    return {
        cargo: kuorma,
        mtow: MTOW,
        plane: PLANE_WEIGHT,
    };
}
