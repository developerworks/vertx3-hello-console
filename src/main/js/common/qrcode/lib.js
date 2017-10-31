var QRCode = require("qrcode");


exports.toDataURL = async function (url) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, function (err, data) {
      if (err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}
