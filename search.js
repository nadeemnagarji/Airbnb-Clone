




const searchButton = document.getElementById("searchIcon")
const hotelsContainer = document.querySelector(".hotels");
const checkin = document.getElementById('dates')
const place = document.getElementById('location')
const guests = document.getElementById('guests')
let Lat;
let Lng;
let uniqueId=1
let list;
 
let userLocation;
// console.log(place);

  guests.innerText =localStorage.getItem('adults') + localStorage.getItem('children')
  guests.innerText = localStorage.getItem('children')


  window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(userLocation);
        });
    }
   
  }

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ba5af94c9mshb5fb99b6bc4945ap14ab3fjsnc30797afa9af',
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

function createCostBreakdownModal(hotelData){
    const modal = document.createElement("div")
        modal.classList.add("modal")
        const modalContent = document.createElement('div')
        modalContent.classList.add("modal-content")
        let totalCost = 0
      hotelData.price.priceItems.forEach((item=>{
        const para = document.createElement("p")
        para.innerText = `${item.title} = ${item.amount} $`
        modalContent.appendChild(para)
        totalCost += item.amount++
      }))
      const para = document.createElement("p")
      para.innerText = `Total = ${totalCost} $`
      modalContent.appendChild(para)
      const modalCloseButton = document.createElement("button")
      modalCloseButton.classList.add("close-modal")
      modalCloseButton.innerText = "Close"
      modalCloseButton.addEventListener("click",function(){
        modal.style.display = "none"
      })

      modal.appendChild(modalContent)
      modalContent.appendChild(modalCloseButton)
      return modal
}




function createHotelCard(hotelData) {
   
    // Create the main div element
    const hotelCard = document.createElement("div");
    hotelCard.classList.add("hotel");  
    hotelCard.id = `${uniqueId}`;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
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

     //adding  modal box button to the hotel card
    const costBreakdown = document.createElement("button");
    costBreakdown.id=`${uniqueId}-direction`
    costBreakdown.classList.add("cost-breakdown")
    costBreakdown.innerText = "Total cost"

    //    const modalBackdrop = createCostBreakdownModal(hotelData)
    costBreakdown.addEventListener("click", function(){
        const modal = createCostBreakdownModal(hotelData)
        document.body.appendChild(modal)
    });
    ratingPricing.appendChild(costBreakdown);

    // Append all elements to the main hotel card
    hotelInfo.appendChild(hotelName);
    hotelInfo.appendChild(hotelDetails);
    hotelInfo.appendChild(ratingPricing);

    hotelCard.appendChild(image);
    hotelCard.appendChild(hotelInfo);


    // Create a marker for this listing on the map
    new google.maps.Marker({
        position: { lat: hotelData.lat, lng: hotelData.lng },
        map,
        title: hotelData.title
    });
   
  uniqueId++

    // hotelCard.appendChild(hotel)


    // Adding direction button 
    const directionsButton = document.createElement("button");
    directionsButton.innerText = "Get Directions";
    directionsButton.classList.add("direction")
    directionsButton.addEventListener("click", function() {
      openDirections(hotelData);
  });
    hotelInfo.appendChild(directionsButton)

    return hotelCard;
}
function openDirections(location){
  // Open Google Maps directions in a new tab
  console.log(userLocation);
  console.log(location);
  const url = `https://www.google.com/maps/dir/${userLocation.lat,userLocation.lng}/${location.lat},${location.lng}`;
  window.open(url, "_blank");
}

// lat = 18.5245986
// long = 73.7805657




function displayHotel(hotelList){
    hotelList.forEach((hotel)=>{
    const hotelcard = createHotelCard(hotel)
        hotelsContainer.appendChild(hotelcard)
    })
}


searchButton.addEventListener('click',loadHotels())



/* the below function is responsible for getting the data from the api */
async function getData(url){
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.results);
      
      list = result.results
      Lat = result.results[0].lat
      Lng = result.results[0].lng
      // refer the text to explaining why i called the displayHotel function inside initMap
      initMap(result)
      
    } catch (error) {
      console.error(error);
    }
  }



  /* GMaps APi Key = AIzaSyCSvhIMsDX7BnJ6alcwJW0T3f-7ghUVAuI 
  
  AIzaSyCSvhIMsDX7BnJ6alcwJW0T3f-7ghUVAuI*/








  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyCSvhIMsDX7BnJ6alcwJW0T3f-7ghUVAuI",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
  let map;
  


//lat
// : 
// 18.53265
// lng
// : 
// 73.89819

  async function initMap(result) {
    const { Map } = await google.maps.importLibrary("maps");
    
    map = new Map(document.getElementById("map"), {
      center:{lat:Lat, lng:
        Lng},
      zoom: 8,
    });
    displayHotel(result.results)

  }
  


  
  
