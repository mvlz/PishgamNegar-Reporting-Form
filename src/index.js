function myFunction() {
  const checkBox = document.getElementById("myCheck");
  const checkBoxx = document.getElementById("myyCheck");
  const salesInfSection = document.getElementById("sales-more-inf");
  if (checkBox.checked == true) {
    salesInfSection.style.display = "flex";
    checkBox.parentElement.classList.add("active");
    checkBoxx.parentElement.classList.remove("active");
    console.log("گزارش فروش");
  } else {
    salesInfSection.style.display = "none";
    console.log("گزارش تجمیعی");
    checkBoxx.parentElement.classList.add("active");
    checkBox.parentElement.classList.remove("active");
  }
}

function checkedReportType() {
  const orderRadio = document.getElementById("order");
  const dateRadio = document.getElementById("date");
  console.log(orderRadio.parentElement.parentElement.parentElement);
  if (orderRadio.checked == true) {
    orderRadio.nextElementSibling.classList.add("radio-checked");
    orderRadio.parentElement.parentElement.parentElement.classList.add(
      "report-type-checked"
    );
    dateRadio.parentElement.parentElement.parentElement.classList.remove(
      "report-type-checked"
    );
    dateRadio.parentElement.parentElement.nextElementSibling.classList.add(
      "disable"
    );
    orderRadio.parentElement.parentElement.nextElementSibling.classList.remove(
      "disable"
    );
    dateRadio.nextElementSibling.classList.remove("radio-checked");
    console.log("order");
  } else {
    console.log("date");
    dateRadio.nextElementSibling.classList.add("radio-checked");
    dateRadio.parentElement.parentElement.parentElement.classList.add(
      "report-type-checked"
    );
    orderRadio.parentElement.parentElement.parentElement.classList.remove(
      "report-type-checked"
    );
    orderRadio.parentElement.parentElement.nextElementSibling.classList.add(
      "disable"
    );
    dateRadio.parentElement.parentElement.nextElementSibling.classList.remove(
      "disable"
    );
    orderRadio.nextElementSibling.classList.remove("radio-checked");
  }
}
const dateRadios = [...document.querySelectorAll(".date-radios input")];
// console.log(dateRadios);

dateRadios.forEach((dateRadio) => {
  dateRadio.addEventListener("click", () => {
    for (let i = 0; i < dateRadios.length; i++) {
      // const element = array[i];
      dateRadios[i].nextElementSibling.classList.remove("date-checked");
      if (dateRadios[i].checked) {
        continue;
      }
    }
    dateRadio.nextElementSibling.classList.add("date-checked");
  });
});

const infoBoxes = [...document.querySelectorAll(".info-box input")];
// console.log(infoBoxes);
infoBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    // if (box.checked) {
    //   console.log(box);
    // }
    console.log(box.nextElementSibling);
    box.parentElement.parentElement.classList.toggle("info-box-checked");
    box.nextElementSibling.classList.toggle("date-checked");
  });
});
function checkInfBoxes() {}

document.addEventListener("DOMContentLoaded", function (event) {
  const fromInputs = document.querySelectorAll("#from-number input");
  const toInputs = document.querySelectorAll("#to-number input");
  function OTPInput(arrey) {
    for (let i = 0; i < arrey.length; i++) {
      arrey[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          arrey[i].value = "";
          if (i !== 0) arrey[i - 1].focus();
        } else {
          if (i === arrey.length - 1 && arrey[i].value !== "") {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            arrey[i].value = event.key;
            if (i !== arrey.length - 1) arrey[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 47 && event.keyCode < 106) {
            arrey[i].value = event.key;
            if (i !== arrey.length - 1) arrey[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 94 && event.keyCode < 91) {
            arrey[i].value = String.fromCharCode(event.keyCode);
            if (i !== arrey.length - 1) arrey[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  }
  OTPInput(fromInputs);
  OTPInput(toInputs);
});
// window.addEventListener("beforeunload", (event) => {
//   event.preventDefault();
//   event.returnValue = "";
// });
const toolBoxes = document.querySelectorAll(".datepicker-container .toolbox");

// const cancelBtn = document.createElement("button");
console.log(toolBoxes);
// // cancelBtn.classList.add("")
// cancelBtn.innerHTML = "لغو";
// toolBoxes.appendChild(cancelBtn);
