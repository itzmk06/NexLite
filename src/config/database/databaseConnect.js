const mongoose = require("mongoose");

const connectToDb = async () => {
    await mongoose.connect("mongodb+srv://jet15fuze:E3fQjlr4CrV42Gtb@cluster0.bqm8i.mongodb.net/nexlite?retryWrites=true&w=majority");
};

module.exports = { connectToDb };
