//pobiera dane z DB
db.collection("tents")
  .get()
  .then((snapshot) => {
    showTents(snapshot.docs);
    initDateValidation();
  });
//metoda wysiwtlajaca liste namiotów
const tentsContainer = document.querySelector("#tentsContainer");
const showTents = (data) => {
  data.forEach((doc) => {
    const tent = doc.data();
    const id = doc.id;
    const output = `
      <div class="card col-md-6">
        <div class="card--details">
          <div>
            <h1>${tent.name}</h1>   
            <div>
              <img src="${tent.photoURL}" alt="" class="img-fluid d-none d-sm-inline">
            </div>
            <span>Liczba miejsc: ${tent.people} </span>
          </div>
          <a href="#" id="tentsubmitbutton" class="btn btn-lg btn-primary px-5" data-toggle="modal" data-tent-id="${id}" data-target="#bookingModal">
            REZERWUJ TERAZ
          </a>
        </div>
      </div>
    `;
    tentsContainer.innerHTML += output;
  });
};
//przesyła id danego namiotu po kliknieciu przycisku
$("#bookingModal").on("show.bs.modal", function (event) {
  var clickedButton = $(event.relatedTarget);
  var tentID = clickedButton.data("tent-id");

  $(this).find(".modal-body #hiddenTentID").val(tentID);
});
//po kliknieciu przycisku rezerwuj wywołuje metodę tworząca rezerwację
const newBookingform = document.querySelector("#newBooking-form");
newBookingform.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewReservation();
});
//tworzy i zapisuje nowa rezerwacje w DB
const addNewReservation = () => {
  const reservation = {
    checkinDate: newBookingform.checkinDate.value,
    checkoutDate: newBookingform.checkoutDate.value,
    phoneNumber: newBookingform.phoneNumber.value,
    userEmailmail: firebase.auth().currentUser.email,
    tentID: newBookingform.hiddenTentID.value,
  };
  db.collection("bookings")
    .add(reservation)
    .then(() => {
      // Reset the form values
      $("#bookingModal").modal("toggle");
      (newBookingform.checkinDate.value = ""),
        (newBookingform.checkoutDate.value = ""),
        (newBookingform.phoneNumber.value = ""),
        alert("Your event has been successfully saved");
    })
    .catch((err) => console.log(err));
};

function initDateValidation() {
  const tentsElements = document.querySelectorAll("[data-tent-id]");
  tentsElements.forEach((tent) => {
    tent.addEventListener(
      "click",
      function () {
        datepickerInit(tent.dataset.tentId);
      },
      false
    );
  });
}

// inicjalizacja datepickera TODO
function datepickerInit(tentID = null) {
  // pobieranie danych z bazy
  start(tentID).then((response) => {
    /**
     * przypisanie odpowiedzi na to co zwraca funkcja (response)
     * dopiero wtedy kontynuujemy kod, bo musimy mieć daty (przypisanie response do dates)
     */
    dates = response;

    // data dzisiejsza
    var date = new Date();
    var day = date.getDate();
    var day1 = date.getDate() + 1;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    var today = day + "/" + month + "/" + year;
    var tomorrow = day1 + "/" + month + "/" + year;

    function DisableDates(date) {
      var string = jQuery.datepicker.formatDate("dd/mm/yy", date);
      return [dates.indexOf(string) == -1];
    }

    $(function () {
      var dateFormat = "dd/mm/yy";
      $("#checkinDate")
        .datepicker({
          beforeShowDay: DisableDates,
          firstDay: 1,
          dateFormat: "dd/mm/yy",
          minDate: today,
        })
        .on("change", function () {
          to.datepicker("option", "minDate", getDate(this));
        }),
        (to = $("#checkoutDate").datepicker({
          beforeShowDay: DisableDates,
          firstDay: 1,
          dateFormat: "dd/mm/yy",
          minDate: tomorrow,
        }));

      function getDate(element) {
        var range;
        try {
          range = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
          range = null;
        }
        return range;
      }
    });
  });
}

// pobieranie danych z bazy
const start = async function (selectedTentID = "AjyDpbG3l7vrUs7PVenZ") {
  const citiesRef = db.collection("bookings");
  alert(selectedTentID + "here!");
  const snapshot = await citiesRef.where("tentID", "==", selectedTentID).get();

  if (snapshot.empty) {
    console.log("No matching documents.", selectedTentID);
  }

  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });

  return ["20/01/2018", "21/01/2018", "22/01/2018", "23/04/2021", "29/04/2021"];
};
