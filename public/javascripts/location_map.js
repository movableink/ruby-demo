function addMap(pointData) {
  var po = org.polymaps;
  var points = $.map(pointData, function(point) {
    return {
      geometry: {
        coordinates: [parseFloat(point[1]), parseFloat(point[0])],
        type: "Marker",
        id: 'me',
        radius: 4,
        color: "#DD5786",
        text: point[2] || ""
      }
    };
  });

  var map = po.map()
    .container(document.getElementById("poly_container")
               .appendChild(po.svg("svg")))
    .center({lat: 0.0, lon: 0.0})
    .zoom(0)
    .zoomRange([1, 11])
    .add(po.interact());

  map.add(po.image()
          .url(po.url("/images"
                      + "/d91a382ca37e4859af3dbad7328ec945"
                      + "/28808/256/{Z}/{X}/{Y}.png")
               .hosts(["a.", "b.", "c.", ""])));

  map.add(po.geoJson()
          .features(points));

}
