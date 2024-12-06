$(document).ready(function () {
  $("#showSignUp").on("click", function () {
    $(".form-card").addClass("sign-up-mode");
  });

  $("#showSignIn").on("click", function () {
    $(".form-card").removeClass("sign-up-mode");
  });
});

$("#signInForm").on("submit", function (e) {
  e.preventDefault();

  const email = $("#signInEmail").val();
  const password = $("#signInPassword").val();

  $.ajax({
    url: "http://localhost:5050/crop-monitor/api/v0/auth/signin",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email, password }),
    success: function (response) {
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userRole", response.role);

      window.location.href = "pages/sidebar.html";
    },
    error: function (xhr) {
      alert("Login failed: " + xhr.responseText);
    },
  });
});

$(document).ready(function () {
  $("#signUpForm").on("submit", function (e) {
    e.preventDefault();

    const email = $("#signUpEmail").val().trim();
    const password = $("#signUpPassword").val().trim();
    const role = $("select").val();

    if (!email) {
      showValidationError("Missing Email", "Email field cannot be empty.");
      return;
    }

    if (!password) {
      showValidationError(
        "Missing Password",
        "Password field cannot be empty."
      );
      return;
    }

    if (!role) {
      showValidationError("Missing Role", "Please select a role.");
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      showValidationError(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 6) {
      showValidationError(
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    const signUpData = {
      email: email,
      password: password,
      role: role.toUpperCase(),
    };

    // AJAX request to sign up
    $.ajax({
      url: "http://localhost:5050/crop-monitor/api/v0/auth/signup",
      method: "POST",
      data: JSON.stringify(signUpData),
    contentType: "application/json",
    contentType: "application/json",
    data: JSON.stringify({ email, password, role }),
      contentType: "application/json",
    data: JSON.stringify({ email, password, role }),
      success: function (response) {
        console.log("Sign-Up Successful:", response);
        showPopup(
          "success",
          "Sign-Up Successful",
          "Your account has been created successfully.",
          function () {
            window.location.href = "/index.html";
          }
        );
      },
      error: function (xhr) {
        console.error("Sign-Up Error:", xhr.responseText);

        let errorMessage = "Sign-Up Failed!, Email already exists!";
        if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMessage = xhr.responseJSON.message;
        }

        showValidationError("Error", errorMessage);
      },
    });
  });

  function showValidationError(title, text) {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }

  // Success popup
  function showPopup(type, title, text, confirmCallback = null) {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      showCancelButton: !!confirmCallback,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && confirmCallback) {
        confirmCallback();
      }
    });
  }
});
