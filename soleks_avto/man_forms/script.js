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

    window.range_label_set_place = function (inp_id) {
        let range_block = document.querySelector('[data-input="' + inp_id + '"]');
        let label_block = document.getElementById(inp_id + '_label');
        let label_width = label_block.offsetWidth;
        let min = parseInt(range_block.getAttribute('min'));
        let max = parseInt(range_block.getAttribute('max'));
        let val = parseInt(range_block.value);
        let width = range_block.offsetWidth;
        let max_pos = width - label_width;
        let pos = ((width/(max-min))*(val-min)) - (label_width/2);
        if (pos < 0) {
            pos = 0;
        } else if (pos > max_pos) {
            pos = max_pos;
        }
        label_block.style.left = pos + 'px';
    };

    let range_inputs = document.querySelectorAll('.js__input_for_range');
    range_inputs.forEach(function(el) {
        range_label_set_place(el.id);
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
            document.getElementById(el.id + '_label').innerHTML = formated_val;
            range_label_set_place(el.id);
        };
    });

    let range_blocks = document.querySelectorAll('.js__range_for_input');
    range_blocks.forEach(function(el) {
        el.oninput = function (e) {
            let inp_val = parseInt(el.value);
            let input_block = document.getElementById(el.getAttribute('data-input'));
            let formated_val = make_format_number(inp_val);
            input_block.value = formated_val;
            document.getElementById(input_block.id + '_label').innerHTML = formated_val;
            range_label_set_place(input_block.id);
        };
    });



});