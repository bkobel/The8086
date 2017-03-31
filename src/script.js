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

function fourBitAdder(a3, a2, a1, a0, b3, b2, b1, b0, cin) {
    let c0 = fullAdder(a0, b0, cin);
    let c1 = fullAdder(a1, b1, c0[1]);
    let c2 = fullAdder(a2, b2, c1[1]);
    let c3 = fullAdder(a3, b3, c2[1]);

    return [c3[0], c2[0], c1[0], c0[0], c3[1]];
}

let tests = {
    runAll: function () {
        this.fullAdder_Test();
        this.fourBitAdder_Test();
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
    },

    fourBitAdder_Test: function () {
        let max4bitNumber = 9;

        for (let i = 0; i <= max4bitNumber; i++)
        for (let j = 0; j <= max4bitNumber; j++) {
            // arrange
            let expected = i + j;
            let a = common.number.dec2bin(i);
            let b = common.number.dec2bin(j);

            // act
            let actual = fourBitAdder(...a, ...b);
            let actualDec = common.number.bin2dec(actual);

            // assert
            assert.areEqual(expected, actualDec, `${i}(${a}) + ${j}(${b}) != ${actualDec}(${actual})`);
        }
    }
};

let common = {
    number: {
        dec2bin: function (num, bits) {
            let result = _.map((num).toString(2), n => parseInt(n)); // js hack to get array of bits from decimal number
            for(let i = 0; i <= bits - result.length; i++) {
                result.unshift(0);
            }

            return result;
        },

        bin2dec: function (num, bits) {
            let result = 0;
            if (num.length % bits > 0) {
                num.unshift(num.pop(num.length - 1)); // keep in mind that we're dealing with CARRY_OUTs
            }

            _.each(num.reverse(), (n, idx) => result += n * Math.pow(2, idx));

            return result;
        }
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