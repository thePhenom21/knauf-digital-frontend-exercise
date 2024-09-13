const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

////////////////////////////////////////////////////////////////////
function renderColumn(title, users) {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');

    const h3 = document.createElement('h3');
    h3.textContent = title;
    columnDiv.appendChild(h3);  
    
    users.forEach((user) => {
       const cardDiv = document.createElement('div');
       cardDiv.classList.add('card');

       const nameP = document.createElement('p');
       nameP.textContent = `Name: ${user.name}`;
       cardDiv.appendChild(nameP);

       const usernameP = document.createElement('p');
       usernameP.textContent = `Username: ${user.username}`;
       cardDiv.appendChild(usernameP);  

       const websiteP = document.createElement('p');
       websiteP.textContent = `Website: ${user.website}`;
       cardDiv.appendChild(websiteP);

       columnDiv.appendChild(cardDiv);
    });
    
    const wrapperDiv = document.getElementById('wrapper');
    wrapperDiv.appendChild(columnDiv);
}

//function to parse the tld from website url for each user
function parse_tld(website){
    try{
        // tld should be the last part of a url (part after the last '.')
        const l = website.split('.');
        return l[l.length-1];
    }
    catch{
        console.log("Website URL is given in the wrong format!");
    }
}

// fetch data from the api (USERS_ENDPOINT)
async function fetch_user_data() {
    
    const res = fetch(USERS_ENDPOINT);
    const user_map = {}; //object to map tld's to user websites

    res.then((response) => response.json())
        .then((data) => {
        
        //iterate through the json data which has entries for individual users
        for (user of data){
            const website = parse_tld(user.website)  
            if (!(website in user_map)){
                user_map[website] = [user];
            } else{
                user_map[website].push(user);
            }
        }
        
        //iterate through user_map object and call renderColumn function to render users
        for ([key,value] of Object.entries(user_map)){
            renderColumn(key,value)
        }

    })
        .catch((err) => console.log(err))

}

fetch_user_data()
