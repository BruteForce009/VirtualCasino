function rulesRedirect() {
    window.location.href = "{%url 'game-play'%}";
}

function moveBar(val) {
    let pBar = document.querySelector(".progress");
    var barInterval = setInterval(updateBar, 50, pBar);
    function updateBar(progressBar) {
        if(val==99) {
            clearInterval(barInterval);
            let newPath = "/play/";
            let newScore = window.location.protocol + '//' + window.location.host + newPath;
            window.location.href = newScore;
        }
        val++;
        val = Math.round(val);
        progressBar.querySelector(".progress__fill").style.width = `${val}%`
        progressBar.querySelector(".progress__text").textContent = `${val}%`
    }
}

window.onload = () => setTimeout( function() {
    let val=0;
    moveBar(val);
}, 1000);
