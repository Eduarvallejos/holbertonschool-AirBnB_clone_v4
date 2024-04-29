$(document).ready(function () {
  // Array to store the names of selected amenities
  const nameAmenity = [];
  // Function executed when a checkbox is clicked
  $('input:checkbox').click(function () {
    if ($(this).is(':checked')) {
      nameAmenity.push($(this).attr('data-name'));
    } else {
      // If the checkbox is unchecked, remove the amenity name from the array
      const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
      nameAmenity.splice(nameIndex, 1);
    }
    // Update the text in the element with class 'amenities'
    $('.amenities h4').text(nameAmenity.join(', '));
  });

  // Make a GET request to check the status of the API
  $.get('http://0.0.0.0:5001/api/v1/status/', data => {
    // If the status is "OK", add the 'available' class to the element with id 'api_status'
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      // If the status is not "OK", remove the 'available' class from the element with id 'api_status'
      $('DIV#api_status').removeClass('available');
    }
  });

  // Function to perform places search
  const search = (filters = {}) => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      // Convert the filters object to JSON format and send it in the request
      data: JSON.stringify(filters),
      contentType: 'application/json',
      success: function (data) {
        // Clear previous places conten
        $('SECTION.places').empty();
        // Iterate over the results and append each place as an article in the places section
        $('SECTION.places').append(data.map(place => {
          return `<article>
                    <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">${place.price_by_night}</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">${place.max_guest} Guests</div>
                      <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                    </div>
                    <div class="description">
                      ${place.description}
                    </div>
                  </article>`;
        }));
      }
    });
  };
  // Event handler for search button click
  $('#search').click(function () {
    // Create a filters object with the selected amenities
    const filters = { amenities: Object.keys(nameAmenity) };
    // Call the search function with the filters
    search(filters);
  });
  // Perform an initial search when the page loads
  search();
});
