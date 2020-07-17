const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true //or we can also make required in the author schema for the required property...
    }
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId);
    // course.author.name = 'Keshava Pranath';
    // course.save();

    const course = await Course.update({ _id: courseId }, {
        $set: {
            'author.name': 'Lakshya Sharma'
        }
    });
    console.log(course);
}

updateAuthor('5f1106415d301e2db09d793f');
// createCourse('Node Course', new Author({ name: 'Pranath' }));
