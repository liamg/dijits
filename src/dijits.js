(function () {

    // Private functions

    var digits = {
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

    var tens = {
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

    var teens = {
        10: 'ten',
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

    function getDigitWord(digit) {
        digit = parseInt(digit, 10);
        return digits[digit];
    }

    function getTensWord(number) {
        number = parseInt(number, 10);
        return tens[number];
    }

    function getTeensWord(number) {
        number = parseInt(number, 10);
        return teens[number];
    }

    function getThousandsGroupName(numThousandGroups) {

        numThousandGroups = parseInt(numThousandGroups, 10);

        var out = '';

        switch (numThousandGroups) {
            case 0:
                out = '';
                break;
            case 1:
                out = 'thousand';
                break;
            case 2:
                out = 'million';
                break;
            case 3:
                out = 'billion';
                break;
            case 4:
                out = 'trillion';
                break;
            default:
                var b = numThousandGroups % 4;
                if (b !== 0) {
                    out = getThousandsGroupName(b);
                }
                while (numThousandGroups > 4) {
                    numThousandGroups -= 4;
                    out += ' trillion';
                }
                break;
        }
        return out;
    }

    // Public functions

    var dijits = {};

    dijits.numberToWords = function (number) {

        //remove weird characters from number, in case provided as string
        var numberStr = number.toString().replace(/[^0-9\.]/g, '');
        var decimalStr = '';

        //get numbers after decimal point
        if (numberStr.indexOf('.') !== -1) {
            var parts = numberStr.split('.', 2);
            numberStr = parts[0];
            decimalStr = parts[1].replace(/[^0-9]/g, '');
        }

        //make sure number of digits is divisable by 3, so we can separate groups of thousands - 17,823 becomes 017823
        while (numberStr.length % 3 > 0 || numberStr.length === 0) {
            numberStr = '0' + numberStr;
        }

        //split number into "thousand" groups - so 23,236,234 becomes ['023','236','234']
        var groups = numberStr.match(/[0-9]{1,3}/g);
        var output = '';
        var groupOutput = '';
        var groupName = '';
        var anded = false;

        for (var i = 0; i < groups.length; i++) {

            anded = false;

            groupOutput = '';
            groupName = getThousandsGroupName(groups.length - (i + 1));

            if (groups[i] === '000') {
                if (i === 0) {
                    groupOutput += getDigitWord(0) + ' ';
                } else {
                    continue;
                }
            }

            // add hundreds for group
            if (groups[i][0] !== '0') {
                groupOutput += getDigitWord(groups[i][0]) + ' hundred ';
            }

            // add tens/teens for group
            if (groups[i][1] === '1') {
                if ((groupOutput !== '' || i > 0) && !anded) {
                    anded = true;
                    groupOutput += 'and ';
                }
                groupOutput += getTeensWord(groups[i][1] + groups[i][2]) + ' ';
            } else if (groups[i][1] !== '0') {
                if ((groupOutput !== '' || i > 0) && !anded) {
                    anded = true;
                    groupOutput += 'and ';
                }
                groupOutput += getTensWord(groups[i][1] + '0') + ' ';
            }

            // add single digits for group
            if (groups[i][2] !== '0' && groups[i][1] !== '1') {

                if ((groupOutput !== '' || i > 0) && !anded && groups[i][1] === '0') {
                    anded = true;
                    groupOutput += 'and ';
                }

                groupOutput += getDigitWord(groups[i][2]) + ' ';
            }

            output += groupOutput + groupName + ' ';
        }

        //add decimals
        if (decimalStr !== '') {
            output += 'point ';
            for (var j = 0; j < decimalStr.length; j++) {
                output += getDigitWord(decimalStr[j]) + ' ';
            }
        }

        return output.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s\s+/, ' ');
    };

    this.dijits = dijits;

}).call(this);