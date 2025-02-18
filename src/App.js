import React, { useState } from 'react';          // Import React and useState to manage state
import { Chessboard } from 'react-chessboard';    // Import Chessboard component from react-chessboard
import { Chess } from 'chess.js';                 // Import Chess logic from chess.js

// Main App component
const App = () => {
  // Initialize the game state using useState with a new Chess instance
  const [game, setGame] = useState(new Chess());
  const [stockfish, setStockfish] = useState(null);
  const [bestMove, setBestMove] = useState("");
  // Function to handle piece movement on the chessboard
  const onDrop = (sourceSquare, targetSquare) => {
    // Create a copy of the current game state using FEN notation
    const gameCopy = new Chess(game.fen());

    try {
      // Attempt to make the move on the game copy
      const move = gameCopy.move({
        from: sourceSquare,   // Starting square of the move
        to: targetSquare,     // Target square of the move
        promotion: 'q'        // Always promote to a queen for simplicity
      });

      // If the move is invalid, move will be null, so we return false to ignore the move
      if (move === null) {
        return false;
      }

      // If the move is valid, update the game state with the new position
      setGame(gameCopy);
      return true; // Return true to indicate a valid move
    } catch (error) {
      // Catch and log any errors that occur during the move attempt
      console.error(error.message);
      return false; // Return false to ignore the invalid move
    }
  };

  return (
    <div>
      <h1>Chess Game</h1>
      <Chessboard
        position={game.fen()}      // Set the chessboard position to the current game state
        onPieceDrop={onDrop}       // Trigger the onDrop function when a piece is moved
        boardWidth={500}           // Set the width of the chessboard to 500px
      />
    </div>
  );
};

export default App;  // Export the App component as the default export