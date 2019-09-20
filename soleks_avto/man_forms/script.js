window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function make_format_number (n){
        let s = '' + n;
        let l = s.length;
        if (l > 3) {
            let f_s = '';
            while (l > 3) {
                f_s = s.substr(l-3, 3) + ' ' + f_s;
                l = l-3;
            }
            f_s = s.substr(0, l) + ' ' + f_s;
            return f_s;
        }
        return s;
    }

    let range_input = document.querySelectorAll('.js__input_for_range');
    range_input.forEach(function(el) {
        el.onchange = function (e) {
            let inp_val = parseInt(el.value.replace(/[^\d]+/g, ''));
            let range_block = document.querySelector('[data-input="' + el.id + '"]');
            let min = parseInt(range_block.getAttribute('min'));
            let new_inp_val = min;
            let max = parseInt(range_block.getAttribute('max'));
            let step = parseInt(range_block.getAttribute('step'));
            if (isNaN(inp_val) || inp_val < min) {
                new_inp_val = min;
            } else if (inp_val > max) {
                new_inp_val = max;
            } else {
                while (new_inp_val < inp_val) {
                    new_inp_val = new_inp_val + step;
                }
            }
            let formated_val = make_format_number(new_inp_val);
            el.value = formated_val;
            range_block.value = '' + new_inp_val;
            range_block.nextSibling.innerHTML = formated_val;
        };
    });
});