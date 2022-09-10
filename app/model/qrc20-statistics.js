module.exports = app => {
  const {INTEGER, CHAR} = app.Sequelize

  let KLC20Statistics = app.model.define('klc20_statistics', {
    contractAddress: {
      type: CHAR(20).BINARY,
      primaryKey: true
    },
    holders: INTEGER.UNSIGNED,
    transactions: INTEGER.UNSIGNED
  }, {freezeTableName: true, underscored: true, timestamps: false})

  KLC20Statistics.associate = () => {
    const {Qrc20: KLC20} = app.model
    KLC20Statistics.belongsTo(KLC20, {as: 'klc20', foreignKey: 'contractAddress'})
    KLC20.hasOne(KLC20Statistics, {as: 'statistics', foreignKey: 'contractAddress'})
  }

  return KLC20Statistics
}
