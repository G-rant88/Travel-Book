$(document).ready(function() {

  $.ajax("/login", {
    type: "GET"
  }).then(
    function(data) {

      var cook = Cookies.get('name');

      console.log(cook);

      for (var i = 0; i < data.datas.length; i++) {

        if (data.datas[i].username === cook) {

          var userid = data.datas[i].id;
          // location.assign("/home/" + userid);
          location.assign("/");

        }
      }
    });
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

  console.log(username);
  console.log(password);


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
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        if (data[i].username === info.users && data[i].password === info.pws && flag === false) {
          flag = true;
          var userid = data[i].id
            // location.assign("/home/" + userid);
          location.assign("/");
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

  console.log(username);
  console.log(password);
  // $.ajax("/login", {
  //      type: "GET"
  //    }).then(
  //      function(data) {

  //        // console.log(data);

  //        for (var i = 0; i < data.datas.length; i++) {

  //      if (data.datas[i].username === username) {
  //        console.log(data.datas[i].username);
  //        // console.log(username);

  //   $("#print").html("Username is taken");
  //   $("#print").css("color", "red");
  //   return false;

  //      }
  //      }

  var info = {
    users: username,
    pws: password
  }

  console.log(info);

  $.ajax("/signup", {
    type: "POST",
    data: info
  }).then(
    function() {

      $("#modal1").modal();
      $("#modal1").modal('open');
    }
  );
});
// });