function calculateTotal() {
  let unit_price = {
    music: 500,   // Custom music
    art: 300,     // Original art
    web: 900,     // Website design
    merch: 25,    // Merchandise
    content: 400  // Content creation
  };
  
  let item_price = {};

  item_price.music = ($("#qty_music").val() * unit_price.music);
  $("#price_music").val(item_price.music);

  item_price.art = ($("#qty_art").val() * unit_price.art);
  $("#price_art").val(item_price.art);

  item_price.web = ($("#qty_web").val() * unit_price.web);
  $("#price_web").val(item_price.web);

  item_price.merch = ($("#qty_merch").val() * unit_price.merch);
  $("#price_merch").val(item_price.merch);

  item_price.content = ($("#qty_content").val() * unit_price.content);
  $("#price_content").val(item_price.content);

  let total = item_price.music + item_price.art + item_price.web + item_price.merch + item_price.content;
  $("#total_value").text(total);
}

$(function() {
  $(".qty").on("change keyup", calculateTotal);
});
