window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function make_format_number (n){
        var s = '' + n;
        var l = s.length;
        if (l > 3) {
            var f_s = '';
            while (l > 3) {
                f_s = s.substr(l-3, 3) + ' ' + f_s;
                l = l-3;
            }
            f_s = s.substr(0, l) + ' ' + f_s;
            return f_s;
        }
        return s;
    }

    var range_inputs = document.querySelectorAll('.js__input_for_range');
    for (var k in range_inputs) {
        var el = range_inputs[k];
        el.onchange = function (e) {
            var inp_val = parseInt(el.value.replace(/[^\d]+/g, ''));
            var range_block = document.querySelector('[data-input="' + el.id + '"]');
            var min = parseInt(range_block.getAttribute('min'));
            var new_inp_val = min;
            var max = parseInt(range_block.getAttribute('max'));
            var step = parseInt(range_block.getAttribute('step'));
            if (isNaN(inp_val) || inp_val < min) {
                new_inp_val = min;
            } else if (inp_val > max) {
                new_inp_val = max;
            } else {
                while (new_inp_val < inp_val) {
                    new_inp_val = new_inp_val + step;
                }
            }
            var formated_val = make_format_number(new_inp_val);
            el.value = formated_val;
            range_block.value = '' + new_inp_val;
            document.getElementById(el.id + '_label').innerHTML = formated_val;
        };
    };

    var range_blocks = document.querySelectorAll('.js__range_for_input');
    for (var k1 in range_blocks) {
        var el1=range_blocks[k1];
        el1.oninput = function (e) {
            var inp_val = parseInt(el1.value);
            var input_block = document.getElementById(el1.getAttribute('data-input'));
            var formated_val = make_format_number(inp_val);
            input_block.value = formated_val;
            document.getElementById(input_block.id + '_label').innerHTML = formated_val;
        };
    });



});