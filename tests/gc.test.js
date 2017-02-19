import {isCGinSMALimits} from "../src/calculate";

[
    [1200, 1.20, false],
    [800, 1.20, false],
    [900, 0.95, true],
    [1400, 1, false],
    [1200, 0.9, false],
    [1200, 1.1, true],
    [1300, 1, true],
    [1300, 0.99, true],
    [1300, 0.98, false],
    [1040, 0.98, true],
    [1338, 1.001, true],
    [1338, 0.999, false],
    [1040, 0.921, true],
    [1040, 0.919, false],
].forEach(([mass, gc, ok]) => {
    test(
        `${mass} kg with GC of ${gc} is ${ok
            ? "within limit"
            : "out of limits"}`,
        () => {
            expect(isCGinSMALimits(mass, gc)).toBe(ok);
        },
    );
});
