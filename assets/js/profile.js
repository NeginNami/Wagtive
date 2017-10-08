$(document).ready(function() {
	
    firebase.auth().onAuthStateChanged(user => {

        var user = firebase.auth().currentUser;

        var fileButton = $("#file")

        fileButton.on('change', e => {

        	//GETS FILE SELECTED 
            var file = e.target.files[0];

            //CREATES NEW FILE READER
            var reader = new FileReader();
            reader.onloadend = function() {

            	//TURNS FILE INTO BLOB
                var blob = new Blob([file], { type: "image/jpeg" });

                //PHOTO STORAGE LOCATION
                var storageRef = firebase.storage().ref(user.uid + '/' + file.name);
                console.warn(file);

                //UPLOADS FILE TO FIREBASE
                var uploadTask = storageRef.put(blob);

            }

            //GETS NEWLY CREATED PHOTO URL
            var photoUrl = 'https://firebasestorage.googleapis.com/v0/b/wagtive.appspot.com/o/users%2F'+ user.uid + '%2F' + file.name + '?alt=media&token=ead404cf-8598-418c-91a6-8a7509daf2be';

            //UPDATES USERS PROFILE WITH NEW PHOTO
            user.updateProfile({
                	photoURL: photoUrl
                })

            reader.onerror = function(e) {
                console.log("Failed file read: " + e.toString());
            };
            reader.readAsArrayBuffer(file);
        })

    });

});