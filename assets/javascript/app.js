var config = {
    apiKey: "AIzaSyBxrR3neZaLIYUBkUsgJwLLQPDSF3vy1vE",
    authDomain: "trainschedule-89018.firebaseapp.com",
    databaseURL: "https://trainschedule-89018.firebaseio.com",
    projectId: "trainschedule-89018",
    storageBucket: "trainschedule-89018.appspot.com",
    messagingSenderId: "700017545059"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#submit-time").on("click", function (event) {
    event.preventDefault();
    var trName = $("#train-name-input").val().trim();
    var trDestination = $("#destination-input").val().trim();
    var trFirstTrainTime = $("#first-train-time-input").val().trim();
    var trFrequency = $("#frequency-input").val().trim();

    var newTrainSchedule = {
        trainName: trName,
        destination: trDestination,
        firstTrainTime: trFirstTrainTime,
        frequency: trFrequency,
    };

    if (trName === "" || trDestination === "" || trFirstTrainTime === "" || trFrequency === "") {
        $("#myModal").modal("show");
    } else {
        $("#myModal").modal("hide");
        database.ref().push(newTrainSchedule);
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#frequency-input").val("");
    };
});

database.ref().on("child_added", function (childSnapshot) {
    var trName = childSnapshot.val().trainName;
    var trDestination = childSnapshot.val().destination;
    var trFirstTrainTime = childSnapshot.val().firstTrainTime;
    var trFrequency = childSnapshot.val().frequency;
    var trFirstTrainTimeConverted = moment(trFirstTrainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(trFirstTrainTimeConverted), "minutes");
    var tRemainder = diffTime % trFrequency;
    var tMinutesTillTrain = trFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var trArrivalTime = moment(nextTrain).format("hh:mm A")
    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDestination),
        $("<td>").text(trFrequency),
        $("<td>").text(trArrivalTime),
        $("<td>").text(tMinutesTillTrain),
    );
    $("#train-schedule-table > tbody").append(newRow);
});