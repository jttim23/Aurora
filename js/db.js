
var user = firebase.auth().currentUser;
const addNewReservation = () => {
  if (user != null) {
    console.log(user.email);

    const reservation = {
      checkinDate: newBookingform.checkinDate.value,
      checkoutDate: newBookingform.checkoutDate.value,
      tentType: newBookingform.tentType.value,
      phoneNumber: newBookingform.phoneNumber.value,
      email = user.email,
    }
    db.collection('bookings').add(reservation)
      .then(() => {
        // Reset the form values
        newBookingform.checkinDate.value = "",
          newBookingform.checkoutDate.value = "",
          newBookingform.tentType.value = "",
          newBookingform.phoneNumber.value = "",
          console.log("send")
        alert('Your event has been successfully saved')
      })
      .catch(err => console.log(err))
  }
  if (user == null) {
    alert("Login First!!!")
  }
}