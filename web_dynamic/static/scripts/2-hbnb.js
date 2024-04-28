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
});
