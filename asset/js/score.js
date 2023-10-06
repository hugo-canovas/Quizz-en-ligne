const url = new URL(window.location.href);
const score = url.searchParams.get("score");

const affichageScore = document.getElementById('score')
affichageScore.innerHTML = score
