


function load_scrabble_pieces() {
  var base_url = "img/scrabble/Scrabble_Tile_";       // base URL of the image
  var random_letter = "";                             // Random letter for the tile
  var piece = "";                                     // HTML for the current tile (image tag)
  var piece_ID = "";                                  // ID for the current tile. In the form "piece#" where # is between 0 and 6.
  var pos;                                            // Position of the rack.
  var img_left, img_top;                              // Used to set the tile's position, based on the position of the rack (pos)

  // Load up 7 pieces
  for(var i = 0; i < 7; i++) {
    // This gets a random letter (letter's index in the array).
    random_letter = get_random_tile();

    // Make the img HTML and img ID so we can easily append the tiles.
    piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_letter + ".jpg" + "'></img>";
    piece_ID = "#piece" + i;
    game_tiles[i].letter = random_letter;

    // Reposition the tile on top of the rack, nicely in a row with the other tiles.

    // We first get the rack's location on the screen. Idea from a Stackoverflow post,
    // URL: https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
    pos = $("#the_rack").position();

    // Now figure out where to reposition the board piece.
    img_left = pos.left + 30 + (50 * i);      // This controls left to right placement.
    img_top = pos.top + 30;                   // This controls top to bottom placement.

    
    // Add the piece to the screen
    $("#rack").append(piece);

    // Move the piece relative to where the rack is located on the screen.
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "absolute");

    // Make the piece draggable.
    $(piece_ID).draggable({
      appendTo: scrabble_board,
      revert: "invalid",            // This is key. Only the rack and game board are considered valid!
      start: function(ev, ui) {
        // Save original position. (used for swapping tiles)
        startPos = ui.helper.position();  // startPos is a global variable found in variables.js
      },
      stop: function() {
        // If an invalid event is found, this will return the draggable object to its
        // default "invalid" option. From this Stackoverflow post (also used in the droppable part.)
        $(this).draggable('option','revert','invalid');
      }
    });
  }
}
