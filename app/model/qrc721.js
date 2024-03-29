module.exports = app => {
  const {CHAR, BLOB} = app.Sequelize

  let KRC721 = app.model.define('krc721', {
    contractAddress: {
      type: CHAR(20).BINARY,
      primaryKey: true
    },
    name: {
      type: BLOB,
      get() {
        return this.getDataValue('name').toString()
      },
      set(name) {
        this.setDataValue('name', Buffer.from(name))
      }
    },
    symbol: {
      type: BLOB,
      get() {
        return this.getDataValue('symbol').toString()
      },
      set(symbol) {
        this.setDataValue('symbol', Buffer.from(symbol))
      }
    },
    totalSupply: {
      type: CHAR(32).BINARY,
      get() {
        let totalSupply = this.getDataValue('totalSupply')
        return totalSupply == null ? null : BigInt(`0x${totalSupply.toString('hex')}`)
      },
      set(totalSupply) {
        this.setDataValue(
          'totalSupply',
          Buffer.from(totalSupply.toString(16).padStart(64, '0'), 'hex')
        )
      }
    }
  }, {freezeTableName: true, underscored: true, timestamps: false})

  KRC721.associate = () => {
    const {EvmReceiptLog: EVMReceiptLog, Contract} = app.model
    EVMReceiptLog.belongsTo(KRC721, {as: 'krc721', foreignKey: 'address', sourceKey: 'contractAddress'})
    KRC721.hasOne(EVMReceiptLog, {as: 'logs', foreignKey: 'address', sourceKey: 'contractAddress'})
    Contract.hasOne(KRC721, {as: 'krc721', foreignKey: 'contractAddress'})
    KRC721.belongsTo(Contract, {as: 'contract', foreignKey: 'contractAddress'})
  }

  return KRC721
}
