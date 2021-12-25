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

// Change style on click each elements and show the More information container when Sales one clicked.
function reportStateCheck() {
  const salesBtn = document.getElementById("salesReport");
  const aggregateBtn = document.getElementById("aggregatedReport");
  const salesInfSection = document.getElementById("extraOptionContainer");
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
      console.log(extInput.checked);
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

// Order type of report logic
let fromNumberVal = {
  num: 1,
};
let toNumberVal = {
  num: 2,
};
// order type number input execute and error handling function
function orderInput(arrey, numError, joinVal, box) {
  let x;
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
        numError.children[1].innerText = "شماره سفارش باید 5 رقمی باشد.";
        box.classList.add("error-style");
      } else if (x.length === 5 && joinVal.num < 87354) {
        numError.classList.add("show-error");
        box.classList.add("error-style");
        numError.children[1].innerText = "شماره سفارش معتبر نیست.";
      } else if (
        fromNumberVal.num > 87354 &&
        toNumberVal.num > 87354 &&
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
// Calling function to execute for From Order one and To Order One
orderInput(fromNumInputs, fromNumError, fromNumberVal, fromNumBoxes);
orderInput(toNumInputs, toNumError, toNumberVal, toNumBoxes);

const fromDay = {
  digit: 1,
};
const toDay = {
  digit: 1,
};
const sinceVal = 14000803201023;
function dateErrorHandling(dateVal, datePicker) {
  const error = datePicker.parentElement.nextElementSibling;
  const val = datePicker.value.split(/[+-/*: ]+/).join("");
  dateVal.digit = val;
  if (datePicker.value === "") {
    error.classList.add("show-error");
    error.children[1].innerText = "پر کردن فیلد الزامی است.";
  } else if (dateVal.digit < sinceVal) {
    console.log("yo cant");
    error.classList.add("show-error");
    error.children[1].innerText = "این تاریخ معتبر نیست.";
  } else if (
    toDay.digit > sinceVal &&
    fromDay.digit > sinceVal &&
    toDay.digit < fromDay.digit
  ) {
    error.classList.add("show-error");
    error.children[1].innerText = "از تاریخ شروع کوچک تر است.";
  } else {
    ("ok");
    error.classList.remove("show-error");
  }
  console.log(dateVal.digit);
}

datePickers.forEach((dp) => {
  dp.addEventListener("click", () => {
    dateRadios.forEach((dr) => {
      dr.checked = false;
      dr.nextElementSibling.classList.remove("date-checked");
    });
    dateErrorHandling(fromDay, datePickers[0]);
    dateErrorHandling(toDay, datePickers[1]);
  });
});

const showReportBtn = document.querySelector("#showReport");
// console.log(showReportBtn);
showReportBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const x = dateRadios.some((radio) => radio.checked); // true by default
  const xx = datePickers.every((dp) => dp.value !== ""); // false by default
  const w =
    fromNumberVal.num > 87354 &&
    toNumberVal.num > 87354 &&
    fromNumberVal.num < toNumberVal.num;
  if (x || xx) {
    console.log("ok");
  } else if (x) {
    console.log("sefaresh okeye");
  } else {
    console.log("choose date or sefaresh");
    const ele = document.querySelector(".range-type-title");
    ele.classList.add("box-error");
    window.scrollTo(0, ele.offsetTop - 50);
  }
  const z = [...paymentInputs].some((checkBox) => checkBox.checked);
  const noticePay = document.querySelector(".paymentWay-container .notice-box");

  if (!z) {
    // console.log("false");
    noticePay.classList.add("box-error");
    window.scrollTo(0, noticePay.offsetTop - 50);
  }

  if (z && (w || x || xx)) {
    console.log("submitted");
    mainForm.submit();
  } else {
    console.log("has error");
  }
});

const modalBackdrop = document.querySelector(".modal-backdrop");
const closeModalBtn = document.querySelector(".close");
closeModalBtn.addEventListener("click", () => {
  modalBackdrop.classList.remove("show-Modal");
});
new gridjs.Grid({
  columns: ["Name", "Email", "Phone Number"],
  data: [
    ["John", "john@example.com", "(353) 01 222 3333"],
    ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
    ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
    ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
    ["Afshin", "afshin@mail.com", "(353) 22 87 8356"],
  ],
}).render(document.getElementById("showReportModal"));
