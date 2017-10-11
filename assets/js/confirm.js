$(document).ready(function() {
            firebase.auth().onAuthStateChanged(user => {
                // CHECK IF USER IS SIGNED IN
                if (user) {
                    // CHECK IF SIGNED IN USERS EMAIL IS VERIFIED
                    if (user.emailVerified) {
                        location.replace('../Wagtive/home.html')
                    } else {

                        var uid = user.uid;

                        var email;

                        db.ref('users/' + uid).on('value', snapshot => {
                            email = snapshot.val().email;
                            $('#confirmEmail').html(email);
                        })

                        $('#resend').on('click', function() {
                            user.sendEmailVerification().then(function() {
                                $('#confirmMessage').text('Email Sent!')
                                console.log('hi')
                            })
                        })

                    }

                } else {
                    location.replace('../Wagtive/index.html')
                }

            })
        })