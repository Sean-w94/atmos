module.exports = () => {
  localStorage.uid = localStorage.uid || Math.random().toString(35).substr(2, 7);
  return localStorage.uid;
}