require('dotenv').config()
const aws = require("aws-sdk");
const { Identification } = require('../models');
const moment = require('moment');
const s3 = new aws.S3();

module.exports = {
  async get_post(req) {
    const url = await s3.createPresignedPost({
      Bucket: "p2p-identification",
      Fields: {
        key: `${req.query.key}`,
      },
      Expires: 30 * 60,
    })
    return url
  },
  async save_link(req) {

    const user_id = req.user.id
    const type_img = req.body.type_img
    const url = req.body.url
    let data = {}
    if ( type_img == 1 ){
       data.img_front = url
    }
    else if (type_img == 2){
       data.img_back = url
    }
    await Identification.update(data, {
      where: {
        user_id
      }
    })

    return data;
  },

  async get_dowload_url(req) {
    const type = "getObject"
    const s3 = new aws.S3();
    const user_id = req.user.id
    let url_front = ""
    let url_back = ""
    const identification = await Identification.findOne({
      where: {
        user_id
      }
    })

    if (!identification){
      throw new Error("please verify identification card first")
    }
    if (identification.img_front){
      url_front = await s3.getSignedUrlPromise(type, {
        Bucket: "p2p-identification",
        Key: identification.img_front,
        Expires: 30 * 60
      })
    }
    if (identification.img_back){
      url_back = await s3.getSignedUrlPromise(type, {
        Bucket: "p2p-identification",
        Key: identification.img_back,
        Expires: 30 * 60
      })
    }
    return { url_front, url_back };
  },
};
