// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const locationSite = document.querySelector(".location");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = searchInput.value;
  const url = `http://localhost:3000/weather?adress=${location}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
        return;
      }
      const { temperature, weather_descriptions } = data.forecast;
      const location = data.location;

      messageOne.textContent = weather_descriptions;
      messageTwo.textContent = `${temperature}°`;
      locationSite.textContent = location;
    });

  searchInput.value = "";
});

/// Git Repository
// git init - initializes the project
// git status - see files that waits to be commited (untracked files)
// to ignore files we create file .gitignore ant there we list files we want to ignore
// git add  - add files to stageing area that are going to be comitted. We can add single files or we can list directory to add ex: git add src/
// git add . add everything to the stageing area
// git commit -m "changes in code" - commit files and with -m "" we provide message that describe changes in commit
//
