async function getData(latitude,longitude) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    const md_data = await response.json();
    return md_data;
  }

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

async function createMap() {
    var map = L.map('map').setView([38.98, -76], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const coordinates=[];
    for (let i = 0;i<3;i++){
        const latitude = getRandomInRange(30,35,3);
        const longitude = getRandomInRange(-90,-100,3);
        coordinates.push({latitude,longitude});
    }

    await new_markers(coordinates,map);
}

async function new_markers(coordinates,map){
    for (let i=0;i<coordinates.length;i++){
        const{latitude,longitude}=coordinates[i];
        const marker=L.marker([latitude,longitude]).addTo(map)
        .bindPopup(`Marker ${i+1} Coordinates: ${latitude},${longitude}`)
        .openPopup();
        const location_data=await getData(latitude,longitude);
        const locality=location_data.locality;
        document.getElementById('markers').innerHTML += `
        <div>
            <b>Marker ${i+1}: ${latitude},${longitude}</b><br>
            Locality: ${locality}
        </div>`;
    }
}


window.onload = createMap;