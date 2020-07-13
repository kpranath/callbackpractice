const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to database...'))
    .catch(err => console.error('Could not connect to database', err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        // name: 'Angular.Js course',
        author: 'Mosh',
        tags: ['Angular', 'frontend', 'javascript'],
        isPublished: true
    });

    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
}

async function getCourse() {
    const courses = await Course
        .find({ author: 'Mosh' })

        //for regular expresion
        //for author starting with Pranath
        // .find({ author: /^Pranath/})
        //for  author ending with Pranath
        // .find({ author: /Pranath$/})
        //for author containing Pranath
        // .find({ author: /.*Pranath.*/i})     //i to make the pattern case insensitive


        // .find({price: {$gt: 10}})  //gt is operator. So key is operator and is specified with $. other comparisions (eq,ne,gt,gte,lt,lte,in,nin)
        // .find({price: {$gt: 10, $lt:20}}) //for rows in range
        // .find({ price: { $in: [10, 15, 20] } })


        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });


    // for logical operators in the querying... or and and are the logical operators
    // const courses = await Course
    // .find()
    // .or([ {author: 'Mosh' },{isPublished: true } ])
    // .limit(10)
    // .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });


    //for counting
    // const courses = await Course
    //     .find({ author: 'Mosh' })
    //     .limit(10)
    //     .sort({ name: 1 })
    //     .count();

    //for pagination
    // const pageNumber = 2;
    // const pageSize = 10;
    // const courses = await Course
    //     .find({ author: 'Mosh' })
    //     .skip((pageNumer-1)*pageSize)
    //     .limit(pageSize)
    //     .sort({ name: 1 })
    //     .count();


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