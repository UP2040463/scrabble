


$( document ).ready(function() {
  load_pieces_array();        // Load up the default pieces array.
  load_scrabble_pieces();     // Load up the 7 random Scrabble pieces.
  load_droppable_targets();   // Load up the targets for the Scrabble pieces.
  update_remaining_table();   // Update the Letters Remaining table.
  fill_in_table();            // Add special items to the table.
});
