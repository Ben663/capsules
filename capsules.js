// fetch the data
const fetchData = async (url) => {
    try {  
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }

}  // will return dpromies
//fetchData(`https://capsules7.herokuapp.com/api/user/:id`); //obj with all class id
//fetchData(`https://capsules7.herokuapp.com/api/group/one`);// class with 11
//fetchData(`https://capsules7.herokuapp.com/api/group/two`); // class with 14


async function getData() {
    let dataFileOne = await (fetchData('https://capsules7.herokuapp.com/api/group/one'));
    let dataFileTwo = await (fetchData('https://capsules7.herokuapp.com/api/group/two'));
    const meragdData = dataFileOne.concat(dataFileTwo);
   // console.log(meragdData);

    const people = [];
    for (let index = 0; index < meragdData.length; index++) {
        const person = fetchData(`https://capsules7.herokuapp.com/api/user/${meragdData[index].id}`);
        people.push(person);
       
    }
    // log data
    const data = await Promise.all(people)
    //console.log(data);
    structurChar(meragdData);
};
getData();


// display the data

const structurChar = (arr, arr1) => {
    return arr.map((char) => {
        const newChar = {id: char.id, firstName: char.firstName, lastName: char.firstName};
        console.log(newChar);
    });

};


// style html