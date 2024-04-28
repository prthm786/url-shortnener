const { connectToMongoDB } = require("./database")

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

    if(!shorturl) return "Url is required";
    
    try {
        // using the db object to connect to mongodb 
        const db = await connectToMongoDB();

        // accessing 'url' collections 
        const collection = db.collection('url');

        // finding a url object if exists in db 
        const cursor = await collection.findOne({ shorturl })
    
        // if found return the actual url 
        if(cursor !== null) {
            return cursor.url;
        }
        else {
            return "Not Found";
        }
    } catch (error) {
        console.error(error);
        return null
    }
}

async function chkUrl(url, collection) {
    const foundurl = await collection.findOne({ url })

    if(foundurl == null) 
        return true // url is not in db
    else 
        return false // url already exists in db
}

// function is used when /shorten route is called 
// this function actually creates the shorturl and stores it in the database 
async function storeUrl(url) {

    try {
        // using the db object to connect to mongodb 
        const db = await connectToMongoDB();

        // accessing 'url' collections 
        const collection = db.collection('url');

        // finding a url object if exists in db 
        const cursor = await collection.findOne({ url })
        
        // if found return the shortUrl 
        if(cursor !== null) {
            return cursor.shorturl;
        }
        // if not found create a short url, store it in the db and 
        // return newly created the shortUrl
        else {    
            let shortUrl = generateUrl();

            // checking the uniqueness of the shortUrl 
            while(await chkUrl(shortUrl, collection) === false) {
                shortUrl = generateUrl();
            }

            const data = {
                "url": url,
                "shorturl": shortUrl
            } 

            // storing the data object (url and shortUrl) in db
            const result = await collection.insertOne(data);
            // console.log('Document inserted:', result.insertedId);

            return shortUrl;
        }
    } catch (error) {
        console.error(error);
        return null
    }
}

module.exports = {
    storeUrl,
    searchUrl
};
    