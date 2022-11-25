
const mongoose = require('mongoose');


const dbConection= async()=>{

    try {
        
       await mongoose.connect(process.env.DB_CNN);
       console.log('DB Online');

    } catch (err) {
        console.log(err);
        throw new Error('Hubo un error al conectar con la BD')
    }

}

module.exports={
    dbConection
}