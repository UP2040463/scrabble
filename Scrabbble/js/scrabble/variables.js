


var pieces = [];

// JavaScript array to keep track of the CURRENT game board. (the current word that is being created)
// NOTE: "pieceX" means NO tile present on that drop zone.
// Also note this is EMPTY until tiles are placed onto the game board.
var game_board = [
  // Example of what WOULD be in this array. An obj with "id" of the dropable spot and the tile that was dropped.
  //{"id": "drop0",  "tile": "pieceX"},
];

// JavaScript array to keep track of past words
var complete_words = [
  /*
      Example of what this array with look like:
      [
        // Each word will be an array of objects
        //               "H"                             "E"                              etc
        [{ {"id": "row7_col7",  "letter": "H"}, {"id": "row7_col8",  "letter": "E"}, ...}],

        // This could be the second word that is saved
        // It would also have the id of dropped tile, plus which letter it is.
        [ {H}, {E} , {L}, {L}, {O}   ]

        Each dropID would be used to generate valid positions for starting a new word.
        Words must be formed at RIGHT angles.
        Also, the array should be used to get the letters of saved letters.
      ]
  */
];

// JavaScript array of objects to determine what letter each piece is.

var game_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
];

// Boolean for reading left to right or top to bottom
var left_right = false;

// For detecting multiple words played
var number_of_words = 0;

// Used for getting the original position of a draggable object.

var startPos;

// See the "Submit word" function for more info.
// The dictionary lookup object

var dict = {};


$.get( "files/dictionary.txt", function( txt ) {
    // Get an array of all the words
    var words = txt.split( "\n" );

    // And add them as properties to the dictionary lookup
    // This will allow for fast lookups later
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }
});

// Save the score of all the words saved. Only updates when a word is saved, which allows
// the scoring function (find_word()) to work properly.
var word_score = 0;

// First letter for 2nd and on words played.
var first_letter = "";

// Keep track of the letters of used words. This is handy for tracking adding an "S" to
// a currently created word "hope" - if we had an S, then we have 5 letters. If we remove an
// S, we have 4 letters that need to be removed.
var used_letters = 0;
