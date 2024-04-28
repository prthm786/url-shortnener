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

async function searchUrl(shorturl) {

    if(!shorturl) return "Url is required";
    
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('url');
        const cursor = await collection.findOne({ shorturl })
    
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

async function storeUrl(url) {

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('url');
        const cursor = await collection.findOne({ url })
        
        if(cursor !== null) {
            return cursor.shorturl;
        }
        else {    
            let shortUrl = generateUrl();

            while(await chkUrl(shortUrl, collection) === false) {
                shortUrl = generateUrl();
            }

            const data = {
                "url": url,
                "shorturl": shortUrl
            }

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
    