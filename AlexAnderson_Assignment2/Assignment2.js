/** -----------------------------------------------------------------------------
 *
 * @file  Assignment2.js
 * @author Alex Anderson 
 * Assignment:   EECS-368 Assignment 2
 * @brief This program will create a class similar to the set data structure
 * @date 09/20/2021
 *
 ---------------------------------------------------------------------------- **/
class Group
{
	/** 
	*The constructor takes in members to add to the group and 
	*creates an empty array to store the elements of the group in.
	*
	*@param members, these are the elements of the group or set 
	*@return none 
	*/ 
	constructor(members)
	{
		this.members = ([]);
	}
	
	/** 
	*add takes in a value to be added to the group. It first checks if
	*the value is already in the group we want to add to. Then a new group is
	*created and returned with the new value pushed into the group's array.
	*
	*@param value, this is the new value that needs to be added into the group. 
	*@return new group with the new value added in
	*/ 
	add(value)
	{
		if(this.has(value)) 
		{
			return this;
		}
		else
		{
			return new Group(this.members.push(value))
		}
	}
	
	/** 
	*remove is very similar to add, but instead it removes the value passed into it.
	*It first checks if this value exists in the group. Then, a new group is returned with
	*the value removed using filter().
	*
	*@param value, this is the new value that needs to be removed from the group. 
	*@return new group with the given value removed
	*/ 
	remove(value)
	{
		this.members.remove=function(value)
		{
			return this.members.splice(this.members.indexOf(value, 1));
		}
		
	}
	
	/** 
	*has takes in a value and returns true if this value is present in the
	*group and false if the value is missing from the group.
	*
	*@param value, this is the value that will be searched for in the group.
	*@return boolean value
	*/ 
	has(value)
	{
		if(this.members.includes(value))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	/** 
	*union takes in a group to perform a union between the values stored in each group.
	*This method first creates a function that takes in an array. unionOfArr creates an
	*array and fills it with the contents of values that are only present in both arrays.
	*this function then returns the spliced array. After that, the union method concatenates 
	*the two groups, leaving out any values not present in each group. This method returns
	*the array rather than the group, but it is the array within a group.
	*
	*@param group, this group will be called in the method and concatenaed with the 
	*@param group it is called on
	*@return array of elements present in at least one group
	*/ 
	union(group)
	{
		function unionOfArr(array) 
		{
			let arr = array.concat();
			for(let i=0; i<arr.length; ++i) 
			{
				for(let j=i+1; j<arr.length; ++j) 
				{
					if(arr[i] === arr[j])
					{
						arr.splice(j--, 1);
					}
				}
			}
			return arr;
		}

		let arrOne = this.members;
		let arrTwo = group.members;
		let arrThree = unionOfArr(arrOne.concat(arrTwo));
		return arrThree;
	}
	/** 
	*intersectioin takes in a group that will be intersected with the group it is called on.
	*intersection first created a function called intersectionOfArr that takes in an array
	*that represents a group. This function first adds the values from one group to an
	*array, then adds the new values from the second group to the same array. 
	*This leaves us with the intersection of groups when this function is called on groups
	*one and two.
	*
	*@param group, this group will be called in the method and concatenaed with the 
	*@param group it is called on
	*@return array of elements present in both groups
	*/ 
	intersection(group)
	{
		let arrOne = this.members;
		
		function intersectionOfArr(array)
		{
			let arr = {};
			let results = [];
			for(let i=0; i<array.length; ++i) 
			{
				arr[array[i]] = true;
			}
			for(let j=0; j<arrOne.length; ++j) 
			{
				if(arr[arrOne[j]])
				{
					results.push(arrOne[j]);
				}
			}
			return results;
		}
			
					
		let arrTwo = group.members;
		let arrThree = intersectionOfArr(arrTwo);
		return arrThree;
	}
	/** 
	*difference takes in a group and returns a group that is composed of 
	*only elements that are in the first set, but not the set it is being compared to.
	*If the set it is being called on the the parameter share every element, then 0 will
	*be returned. Other wise it returns the difference in elements.
	*
	*@param group, this group will be called in the method and concatenaed with the 
	*@param group it is called on, leaving out any values present in both groups.
	*@return array of elements present in only the first group
	*/ 
	difference(group)
	{
		let arrOne = this.members;
		let arrTwo = group.members;
		let arrThree = arrOne.filter(x => !arrTwo.includes(x));
		return arrThree;
	}
}	
let group1 = new Group();
let group2 = new Group();
group1.add(1);
group1.add(2);
group1.add(3);
console.log(group1);
console.log(group1.members);
group2.add(2);
group2.add(3);
group2.add(5);
group2.add(2);
console.log(group2);
console.log(group2.members);
console.log(group1.has(5));
console.log(group2.has(3));
console.log(group1.union(group2));
console.log(group1.intersection(group2));
console.log(group1.difference(group2));
group1.remove(1);
console.log(group1.members);
group2.remove(1);
console.log(group2.members);