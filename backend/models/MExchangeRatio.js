import db from "../persistentStorage.js";
import {DataTypes} from "sequelize";

const MExchangeRatio = db.define('ExchangeRatio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pln: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  eur: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  chf: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.DATE,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
})

export default MExchangeRatio;
