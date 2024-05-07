const map = L.map('map').setView([6.6179, 3.5053], 12);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);


    coords = [[6.5905, 3.4952], [ 6.5924, 3.3419], [6.4512, 3.4274], [ 6.5643, 3.3199], [6.6016, 3.4875], [6.647, 3.3035]];
    rent = ['350 $', '500 $', '550 $', '700 $', '800 $', '930 $'];

    // areas
    areas = ['80 m','50 m','35 m','60 m','70 m','25 m']; 
    // rooms
    rooms = [4, 2, 1, 3, 4, 1];
    // outside
    images = ['../../public/img/leaflet/door1.jpg','../../public/img/leaflet/door2.jpg','../../public/img/leaflet/door3.jpg','../../public/img/leaflet/door4.jpg','door../../public/img/leaflet/5.jpg','../../public/img/leaflet/door6.jpg'];


let imgSrcRelative = '../../public/img/leaflet/';
  apartmentsLength = coords.length;


  let apart1 = document.querySelector('#apt1');
  let apart2 = document.querySelector('#apt2');
  let apart3 = document.querySelector('#apt3');
  let apart4 = document.querySelector('#apt4');
  let apart5 = document.querySelector('#apt5');
  let apart6 = document.querySelector('#apt6');

  let aparts = [apart1, apart2, apart3, apart4, apart5, apart6];

  for (let i = 0; i < apartmentsLength; i++) {
    //Pop ups
    let pop = L.popup({
        closeOnClick: true
    }).setContent('<h4>Area: ' + areas[i] + '<sup>2</sup>' + '<br>Rooms: ' + rooms[i] + '<h4><img src=' + images[i] + ' style="height=200px"; width="70px">');


    //Markers
    let marker = L.marker(coords[i]).addTo(map).bindPopup(pop);
    //Labels
    let tooltip = L.tooltip({
        permanent: true
    }).setContent(rent[i]);

    marker.bindTooltip(tooltip);

   
    // Zoom in / fly to
    aparts[i].addEventListener('mouseover', ()=> {
        console.log(coords[i]);
        map.flyTo(coords[i], 16);
    });

  }
   
   
    
