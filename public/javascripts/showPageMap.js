
  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 10 // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());

const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 45 })
.setLngLat(campground.geometry.coordinates)
.setPopup(
  new mapboxgl.Popup({offset: 25})
  .setHTML(`<h3> ${campground.title}</h3><p> ${campground.location}`)
  )
  .addTo(map);