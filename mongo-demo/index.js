const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connnected to Mongo DB...'))
    .catch(err => console.log('Could not connect to Mongo DB. ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.Now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(name, author, tags, isPublished) {

    const nodeJSCourse = new Course({
        name: name,
        author: author,
        tags: tags,
        isPublished: isPublished
    });

    const result = await nodeJSCourse.save();
    console.log(result);
}xse

async function getCourses() {
    // const courses = await Course.find();
    const courses = await Course
        // .find( {author: 'maxys', isPublished: true})
        // .find({ price: { $gte: 10, $lt: 20 } })
        // .find({ price: { $in: [10, 20, 15] } })

        // .find()
        // .or( [{author: 'maxys'}, {isPublished: true}] )
        // .or( [{author: 'maxys'}, {isPublished: true}] )

        // Author starts with maxys
        .find( { author: /^maxys/ } )

        .limit(10)
        .sort({name: 1})
        .select({ name: 1, tags: 1 });

        // api/courses?pageNumber=2&pageSize=10
        // .skip((pageNUmber-1)*pageSize)
        // .limit(pageSize)
        
    console.log(courses);
}

// createCourse('Dot Net', 'maxysio', ['C#'], true);
getCourses();
