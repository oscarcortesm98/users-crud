import { DataTypes, STRING } from "sequelize";
import db from '../utils/database.js';

const User = db.define("users", {

    // Defnir atributos de las tablas

    id: {
        // Tipo de dato
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true        
    },

    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

export default User;