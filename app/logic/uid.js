/* eslint-env node, browser */

const uid = () => Math.random().toString(35).substr(2, 7)

module.exports = () => (sessionStorage.uid = sessionStorage.uid || uid())
