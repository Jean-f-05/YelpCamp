const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const {descriptors,places} = require("./seedHelpers")


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author: "60d9cd4dfc39a2186038935f",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point',
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
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