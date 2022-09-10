// main vars
const $ = (ele) => document.querySelector(ele);

let username = $(".get__repos input"),
  getBtn = $(".get-btn"),
  dataContent = $(".show__repos");

getBtn.addEventListener("click", getRepos);

// Fns
// https://api.github.com/users/${name}/repos
function getRepos() {
  if (!username.value) {
    dataContent.innerHTML = "<span>Please Enter Valod Username</span>";
  } else {
    dataContent.innerHTML = "";
    let api = get(`https://api.github.com/users/${username.value}/repos`);
    api.then((data) => {
      data.forEach((repo) => {
        let content = document.createElement("div");
        repoName = document.createTextNode(repo.name);
        content.append(repoName);

        let repoUrl = document.createElement("a");
        repoUrlText = document.createTextNode("Visit ");
        repoUrl.append(repoUrlText);
        repoUrl.setAttribute(
          "href",
          `https://github.com/${username.value}/${repo.name}`
        );
        repoUrl.target = "_blank";

        content.append(repoUrl);

        let stars = document.createElement("span");
        let starsCount = document.createTextNode(
          ` Stars: ${repo.stargazers_count}`
        );
        stars.append(starsCount);

        content.appendChild(stars);

        content.className = "repo__box";
        dataContent.append(content);
      });
    });
  }
}

function get(url) {
  return fetch(url).then((res) => res.json());
}
