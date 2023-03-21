import db from "../persistentStorage.js";
import {DataTypes} from "sequelize";
import {ECurrencies} from "./SharedTypes.js";

const MGoldPrice = db.define('GoldPrice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bid: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  ask: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  mid: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  currency: {
    type: DataTypes.ENUM,
    values: Object.keys(ECurrencies),
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['currency', 'dateTime']
    }
  ],

})

export default MGoldPrice;
