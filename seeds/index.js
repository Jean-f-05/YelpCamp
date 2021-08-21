const mongoose = require("mongoose");
const Campground = require("../models/campground");
const ptCities = require("./ptCities")

const {descriptors,places} = require("./seedHelpers")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected!")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i =0; i <100; i++){
        const random1000 = Math.floor(Math.random()*500);
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author: "60e5d8bf3d454c0f2af03ab5",
            location: `${ptCities[random1000].name}`,
            title: ` ${sample(places)} ${sample(descriptors)}`,
            geometry: { 
                type: 'Point',
                coordinates: [ 
                    ptCities[random1000].longitude,
                    ptCities[random1000].latitude,
            ]},
            images: [
                {
                    "url" : "https://res.cloudinary.com/dqyywhwcg/image/upload/v1629557548/YelpCamp/w10qwccxrov6uqc2tvmo.jpg",
                    "filename" : "YelpCamp/w10qwccxrov6uqc2tvmo"
                },
                {
                    "url" : "https://res.cloudinary.com/dqyywhwcg/image/upload/v1629557499/YelpCamp/wje3k46oct2b98toz3yc.jpg",
                    "filename" : "YelpCamp/wje3k46oct2b98toz3yc"
                }
            ],
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure at labore dicta culpa officia ab aperiam illo possimus dolor quod. Pariatur explicabo quo quae aspernatur dolor molestiae aperiam soluta facilis.",
            price
        })
        await camp.save()
    }
}

seedDB()
.then(()=>{
    mongoose.connection.close();
})