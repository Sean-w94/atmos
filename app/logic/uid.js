const uid = () => Math.random().toString(35).substr(2, 7);
module.exports = () => (localStorage.uid = localStorage.uid || uid());