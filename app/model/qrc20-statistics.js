module.exports = app => {
  const {INTEGER, CHAR} = app.Sequelize

  let KRC20Statistics = app.model.define('krc20_statistics', {
    contractAddress: {
      type: CHAR(20).BINARY,
      primaryKey: true
    },
    holders: INTEGER.UNSIGNED,
    transactions: INTEGER.UNSIGNED
  }, {freezeTableName: true, underscored: true, timestamps: false})

  KRC20Statistics.associate = () => {
    const {Qrc20: KRC20} = app.model
    KRC20Statistics.belongsTo(KRC20, {as: 'krc20', foreignKey: 'contractAddress'})
    KRC20.hasOne(KRC20Statistics, {as: 'statistics', foreignKey: 'contractAddress'})
  }

  return KRC20Statistics
}
