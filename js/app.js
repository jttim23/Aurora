//pobiera dane z DB
db.collection("tents")
  .get()
  .then((snapshot) => {
    showTents(snapshot.docs);
    initDateValidation();
  });
//metoda wysiwtlajaca liste namiotów
const tentsContainer = document.querySelector("#tentsContainer");
function showTents  (data)  {
  data.forEach((doc) => {
    const tent = doc.data();
    const id = doc.id;
    const output = `
    <div class=" col-md-6 p-3 ">
    <div class="card">

    <div class="card--details" id="tentCard">
      <div>
      <h3>${tent.name}</h3>   
  
     <div>
     <img src=${tent.photoURL} alt="" class="img-fluid d-sm-inline">
     </div>
     <br>
      <a href="#" id="tentdetails" class="btn btn-lg btn-info px-5" data-toggle="modal" data-tent-id="${id}" data-target="#tentdetailsModal">
     WIĘCEJ O MNIE
   </a> 
   <h5>Ceny od: ${tent.price} PLN/na dzień</h5>   
       <span>Liczba osób:${tent.people} </span>
     </div>
     <a href="#" id="tentsubmitbutton" class="btn btn-lg btn-primary px-5" data-toggle="modal" data-tent-id=${id} data-target="#bookingModal">REZERWUJ TERAZ</a>
     </div>
  </div>
  </div>
    `;
    tentsContainer.innerHTML += output;
  });
};
// pobiera id namiotu z przycisku,pobiera dane o namiocie, wstawia do modala
$("#tentdetailsModal").on("show.bs.modal", function (event) {
  var clickedButton = $(event.relatedTarget);
  var tentID = clickedButton.data("tent-id");
  var docRef = db.collection("tents").doc(tentID);
  var tent;
  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      tent = doc.data();
      console.log(tent.size)
      $(".modal-body #tentDetails").html(tent.description);
      $(".modal-body #tentSize").html(`Size: ${tent.size}`);
    } else {

      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });


});

const newsletterSignup = document.getElementById('newsletterSignup')
  newsletterSignup.addEventListener('click', (e) => {
      e.preventDefault();
     joinNewsletter();
     
  });

  //sprawdza czy juz zapisany do newslettera jesli nie to zapisuje
  function joinNewsletter () {
    var  userEmail = firebase.auth().currentUser.email;
    db.collection("newsletterSignups").where("userEmail", "==", userEmail )
    .get()
    .then(function(querySnapshot) {
      if (querySnapshot.empty) {
        const newsletterSubscription={
                userEmail : userEmail,
                signUpDate : new Date()
               };
               db.collection("newsletterSignups").add(newsletterSubscription).then(() => {
                  alert("You are sign up to the newsletter");
              })
              .catch((err) => console.log(err));
      } else{
        alert("You are already sign up to the newsletter!!!");
      }
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  }

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
function addNewReservation  ()  {
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
        alert("Your booking has been successfully saved");
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

const getDaysArray = function (s, e) {
  for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
};

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

// konwertuje datę na pożądany format (z DD-MM-RRRR na RRRR-MM-DD)
function convertDate(date) {
  let newDate = date.split("/");
  newDate.push(newDate[0]);
  newDate[0] = newDate[newDate.length - 2];
  newDate[newDate.length - 2] = newDate[newDate.length - 1];
  newDate.pop();
  return newDate.join("-");
}

function repairDate(date) {
  let newDate = date.split("-");
  newDate.push(newDate[0]);
  newDate[0] = newDate[newDate.length - 2];
  newDate[newDate.length - 2] = newDate[newDate.length - 1];
  newDate.pop();
  return newDate.join("/");
}

function restoreDates(arr) {
  for (var i = 0; i < arr.length; ++i) {
    arr[i] = repairDate(arr[i]);
  }
  return arr;
}

// tworzy unikalną tablicę (każda data występuje raz)
function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}

// pobieranie danych z bazy
const start = async function (selectedTentID = null) {
  if (!selectedTentID) {
    alert("Błąd w przekazaniu parametru!");
    return;
  }

  let dateRange = [];

  const addDate = (data) => {
    data.forEach((doc) => {
      var checkinDate = doc.data().checkinDate;
      var checkoutDate = doc.data().checkoutDate;
      var daylist = getDaysArray(
        new Date(convertDate(checkinDate)),
        new Date(convertDate(checkoutDate))
      );
      dateRange.push(daylist.map((v) => v.toISOString().slice(0, 10)));
    });
  };

  db.collection("bookings")
    .where("tentID", "==", selectedTentID)
    .get()
    .then((snapshot) => {
      addDate(snapshot.docs);
    });
  const snapshot = await db
    .collection("bookings")
    .where("tentID", "==", selectedTentID)
    .get();
  if (snapshot.empty) {
    console.log("No matching documents.");
  }


  newArr = [];
  for (i = 0; i < dateRange.length; i++) {
    newArr = arrayUnique(newArr.concat(dateRange[i]));
  }
  return restoreDates(newArr);
};

