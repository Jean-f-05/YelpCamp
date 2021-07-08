const mongoose = require("mongoose");
const Campground = require("../models/campground");
// const cities = require("./cities");
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
    for(let i =0; i <200; i++){
        const random1000 = Math.floor(Math.random()*500);
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author: "60d9cd4dfc39a2186038935f",
            location: `${ptCities[random1000].name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point',
                coordinates: [ 
                    ptCities[random1000].longitude,
                    ptCities[random1000].latitude,
            ]},
            images: [
                {
                    "url" : "https://res.cloudinary.com/dqyywhwcg/image/upload/v1625232618/YelpCamp/y3lu9al3l91wxhmddqeb.jpg",
                    "filename" : "YelpCamp/y3lu9al3l91wxhmddqeb"
                },
                {
                    "url" : "https://res.cloudinary.com/dqyywhwcg/image/upload/v1625237760/YelpCamp/random_ldwauq.jpg",
                    "filename" : "YelpCamp/kyocvm4f5d313ew8mc2s"
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