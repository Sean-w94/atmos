const hash = () => Object.create(null)
const prim = v => v !== Object(v)

module.exports = {hash, prim}
