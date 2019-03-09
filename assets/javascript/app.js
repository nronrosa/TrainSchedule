
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


    
    trName = $("#train-name-input").val().trim();
    trDestination = $("#destination-input").val().trim();
    trFirstTrainTime = $("#first-train-time-input").val().trim();
    trFrequency = $("#frequency-input").val().trim();

    var trFirstTrainTimeConverted = moment(trFirstTrainTime, "HH:mm").subtract(1, "years");
    console.log("trfristtrain" + trFirstTrainTime);
    console.log("firstTrainconvert" + trFirstTrainTimeConverted);

    var currentTime = moment();
    // console.log("currentTime " + currentTime);
    console.log("current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(trFirstTrainTimeConverted), "minutes");
    console.log("difference in time: " + diffTime);
    var tRemainder = diffTime % trFrequency;
    console.log("tremainder" + tRemainder);
    var tMinutesTillTrain = trFrequency - tRemainder;
    console.log("minutes till train/away" + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format("HH:mm"));


    // Creates local "temporary" object for holding data
    var newTrainSchedule = {
        trainName: trName,
        destination: trDestination,
        firstTrainTime: trFirstTrainTime,
        frequency: trFrequency,
        // nextArrival: trNextArrival,
        // minutesAway: trMinutesAway
    };



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
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trName = childSnapshot.val().trainName;
    var trDestination = childSnapshot.val().destination;
    var trFirstTrainTime = childSnapshot.val().firstTrainTime;
    var trFrequency = childSnapshot.val().frequency;
    var trNextArrival = "something";
    var trMinutesAway = "something";

    // train Info
    console.log(trName);
    console.log(trDestination);
    console.log(trFirstTrainTime);
    console.log(trFrequency);
    // console.log(trNextArrival);
    // console.log(trMinutesAway);



    // do some calc for nextarrival and minutes away
    // ****************************************


    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    / / // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // ****************************************


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDestination),
        $("<td>").text(trFirstTrainTime),
        $("<td>").text(trFrequency),
        $("<td>").text(trNextArrival),
        $("<td>").text(trMinutesAway),
    );

    // Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
});


//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });