import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import db from '../config/db.js'

//This is a model:

const Usuario = db.define('usuarios', {
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    token:DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN 
},{
    hooks:{
        //Por aquí va a pasar los datos del usuario se intersetaPassword
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)
            //hasheando el password:
            usuario.password=await bcrypt.hash(usuario.password, salt);
        }
    }
})

export default Usuario