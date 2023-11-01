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



  async function initMap(result) {
    const { Map } = await google.maps.importLibrary("maps");
    
    map = new Map(document.getElementById("map"), {
      center:{lat:Lat, lng:
        Lng},
      zoom: 8,
    });
    displayHotel(result.results)

  }



  /*so initially i used to call the display hotel function inside the getdatda function but 
  i wanted the map to start with a default location of the city and then addd markers 
  so the get the default location of the city i had to extract the any latitude and longitude data from the array i fetch 
  and then pass that to the init map so that i can start the map 
  and then mark the various locations on the map
  

  */