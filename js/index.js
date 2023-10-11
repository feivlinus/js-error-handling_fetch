console.clear();

const userElement = document.querySelector(".user");
const errorDisplay = document.querySelector(".error");

async function loadUser(url) {
  errorDisplay.textContent = "";
  const response = await fetch(url);
  if (!response.ok) {
    errorDisplay.textContent = "Network error";
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  try {
    const json = await response.json();
    const user = await json.data;
    userElement.innerHTML = `
    <h2>${user.first_name} ${user.last_name}</h2>
    <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}"/>
    `;
  } catch (error) {
    errorDisplay.textContent = "Parsing Error";
    throw new Error(`Ups there was something wrong with the data...`);
  }
}
//Added .catch(e) accordingly to Fetch API example
document
  .querySelectorAll("button[data-url]")
  .forEach((button) =>
    button.addEventListener("click", (event) =>
      loadUser(event.target.dataset.url).catch((e) => console.log(e))
    )
  );
