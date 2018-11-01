<calculator-item>
    <div :id="val" class="calculator__item">
        <label for="calc2-1" class="calculator__img">
            <img src="img/calculator/{{ step.svg }}.svg" alt="" />
        </label>
        <div class="calculator__radio">
            <input type="radio" id="calc2-1" name="calc2" value="" />
            <label for="calc2-1">{{ step.name }}</label>
        </div>
    </div>
</calculator-item>

<script>
    const CalculatorItem = {
        props: ['step'],
    };
    export default CalculatorItem; // Works
</script>