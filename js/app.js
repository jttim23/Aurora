db.collection('tents').get().then(snapshot =>{
  showTents(snapshot.docs)
})
const tentsContainer = document.querySelector('#tentsList');
const showTents = (data) => {
  data.forEach(doc => {
    const tent = doc.data();
    const output = `
         <div class="card">
          <div class="card--details">
            <div>
            
           <h1>Tent</h1>    
           <div class="col-md-4 p3">
           <img src=${tent.photoURL} alt="" class="img-fluid d-none d-sm-inline">
           </div>
             <h1>${tent.name}</h1>
             <span>${tent.people} </span>
           </div>
           <button id="book" class="btn btn-lg btn-primary px-5" data-toggle="modal" data-target="#bookingModal"data-dismiss="modal" aria-label="close">REZERWUJ TERAZ</button>
         </div>
        </div>
        `
    tentsContainer.innerHTML += output;
  });

}

const newBookingform = document.querySelector('#newBooking-form');
newBookingform.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("submitted")
  
  addNewReservation()
});
