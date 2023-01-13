(function () {
    const priceSlider = document.getElementById('price-slider');
    priceSlider.addEventListener('input', (event) => moveSlider(event));
    priceSlider.addEventListener('change', (event) => moveSlider(event));
    document.getElementById('check-discount').addEventListener('click', (event) => applyDisccount());
    window.addEventListener('resize', reportWindowSize);
    function moveSlider(event) {
        if (event.target.value > 1) {
            calculateBill(calculateValues(event.target.value));
        }
        updateSizeSliderFull(calculatePercentage(event.target.value, event.target.offsetWidth));
    }
    function calculatePercentage(percentage, size) {
        let progress = (Number(percentage) * (size - 28)) / 100;
        let percentageReal = (progress * 100) / size;
        percentageReal += (percentageReal < 20) ? 0.5 : (percentageReal < 40 ? 0.25 : 0);
        return percentageReal;
    }
    function updateSizeSliderFull(percentage) {
        document.getElementById('price-slider-full').style.width = percentage + '%';
    }
    function applyDisccount() {
        calculateBill(calculateValues(document.getElementById('price-slider').value));
    }
    function calculateValues(value) {
        if (value == 100) {
            return { views: '1M', price: 36 };
        } else if (value > 75) {
            return { views: '500k', price: 24 };
        } else if (value >= 50) {
            return { views: '100K', price: 16 };
        } else if (value >= 25) {
            return { views: '50K', price: 12 };
        } else {
            return { views: '10K', price: 8 };
        }
    }
    function calculateBill(values) {
        let { views, price } = values;
        const billByYear = document.getElementById('check-discount').checked;
        if (billByYear) {
            price = price * 0.75;
        }
        renderText(views, price);

    }
    function renderText(views, price) {
        document.querySelector('.viewers').innerHTML = views + ' PAGEVIEWS';
        document.querySelectorAll('.bill').forEach(item => item.innerHTML = '$' + price + '.00');
    }
    function reportWindowSize() {
        if (document.querySelector('.wrapper').offsetHeight > document.querySelector('html').offsetHeight) {
            document.querySelector('.attribution').classList.add('fix-end');
        } else {
            document.querySelector('.attribution').classList.remove('fix-end');
        }
    }
    reportWindowSize();

})();

