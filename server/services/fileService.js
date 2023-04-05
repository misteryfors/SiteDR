const fs = require('fs')
const config = require('config')
const fse = require('fs-extra');

class FileService {

    createDir(name) {
        const filePath = name
        console.log(filePath)
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                console.log(e)
                return reject({message: 'File error'})
            }
        }))
    }
    deleteFile(path) {
            fse.remove(path)
    }

    getPath(file) {
        return req.filepath + '\\' + file.user + '\\' + file.path
    }

}


module.exports = new FileService()