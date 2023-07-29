function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.replace("/admin");
}

const setAdmin = async (data) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";

  try {
    const response = await fetch(
      "https://zionintercontinentalbnk-biz-backend.glitch.me/api/admin/set",
      // "http://localhost:3000/api/admin/set",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try Again";
      return;
    }

    document.querySelector("#submit").innerHTML = "Success";
    window.location.replace("/admin/dashboard.html");
  } catch (error) {
    document.querySelector("#submit").innerHTML = "Try Again";
    document.querySelector("#errMessage").innerHTML = error.message;
  }
};

document.querySelector("#submit").onclick = () => {
  const username = document.querySelector("#username");
  const password0 = document.querySelector("#password0");
  const password1 = document.querySelector("#password1");

  if (!username.value) return (username.style.border = "2px solid red");
  if (username.value.length < 6) {
    username.style.border = "2px solid red";
    document.querySelector("#errMessage").innerHTML =
      "UserName must be atleast six characters long";
    return;
  }

  if (!password0.value) return (password0.style.border = "2px solid red");

  if (password0.value.length < 8) {
    password0.style.border = "2px solid red";
    document.querySelector("#errMessage").innerHTML =
      "Password must be atleast 8 characters long";
    return;
  }

  if (!password1.value) return (password1.style.border = "2px solid red");

  if (password0.value != password1.value) {
    password1.style.border = "2px solid red";
    document.querySelector("#errMessage").innerHTML = "Password must match!";
    return;
  }

  setAdmin({
    admin: getCookie("admin"),
    token: getCookie("admin_token"),
    username: username.value,
    password: password0.value,
  });
};

document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => {
    document.querySelector("#errMessage").innerHTML = "";
    // input.style.border="2px solid gray"
    document
      .querySelectorAll("input")
      .forEach((input) => (input.style.border = "2px solid gray"));
  };
});
