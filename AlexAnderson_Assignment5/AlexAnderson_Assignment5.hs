--Author: Alex Anderson
--Program: Implementation of the game of nim in Haskell
--Date: 11/01/21

import Data.Char

--function that creates the initial board in the form of a list of ints
type Board = [Int]
initial :: Board
initial = [5,4,3,2,1]

--function that switches the turn from player to player
nextPlayer:: Int -> Int
nextPlayer 1 = 2
nextPlayer 2 = 1

--function that checks the board to see if a winner can be determined(i.e. empty board)
gameOver :: Board -> Bool
gameOver = all(==0)


--function that determines if user input for their turn is valid(i.e. on the board as well as within star count)
validTurn :: Board -> Int -> Int -> Bool
validTurn board row val  = board !! (row-1) >= val

--function that removes amount of stars from a row given user input
--takes in a row and star amount and returns the updated board
playerTurn :: Board -> Int -> Int -> Board
playerTurn board row val = [update r v | (r, v) <- zip[1..] board]
    where update r v = if r == row then v - val else v

--function that handles displaying the correct number of stars in each row
rowDisplay :: Int -> Int -> IO()
rowDisplay row val = do putStr (show row)
                        putStr ": "
                        putStrLn (concat (replicate val "* "))

--function that handles displaying the five rows
boardDisplay :: Board -> IO()
boardDisplay [a, b, c, d, e] = do rowDisplay 1 a
                                  rowDisplay 2 b
                                  rowDisplay 3 c
                                  rowDisplay 4 d
                                  rowDisplay 5 e

--function that gets the players input in the form of a char in order for a turn to be made
--takes in a string to be presented to the user and returns the user's input
getUserInput :: String -> IO Int
getUserInput input = do putStrLn input
                        x <- getChar
                        putChar '\n'
                        if isDigit x then
                          return (digitToInt x)
                        else
                           --putStrLn "ERROR: Invalid input"
                             getUserInput input

--this is the main gameplay loop. It begins by displaying the current board.
--next, this functuin begins by calling gameOver to determine if gameplay should continue
--if yes, then the user is presented with a prompt to enter a row and star number.
--if the move is valid then the stars will be removed and the new game board will be displayed for the--next player.
play :: Board -> Int -> IO()
play board player =
  do putChar '\n'
     boardDisplay board
     if gameOver board then
        do putChar '\n'
           putStr "Player "
           putStr (show (nextPlayer player))
           putStrLn " Has Won! Congrats!"
     else
        do putChar '\n'
           putStrLn (show player)
           row <- getUserInput "Enter a row number to remove from: "
           val <- getUserInput "Enter the amount of stars to remove from the row: "
           if validTurn board row val then
              play (playerTurn board row val)(nextPlayer player)
           else
            --putChar '\n'
	          --putStrLn "ERROR: Invalid input"
		          play board player

--function that kicks off the main gameplay loop with the initial board.
nim :: IO()
nim = play initial 1


main = nim

