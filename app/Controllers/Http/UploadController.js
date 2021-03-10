'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */

const Helpers = use('Helpers')
const Upload = use("App/Models/Upload")
const Drive = use('Drive');

class UploadController {
  
  async create ({ request, response, view }) {
    let data = request.only(['userId'])

    const image = request.file('file', {
      types: ['image'],
      size: '2mb'
    })

    await image.move(Helpers.tmpPath('uploads'), {
      name: image.clientName,
      overwrite: true
    })

    if (!image.moved()) {
      return image.error()
    }

    data = {
      ...data,
      fileName: image.clientName
    }

    console.log(data);

    try { 
      const upload = await Upload.create(data);
    } catch(error) {
      return error
    }
    
    const uploads = await Upload.query().where('userId', data.userId).fetch()

    return uploads
  }

  async download({ request,response }) {
    const filePath = `uploads/${request.params.fileName}`;
    const isExist = await Drive.exists(filePath);

    if (isExist) {
      return response.download(Helpers.tmpPath(filePath));
    } else {
      return {
        success: false,
        msg: "File does not exist"
      }
    }
  }

  async show({ request}) {
    const userId = request.params.userId

    const uploads = await Upload.query().where({
      'userId': userId,
    }).fetch()

    return uploads;
  }

}

module.exports = UploadController
