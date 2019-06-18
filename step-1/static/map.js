function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.195725, lng: 43.98106},
    zoom: 10,
    streetViewControl: false
  });

  var info = new google.maps.InfoWindow();

  map.data.setStyle((feature) => {
    return {
      strokeColor: '#00f',
      fillColor: (feature.getProperty('level') === 'hood' ? '#f00' : '#00f'),
      opacity: 0.5,
      fillOpacity: 0.25,
      clickable: false
    };
  });

  map.addListener('click', function(e) {
    //console.log(e.latLng);
    fetch('/about?lat=' + e.latLng.lat() + '&lng=' + e.latLng.lng())
        .then(response => response.json())
        .then((jso) => {
          /// console.log(jso);

          // reset previous
          map.data.forEach((feature) => {
            map.data.remove(feature);
          });
          info.close();

          if (jso.district.rows.length === 0) {
            alert('Outside of Iraq districts')
          } else {
            let feature = JSON.parse(jso.district.rows[0].geojson);
            map.data.addGeoJson({
              type: 'Feature',
              geometry: feature,
              properties: {
                adm1: jso.district.rows[0].adm2name,
                adm2: jso.district.rows[0].adm3name,
                level: 'district'
              }
            });

            let hoodname = '';
            if (jso.neighborhood.rows.length) {
              let hood = JSON.parse(jso.neighborhood.rows[0].geojson);
              hoodname = ' / ' + jso.neighborhood.rows[0].mahallahna;
              map.data.addGeoJson({
                type: 'Feature',
                geometry: hood,
                properties: {
                  name: hoodname,
                  level: 'hood'
                }
              });
            }

            info.setPosition(e.latLng);
            let nearest = (jso.health.rows.length === 0) ? '' : ('<hr/>Nearest health facility is <br/>"' + jso.health.rows[0].name + '"<br/> distance: ' + (jso.health.rows[0].distance/1000).toFixed(1) + 'km');
            info.setContent('<h3>' + jso.district.rows[0].adm2name + ' / ' + jso.district.rows[0].adm3name + hoodname + '</h3>' + nearest);
            info.open(map);
          }
        });
  });
}
