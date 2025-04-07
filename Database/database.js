let db;

let dbReady = new Promise((resolve, reject) => {
    let request = indexedDB.open("Santhwanam", 1);

    request.onupgradeneeded = function(event){
        let db = event.target.result;
        let store = db.createObjectStore("Login_Store", { keyPath: "Username" });
        let admin = {"Username": "admin", "Password": "admin"}
        store.add(admin)
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        resolve(); // ✅ DB is ready
    };

    request.onerror = function () {
        reject("Error opening database.");
    };
});

function displayRecord(store_name) {
    return dbReady.then(() => {
        return new Promise((resolve, reject) => {
            let transaction = db.transaction(store_name, "readonly");
            let store = transaction.objectStore(store_name);
            let request = store.getAll();

            request.onsuccess = function () {
                resolve(request.result);  // Send the data back
            };

            request.onerror = function () {
                reject("Error fetching data.");
            };
        });
    });
}

function getRecord(store_name, record_id){
    return dbReady.then(() => {
        return new Promise((resolve, reject) => {
            let transaction = db.transaction(store_name, "readonly");
            let store = transaction.objectStore(store_name);
            let request = store.get(record_id);

            request.onsuccess = function () {
                resolve(request.result);  // Send the data back
            };

            request.onerror = function () {
                reject("Error fetching data.");
            };
        });
    });
}

function addRecord(store_name, record) {
    dbReady.then(() => {
        try {
            let transaction = db.transaction(store_name, "readwrite");
            let store = transaction.objectStore(store_name);
            store.add(record);
        } catch (err) {
            console.log(err.message);
        }
    });
};

function updateRecord(store_name, record) {
    dbReady.then(() => {
        try {
            let transaction = db.transaction(store_name, "readwrite");
            let store = transaction.objectStore(store_name);
            store.put(record);
        } catch (err) {
            console.log(err.message);
        }
    });
};

function deleteRecord(record_id){
    let transaction = db.transaction(store_name, "readwrite");
    let store = transaction.objectStore(store_name);

    store.delete(record_id);

    transaction.oncomplete = function () {
        console.log("Record deleted:", record_id);
    };

    transaction.onerror = function () {
        console.log("Error deleting record.");
    };
}

export default {
    displayRecord,
    addRecord,
    deleteRecord,
    getRecord,
    updateRecord
};