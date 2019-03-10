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

    
    // Creates local "temporary" object for holding data
    var newTrainSchedule = {
        trainName: trName,
        destination: trDestination,
        firstTrainTime: trFirstTrainTime,
        frequency: trFrequency,
        // nextArrival: nextTrainConverted,
        // minutesAway: tMinutesTillTrain
    };

    if (trName === "" || trDestination === "" || trFirstTrainTime === "" || trFrequency === "") {
        $('#myModal').modal('show');
    } else {
        $('#myModal').modal('hide');
        // Uploads data to the database
        database.ref().push(newTrainSchedule);
        // Logs everything to console
        console.log(newTrainSchedule.trainName);
        console.log(newTrainSchedule.destination);
        console.log(newTrainSchedule.firstTrainTime);
        console.log(newTrainSchedule.frequency);
        // console.log(newTrainSchedule.nextArrival);
        // console.log(newTrainSchedule.minutesAway);

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#frequency-input").val("");
    }
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trName = childSnapshot.val().trainName;
    var trDestination = childSnapshot.val().destination;
    var trFirstTrainTime = childSnapshot.val().firstTrainTime;
    var trFrequency = childSnapshot.val().frequency;
    var trNextArrival;
    var trMinutesAway;
    
    console.log(childSnapshot.key);

    var trFirstTrainTimeConverted = moment(trFirstTrainTime, "hh:mm").subtract(1, "years");
    console.log("trfristtrain" + trFirstTrainTime);
    console.log("firstTrainconvert" + trFirstTrainTimeConverted);
    var diffTime = moment().diff(moment(trFirstTrainTimeConverted), "minutes");
    console.log("difference in time: " + diffTime);


    var tRemainder = diffTime % trFrequency;
    console.log("tremainder" + tRemainder);
    var tMinutesTillTrain = trFrequency - tRemainder;
    console.log("minutes till train/away" + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var trArrivalTime = moment(nextTrain).format("hh:mm A")
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm A"));
    var nextTrainConverted = nextTrain.format("X");
    console.log("Unix Time nextTrainConverted: " + nextTrainConverted);


    // train Info
    console.log(trName);
    console.log(trDestination);
    console.log(trFirstTrainTime);
    console.log(trFrequency);
    console.log(trNextArrival);
    console.log(trMinutesAway);
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDestination),
        $("<td>").text(trFirstTrainTime),
        $("<td>").text(trFrequency),
        $("<td>").text(trArrivalTime),
        $("<td>").text(tMinutesTillTrain),
    );
    // Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
});


    // // Handle the errors
    // }, function (errorObject) {
    // console.log("Errors handled: " + errorObject.code);
    // });
