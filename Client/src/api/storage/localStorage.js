



const LocalStorage = {

    set(key, value) {
        console.log('Storage: ', Storage);
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(key, value);
        } 
        else {
            
        }
    },

    get(key) {
        return localStorage.getItem(key);
    }
}


export default LocalStorage;

