const range = document.getElementById('range');
if(range){
    const range_from = document.querySelector('[data-from]');
    const range_to = document.querySelector('[data-to]');
    const ranges = [range_from, range_to];
    noUiSlider.create(range, {
        start: [1000, 150000],
        connect: true,
        step: 100,
        range: {
            'min': [1000],
            'max': [500000]
        }
    });

    range.noUiSlider.on('update', function (values, handle) { 
        ranges[handle].value = Math.round(values[handle]);
    });

    const set_range_slader = (i, value) => {
        let arr = [null, null];
        arr[i] = value;
        range.noUiSlider.set(arr);
    };

    ranges.forEach((item, index) => {
        item.addEventListener('change', (e) => {
            set_range_slader(index, e.currentTarget.value); 
        });
    });
}