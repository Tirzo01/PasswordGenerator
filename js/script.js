const $ = (element) => {
  return document.getElementById(element);
};

const pwdEl = $("password");
const generate_btnEl = $("generate_btn");
const copy_btnEl = $("copy_btn");
const copy_spanEl = $("copy_span");
const range_barEl = $("range_bar");

const length_valueEl = $("ch_length_value");

generate_btnEl.addEventListener("click", (e) => {
  const props = {
    pwd_length: length_valueEl.textContent,
    iuc: $("iuc").checked,
    ilc: $("ilc").checked,
    in: $("in").checked,
    is: $("is").checked,
  };
  pwdEl.value = generateNewPassword(props);
  updateStrengthCards(props);
});

const generateNewPassword = (props) => {
  let pwd = "";
  const lowerAlphabet = "qwertyuiopasdfghjklzxcvbnm";
  const upperAlphabet = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const numbersAlphabet = "1234567890";
  const symbolAlphabet = `|!"£$%&/()=?^*é°§ç_:;+-*'[]{}#.,ùàò`;
  let Alphabet = "";
  if (props.iuc) Alphabet = Alphabet.concat(upperAlphabet);
  if (props.ilc) Alphabet = Alphabet.concat(lowerAlphabet);
  if (props.in) Alphabet = Alphabet.concat(numbersAlphabet);
  if (props.is) Alphabet = Alphabet.concat(symbolAlphabet);

  for (let i = 0; i < props.pwd_length; i++) {
    pwd = pwd.concat(random(Alphabet));
  }
  return pwd;
};

const random = (string) => {
  if (string.length == 0) string = "qwertyuiopasdfghjklzxcvbnm";
  let min = 0;
  let max = string.length;
  return string[Math.floor(Math.random() * (max - min)) + min];
};

let controller = true;
copy_btnEl.addEventListener("click", (e) => {
  navigator.clipboard.writeText(pwdEl.value);
  if (controller) {
    copy_spanEl.style.visibility = "visible";
    copy_spanEl.style.opacity = "1";
    controller = false;
    setTimeout(() => {
      copy_spanEl.style.opacity = "0";
    }, 2000);
    setTimeout(() => {
      copy_spanEl.style.visibility = "hidden";
      controller = true;
    }, 3000);
  }
});

range_barEl.addEventListener("input", (e) => {
  $("ch_length_value").textContent = range_barEl.value;
  var value =
    ((range_barEl.value - range_barEl.min) /
      (range_barEl.max - range_barEl.min)) *
    100;
  range_barEl.style.background =
    "linear-gradient(to right, rgb(164, 255, 175) 0%, rgb(164, 255, 175) " +
    value +
    "%, rgb(19, 18, 24) " +
    value +
    "%, rgb(19, 18, 24) 100%)";
});

const updateStrengthCards = (props) => {
  let strength = 0;
  if (props.pwd_length == 0) return;
  for (item in props) {
    if (item == "ilc" || item == "pwd_length") continue;
    if (props[item] == true) strength++;
  }
  if (props.pwd_length > 15) strength++;
  if (props.pwd_length > 25) strength++;
  let cards = document.getElementsByClassName("strength_card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style = "background-color: none";
  }
  if (strength == 0 || strength == 1) {
    cards[0].style =
      "border-color: rgb(245, 62, 62); background-color: rgb(245, 62, 62)";
  }
  if (strength == 2) {
    cards[0].style =
      "border-color: rgb(251, 203, 105); background-color: rgb(251, 203, 105);";
    cards[1].style =
      "border-color: rgb(251, 203, 105); background-color: rgb(251, 203, 105);";
  }
  if (strength == 3) {
    cards[0].style =
      "border-color: rgb(229, 251, 105); background-color: rgb(229, 251, 105);";
    cards[1].style =
      "border-color: rgb(229, 251, 105); background-color: rgb(229, 251, 105);";
    cards[2].style =
      "border-color: rgb(229, 251, 105); background-color: rgb(229, 251, 105);";
  }
  if (strength >= 4) {
    cards[0].style =
      "border-color: rgb(117, 251, 105); background-color: rgb(117, 251, 105)";
    cards[1].style =
      "border-color: rgb(117, 251, 105); background-color: rgb(117, 251, 105)";
    cards[2].style =
      "border-color: rgb(117, 251, 105); background-color: rgb(117, 251, 105)";
    cards[3].style =
      "border-color: rgb(117, 251, 105); background-color: rgb(117, 251, 105)";
  }
};
