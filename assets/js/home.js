$(document).ready(function() {

    firebase.auth().onAuthStateChanged(user => {
        // CHECK IF USER IS SIGNED IN
        if (user) {
            // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
            if (user.emailVerified) {

                var uid = user.uid;
                var activities;
                var points;

                db.ref('users/' + uid).on('value', snapshot => {

                    //FILLS OUT USERS PROFILE

                    var userFirst = snapshot.val().firstName;
                    var userLast = snapshot.val().lastName;
                    var email = snapshot.val().email;
                    var hTown = snapshot.val().hTown;
                    var petName = snapshot.val().petName;
                    points = snapshot.val().points;
                    activities = snapshot.val().activities;
                    var level;

                    if (points < 1000) {
                        level = "Puppy";
                    } else if (points < 2000) {
                        level = "Lap Dog";
                    } else if (points < 3000) {
                        level = "Tail Wagger";
                    } else if (points < 4000) {
                        level = "Lively Pooch";
                    } else if (points < 5000) {
                        level = "Sporty Hound";
                    } else if (points > 5001) {
                        level = "Alpha Dog";
                    };

                    $('#nameSpan').text(userFirst + ' ' + userLast)
                    $('#level').text(' ' + level)
                    $('#points').text(' ' + points)
                })

                $('#profileImage').attr('src', user.photoURL);


                // db.ref('users/' + uid + '/activities').push(
                //         {
                //             name: 'Grooming',
                //             date: '10/09/17',
                //             location: 'Fido\'s Grooming, Los Angeles'
                //         })

              

                    

                var ref = db.ref('users/' + uid + '/activities');

                ref.orderByChild('date').limitToLast(10).on('child_added', function(snapshot) {
                    var newRow = $('<tr>')

                    var newDate = $('<td>').text(snapshot.val().date)
                    var newActivity = $('<td>').text(snapshot.val().name)
                    var newLocation = $('<td>').text(snapshot.val().location)
                    
                    if(snapshot.val().name == "Run" || snapshot.val().name == "Walk") {
                        var newDistance = $('<td>').text(snapshot.val().distance + " mi.")
                        var newSpeed = $('<td>').text(snapshot.val().speed + " mph")
                    } else {
                        var newDistance = $('<td>').text("")
                        var newSpeed = $('<td>').text("")
                    };

                    newRow.append(newDate);
                    newRow.append(newActivity);
                    newRow.append(newLocation);
                    newRow.append(newDistance);
                    newRow.append(newSpeed);
                    
                    
                    $('#activities').prepend(newRow);

                   
                })





            } else {

                console.log("email not verified");
            }
        } else {

            //IF NOT LOGGED IN RETURN TO INDEX
            
            location.replace('index.html');
        }
    })

})