const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');
// .then(() => console.log('Connected to database...'))
// .catch(err => console.error('Could not connect to database', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    isPublished: Boolean,
    tags: [String],
    date: Date
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    const courses = await Course
        .find({ tags: 'backend', isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });

    console.log(courses);
}
getCourses();