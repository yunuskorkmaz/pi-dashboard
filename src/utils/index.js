// const baseurl = "http://0dda447e320e.eu.ngrok.io/api/";
const baseurl = "http://localhost/api/";

const appfetch = (path, options) =>
  fetch(baseurl + path, options).then((data) => data.json());

function uptimeConvert(val) {
  var d = val
  var r = {}; // result
  var s = {
    // structure
    // year: 31536000,
    month: 2592000,
    // week: 604800, // uncomment row to ignore
    day: 86400, // feel free to add your own row
    hour: 3600,
    minute: 60,
    second: 1,
  };

  Object.keys(s).forEach(function (key) {
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });
  let result = "";

  Object.keys(r).forEach(key => {
    result += r[key] + ' ' + key + ' ';
  })
  

  return result;
}



export { baseurl, appfetch, uptimeConvert };
