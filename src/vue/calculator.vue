<template lang="html">
    <section class="calculator" id="calculator">
    <div class="container">
        <div class="title title--white">Посчитайте стоимость дома или бани</div>
        <div class="calculator__navs">
            <div class="calculator__nav calculator__nav--active">1</div>
            <div class="calculator__nav">2</div>
            <div class="calculator__nav">3</div>
            <div class="calculator__nav">4</div>
            <div class="calculator__nav">5</div>
            <div class="calculator__nav">6</div>
        </div> 

        <div class="calculator__subtitle">Выберите материал</div>

        <div class="calculator__list">
            <calculator-item 
                v-for="steps in step"
                v-bind:step="step"
                v-bind:key="step.id">
            </calculator-item>
            <!-- <div class="calculator__item">
                <label for="calc2-1" class="calculator__img">
                    <img src="img/calculator/2-1.svg" alt="" />
                </label>
                <div class="calculator__radio">
                    <input type="radio" id="calc2-1" name="calc2" value="" />
                    <label for="calc2-1">Оцилиндрованное бревно</label>
                </div>
            </div>
            <div class="calculator__item">
                <label for="calc2-2" class="calculator__img">
                    <img src="img/calculator/2-2.svg" alt="" />
                </label>
                <div class="calculator__radio">
                    <input type="radio" id="calc2-2" name="calc2" value="" />
                    <label for="calc2-2">Профилированный брус</label>
                </div>
            </div>
            <div class="calculator__item">
                <label for="calc2-3" class="calculator__img">
                    <img src="img/calculator/2-3.svg" alt="" />
                </label>
                <div class="calculator__radio">
                    <input type="radio" id="calc2-3" name="calc2" value="" />
                    <label for="calc2-3">Клееный брус</label>
                </div>
            </div>
            <div class="calculator__item">
                <label for="calc2-4" class="calculator__img">
                    <img src="img/calculator/2-4.svg" alt="" />
                </label>
                <div class="calculator__radio">
                    <input type="radio" id="calc2-4" name="calc2" value="" />
                    <label for="calc2-4">Обрезной брус</label>
                </div>
            </div> -->
        </div>

        <div class="calculator__btn">
            <a href="#" class="btn btn--center">Далее</a>
        </div>
    </div>
</section>
</template>

<script>
    const Calculator = {
        data: () => ({
            steps: [
                {id: 1, name: 'Оцилиндрованное бревно', svg: '2-1'},
                {id: 2, name: 'Оцилиндрованное бревно', svg: '2-1'},
                {id: 3, name: 'Оцилиндрованное бревно', svg: '2-1'},
            ]
        }),
        

    };
    export default Calculator; // Works
</script>