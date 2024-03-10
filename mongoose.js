const mongoose = require('mongoose');
require('dotenv').config();

// Define schema
const { Schema } = mongoose;
const personSchema = new Schema({
name: { type: String, required: true },
age: Number,
favoriteFoods: [String]
});

// Create model
const Person = mongoose.model('Person', personSchema);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create and save a record
const createAndSavePerson = (done) => {
const person = new Person({
    name: 'John',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
});

person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
});
};

// Create many records
const createManyPeople = (arrayOfPeople, done) => {
Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
});
};

// Find all people with a given name
const findPeopleByName = (personName, done) => {
Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
});
};

// Find one person with a certain food in favorites
const findOnePersonByFood = (food, done) => {
Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
});
};

// Find person by _id and update
const findAndUpdatePerson = (personId, done) => {
Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("Hamburger");
    person.save((err, updatedPerson) => {
if (err) return console.error(err);
done(null, updatedPerson);
    });
});
};

// Find one person by name and update age
const findAndUpdatePersonByName = (personName, done) => {
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, updatedPerson) => {
    if (err) return console.error(err);
    done(null, updatedPerson);
});
};

// Delete one person by _id
const removePersonById = (personId, done) => {
Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    done(null, removedPerson);
});
};

// Delete all people whose name is "Mary"
const removeMary = (done) => {
Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    done(null, result);
});
};

// Find people who like burritos, sort by name, limit to 2, and hide age
const queryChain = (done) => {
Person.find({ favoriteFoods: "Burritos" })
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err, data) => {
    if (err) return console.error(err);
done(null, data);
        });
};

// Export functions for testing
module.exports = {
createAndSavePerson,
createManyPeople,
findPeopleByName,
findOnePersonByFood,
findAndUpdatePerson,
findAndUpdatePersonByName,
removePersonById,
removeMary,
queryChain
};
