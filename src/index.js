let reportBtnContainer = document.querySelector(".report-button-container");

let btnTogglers = reportBtnContainer.querySelectorAll(".report-input");

console.log(btnTogglers);

// btnTogglers.forEach((btn) => {
//   btn.addEventListener("click", function (e) {
//     e.preventDefault();

//     let tabName = btn.dataset.button;
//     console.log(tabName);
//     let formContents = document.querySelector(".form-contents");

//     for (let i = 0; i < formContents.children.length; i++) {
//       btnTogglers[i].classList.remove("active");
//       // formContents.children[i].classList.remove("hidden");

//       // if (formContents.children[i].id === tabName) {
//       //   continue;
//       // }
//       // formContents.children[i].classList.add("hidden");
//       console.log(btnTogglers[i]);
//     }
//     e.target.classList.add("active");
//   });
// });

function myFunction() {
  var checkBox = document.getElementById("myCheck");
  var checkBoxx = document.getElementById("myyCheck");
  var text = document.getElementById("text");
  if (checkBox.checked == true) {
    text.style.display = "block";
    checkBox.parentElement.classList.add("active");
    checkBoxx.parentElement.classList.remove("active");
    console.log("گزارش فروش");
  } else {
    text.style.display = "none";
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
