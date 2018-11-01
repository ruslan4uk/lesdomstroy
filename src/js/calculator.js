// calculator

function createValidator(element) {
  return function() {
    var min = parseInt(element.getAttribute("min")) || 0;
    var max = parseInt(element.getAttribute("max")) || 0;

    var value = parseInt(element.value) || min;
    element.value = value; // make sure we got an int

    if (value < min) element.value = min;
    if (value > max) element.value = max;
  };
}

$(function() {
  if ($("#calculator__slider").length > 0) {
    var elm = document.getElementById("calculator__value");
    elm.onkeyup = createValidator(elm);

    var slider = document.getElementById("calculator__slider");
    var output = document.getElementById("calculator__value");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    output.oninput = function() {
      let self = this;
      setTimeout(function() {
        slider.value = self.value;
      }, 500);
    };

    slider.oninput = function() {
      output.value = this.value;
    };

    // output.oninput = function() {
    //   slider.value = this.value;
    // };
  }
});

$(function() {
  var $btnNext = $("#js--calculator-next");
  var $nav = "#js--calculator-nav";
  var $step = $(".calculator__step");

  $step.hide();
  $("[data-calculator-step=1]").show();

  // кнопка далее
  $btnNext.click(function(e) {
    var $current = parseFloat($($btnNext).attr("data-calculator-current"));

    if (
      $(
        "[data-calculator-step=" +
          $current +
          "] input[name=calc" +
          $current +
          "]:checked"
      ).length > 0 ||
      $("[data-calculator-step=" + $current + "] input[type=range]").length > 0
    ) {
      if ($current === 6) {
        //let c1 = $("[name=calc1]").val();
        //let c2 = $("[name=calc2]:checked").val();

        //alert(c2);

        $("#hcalc1").val($("[name=calc1]").val());
        $("#hcalc2").val($("[name=calc2]:checked").val());
        $("#hcalc3").val($("[name=calc3]:checked").val());
        $("#hcalc4").val($("[name=calc4]:checked").val());
        $("#hcalc5").val($("[name=calc5]:checked").val());
        $("#hcalc6").val($("[name=calc6]:checked").val());

        let inst = $('[data-remodal-id="modal-order"]').remodal();
        inst.open();
      }
      if ($current < 6) {
        $current++;
        show_block($current);
      }
    }

    e.preventDefault();
  });

  // верхняя навигация
  $($nav + " div").click(function(e) {
    if ($(this).hasClass("calculator__nav--active")) {
      show_block($(this).attr("data-calculator-nav"));
    }
    e.preventDefault();
  });

  // показывает блок по его порядковому номеру
  function show_block($current) {
    // show/hide block step
    $btnNext.attr("data-calculator-current", $current);
    $step.hide();
    $("[data-calculator-step=" + $current + "]").show();
    $($nav)
      .find("[data-calculator-nav=" + $current + "]")
      .addClass("calculator__nav--active");
  }
});
