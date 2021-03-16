const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/';
const dbName = 'mongo-exercises';
const collectionName = '';

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: { type: Date, default: Date.Now },
    isPublished: Boolean,
    price: { type: Number, default: 0 },
    tags: [String]
});

const Course = mongoose.model('Course', courseSchema);


function connectToDb() {
    mongoose.connect(mongoDB + dbName)
        .then(() => console.log('Connected to mongo db...'))
        .catch(err => console.log('Unable to connect to Mongo DB...', err));
}

async function getCoursesEx1() {
    // Get all the published backend courses.
    return await Course.find({ isPublished: true, tags: 'backend' })
        // Sort them by their name
        .sort({ name: 1 })
        // Pick only their name and author
        .select({ name: 1, author: 1 });
}

async function getCoursesEx2() {
    // Get all the published front end and backend courses
    return Course
        // .find( { isPublished: true, tags: { $in: ['backend', 'frontend'] } } )
        .find({ isPublished: true })
        .or([{ tags: 'frontend' }, { tags: 'backend' }])
        // Sort them by thier price in a dscending order
        .sort({ price: -1 })
        /// pick only thier name and author
        .select({ name: 1, author: 1, price: 1 });
}

async function getCoursesEx3() {
    // Get all the Published courses that are $15 or more or have the word 'by' in their title
    return Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ]);

}

async function updateCourse(id) {
    // Approach 1: Query first
    // find by Id
    // Modify
    // Save
    // Get the Course class
    const c = await Course.findById(id);
    if (!c) {
        console.log('No Course found');
        return;
    }

    console.log(c);

    // course.isPublished = true;
    // course.author = 'Another One';
    // c.set({
    //     isPublished: true,
    //     author: 'Another One'
    // });
    
    // const results = await c.save();
    // console.log(results);
    
    // Aproach 2: Update first
    // Update directly
    // Optionally get the updated document
}

async function run() {
    connectToDb();
    // const courses = await getCoursesEx3();
    // console.log(courses);
    updateCourse('5a68fdd7bee8ea64649c2777');
}

run();
