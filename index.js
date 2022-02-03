// ***** Selectors ***** //
const datePickers = [...document.querySelectorAll(".date-input-box input")];
const infoBoxes = [...document.querySelectorAll(".info-box input")];
const reportTypeRadios = [...document.querySelectorAll(".report-type")];
const rangeTypeRadios = [
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
const showReportBtn = document.querySelector("#showReport");
const exportExcelBtn = document.querySelector("#exportExcel");
const paymentNotice = document.querySelector(
  ".paymentWay-container .notice-box"
);
const rangeTitle = document.querySelector(".range-type-title");
const salesBtn = document.getElementById("salesReport");
const aggregateBtn = document.getElementById("aggregatedReport");
const salesInfSection = document.getElementById("extraOptionContainer");
const allInputErrors = [...document.querySelectorAll(".input-error")];
const allOrderInputs = [
  ...document.querySelectorAll(".order-type .range-type-body input"),
];
const customRange = document.getElementById("customRange");
const makeReportBtn = document.querySelector(".make-report");

// Change date with (YYYY-MM-DD HH:mm:ss) format to convert to a number without any extra characters.
function dateToNum(val) {
  return val.split(/[+-/*: ]+/).join("");
}

// *** Change styles of report type buttons and display the salesInfSection when Sales one clicked */
reportTypeRadios.forEach(radio => radio.addEventListener("click", reportStateCheck))
function reportStateCheck() {
  if (salesBtn.checked == true) {
    // salesInfSection.style.display = "flex";
    salesBtn.parentElement.classList.add("active");
    aggregateBtn.parentElement.classList.remove("active");
    // console.log("گزارش فروش");
  } else {
    // salesInfSection.style.display = "none";
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

// *** Change styles of range type boxes on click */
rangeTypeRadios.forEach((typeRadio) => {
  typeRadio.addEventListener("click", () => {
    allInputErrors.forEach((error) => error.classList.remove("show-error")); // Hide all errors
    // Hide error styles
    fromNumBoxes.classList.remove("error-style");
    toNumBoxes.classList.remove("error-style");

    for (let i = 0; i < rangeTypeRadios.length; i++) {
      rangeTypeRadios[i].nextElementSibling.classList.remove("radio-checked");
      rangeTypeRadios[
        i
      ].parentElement.parentElement.parentElement.classList.remove(
        "range-type-checked"
      );
      rangeTypeRadios[
        i
      ].parentElement.parentElement.nextElementSibling.classList.add("disable");
      if (rangeTypeRadios[i].checked) {
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
  });
});

// *** Enable and disable inputs on switch between range types */
rangeTypeRadios[0].addEventListener("click", () => {
  // when orderDate of rangeType is checked.
  dateRadios.forEach((input) => {
    input.disabled = false;
    const yy = dateRadios.some((radio) => radio.checked);
    if (!yy) {
      dateRadios[0].checked = true;
      dateRadios[0].nextElementSibling.classList.add("date-checked");
    }
  });
  allOrderInputs.forEach((input) => {
    input.disabled = true;
    input.value = "";
  });
});
rangeTypeRadios[1].addEventListener("click", () => {
  // when orderID of rangeType is checked.
  datePickers.forEach((dp) => {
    dp.value = "";
    dp.disabled = true;
    dp.parentElement.classList.add("disable");
  });
  dateRadios.forEach((input) => {
    input.disabled = true;
    input.checked = false;
    input.nextElementSibling.classList.remove("date-checked");
  });
  allOrderInputs.forEach((input) => {
    input.disabled = false;
  });
});

// *** change styles and Disabling/Enabling of radio buttons of date range
dateRadios.forEach((dateRadio) => {
  dateRadio.addEventListener("click", () => {
    allInputErrors.forEach((error) => error.classList.remove("show-error")); // Hide all errors
    for (let i = 0; i < dateRadios.length; i++) {
      dateRadios[i].nextElementSibling.classList.remove("date-checked");
      if (dateRadios[i].id === "customRange" && dateRadios[i].checked) {
        datePickers.forEach((dp) => {
          dp.disabled = false;
          dp.parentElement.classList.remove("disable");
        });
        continue;
      }
      datePickers.forEach((dp) => {
        dp.value = "";
        dp.disabled = true;
        dp.parentElement.classList.add("disable");
      });
    }
    dateRadio.nextElementSibling.classList.add("date-checked");
  });
});

// *** change styles of checkboxes
infoBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.parentElement.parentElement.classList.toggle("info-box-checked");
    box.nextElementSibling.classList.toggle("date-checked");
  });
});

// **** validation of order id inputs *****//

let fromNumberVal = {
  num: 1,
};
let toNumberVal = {
  num: 2,
};
const orderSinceVal = 91326; // Minimum valid order id

// Function of order IDs inputs
orderInput(fromNumInputs, fromNumError, fromNumberVal, fromNumBoxes);
orderInput(toNumInputs, toNumError, toNumberVal, toNumBoxes);

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

      joinInputsVals =
        `${arrey[0].value}` +
        `${arrey[1].value}` +
        `${arrey[2].value}` +
        `${arrey[3].value}` +
        `${arrey[4].value}`;

      joinVal.num = parseInt(joinInputsVals);
      // Order IDs validations before form submission
      orderInputsValidation(joinVal, numError, box)
    });
  }
}


// Validation of order IDs
function orderInputsValidation(numVal, numError, box) {
  if (numVal.num.toString().length < 5) {
    numError.classList.add("show-error");
    numError.children[1].innerText = "شماره سفارش باید 5 رقمی باشد.";
    box.classList.add("error-style");
  } else if (numVal.num.toString().length === 5 && numVal.num < orderSinceVal) {
    numError.classList.add("show-error");
    box.classList.add("error-style");
    numError.children[1].innerText = "شماره سفارش باید حداقل 91326 باشد.";
  } else if (
    fromNumberVal.num >= orderSinceVal &&
    toNumberVal.num >= orderSinceVal &&
    fromNumberVal.num > toNumberVal.num
  ) {
    toNumError.classList.add("show-error");
    toNumBoxes.classList.add("error-style");
    toNumError.children[1].innerText = `باید از شماره شروع بیشتر باشد.`;
  } else {
    numError.classList.remove("show-error");
    box.classList.remove("error-style");
  }
}


// validation of order IDs inputs check on form submission
function orderErrorHandling(numVal, numError, box) {
  if (numVal.num < 10) {
    numError.classList.add("show-error");
    numError.children[1].innerText = "پر کردن این فیلد الزامی است.";
    box.classList.add("error-style");
  } else {
    orderInputsValidation(numVal, numError, box)
  }
}
// **** Validation of datepickers *****//

let dateSinceVal = 14001001000000; // Minimum valid date
function dateInputsValidation(datePicker) {
  if (datePicker.value.startsWith("20")) {
    dateSinceVal = 20211222000000;
  }
  const error = datePicker.parentElement.nextElementSibling;
  const val = dateToNum(datePicker.value);
  const dateInputsErrors = document.querySelectorAll(
    ".calendars-container .input-error"
  );
  if (datePicker.value !== "" && val > 10 && val < dateSinceVal) {
    error.classList.add("show-error");
    error.children[1].innerText =
      "تاریخ شروع باید حداقل 1400/10/1 یا 2021/12/22 باشد.";
  } else if (
    (datePickers[0].value.startsWith("20") &&
      datePickers[1].value.startsWith("14")) ||
    (datePickers[1].value.startsWith("20") &&
      datePickers[0].value.startsWith("14"))
  ) {
    error.classList.add("show-error");
    error.children[1].innerText = "فرمت تاریخ شروع و پایان برابر نیست.";
  } else if (
    dateToNum(datePickers[0].value) >= dateSinceVal &&
    dateToNum(datePickers[1].value) >= dateSinceVal &&
    dateToNum(datePickers[1].value) < dateToNum(datePickers[0].value)
  ) {
    dateInputsErrors[1].classList.add("show-error");
    dateInputsErrors[1].children[1].innerText = "از تاریخ شروع کوچک تر است.";
  } else {
    ("ok");
    error.classList.remove("show-error");
  }
}
// Datepickers validations before form submission
datePickers.forEach((dp) => {
  dp.addEventListener("click", () => {
    dateInputsValidation(datePickers[0]);
    dateInputsValidation(datePickers[1]);
  });
});

// validation of datepickers check on form submission
function dateErrorHandling(datePicker) {
  const error = datePicker.parentElement.nextElementSibling;
  if (!datePicker.value) {
    error.classList.add("show-error");
    error.children[1].innerText = "پر کردن این فیلد الزامی است.";
  } else {
    dateInputsValidation(datePicker);
  }
}
// ****** Form submission and validation *******//
let cachedSubmitBtn;
let request;

// Bind to the submit event of our form
$("form").submit(function (event) {
  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();
  // Scrolling to the errors
  const scrollToTitle = function (title, x, y) {
    window.scrollTo(x, title.offsetTop - y);
  };

  const isDateRadio =
    // Range is selected by radio buttons of date range ?
    dateRadios.some((radio) => radio.checked) &&
    !dateRadios[dateRadios.length - 1].checked;

  const isOrders =
    // Range is selected by order id ?
    fromNumberVal.num >= orderSinceVal &&
    toNumberVal.num >= orderSinceVal &&
    fromNumberVal.num <= toNumberVal.num;

  const isDateInput =
    // Range is selected by datepickers of date range  ?
    customRange.checked &&
    dateToNum(datePickers[0].value) >= dateSinceVal &&
    dateToNum(datePickers[1].value) >= dateSinceVal &&
    dateToNum(datePickers[1].value) >= dateToNum(datePickers[0].value);

  const isRequiredCheckBox = [...paymentInputs].some(
    (checkBox) => checkBox.checked
  );

  const isRange = isOrders || isDateRadio || isDateInput;
  if (!isRange && rangeTypeRadios[1].checked) {
    // Handle errors when orderId radio button is checked
    orderErrorHandling(fromNumberVal, fromNumError, fromNumBoxes);
    orderErrorHandling(toNumberVal, toNumError, toNumBoxes);
    scrollToTitle(rangeTitle, 0, 50);
  } else if (rangeTypeRadios[0].checked && !isDateRadio && !isDateInput) {
    // Handle errors
    // 1. when customRange radio button is checked
    // 2. when any range is not selected
    dateErrorHandling(datePickers[0]);
    dateErrorHandling(datePickers[1]);
    scrollToTitle(rangeTitle, 0, 50);
  }

  if (!isRequiredCheckBox) {
    // Handle error when paymentType checkboxes are not checked
    paymentNotice.classList.add("box-error");
    scrollToTitle(paymentNotice, 0, 50);
  } else if (isRequiredCheckBox && isRange) {
    // Abort any pending request
    if (request) {
      request.abort();
    }
    // setup some local variables
    var $form = $(this);
    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
      url: "/report/form.php",
      type: "post",
      data: serializedData,
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
      if (response === "null") {
        // Submission form based on cached submit button
        setTimeout(() => {
          mainForm.action = `${cachedSubmitBtn}.php`;
          mainForm.submit();
        }, 1);
      } else {
        // Show Modal when response is not null
        addGridJs(JSON.parse(response))
        showModal();
        makeReportBtn.addEventListener("click", () => {
          // Submission form based on cached submit button
          mainForm.action = `${cachedSubmitBtn}.php`;
          mainForm.submit();
        });
      }
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown) {
      // Log the error to the console
      console.error("The following error occurred: " + textStatus, errorThrown);
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    });
  }
});

// Show Modal function
function showModal() {
  document.querySelector(".res-modal").classList.add("show-modal");
  document.querySelector(".wrapper").classList.add("blur");
  document.querySelector(".modal-backdrop").style.display = "grid";
}
// Hide Modal onclick
document.querySelector(".cancel").addEventListener("click", () => {
  document.querySelector(".res-modal").classList.remove("show-modal");
  document.querySelector(".modal-backdrop").style.display = "none";
  document.querySelector(".wrapper").classList.remove("blur");

});
// Make Grid function
function addGridJs(res) {
  // res-data division must be empty to make or remake grid js
  document.getElementById("res-data").innerHTML = "";

  const cellFormatter = (cell) => cell > 0 ? ` ${cell.toLocaleString().replace(/\.0+$/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان` : "ندارد";

  new gridjs.Grid({
    columns: [
      { id: "id_order", name: "شماره سفارش" },
      {
        id: "sum_of_products_price",
        name: "جمع ریز فاکتور",
        formatter: cellFormatter,
      },
      {
        id: "total_price_of_products",
        name: "جمع کل محصولات",
        formatter: cellFormatter,
      },
      { id: "date_add", name: "شماره سفارش" },
    ],

    data: res,

    pagination: {
      enabled: true,
      limit: 5,
      summary: true,
    },
    sort: true,
    language: {
      sort: {
        sortAsc: "مرتب سازی بصورت صعودی",
        sortDesc: "مرتب سازی بصورت نزولی",
      },
      pagination: {
        previous: "قبلی",
        next: "بعدی",
        navigate: (page, pages) => `صفحه ${page} از ${pages}`,
        page: (page) => `صفحه ${page}`,
        showing: "نمایش",
        of: "از",
        to: "تا",
        results: () => "نتیجه",
      },
    },
  }).render(document.getElementById("res-data"));
}
// Chache the clicked btn for form submission
document
  .querySelector(".submit-btns-container")
  .addEventListener("click", (e) => cachedSubmitBtn = e.target.name);
