const searhButton = document.getElementById("searchIcon")
const hotelsContainer = document.querySelector(".hotels");
const checkin = document.getElementById('dates')
const place = document.getElementById('location')
const guests = document.getElementById('guests')


console.log(place);
guests.innerText =localStorage.getItem('adults') + localStorage.getItem('children')
guests.innerText = localStorage.getItem('children')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '14940e43d4msh46a7deca2fa030bp1953b0jsnd376090242c1',
		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
	}
};


function loadHotels(inputData){

    const location = localStorage.getItem('location');
    const checkin = localStorage.getItem('checkin')
    const checkout = localStorage.getItem('checkout');
    const adults = localStorage.getItem('adults');
    const children = localStorage.getItem('children');
   
    newUrl = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&infants=0&pets=0&page=1&currency=USD`
    console.log(newUrl);
    
    getData(newUrl)
    
}


function createHotelCard(hotelData) {
   
    // Create the main div element
    const hotelCard = document.createElement("div");
    hotelCard.classList.add("hotel");

    // Create the image element
    const image = document.createElement("img");
    image.src = hotelData.images[0];
    image.alt = "Hotel Image";

    // Create the hotel info container
    const hotelInfo = document.createElement("div");
    hotelInfo.classList.add("hotel-info");

    // Create the hotel name section
    const hotelName = document.createElement("div");
    const hotelNameDiv =document.createElement("div");
    hotelName.classList.add("hotel-name")
    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = hotelData.city;
    const nameHeading = document.createElement("h4");
    nameHeading.textContent = hotelData.name;
    const heartImage = document.createElement("img");
    heartImage.src = "Assets/heart.svg";

   
    hotelNameDiv.appendChild(nameParagraph);
    hotelNameDiv.appendChild(nameHeading);
    hotelName.appendChild(hotelNameDiv)
    hotelName.appendChild(heartImage);

    // Create the hotel details section
    const hotelDetails = document.createElement("div");
    hotelDetails.classList.add("hotel-detail")

    const detailSpans = hotelData.previewAmenities.map((detailText) => {
        const span = document.createElement("span");
        span.textContent = detailText;
        return span;
    });

    detailSpans.forEach((span) => {
        hotelDetails.appendChild(span);
    });

    // Create the rating and pricing section
    const ratingPricing = document.createElement("div");
    ratingPricing.classList.add("rating-pricing")
  

    const ratings = document.createElement("div");
    ratings.classList.add("ratings");
    const ratingParagraph = document.createElement("p");
    ratingParagraph.textContent = hotelData.rating;
    const starImage = document.createElement("img");
    starImage.src = "Assets/star.svg";
    const reviewsParagraph = document.createElement("p");
    reviewsParagraph.textContent = `(${hotelData.reviewsCount} reviews)`;

    ratings.appendChild(ratingParagraph);
    ratings.appendChild(starImage);
    ratings.appendChild(reviewsParagraph);

    const pricing = document.createElement("div");
    pricing.classList.add("pricing");
    const priceParagraph = document.createElement("p");
    priceParagraph.innerHTML =`&#36;${hotelData.price.rate}`;
    const priceSpan = document.createElement("span");
    priceSpan.textContent = "/night";

    pricing.appendChild(priceParagraph);
    pricing.appendChild(priceSpan);

    ratingPricing.appendChild(ratings);
    ratingPricing.appendChild(document.createElement("div")); // Empty div for spacing
    ratingPricing.appendChild(pricing);

    // Append all elements to the main hotel card
    hotelInfo.appendChild(hotelName);
    hotelInfo.appendChild(hotelDetails);
    hotelInfo.appendChild(ratingPricing);

    hotelCard.appendChild(image);
    hotelCard.appendChild(hotelInfo);

    return hotelCard;
}

function displayHotel(hotelList){
    hotelList.forEach((hotel)=>{
    const hotelcard = createHotelCard(hotel)
        hotelsContainer.appendChild(hotelcard)
    })
}


searhButton.addEventListener('click',loadHotels())

async function getData(url){
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.results);
      displayHotel(result.results)
    } catch (error) {
      console.error(error);
    }
  }









