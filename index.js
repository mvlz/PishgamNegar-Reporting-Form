// =-=-=-=-=-=- Selectors -=-=-=-=-=-=-=- //
const datePickers = [...document.querySelectorAll(".date-input-box input")];
const infoBoxes = [...document.querySelectorAll(".info-box input")];
const reportTypeRadios = [
  ...document.querySelectorAll(".range-type-header input"),
];
const dateRadios = [...document.querySelectorAll(".date-radios input")];
const fromNumInputs = document.querySelectorAll("#from-number input");
const toNumInputs = document.querySelectorAll("#to-number input");
const fromNumError = document.querySelector(".from-error");
const toNumError = document.querySelector(".to-error");
const fromNumBoxes = document.querySelector("#from-number");
const toNumBoxes = document.querySelector("#to-number");
const extraOptionInputs = document.querySelectorAll(
  ".extra-option-container input"
);
const paymentInputs = document.querySelectorAll(".paymentWay-container input");
const mainForm = document.querySelector(".form");
const modalBackdrop = document.querySelector(".modal-backdrop");
const closeModalBtn = document.querySelector(".close");
const showReportBtn = document.querySelector("#showReport");
const paymentNotice = document.querySelector(
  ".paymentWay-container .notice-box"
);
const rangeTitle = document.querySelector(".range-type-title");
const salesBtn = document.getElementById("salesReport");
const aggregateBtn = document.getElementById("aggregatedReport");
const salesInfSection = document.getElementById("extraOptionContainer");
// Change date with (YYYY-MM-DD HH:mm:ss) to join without any extra characters.
function dateToNum(val) {
  return val.split(/[+-/*: ]+/).join("");
}
// Change style on click each elements and show the More information container when Sales one clicked.
function reportStateCheck() {
  if (salesBtn.checked == true) {
    salesInfSection.style.display = "flex";
    salesBtn.parentElement.classList.add("active");
    aggregateBtn.parentElement.classList.remove("active");
    // console.log("گزارش فروش");
  } else {
    salesInfSection.style.display = "none";
    aggregateBtn.parentElement.classList.add("active");
    salesBtn.parentElement.classList.remove("active");
    extraOptionInputs.forEach((extInput) => {
      extInput.checked = false;
      extInput.nextElementSibling.classList.remove("date-checked");
      extInput.parentElement.parentElement.classList.remove("info-box-checked");
    });
    // console.log("گزارش تجمیعی");
  }
}

// Change styles of report type boxes on click.
reportTypeRadios.forEach((typeRadio) => {
  typeRadio.addEventListener("click", () => {
    let disableInputs = [...document.querySelectorAll(".disable input")];
    let enableInputs = [...document.querySelectorAll(".range-type-body input")];
    for (let i = 0; i < reportTypeRadios.length; i++) {
      reportTypeRadios[i].nextElementSibling.classList.remove("radio-checked");
      reportTypeRadios[
        i
      ].parentElement.parentElement.parentElement.classList.remove(
        "range-type-checked"
      );
      reportTypeRadios[
        i
      ].parentElement.parentElement.nextElementSibling.classList.add("disable");

      enableInputs.forEach((f) => {
        f.disabled = true;
        if (f.type !== "radio") {
          f.value = "";
        }
        if (f.type === "text") {
          fromNumberVal.num = 1;
          toNumberVal.num = 2;
        }
        f.checked = false;
        f.nextElementSibling.classList.remove("date-checked");
      });
      if (reportTypeRadios[i].checked) {
        continue;
      }
    }
    typeRadio.nextElementSibling.classList.add("radio-checked");
    typeRadio.parentElement.parentElement.parentElement.classList.add(
      "range-type-checked"
    );
    typeRadio.parentElement.parentElement.nextElementSibling.classList.remove(
      "disable"
    );
    disableInputs.forEach((f) => {
      f.disabled = false;
    });
  });
});

// change styles of the Time&date-range-type input radios
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

// order type variables.
let fromNumberVal = {
  num: 1,
};
let toNumberVal = {
  num: 2,
};
const orderSinceVal = 87354;
// order-type inputs execute and error handling.
function orderInput(arrey, numError, joinVal, box) {
  let joinInputsVals;
  for (let i = 0; i < arrey.length; i++) {
    arrey[i].addEventListener("keydown", function (event) {
      if (event.key === "Backspace") {
        if (!arrey[i].value == "") {
          arrey[i].value = "";
        } else {
          arrey[i - 1].focus();
        }
      } else if (event.key === "ArrowLeft") {
        arrey[i - 1].focus();
      } else if (event.key === "ArrowRight") {
        arrey[i + 1].focus();
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
      joinInputsVals =
        `${arrey[0].value}` +
        `${arrey[1].value}` +
        `${arrey[2].value}` +
        `${arrey[3].value}` +
        `${arrey[4].value}`;

      joinVal.num = parseInt(joinInputsVals);
      if (joinInputsVals.length < 5) {
        numError.classList.add("show-error");
        numError.children[1].innerText = "شماره سفارش باید 5 رقمی باشد.";
        box.classList.add("error-style");
      } else if (joinInputsVals.length === 5 && joinVal.num < orderSinceVal) {
        numError.classList.add("show-error");
        box.classList.add("error-style");
        numError.children[1].innerText = "شماره سفارش معتبر نیست.";
      } else if (
        fromNumberVal.num > orderSinceVal &&
        toNumberVal.num > orderSinceVal &&
        fromNumberVal.num > toNumberVal.num
      ) {
        toNumError.classList.add("show-error");
        box.classList.add("error-style");
        toNumError.children[1].innerText = `شماره سفارش باید از  ${fromNumberVal.num}  بیشتر باشد.`;
      } else {
        numError.classList.remove("show-error");
        box.classList.remove("error-style");
      }
    });
  }
}

// Calling function to execute for From Order one and To Order
orderInput(fromNumInputs, fromNumError, fromNumberVal, fromNumBoxes);
orderInput(toNumInputs, toNumError, toNumberVal, toNumBoxes);

// validation of order-type inputs use in submit validation.
function orderErrorHandling(numVal, numError, box) {
  if (numVal.num < 10) {
    numError.classList.add("show-error");
    numError.children[1].innerText = "پر کردن این فیلد الزامی است.";
    box.classList.add("error-style");
  } else {
    numError.classList.remove("show-error");
    box.classList.remove("error-style");
  }
}
function dateErrorHandling(datePicker) {
  const error = datePicker.parentElement.nextElementSibling;
  if (!datePicker.value) {
    error.classList.add("show-error");
    error.children[1].innerText = "پر کردن این فیلد الزامی است.";
  } else {
    dateInputs(datePicker);
  }
}
// date type variables
let dateSinceVal = 14000803201023;
// validation of datepickers use in submit validation.
function dateInputs(datePicker) {
  if (datePicker.value.startsWith("20")) {
    dateSinceVal = 20211025201023;
  }
  const error = datePicker.parentElement.nextElementSibling;
  const val = dateToNum(datePicker.value);
  const dateInputsErrors = document.querySelectorAll(
    ".calendars-container .numinput-error"
  );
  if (datePicker.value !== "" && val > 10 && val < dateSinceVal) {
    console.log("yo cant");
    error.classList.add("show-error");
    error.children[1].innerText = "تاریخ معتبر نیست.";
  } else if (
    (datePickers[0].value.startsWith("20") &&
      datePickers[1].value.startsWith("14")) ||
    (datePickers[1].value.startsWith("20") &&
      datePickers[0].value.startsWith("14"))
  ) {
    error.classList.add("show-error");
    error.children[1].innerText = "فرمت تاریخ شروع و پایان برابر نیست.";
  } else if (
    dateToNum(datePickers[0].value) > dateSinceVal &&
    dateToNum(datePickers[1].value) > dateSinceVal &&
    dateToNum(datePickers[1].value) < dateToNum(datePickers[0].value)
  ) {
    dateInputsErrors[1].classList.add("show-error");
    dateInputsErrors[1].children[1].innerText = "از تاریخ شروع کوچک تر است.";
  } else {
    ("ok");
    error.classList.remove("show-error");
  }
}
// ---- When datepickers clicked, unchecked radio buttons.
datePickers.forEach((dp) => {
  dp.addEventListener("click", () => {
    dateRadios.forEach((dr) => {
      dr.checked = false;
      dr.nextElementSibling.classList.remove("date-checked");
    });
    dateInputs(datePickers[0]);
    dateInputs(datePickers[1]);
  });
});

//=-=-=-=-=-  form validation on submit -=-=-=-=-=//
showReportBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const scrollToTitle = function (title, x, y) {
    window.scrollTo(x, title.offsetTop - y);
  };
  const isDateRadio = dateRadios.some((radio) => radio.checked);
  const isOrders =
    fromNumberVal.num > orderSinceVal &&
    toNumberVal.num > orderSinceVal &&
    fromNumberVal.num < toNumberVal.num;

  const isDateInput =
    dateToNum(datePickers[0].value) > dateSinceVal &&
    dateToNum(datePickers[1].value) > dateSinceVal &&
    dateToNum(datePickers[1].value) > dateToNum(datePickers[0].value);

  const isRequiredCheckBox = [...paymentInputs].some(
    (checkBox) => checkBox.checked
  );

  const isRange = isOrders || isDateRadio || isDateInput;

  if (!isRange && reportTypeRadios[0].checked && !isDateRadio) {
    dateErrorHandling(datePickers[0]);
    dateErrorHandling(datePickers[1]);
    scrollToTitle(rangeTitle, 0, 50);
  } else if (!isRange && reportTypeRadios[1].checked) {
    orderErrorHandling(fromNumberVal, fromNumError, fromNumBoxes);
    orderErrorHandling(toNumberVal, toNumError, toNumBoxes);
    scrollToTitle(rangeTitle, 0, 50);
  }

  if (!isRequiredCheckBox) {
    paymentNotice.classList.add("box-error");
    scrollToTitle(paymentNotice, 0, 50);
  } else if (isRequiredCheckBox && isRange) {
    console.log("submitted");
    mainForm.submit();
  } else {
    console.log("has error");
  }
});
