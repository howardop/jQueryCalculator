/*
 * Implement all your JavaScript in this file!
 */
var display = $("#display");
var stack = [];
var lastOp = '';
var opPushed = false;
var newCalc = true;
var operand = 0;
var operator = /[\+\-\*\/]/;
var lastKey = '';
var currentKey = '';
var operand1, operand2;
var equalOpcode, equalOperand2;

display.val('');

function inputNumber(key) {
    //$('#history').append("<li>inputNumber(" + key + ") called</li>");
    // key must be a number
    // setValue() returns a String
    if (newCalc) {
        //$('#history').append("<li>Starting new calculation in inputNumber(" + key + ")</li>");
        setDisplay(key);
        //$('#history').append("<li>Setting display = " + display.val() + "</li>");
        display.removeAttr("disabled");
        newCalc = false;
    } else if (opPushed) {
        //$('#history').append("<li>Testing for opPushed in inputNumber(" + key + ")</li>");
        setDisplay(key);
        //$('#history').append("<li>Setting display = " + display.val() + "</li>");
        opPushed = false;
    } else {
        //$('#history').append("<li>Appending " + key + " to display</li>");
        // display.val() returns a String
        //var newVal = Number(display.val()) * 10 + key;
        //display.val(newVal);
        setDisplay(display.val() + key);
        //$('#history').append("<li>Display = " + display.val() + "</li>");
    }

}

function compute(op) {
    operand = stack.pop();
    //$('#history').append("<li>" + operand + " popped from stack</li>");

    //$('#history').append("<li>Computing " + operand + ' ' + op + ' ' + display.val() + "</li>");
    
    switch(op) {
        case '+' : 
            setDisplay(operand + Number(display.val()));
            break;
        case '-' : 
            setDisplay(operand - Number(display.val()));
            break;
        case '*' : 
            setDisplay(operand * Number(display.val()));
            break;
        case '/' : 
            setDisplay(operand / Number(display.val()));
            break;
        default: 
            //$('#history').append("<li><strong>" + lastOp + " not implemented yet.</strong></li>");
    }
}

function compute3(opcode, operand1, operand2) {
    //$('#history').append("<li>Computing " + operand1 + ' ' + opcode + ' ' + operand2 + "</li>");
    
    switch(opcode) {
        case '+' : 
            setDisplay(operand1 + operand2);
            break;
        case '-' : 
            setDisplay(operand1 - operand2);
            break;
        case '*' : 
            setDisplay(operand1 * operand2);
            break;
        case '/' : 
            setDisplay(operand1 / operand2);
            break;
        default: 
            //$('#history').append("<li><strong>" + lastOp + " not implemented yet.</strong></li>");
    }
}

function setDisplay(value) {
    display.val(value);
    //$('#history').append("<li>Setting display = " + value + "</li>");
}

function override(op) {
    // Handle case of 2 operations entered consecutively.  Last one operrides first.
    if (operator.test(currentKey)) {
        currentKey = op;
        lastOp = op;
        return true;
    } else {
        return false;
    }
}

$("button").click(function() {
    if (/^button/.test($(this).attr("id"))) {
        var key = Number($(this).attr("value"));
        //$('#history').append("<li>#" + key + " pushed.</li>");
        lastKey = currentKey;
        currentKey = key;
        inputNumber(key);
    }
    if ($(this).attr("id") == "addButton") {
        //$('#history').append("<li>+ pushed</li>");
        if (!override('+')) {
            lastKey = currentKey;
            currentKey = '+';
            if (stack.length > 0) {
                // Something already on stack.  Perform operation
                compute(lastOp);
            }
            // Nothing on stack.  Push current value
            stack.push(Number(display.val()));
            //$('#history').append("<li>" + display.val() + " pushed onto stack</li>");
            lastOp = '+';
            opPushed = true;
        } 
    } 
    if ($(this).attr("id") == "subtractButton") {
        //$('#history').append("<li>- pushed</li>");
        if (!override('-')) {
            lastKey = currentKey;
            currentKey = '-';
            if (stack.length > 0) {
                // Something already on stack.  Perform operation
                compute(lastOp);
            }
            // Nothing on stack.  Push current value
            stack.push(Number(display.val()));
            //$('#history').append("<li>" + display.val() + " pushed onto stack</li>");
            lastOp = '-';
            opPushed = true;
        }
    } 
    if ($(this).attr("id") == "multiplyButton") {
        //$('#history').append("<li>* pushed</li>");
        if (!override('*')) {
            lastKey = currentKey;
            currentKey = '*';
            if (stack.length > 0) {
                // Something already on stack.  Perform operation
                compute(lastOp);
            }
            // Nothing on stack.  Push current value
            stack.push(Number(display.val()));
            //$('#history').append("<li>" + display.val() + " pushed onto stack</li>");
            lastOp = '*';
            opPushed = true;
        }
    } 
    if ($(this).attr("id") == "divideButton") {
        //$('#history').append("<li>/ pushed</li>");
        if (!override('/')) {
            lastKey = currentKey;
            currentKey = '/';
            if (stack.length > 0) {
                // Something already on stack.  Perform operation
                compute(lastOp);
            }
            // Nothing on stack.  Push current value
            stack.push(Number(display.val()));
            //$('#history').append("<li>" + display.val() + " pushed onto stack</li>");
            lastOp = '/';
            opPushed = true;
        }
    } 
    if ($(this).attr("id") == "equalsButton") {
        //$('#history').append("<li>= pushed</li>");
        if (lastOp == '') {
            // Ignore = if no operation selected yet.
            //$('#history').append("<li>No previous operation selected.  = ignored</li>");
        } else if (operator.test(currentKey)) {
            // = immediately after some operation.  Ignore =
            //$('#history').append("<li>Previous key was " + currentKey + ".  = ignored</li>");
        } else if (lastOp == '=') {
            compute3(equalOpcode, Number(display.val()), equalOperand2 );
        } else {
            lastKey = currentKey;
            currentKey = '=';
            equalOperand2 = Number(display.val());
            equalOpcode = lastOp;
            compute(lastOp);
            opPushed = true;
            lastOp = '=';
        }
    }
    if ($(this).attr("id") == "clearButton") {
        //$('#history').append("<li>Clear pushed</li>");
        setDisplay('');
        stack = [];
        lastOp = '';
        lastKey = '';
        currentKey='';
        display.attr("disabled");
        newCalc = true;
        $('#history').empty();
    } 
 

});

