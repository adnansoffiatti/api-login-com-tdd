const mongoose = require("mongoose");

const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@apilogincomtdd.yqol9ct.mongodb.net/?retryWrites=true&w=majority`, (error) => {
        if(error) {
            return console.log("Ocorreu erro ao se conectar ao banco de dados", error);
        }
        return console.log("Conexão ao banco realizada com sucesso");
    })
}

module.exports = connectToDatabase;