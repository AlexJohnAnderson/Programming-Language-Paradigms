--Alex Anderson
--EECS 368 Assignment 4
--10/18/2021

--replicate function
replicate :: Int -> a -> [a]
replicate n a = if n == 0 then [] else take n(repeat a)
replicate 5 "test code"


--perfects function
factors :: Int -> [Int]
factors n = [x | x <- [1..n], n `mod` x == 0]

perfects :: Int -> [Int]
perfects n = [x | x <- [2..n], sum(init(factors x)) == x]
perfects 500


--positions function

find :: Eq a => a -> [(a,b)] -> [b]
find k t = [v| (k',v) <- t, k == k']

positions :: Eq a => a -> [a] -> [Int]
positions x xs = find x (zip xs [0..n])

positions 1 [1,0,0,1,0,1,1,0]

--scalar product
scalarproduct :: [Int] -> [Int] -> Int
scalarproduct xs ys = sum [x * y | (x,y) <- zip xs ys]

scalarproduct [-1,2,3] [-4,-5,6]