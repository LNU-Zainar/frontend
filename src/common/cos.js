import COS from 'cos-js-sdk-v5'
import SparkMD5 from 'spark-md5'
import * as api from '@/common/api'

const cos = new COS({
  // getAuthorization 必选参数
  getAuthorization: function (options, callback) {
    api.getUploadToken(null, {
      notifyType: 'f'
    }).then(data => {
      const credentials = data.credentials
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        StartTime: data.startTime,
        ExpiredTime: data.expiredTime
      })
    }).catch(callback)
  }
})

function md5filename (file, callback) {
  const results = /\.\w+$/.exec(file.name)
  const extname = results ? results[0] : ''
  const fileReader = new FileReader()
  fileReader.readAsBinaryString(file)
  fileReader.onload = evt => {
    const md5 = SparkMD5.hashBinary(evt.target.result)
    callback(md5 + extname)
  }
}

export function upload ({ file, onProgress, onError, onSuccess, dir = 'images/' }) {
  return new Promise((resolve, reject) => {
    md5filename(file, filename => {
      cos.putObject({
        Bucket: 'zainar-1300922881',
        Region: 'ap-guangzhou', 
        Key: dir + filename,
        StorageClass: 'STANDARD',
        Body: file,
        onProgress: evt => {
          onProgress && onProgress({
            percent: evt.percent * 100
          })
        }
      }, (err, data) => {
        if (err) {
          onError && onError(err, file)
          reject(err)
        } else {
          onSuccess && onSuccess('https://' + data.Location, file)
          resolve('https://' + data.Location, file)
        }
      })
    })
  })
}

export default cos
