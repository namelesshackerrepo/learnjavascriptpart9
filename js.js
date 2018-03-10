// this creates an array named members in the local storage, only if there currently is not one there.  
if (!localStorage.members) {
  //only strings can be stored in local storage.  JSON.stringify is a built in JavaScript
  //function that simply turns everything into a string.  Because I've fed an array to 
  //JSON.stringify, it will return "[]".  When I want to work on this array, I'll have to use
  //JSON.parse to un stringify it.  
  localStorage.members = JSON.stringify([])
}

//adds click listner to the button with an id of add
document.getElementById('add').addEventListener('click', function() {
  //calls the getValues function, what does values equal?  See what getValues returns.  
  let values = getValues();
  //calls the saveToLocalAndGetCopy function, with 4 argumnets.  
  let copyOfData = saveToLocalAndGetCopy(values[0], values[1], values[2], values[3]);
  //calls the displaydata function, and use copyOfData as the argument.  
  displayData(copyOfData);
  // calls the resetInputFields function
  resetInputFields();
})

//adds click listener to the button with an id of delete
document.getElementById('delete').addEventListener('click', function() {
  deleteEntry();
})

//gets the array from localStorage.members and uses JSON.parse to un stringify it.  
//This turns it back to a normal array.  Once the data is pushed into the array, 
//it stringifies it again and saves it back to localStorage. 
//finally it returns the array.  
function saveToLocalAndGetCopy(firstName, lastName, age, relationship) {
  let storage = JSON.parse(localStorage.members);
  storage.push([firstName, lastName, age, relationship])
  let saved = JSON.stringify(storage);
  localStorage.members = saved;
  return storage;
}

//this function has a parameter expecting to receive an array,
//it loops through each sub array in the array, and builds out the string using each item in the 
//sub array.  
// For example, the array would look something like this:
//  storage = [["Joe", "Brown", "30", "Husband"], ["Bob", "Brown", "2", "son"]]
//storage[0][0] = "Joe"
//storage[1][2] = "2"
function displayData(storage) { 
  let dataToDisplay = ''
  for (var i = 0; i < storage.length; i++) {
    //think about how to access the first name, last name, relationship and age from each subarray.
    dataToDisplay += `Id: <span style="color:red">${i + 1}</span> First Name: ${/* insert code here */}, Last Name: ${/* insert code here */}, Age: ${/* insert code here */}, Relationship ${/* insert code here */} <br>`
  }

  document.getElementById('currentMembers').innerHTML = dataToDisplay;
}

//gets the input values, and saves them as a sub array in an array
//then it returns the array
function getValues() {
  var values = [
    document.getElementById('firstName').value,
    document.getElementById('lastName').value,
    document.getElementById('age').value,
    document.getElementById('relationship').value
  ]
  return values;
}

function resetInputFields() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('relationship').value = 'Myself';
}

function deleteEntry() {
  let id = document.getElementById('idNumber').value;
  let storage = JSON.parse(localStorage.members);
  storage.splice(id -1, 1);
  let toSave = JSON.stringify(storage);
  localStorage.members = toSave;
  displayData(storage);
}
