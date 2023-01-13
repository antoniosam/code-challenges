(function () {
  const myModal = new Modal({ el: document.getElementById("rules-modal") });
  const button = document.getElementById("btnRules");
  button.addEventListener("click", function (e) {
    myModal.show();
  });
  function getRandom() {
    return Math.floor(Math.random() * 3) + 1;
  }
  function match(selection) {
    const computer = getRandom();
    renderUser(selection);
    renderPc(computer);
    const result = evaluate(selection, computer);
    if (result == 0) {
      writeLegend("Empate");
    }
    if (result == 1) {
      saveLocalCount(getLocalCount() + 1);
      writeLegend("Ganaste");
      addGradient("selection_user");
    }
    if (result == -1) {
      saveLocalCount(getLocalCount() - 1);
      writeLegend("Perdiste");
      addGradient("selection_pc");
    }
    updateCount();
    showResult();
  }
  function renderUser(option) {
    const div = document.getElementById("selection_user");
    renderSelection(div, option);
  }
  function renderPc(option) {
    const div = document.getElementById("selection_pc");
    renderSelection(div, option);
  }
  function renderSelection(div, option) {
    if (option == 1) {
      div.classList.add("paper");
    }
    if (option == 2) {
      div.classList.add("rock");
    }
    if (option == 3) {
      div.classList.add("scissors");
    }
  }
  function writeLegend(text) {
    const div = document.getElementsByClassName("legend");
    div.item(0).innerHTML = text;
    div.item(1).innerHTML = text;
  }
  function getLocalCount() {
    const text = localStorage.getItem("game_count");
    return text ? Number(text) : 0;
  }
  function saveLocalCount(point) {
    localStorage.setItem("game_count", point);
  }
  function updateCount() {
    const label = document.getElementById("score");
    label.innerHTML = getLocalCount();
  }
  function showResult() {
    const selection = document.getElementsByClassName("selection");
    const versus = document.getElementsByClassName("versus");
    const versusInfo = document.getElementsByClassName("versus_info");
    selection.item(0).classList.add("result");
    versus.item(0).classList.add("result");
    versusInfo.item(0).classList.add("result");
    versusInfo.item(1).classList.add("result");
  }
  function replay() {
    const selection = document.getElementsByClassName("selection");
    const versus = document.getElementsByClassName("versus");
    const versusInfo = document.getElementsByClassName("versus_info");
    selection.item(0).classList.remove("result");
    versus.item(0).classList.remove("result");
    versusInfo.item(0).classList.remove("result");
    versusInfo.item(1).classList.remove("result");
    const versusItems = document.getElementsByClassName("icon");
    versusItems.item(0).classList.remove("paper", "rock", "scissors");
    versusItems.item(1).classList.remove("paper", "rock", "scissors");
    const label = document.getElementById("selection_user");
    label.classList.remove("win");
    const label2 = document.getElementById("selection_pc");
    label2.classList.remove("win");
  }
  function evaluate(player, computer) {
    if (player == computer) {
      return 0;
    } else if (player == 1) {
      return computer == 2 ? 1 : -1;
    } else if (player == 2) {
      return computer == 3 ? 1 : -1;
    } else if (player == 3) {
      return computer == 1 ? 1 : -1;
    }
  }
  function addGradient(id) {
    const label = document.getElementById(id);
    label.classList.add("win");
  }
  const button1 = document.getElementById("selection_paper");
  const button2 = document.getElementById("selection_rock");
  const button3 = document.getElementById("selection_scissors");
  const button4 = document.getElementsByClassName("btnRepeat");
  button1.addEventListener("click", (e) => match(1));
  button2.addEventListener("click", (e) => match(2));
  button3.addEventListener("click", (e) => match(3));
  button4.item(0).addEventListener("click", (e) => replay());
  button4.item(1).addEventListener("click", (e) => replay());
  updateCount();
})();
