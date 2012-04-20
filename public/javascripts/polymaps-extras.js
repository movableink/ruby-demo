(function(po) {
po.types.Marker = function(o, proj) {
  var g = po.svg("g"),
  c = o.coordinates,
  p = proj(o.coordinates),
  r = o.radius || 4.5,
  circle = po.svg("circle");

  circle.setAttribute("r", r);
  circle.setAttribute("style", "fill: " + o.color + ";");
  circle.setAttribute("class", "point");
  circle.setAttribute("transform", "translate(" + p.x + "," + p.y + ")");
  g.appendChild(circle);
  g.setAttribute("class", "point");
  g.setAttribute("id", o.id);
  g.addEventListener("mouseover", function(e) {
    var el = e.target.parentNode;
    el.parentNode.appendChild(el);
  }, true);

  if(o.text) {
    var t = po.svg("text");
    t.textContent = o.text;
    t.setAttribute("class", "label");
    t.setAttribute("transform", "translate(" + p.x + "," + (p.y - r - 17) + ")");
    g.appendChild(t);

    setTimeout(function() {
      var b = po.svg("path");
      var textWidth = (t.getBBox().width / 2) + 6;

      var bg = "";
      bg += "M 0, 29";
      bg += "L -5, 24";
      bg += "L " + (-1 * (textWidth - 5)) + ", 24";
      bg += "A 5, 5, 0, 0, 1, " + (-1 * textWidth) + ", 19";
      bg += "L " + (-1 * textWidth) + ", 17";
      bg += "L " + (-1 * textWidth) + ", 12";
      bg += "L " + (-1 * textWidth) + ", 7";
      bg += "L " + (-1 * textWidth) + ", 5";
      bg += "A 5, 5, 0, 0, 1, " + (-1 * (textWidth - 5)) + ", 0";
      bg += "L 5, 0";
      bg += "L 0, 0";
      bg += "L 5, 0";
      bg += "L " + (textWidth - 5) + ", 0";
      bg += "A 5, 5, 0, 0, 1, " + textWidth + ", 5";
      bg += "L " + textWidth + ", 7";
      bg += "L " + textWidth + ", 12";
      bg += "L " + textWidth + ", 17";
      bg += "L " + textWidth + ", 19";
      bg += "A 5, 5, 0, 0, 1, " + (textWidth - 5) + ", 24";
      bg += "L 5, 24";
      bg += "Z";

      b.setAttribute("d", bg);
      b.setAttribute("class", "label");
      b.setAttribute("transform", "translate(" + (p.x) + "," + (p.y - r - 32) + ")");
      g.appendChild(b);
      g.appendChild(t);

    }, 5);

  }

  return g;
};
})(org.polymaps);
