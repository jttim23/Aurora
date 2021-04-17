//pobiera dane z DB
db.collection('tents').get().then(snapshot =>{
  
  showTents(snapshot.docs)
})
//metoda wysiwtlajaca liste namiotów
const tentsContainer = document.querySelector('#tentsContainer');
const showTents = (data) => {
  data.forEach(doc => {
    const tent = doc.data();
    const id = doc.id;
    const output = `
    
         <div class="card">
          <div class="card--details">
            <div>
            
            <h1>${tent.name}</h1>   
           <div>
           <img src=${tent.photoURL} alt="" class="img-fluid d-none d-sm-inline">
           </div>
         
             <span>${tent.people} </span>
           </div>
           <a href="#" id="tentsubmitbutton" class="btn btn-lg btn-primary px-5" data-toggle="modal" data-tent-id=${id} data-target="#bookingModal">REZERWUJ TERAZ</a>
         </div>
        </div>
        `
    tentsContainer.innerHTML += output;
  });

}
//przesyła id danego namiotu po kliknieciu przycisku
$('#bookingModal').on('show.bs.modal', function (event) {
  var clickedButton = $(event.relatedTarget)
  var tentID = clickedButton.data('tent-id')

  $(this).find('.modal-body #hiddenTentID').val(tentID)
})
//po kliknieciu przycisku rezerwuj wywołuje metodę tworząca rezerwację
const newBookingform = document.querySelector('#newBooking-form');
newBookingform.addEventListener('submit', (e) => {

  e.preventDefault();
  addNewReservation()
});        
//tworzy i zapisuje nowa rezerwacje w DB
const addNewReservation = () => {
    const reservation = {
      checkinDate: newBookingform.checkinDate.value,
      checkoutDate: newBookingform.checkoutDate.value,
      phoneNumber: newBookingform.phoneNumber.value,
      userEmailmail : firebase.auth().currentUser.email,
      tentID : newBookingform.hiddenTentID.value,
    }
    db.collection('bookings').add(reservation)
      .then(() => {
        // Reset the form values
        $('#bookingModal').modal('toggle');
        newBookingform.checkinDate.value = "",
          newBookingform.checkoutDate.value = "",
          newBookingform.phoneNumber.value = "",
          
        alert('Your event has been successfully saved')
      })
      .catch(err => console.log(err))
  }
  
