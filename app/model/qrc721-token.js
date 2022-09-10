module.exports = app => {
  const {CHAR} = app.Sequelize

  let KLC721Token = app.model.define('klc721_token', {
    contractAddress: {
      type: CHAR(20).BINARY,
      primaryKey: true
    },
    tokenId: {
      type: CHAR(32).BINARY,
      primaryKey: true
    },
    holder: CHAR(20).BINARY
  }, {freezeTableName: true, underscored: true, timestamps: false})

  KLC721Token.associate = () => {
    const {Contract} = app.model
    Contract.hasMany(KLC721Token, {as: 'klc721Tokens', foreignKey: 'contractAddress'})
    KLC721Token.belongsTo(Contract, {as: 'contract', foreignKey: 'contractAddress'})
  }

  return KLC721Token
}
