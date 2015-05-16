QUnit.module("Numbers to words", {
    setup: function () {

    },
    teardown: function () {

    }
});

QUnit.test("Single digits are converted to words", function (assert) {

    var checks = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine'
    };

    for(var n in checks) {
        assert.equal(dijits.numberToWords(n), checks[n], 'Check ' + n + ' -> ' + checks[n]);
    }
});

QUnit.test("Tens are converted to words", function (assert) {

    var checks = {
        10: 'ten',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety'
    };

    for(var n in checks) {
        assert.equal(dijits.numberToWords(n), checks[n], 'Check ' + n + ' -> ' + checks[n]);
    }
});

QUnit.test("Teens are converted to words", function (assert) {

    var checks = {
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen'
    };

    for(var n in checks) {
        assert.equal(dijits.numberToWords(n), checks[n], 'Check ' + n + ' -> ' + checks[n]);
    }
});

QUnit.test("Combinations are converted into words", function (assert) {

    assert.equal(dijits.numberToWords(17), 'seventeen');
    assert.equal(dijits.numberToWords(8.6), 'eight point six');
    assert.equal(dijits.numberToWords(100000000000), 'one hundred billion');
    assert.equal(dijits.numberToWords(999), 'nine hundred and ninety nine');
    assert.equal(dijits.numberToWords(36), 'thirty six');
    assert.equal(dijits.numberToWords(123), 'one hundred and twenty three');
    assert.equal(dijits.numberToWords(1036), 'one thousand and thirty six');
    assert.equal(dijits.numberToWords(11980), 'eleven thousand nine hundred and eighty');
    assert.equal(dijits.numberToWords(22906), 'twenty two thousand nine hundred and six');
    assert.equal(dijits.numberToWords(1000000), 'one million');
    assert.equal(dijits.numberToWords(1000001), 'one million and one');

});

QUnit.test("Decimals are converted into words", function (assert) {

    assert.equal(dijits.numberToWords(3.14), 'three point one four');
    assert.equal(dijits.numberToWords(12000000.0004), 'twelve million point zero zero zero four');
    assert.equal(dijits.numberToWords(0.777), 'zero point seven seven seven');
});

QUnit.test("Large numbers converted into words", function (assert) {

    assert.equal(dijits.numberToWords('7000.6'), 'seven thousand point six');
    assert.equal(dijits.numberToWords('742388401'), 'seven hundred and forty two million three hundred and eighty eight thousand four hundred and one');
    assert.equal(dijits.numberToWords('7000000000'), 'seven billion');
    assert.equal(dijits.numberToWords('41000000200'), 'forty one billion two hundred');
    assert.equal(dijits.numberToWords('1000000000001'), 'one trillion and one');
    assert.equal(dijits.numberToWords('11111111111111'), 'eleven trillion one hundred and eleven billion one hundred and eleven million one hundred and eleven thousand one hundred and eleven');
    assert.equal(dijits.numberToWords('40000000000000000000000000000000'), 'forty million trillion trillion');
    assert.equal(dijits.numberToWords('40000000000000000000000000000000.0004'), 'forty million trillion trillion point zero zero zero four');


});

