import db from "../persistentStorage.js";
import {DataTypes} from "sequelize";
import {ECurrencies} from "./SharedTypes.js";

const EInvestments = {
  BULLION_COIN: 'BULLION_COIN',
  BAR: 'BAR',
};

const EMaterials = {
  GOLD: 'GOLD',
  SILVER: 'SILVER'
}

const MInvestmentMetalsPrices = db.define('InvestmentMetals', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  investment: {
    type: DataTypes.ENUM,
    values: Object.keys(EInvestments),
    allowNull: false,
  },
  material: {
    type: DataTypes.ENUM,
    values: Object.keys(EMaterials),
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.ENUM,
    values: Object.keys(ECurrencies),
    defaultValue: ECurrencies.PLN
  },
  shop: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {timestamps: true, updatedAt: false})

export {EInvestments, EMaterials};
export default MInvestmentMetalsPrices;
