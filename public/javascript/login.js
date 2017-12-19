$(".login").on("click", function(event) {

  $("#modal1").modal();
  $("#modal1").modal('open');

});

$("#logs").on("click", function(event) {

  var namey = $("#name").val();
  var pwy = $("#pw").val();

  if (namey === "" || pwy === "") {

    $("#print").html("Username and Password are required");
    $("#print").css("color", "red");
    return false;
  }

  var username = $("#name").val().trim();
  var password = $("#pw").val().trim();

  Cookies.set('name', username);

  var info = {
    users: username,
    pws: password
  }
  $.ajax("/login", {
    type: "GET",
    data: info
  }).then(

    function(data) {
      var flag = false;

      for (var i = 0; i < data.length; i++) {
        if (data[i].username === info.users && data[i].password === info.pws && flag === false) {
          flag = true;
          var userid = data[i].id

          var infos = {

            info: userid
          }


          $.ajax("/loggedin", {
            type: "PUT",
            data: infos
          }).then(function(data) {

            var cook = Cookies.set('name');

            $("#modal1").modal('close');
            location.reload();
          });
        }
      }

      if (flag === false) {
        $("#print").html("Wrong Username/Password");
        $("#print").css("color", "red");
      }
    }
  );
});

$("#sign").on("click", function(event) {

  var namey = $("#name").val();
  var pwy = $("#pw").val();

  if (namey === "" || pwy === "") {

    $("#print").html("Username and Password are required");
    $("#print").css("color", "red");
    return false;
  }

  var username = $("#name").val().trim();
  var password = $("#pw").val().trim();

  $.ajax("/login", {
    type: "GET"
  }).then(
    function(data) {

      for (var i = 0; i < data.length; i++) {

        if (data[i].username === username) {

          $("#print").html("Username is taken");
          $("#print").css("color", "red");
          return false;

        }
      }

      var info = {
        users: username,
        pws: password
      }

      $.ajax("/signup", {
        type: "POST",
        data: info
      }).then(
        function() {
          $("#print").html("Thanks for creating an account!<br>Please Login with your username and password.");

        }
      );
    });
});