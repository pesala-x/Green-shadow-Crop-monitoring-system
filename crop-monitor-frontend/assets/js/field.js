$(document).ready(function () {
  $("#crops").select2({
    placeholder: "Select crops",
    allowClear: true,
    closeOnSelect: false,
    width: "100%",
  });

  // Clear search input & refresh dropdown after each item is selected
  $("#crops").on("select2:select", function (e) {
    let $searchField =
      $(this).data("select2").dropdown.$search ||
      $(this).data("select2").selection.$search;
    $searchField.val("");
    $searchField.trigger("focus");
    $(this).select2("close");
    $(this).select2("open");
  });

  // Close dropdown when clicking outside
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest("#crops").length &&
      !$(e.target).closest(".select2-container").length
    ) {
      $("#crops").select2("close");
    }
  });
});
