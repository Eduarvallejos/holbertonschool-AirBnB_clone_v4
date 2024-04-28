$(document).ready(function () {
  // Array to store the names of selected amenities
    const nameAmenity = [];
    // Function executed when a checkbox is clicked
    $('input:checkbox').click(function () {
      // If the checkbox is checked, add the amenity name to the array
      if ($(this).is(":checked")) {
        nameAmenity.push($(this).attr('data-name'));
      } else {
        // If the checkbox is unchecked, remove the amenity name from the array
        const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
        nameAmenity.splice(nameIndex, 1);
      }
      // Update the text in the element with class 'amenities'
      $('.amenities h4').text(nameAmenity.join(', '));
    });
  });