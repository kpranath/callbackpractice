const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to database...'))
    .catch(err => console.error('Could not connect to database', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['Web', 'Mobile', 'Network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000);
            },
            message: 'A course should have atleast one tag...'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),//to round of the value while retriving data from db;
        set: v => Math.round(v)//to round of the value while sending to database;
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular.Js course',
        category: '-',
        author: 'Mosh',
        tags: null,
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

async function getCourse() {
    const courses = await Course
        .find({ author: 'Mosh' })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

async function updateCourse(id) {
    //approach 1
    // const course = await Course.findById(id);
    // if (!course) return;

    // course.isPublished = true;
    // course.author = 'New Author';

    // const result = await course.save();
    // console.log(result);

    //approach-2
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Keshava Pranath',
            isPublished: false
        }
    });
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

// removeCourse('5f07302ef23cb93f1c42a8d1');
// updateCourse('5f07302ef23cb93f1c42a8d1');
// getCourse();
createCourse();