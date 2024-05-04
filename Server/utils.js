const { getDatabase } = require("./database")

// function that uses a-z, A-Z, 0-9, 
// &, -, _, +, to create a string from 5 char to 13 chars in length
function generateUrl() {
    const characters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_`;
    
    const length = Math.floor(Math.random() * 8) + 5;
    let result = "";
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// function that is used when the the server needs to redirect 
// from the shorturl to actual url
async function searchUrl(shorturl) {

    if (!shorturl) {
        throw new Error("Url is required");
    }

    try {
        // getting the db object  
        const db = getDatabase();

        // getting 'url' collections 
        const collection = db.collection('url');

        // finding a url object if exists in db 
        const result = await collection.findOne({ shorturl });
    
        // if found return the actual url 
        if(result !== null) {
            return result.url;
        }
        else {
            return "Not Found";
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

// function is used when /shorten route is called 
// this function actually creates the shorturl and stores it in the database 
async function storeUrl(url) {

    try {
        const db = getDatabase();

        // accessing 'url' collections 
        const collection = db.collection('url');

        // finding a url object if exists in db 
        const existingUrl = await collection.findOne({ url });
        
        // if found return the shortUrl 
        if(existingUrl !== null) {
            return existingUrl.shorturl;
        }
        // if not found create a short url, store it in the db and 
        // return newly created the shortUrl

        // // checking the uniqueness of the shortUrl         
        let shortUrl;
        let uniqueShortUrl = false;
        while (!uniqueShortUrl) {
            shortUrl = generateUrl();
            const existingShortUrl = await collection.findOne({ shorturl: shortUrl });
            uniqueShortUrl = !existingShortUrl;
        }

        const data = {
            "url": url,
            "shorturl": shortUrl
        } 

        // storing the data object (url and shortUrl) in db
        const result = await collection.insertOne(data);
        // console.log('Document inserted:', result.insertedId);

        return shortUrl;

    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    storeUrl,
    searchUrl
};
    