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
    orderRadio.nextElementSibling.classList.remove("radio-checked");
  }
}
const dateRadios = [...document.querySelectorAll(".date-radios input")];
console.log(dateRadios);

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
