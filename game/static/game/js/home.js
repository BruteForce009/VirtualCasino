export let usernameVal = "abc";

window.onload = () => {
    const elementsToHide = document.querySelectorAll(".helptext, ul");
    elementsToHide.forEach((element) => {
      element.style.display = "none";
    });

    document.getElementById("id_password1").value = "default";
    document.getElementById("id_password2").value = "default";

    let allPElements = document.querySelectorAll("p");
    for (let i = 1; i < allPElements.length; i++) {
      allPElements[i].style.display = "none";
    }
};

let playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", function() {
    let playBtn = document.getElementById("id_username");
    usernameVal = playBtn.value;
    console.log(usernameVal);
});
