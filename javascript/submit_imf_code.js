const getCookie = (cname) => {
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
  window.location.href = "/login.html";
};
let token = getCookie("token");
let user = getCookie("user");

const submit_imf_code = async (user_form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalbnk-biz-backend.glitch.me/api/user/submit_imf_code",
      // "http://localhost:3000/api/user/submit_imf_code",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user_form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      // alert(result.errMessage);
      document.querySelector("#submit").innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
    } else {
      document.querySelector("#submit").innerHTML = "Success";
      document.querySelector(".errMessage").innerHTML = "";
      window.location.replace("/tax-code.html");
    }
  } catch (err) {
    console.log(err);
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  //  alert("clicked")
  let imf_code = document.querySelector("#imf_code");
  if (!imf_code.value)
    return (document.querySelector("#imf_code").style.border = "2px solid red");

  submit_imf_code({
    token,
    user,
    imf_code: imf_code.value,
  });
};
document.querySelectorAll("input").forEach(
  (input) =>
    (input.onchange = () => {
      input.style.border = "2px solid #fff";
      //   document.querySelector("#pwd_error").innerHTML = "";
      //   document.querySelector("#pin_error").innerHTML = "";
      //   document.querySelector("#b_m_n").innerHTML = "";
      document.querySelector(".errMessage").innerHTML = "";
    }),
);
