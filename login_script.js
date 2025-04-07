import dbFunctions from './Database/database.js';

async function login(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
    } else {
        let record = await dbFunctions.getRecord("Login_Store", username);
        if(record == null){
            alert("Incorrect Credentials");
        }
        else{
            if(record.Username == username && record.Password == password){
                alert("Login successful!");
                window.location.href = "./Home/home_page.html";
            }
            else{
                alert("Incorrect Credentials");    
            }
        }
    }
}

document.getElementById("login-btn").addEventListener("click", login);
