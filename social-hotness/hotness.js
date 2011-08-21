$(function() {

  // only highlight a subset of these elements
  var selectors = 'div:not(:has(*)),'
        + 'span:not(:has(*)),'
        + 'a:not(:has(*)),'
        + 'li:not(:has(*)),';

  var rules = [
    {re: /\b\d+(,\d{3})*\s+(comments?|replies)\b/i,
     rgb: 'r'},
    {re: /\b\d+(,\d{3})*\s+(people|others?)\b/i,
     rgb: 'g'},
    {re: /\b\d+(,\d{3})*\s+(points?|votes?|likes?)\b/i,
     rgb: 'b'}
  ];

  var loc = 80;   // lower bound of color value
  var upc = 240;  // upper bound of color value

  var calc_bg_fg = function(n, rgb, nmin, scale) {
    var bg = Math.floor(upc - (n - nmin) * scale); 
    var fg = (bg < 175 ? upc : loc);
    var fgl = [fg, fg, fg];
    var bgl = [bg, bg, bg];
    bgl['rgb'.indexOf(rgb)] = upc;
    return {
      bg: 'rgb(' + bgl.join(',') + ')',
      fg: 'rgb(' + fgl.join(',') + ')' 
    };
  };

  var rgb, els, nl, nn, nmin, nmax, scale, c;
  rules.forEach(function(x) {
    rgb = x.rgb;

    els = $(selectors).filter(function() {
      return x.re.test($(this).text());
    });

    if (els === null || els.length < 3) return;

    nl = els.map(function() {
      return {
        el: this,
        val: parseInt($(this).text().split(/\s+/)[0].replace(',', ''))
      };
    }).get();

    nn = nl.map(function(x) { return x.val; });
    nmin = Math.min.apply(Math, nn);
    nmax = Math.max.apply(Math, nn);
    scale = (upc - loc) / (nmax - nmin);

    nl.forEach(function(x) {
      c = calc_bg_fg(x.val, rgb, nmin, scale);
      $(x.el).css('background-color', c.bg).css('color', c.fg);
    });
  });
});
