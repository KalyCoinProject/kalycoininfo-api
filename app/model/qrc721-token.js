module.exports = app => {
  const {CHAR} = app.Sequelize

  let KRC721Token = app.model.define('krc721_token', {
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

  KRC721Token.associate = () => {
    const {Contract} = app.model
    Contract.hasMany(KRC721Token, {as: 'krc721Tokens', foreignKey: 'contractAddress'})
    KRC721Token.belongsTo(Contract, {as: 'contract', foreignKey: 'contractAddress'})
  }

  return KRC721Token
}
