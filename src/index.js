let reportBtnContainer = document.querySelector(".report-button-container");

let btnTogglers = reportBtnContainer.querySelectorAll(".report-btn");

console.log(btnTogglers);

btnTogglers.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    let tabName = btn.dataset.button;
    console.log(tabName);
    let formContents = document.querySelector(".form-contents");

    for (let i = 0; i < formContents.children.length; i++) {
      btnTogglers[i].classList.remove("active");
      formContents.children[i].classList.remove("hidden");

      if (formContents.children[i].id === tabName) {
        continue;
      }
      formContents.children[i].classList.add("hidden");
      console.log(btnTogglers[i]);
    }
    e.target.classList.add("active");
  });
});
