$(document).ready(function () {
  $("#showSignUp").on("click", function () {
    $(".form-card").addClass("sign-up-mode");
  });

  $("#showSignIn").on("click", function () {
    $(".form-card").removeClass("sign-up-mode");
  });
});
