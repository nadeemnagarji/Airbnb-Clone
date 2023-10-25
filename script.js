const locationInput = document.getElementById('locationsearch');
const checkin = document.getElementById('checkIn')
const checkout = document.getElementById('checkOut')
const adults = document.getElementById('adults')
const children = document.getElementById('children')
const guests = document.getElementById('guests')
const guestlist = document.getElementById('guest-dropdown')
const locationDropdown = document.getElementById('locationDropdown');
const dropdownList = document.getElementById("dropdownList")
const Url = 'https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2024-10-10&checkout=2024-10-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';
let inputData ={};




let data;



let p1 = []









// filtering data
// here we filter the main data as per the user input


locationInput.addEventListener('click', function () {
  locationDropdown.style.display = 'block';

});
 locationInput.addEventListener('input',  (e)=>{
console.log(e.target.value);
 let data =  filterData(e.target.value)
 dropdownList.innerHTML=""
 destructData(data)

})





guests.addEventListener("click",()=>{
  guestlist.style.display = "flex"
})
guests.addEventListener("blur",()=>{
  guestlist.style.display = "none"
})
locationInput.addEventListener("blur",(e)=>{
  e.preventDefault()
    if(e.target.value !=null){
      inputData.location = e.target.value
      localStorage.setItem('location', e.target.value);
    }
    
    console.log(inputData);
})
checkin.addEventListener("blur",(e)=>{
  e.preventDefault()
    if(e.target.value !=null){
      inputData.checkin = e.target.value
      localStorage.setItem('checkin', e.target.value);
    }
    
    console.log(inputData);
})
checkout.addEventListener("blur",(e)=>{
  e.preventDefault()
    if(e.target.value !=null){
  inputData.checkout = e.target.value
  localStorage.setItem('checkout', e.target.value);
    }
    
    console.log(inputData);
})
adults.addEventListener("blur",(e)=>{
  e.preventDefault()
    if(e.target.value !=null){
      inputData.adults = e.target.value
      localStorage.setItem('adults', e.target.value);
    }
    
    console.log(inputData);
})
children.addEventListener("blur",(e)=>{
  e.preventDefault()
    if(e.target.value !=null){
      inputData.children = e.target.value
      localStorage.setItem('children', e.target.value);
    }
    
    console.log(inputData);
})

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