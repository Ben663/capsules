// build the table
const table = document.querySelector('.table');
const titles = ['id','firstName','lastName','age','cupsul','hobby','city','gender'];
let allUsersData = [];

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
    //meragdData.sort((a, b) => a.id - b.id);
    //console.log(meragdData);
    const people = [];
    for (let index = 0; index < meragdData.length; index++) {
        const person = fetchData(`https://capsules7.herokuapp.com/api/user/${meragdData[index].id}`);
        people.push(person);
    }
    // log data
    const data = await Promise.all(people)
    console.log(data);

    const structurData = structurChar(meragdData, people);
    //console.log(structurData); // will return the all with obj
    return data;
};

const structurChar = (arr) => {
    return arr.map(({ id, firstName, lastName }) => {
        //const newChar = 
        return {
            id,
            firstName: firstName,
            lastName: lastName,
        };
    });
};
//getData();

// display the data
const paintHead = (text) => {
    const heading = document.createElement('div');
    heading.textContent = text;
    heading.classList.add('title');
    table.appendChild(heading);
}
const paintRow = (arrOfData) => {
    const row = document.createElement('div');
    row.classList.add('row');

    arrOfData.forEach(element => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = element;
        row.appendChild(cell);
    });
    table.appendChild(row);
};
const setSpinner = (Boolean) => {
    if (Boolean) {
        const spinner = document.createElement('h3');
        spinner.textContent = 'loading';
        table.appendChild(spinner);
    } else {
        const spinner = document.querySelector('h3');
        table.removeChild(spinner);
    }
}

const paintPage = async () => {
    let isloading = true;
    paintHead('all class');
    paintRow(titles);
    setSpinner(isloading);

    const charData = await getData();
    charData.forEach((char) => {
        const newArr = [char.id,
            char.firstName,
            char.lastName,
            char.age,
            char.capsule,
            char.hobby,
            char.city,
            char.gender
        ];
        paintRow(newArr);
    });
    isloading = false;
    setSpinner(isloading);
}
paintPage();


// style html