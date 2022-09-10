const path = require('path')

const CHAIN = Symbol('kalycoin.chain')

module.exports = {
  get chain() {
    this[CHAIN] = this[CHAIN] || this.kalycoininfo.lib.Chain.get(this.config.kalycoin.chain)
    return this[CHAIN]
  },
  get kalycoininfo() {
    return {
      lib: require(path.resolve(this.config.kalycoininfo.path, 'lib')),
      rpc: require(path.resolve(this.config.kalycoininfo.path, 'rpc'))
    }
  }
}
