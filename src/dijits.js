(function(){


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

    function getDigitWord(digit){
        digit = parseInt(digit,10);
        return digits[digit];
    }

    function getTensWord(number){
        number = parseInt(number,10);
        return tens[number];
    }

    function getTeensWord(number){
        number = parseInt(number,10);
        return teens[number];
    }

    function getThousandsGroupName(numThousandGroups){

        numThousandGroups = parseInt(numThousandGroups, 10);

        var out = '';

        switch(numThousandGroups){
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
                if(b !== 0){
                    out = getThousandsGroupName(b);
                }
                while(numThousandGroups > 4){
                    numThousandGroups -= 4;
                    out += ' trillion';
                }
                break;
        }
        return out;
    }

    // Public functions

    var dijits = {};

    dijits.numberToWords = function(number){

        var numberStr = number.toString().replace(/[^0-9\.]/g, '');
        var decimalStr = '';

        if(numberStr.indexOf('.') !== -1){
            var parts = numberStr.split('.', 2);
            numberStr = parts[0];
            decimalStr = parts[1].replace(/[^0-9]/g, '');
        }

        var thousandGroups = Math.ceil(numberStr.length / 3);

        while(numberStr.length % 3 > 0 || numberStr.length === 0){
            numberStr = '0' + numberStr;
        }

        var groups = numberStr.match(/[0-9]{1,3}/g);

        var output = '';
        var groupOutput = '';

        var groupName = '';

        var anded = false;

        for(var i =0; i < groups.length; i++){

            anded = false;

            groupOutput = '';
            groupName = getThousandsGroupName(groups.length-(i+1));

            if(groups[i] === '000'){
                if(i === 0){
                    groupOutput += getDigitWord(0) + ' ';
                }else{
                    continue;
                }
            }

            if(groups[i][0] !== '0'){
                groupOutput += getDigitWord(groups[i][0]) + ' hundred ';
            }

            if(groups[i][1] === '1'){
                if((groupOutput !== '' || i > 0) && !anded){
                    anded = true;
                    groupOutput += 'and ';
                }
                groupOutput += getTeensWord(groups[i][1] + groups[i][2]) + ' ';
            }else if(groups[i][1] !== '0'){
                if((groupOutput !== '' || i > 0) && !anded){
                    anded = true;
                    groupOutput += 'and ';
                }
                groupOutput += getTensWord(groups[i][1] + '0') + ' ';
            }

            if(groups[i][2] !== '0' && groups[i][1] !== '1'){

                if((groupOutput !== '' || i > 0) && !anded){
                    anded = true;
                    groupOutput += 'and ';
                }

                groupOutput += getDigitWord(groups[i][2]) + ' ';
            }

            output += groupOutput + groupName + ' ';
        }

        if(decimalStr !== ''){
            output += 'point ';
            for(var j = 0; j < decimalStr.length; j++){
                output += getDigitWord(decimalStr[j]) + ' ';
            }
        }

        return output.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\s\s/, ' ');

    };

    this.dijits = dijits;

}).call(this);