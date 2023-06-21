const express = require("express"); 
const cheerio = require("cheerio"); 
const axios = require("axios"); 
const fs = require("fs"); 
const fsPromises = require("fs/promises"); 
const cors = require("cors"); 
const app = express(); 

app.use(cors()); 

const scrapeData = async () => {
    // set the base url and the url of the page.
    
    const BASE = "https://www.nobroker.in";
    const URL = `${BASE}/flats-for-sale-in-koramangala_bangalore`;
    // fetch data
    let data; 
    try{
        data = await axios.get(URL); 
        const $ = cheerio.load(data.data);

        // open the file in read and write mode
        let file = await fsPromises.open("data.json", 'w'); 

        // get all the elements that has article tag and the article attr
        let article = $('article[aria-label = "article"]');
      
        const houses = article.map(async (index, item) => {
            // fetches the target elements from the html. 
            const title = $(item).find('h2[class = "heading-6 flex items-center font-semi-bold m-0"]').text();

            // fetches the url of the single house details
            const url =  $(item).find('a[class = "overflow-hidden overflow-ellipsis whitespace-nowrap max-w-80pe po:max-w-full"]').attr("href");

            // fetches the house address
            const address = $(item).find('div[class = "mt-0.5p overflow-hidden overflow-ellipsis whitespace-nowrap max-w-70 text-gray-light leading-4 po:mb-0.1p po:max-w-95"]').text(); 

            // get's the age of the property from the new page
            const propertyAge = await getPropertyAge(`${BASE}/${url}`); 

            // store everything in one pleace
            const propertyObj = {
                title : title, 
                url : `${URL}${url}`, 
                address : address, 
                propertyAge : propertyAge
            }
            return propertyObj; 
        }).get(); // returns all elements matched by cheerio objects

        // resolve all promises 
        const properties = await Promise.all(houses); 
        await file.writeFile(JSON.stringify({"properties" : properties})); 
        file?.close(); 
    }
    catch(error){
        console.log(error); 
    }
}

const getPropertyAge = async (url) => {
    try{
        // get the page data
        let page = await axios.get(url); 

        // convert it into string
        const $ = cheerio.load(page.data)

        // get the container that contains the information of property age.
        const findAge = $('div[class = "nb__28cwR"]'); 

        // targets the property age element 
        const propertyAge = findAge.children()[0].children[2].children[0].children[0].data; 

        // return the result
        return propertyAge; 
    }
    catch(error){   
        console.log(error); 
    }
}

scrapeData(); 



app.listen(3000, () => console.log('SERVER INITIALIZED')); 