const express = require("express"); 
const cheerio = require("cheerio"); 
const axios = require("axios"); 
const fs = require("fs"); 
const fsPromises = require("fs/promises"); 
const app = express(); 

const scrapeData = async () => {
    const BASE = "https://www.nobroker.in";
    const URL = `${BASE}/flats-for-sale-in-koramangala_bangalore`;
    // fetch data
    let data; 
    try{
        data = await axios.get(URL); 
        const $ = cheerio.load(data.data);
        let file = await fsPromises.open("data.json", 'w'); 
        let article = $('article[aria-label = "article"]');
      
        const houses = article.map(async (index, item) => {
            const title = $(item).find('h2[class = "heading-6 flex items-center font-semi-bold m-0"]').text(); 
            console.log(await title)
            const url = await $(item).find('a[class = "overflow-hidden overflow-ellipsis whitespace-nowrap max-w-80pe po:max-w-full"]').attr("href");
            const address = await $(item).find('div[class = "mt-0.5p overflow-hidden overflow-ellipsis whitespace-nowrap max-w-70 text-gray-light leading-4 po:mb-0.1p po:max-w-95"]').text(); 
            const propertyAge = await getPropertyAge(`${BASE}/${url}`); 
            const propertyOb = {
                title : title, 
                url : url, 
                address : address, 
                propertyAge : propertyAge
            }
            return propertyAge; 
        }); 
        // console.log(houses); 
        // await file.writeFile(JSON.stringify(...houses)); 
        file?.close(); 
    }
    catch(error){
        console.log(error); 
    }
   
}

const getPropertyAge = async (url) => {
    try{
        let page = await axios.get(url); 
        const $ = cheerio.load(page.data)
        const findAge = $('div[class = "nb__28cwR"]'); 

        const propertyAge = findAge.children()[0].children[2].children[0].children[0].data; 
        return propertyAge; 
    }
    catch(error){   
        console.log(error); 
    }
}

scrapeData(); 



app.listen(3000, () => console.log('SERVER INITIALIZED')); 