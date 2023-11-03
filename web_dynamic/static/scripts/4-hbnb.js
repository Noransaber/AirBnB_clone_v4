// Function when document is ready it starts applying the events
$(document).ready(function () {
  let myId = [];
  // In click on the input
  $('input[type=checkbox]').click(function () {
    // Creating two empty lists
    const myListName = [];
    myId = [];
    // choes the selected checkboxs and loop over them
    $('input[type=checkbox]:checked').each(function () {
      // if you found an attr called data-name, push it's value inside the list
      myListName.push($(this).attr('data-name'));
      // if you found an attr called data-id push them on the id list
      myId.push($(this).attr('data-id'));
    });
    // If no data inside the list
    if (myListName.length === 0) {
      // write space in the h4 of the amenities part in html
      $('.amenities h4').html('&nbsp;');
    } else {
      // if you found data, write the data inn the h4
      $('.amenities h4').text(myListName.join(', '));
    }
    console.log(myId);
  });
  // when you click on the filter button
  $('.filters button').click(function (event) {
    // Stop the default action of the button
    event.preventDefault();
    // write empty string in element selceted by places class
    $('.places').text('');

    const obj = {};
    obj.amenities = myId;
    listPlaces(JSON.stringify(obj));
  });

  // Starting ajax
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    // if you get the data successfully, add class available
    success: function (json) {
      $('#api_status').addClass('available');
    },
    // if not return the error
    error: function (xhr, status) {
      console.log('error ' + xhr);
    }
  });

  listPlaces();
});

function listPlaces (amenities = '{}') {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    data: amenities,
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      for (let i = 0; i < places.length; i++) {
        $('.places').append(`
<article>
<div class="title_box">
<h2> ${places[i].name}</h2>
<div class="price_by_night"> ${places[i].price_by_night} </div>
</div>
<div class="information">
<div class="max_guest">${places[i].max_guest}
${places[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
<div class="number_rooms">${places[i].number_rooms}
${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
<div class="number_bathrooms">${places[i].number_bathrooms}
${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
</div>
<div class="user">
</div>
<div class="description">
${places[i].description}
</div>
</article>
`);
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
}
