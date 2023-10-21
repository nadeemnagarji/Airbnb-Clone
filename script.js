const locationInput = document.getElementById('locationsearch');
const locationDropdown = document.getElementById('locationDropdown');

locationInput.addEventListener('click', function () {
  locationDropdown.style.display = 'block';
});

document.addEventListener('click', function (event) {
  if (event.target !== locationInput) {
    locationDropdown.style.display = 'none';
  }
});

locationDropdown.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    console.log(event.target.tagName);
    locationInput.value = event.target.textContent;
    locationDropdown.style.display = 'none';
  }
});