console.log("Looping a Triangle\n");
//COMMENTS:
//Looping condition that sets the variable 'star' to '*'
//while also iterating from 1 to 8. This also dictates		
//what to change after each iteration, that is making
//the star variable increase by one after each iteration.
//Finally star is printed to the console.				 
for(let star = "*"; star.length < 9; star += "*")
{												  
    console.log(star);  
}

console.log("\n\nFizzBuzz");
//Looping condition that iterates variable num from 1 to 100.
//If Else If statement that firsts checks if num is divisible
//by 7 and 5. Then checks if the number is divisible by 7, but 
//not five and finally checks if the number is divisible by just 
//5. Then num is printed to the console after each check has been
//exhausted. If a number passes any check the print to console
//will describe the numbers divisibility.
for(let num = 1; num < 101; num++)
{
    if((num % 7 == 0) && (num % 5 == 0))
    {
        console.log("Divisible by 7 and by 5");
    }
    else if((num % 7 == 0) && (num % 5 != 0))
    {
        console.log("Divisible by 7, but not 5");
    }
    else if(num % 5 == 0)
    {
        console.log("Divisible by 5");
    }
    else
    {
        console.log(num);
    }
}

console.log("\n\nn-by-n Grid");
//Function names NbyNGrid that takes in size of the 2-D array as
//a parameter. An array is initialized and set to array.
//The first looping condition iterates from 0 to the input size
//and creates the first empty array. Then the next for loop creates 
//an array of arrays, or a 2-D array. Next the array is given an if else
//type of condition that says if j and i are both even then a space will
//be at those indicies. Otherwise, print a star or in other words when the
//indicies are odd. after each row of length size, the array is to go to a
//new line to print the next row of length size. At the end of the function
//the variable output is set to array then is printed to console.
//Finally the last step is to call NbyNgrid for the proper values, 5 and 10.
function NbyNGrid(size)
{
    var array = new Array();
    for (var i = 0; i < size; i++) 
    {
        array[i] = new Array();
        for (var j = 0; j < size; j++) 
        {
            array += (j % 2) == (i % 2) ? " ":"*";  
        }
        array += '\n';
    }
    let output = array;
    console.log(output);
}

console.log("Size = 5\n");
NbyNGrid(5);
console.log("\n\nSize = 10\n");
NbyNGrid(10);