// Initialize Firebase
var config = {
  apiKey: "AIzaSyCO0SVX11y1TJ7TLZoCJhMEgKnLTE3MZYw",
  authDomain: "data-management-rut.firebaseapp.com",
  databaseURL: "https://data-management-rut.firebaseio.com",
  projectId: "data-management-rut",
  storageBucket: "data-management-rut.appspot.com",
  messagingSenderId: "825932167890"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-employee").on("click", function(){
  event.preventDefault();

  var dynamicTr = $("<tr>").addClass("employeeRow");
  var employeeName = $("#employee-name").val();
  dynamicTr.append($("<td>").text(employeeName));
  var employeePosition = $("#employee-position").val();
  dynamicTr.append($("<td>").text(employeePosition));

  var employeeStart = $("#employee-start-date").val();

  var monthsWorked = moment().diff(employeeStart, "months")

  dynamicTr.append($("<td>").text(employeeStart));
  dynamicTr.append($("<td>").text(monthsWorked))

  var employeeMonthly = $("#employee-monthly-rate").val();
  dynamicTr.append($("<td>").text(employeeMonthly))

  var totalBilled = employeeMonthly * monthsWorked;
  dynamicTr.append($("<td>").text(totalBilled))
  $(".employee-stage").append(dynamicTr);

  console.log($(".employee-stage").html())

  database.ref().set({
    employeeList: $(".employee-stage").html()
  })

  $("#employee-name").val("")
  $("#employee-position").val("")
  $("#employee-start-date").val("")
  $("#employee-monthly-rate").val("")
})

database.ref().on("value", function(snapshot) {
  $(".employee-stage").html(snapshot.val().employeeList);
})

$(document).on("click", ".employeeRow", function(){
  $(this).remove();

  database.ref().set({
    employeeList: $(".employee-stage").html()
  })
})
