// output: [ SUM, CARRY ]
function halfAdder(a, b) {
    return [a ^ b, a & b];
}

// output: [ SUM, COUT ]
function fullAdder(a, b, cin) {
    let fCircuit = halfAdder(a, b);
    let sCircuit = halfAdder(fCircuit[0], cin);

    return [sCircuit[0], fCircuit[1] | sCircuit[1]];
}

let tests = {
    runAll: function () {
        this.fullAdder_Test();
    },

    fullAdder_Test: function () {
        let tableOfTruth = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ];

        _.each(tableOfTruth, (e, idx) => {
            let current = fullAdder(e[0], e[1], e[2]);

            assert.areEqual(e[3], current[0], `fullAdder_Test, tableOfTruth[${idx}] -> SUM`);
            assert.areEqual(e[4], current[1], `fullAdder_Test, tableOfTruth[${idx}] -> COUT`);
        });
    }
};

let assert = {
    areEqual: function (expected, actual, detailsMessage) {
        if (expected !== actual) {
            console.error(`TEST_FAIL: expected: '${expected}', but actual: '${actual}'. Details: ${detailsMessage}`);
        }
    }
};

tests.runAll();