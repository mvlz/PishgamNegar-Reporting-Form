// =-=-=-=-=-=- Selectors -=-=-=-=-=-=-=- //
const datePickers = [...document.querySelectorAll(".date-input-box input")];
const infoBoxes = [...document.querySelectorAll(".info-box input")];
const reportTypeRadios = [
  ...document.querySelectorAll(".report-type-header input"),
];
const dateRadios = [...document.querySelectorAll(".date-radios input")];
const fromNumInputs = document.querySelectorAll("#from-number input");
const toNumInputs = document.querySelectorAll("#to-number input");
const fromNumError = document.querySelector(".from-error");
const toNumError = document.querySelector(".to-error");

// Change style on click each elements and show the More information container when Sales one clicked.
function reportStateCheck() {
  const salesBtn = document.getElementById("sales");
  const aggregateBtn = document.getElementById("Aggregate");
  const salesInfSection = document.getElementById("sales-more-inf");
  if (salesBtn.checked == true) {
    salesInfSection.style.display = "flex";
    salesBtn.parentElement.classList.add("active");
    aggregateBtn.parentElement.classList.remove("active");
    // console.log("گزارش فروش");
  } else {
    salesInfSection.style.display = "none";
    aggregateBtn.parentElement.classList.add("active");
    salesBtn.parentElement.classList.remove("active");
    // console.log("گزارش تجمیعی");
  }
}

// Change styles of report type boxes on click.
reportTypeRadios.forEach((typeRadio) => {
  typeRadio.addEventListener("click", () => {
    let disableInputs = [...document.querySelectorAll(".disable input")];
    let enableInputs = [
      ...document.querySelectorAll(".report-type-body input"),
    ];
    for (let i = 0; i < reportTypeRadios.length; i++) {
      reportTypeRadios[i].nextElementSibling.classList.remove("radio-checked");
      reportTypeRadios[
        i
      ].parentElement.parentElement.parentElement.classList.remove(
        "report-type-checked"
      );
      reportTypeRadios[
        i
      ].parentElement.parentElement.nextElementSibling.classList.add("disable");

      enableInputs.forEach((f) => {
        f.disabled = true;
        f.value = "";
        f.checked = false;
        f.nextElementSibling.classList.remove("date-checked");
      });
      if (reportTypeRadios[i].checked) {
        continue;
      }
    }
    typeRadio.nextElementSibling.classList.add("radio-checked");
    typeRadio.parentElement.parentElement.parentElement.classList.add(
      "report-type-checked"
    );
    typeRadio.parentElement.parentElement.nextElementSibling.classList.remove(
      "disable"
    );
    disableInputs.forEach((f) => {
      f.disabled = false;
    });
  });
});

// change styles of the Time&date-report-type input radios
dateRadios.forEach((dateRadio) => {
  dateRadio.addEventListener("click", () => {
    for (let i = 0; i < dateRadios.length; i++) {
      dateRadios[i].nextElementSibling.classList.remove("date-checked");
      if (dateRadios[i].checked) {
        datePickers.forEach((dp) => {
          dp.value = "";
        });

        continue;
      }
    }
    dateRadio.nextElementSibling.classList.add("date-checked");
  });
});

// change styles of checkboxes of payment ways and More information in Sales state
infoBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.parentElement.parentElement.classList.toggle("info-box-checked");
    box.nextElementSibling.classList.toggle("date-checked");
  });
});

// document.addEventListener("DOMContentLoaded", function (event) {

// Order type of report logic
let fromNumberVal = {
  num: 1,
};
let toNumberVal = {
  num: 2,
};
// order type number input execute and error handling function
function orderInput(arrey, numError, joinVal) {
  let x;
  for (let i = 0; i < arrey.length; i++) {
    arrey[i].addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        if (!arrey[i].value == "") {
          arrey[i].value = "";
        } else {
          arrey[i - 1].focus();
        }
      } else {
        if (i === arrey.length - 1 && arrey[i].value !== "") {
          return true;
        } else if (event.keyCode > 47 && event.keyCode < 58) {
          arrey[i].value = event.key;
          if (i !== arrey.length - 1) arrey[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 95 && event.keyCode < 106) {
          arrey[i].value = event.key;
          if (i !== arrey.length - 1) arrey[i + 1].focus();
          event.preventDefault();
        } else if (event.keyCode > 94 && event.keyCode < 91) {
          arrey[i].value = String.fromCharCode(event.keyCode);
          if (i !== arrey.length - 1) arrey[i + 1].focus();
          event.preventDefault();
        }
      }

      // ---- Error handling of order type ----- //
      x =
        `${arrey[0].value}` +
        `${arrey[1].value}` +
        `${arrey[2].value}` +
        `${arrey[3].value}` +
        `${arrey[4].value}`;

      //--Error conditions
      joinVal.num = parseInt(x);
      if (x.length < 5) {
        numError.classList.add("show-error");
        numError.innerText = "شماره سفارش باید 5 رقمی باشد.";
      } else if (x.length === 5 && joinVal.num < 87354) {
        numError.classList.add("show-error");
        numError.innerText = "شماره سفارش معتبر نیست.";
      } else if (
        fromNumberVal.num > 87354 &&
        toNumberVal.num > 87354 &&
        fromNumberVal.num > toNumberVal.num
      ) {
        console.log("false");
        toNumError.classList.add("show-error");
        toNumError.innerText = `شماره سفارش باید از  ${fromNumberVal.num}  بیشتر باشد.`;
      } else {
        numError.classList.remove("show-error");
        arrey[i].classList.remove("validate");
      }
    });
  }
}
// Calling function to execute for From Order one and To Order One
orderInput(fromNumInputs, fromNumError, fromNumberVal);
orderInput(toNumInputs, toNumError, toNumberVal);

// });
datePickers.forEach((dp) => {
  dp.addEventListener("focus", () => {
    dateRadios.forEach((dr) => {
      dr.checked = false;
      dr.nextElementSibling.classList.remove("date-checked");
    });
  });
});
