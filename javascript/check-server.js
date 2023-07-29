(async () => {
  try {
    const response = await fetch(
      "https://zionintercontinentalbnk-biz-backend.glitch.me",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "server is up and running" }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      console.log(result.errMessage);
    } else {
      console.log(result.message);
    }
  } catch (error) {
    console.log(error.message);
  }
})();
