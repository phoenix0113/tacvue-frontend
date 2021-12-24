/**
 * API file to upload to IPFS
 *
 * @package src/pages/api/upload
 * @version   1.0
 */

import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { TACVUE, UPLOAD_IMAGE_PATH, UPLOAD_JSON_PATH, PINATA_API_URL } from "@utils/constants";
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      // Save photoFile file.
      const photoFile = (await saveImageFile(files.photoFile)) + ".png";

      // Save jsong file
      const jsonFile = await saveJsonFile(JSON.stringify(fields.cardInfo));

      // Upload to Pinata
      await pinFile(photoFile, jsonFile, () => {
        pinJson(jsonFile, (ipfsHash: any) => {
          res.status(200).json({
            ipfsHash: ipfsHash,
          });
        });
      });

      await fs.unlink(photoFile);
      await fs.unlink(jsonFile);
    });
  } catch (error: any) {
    console.log("error");
  }
};

// The function to save image file on server
const saveImageFile = async (file: any) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`${UPLOAD_IMAGE_PATH}/${file.newFilename}.png`, data);
  await fs.unlinkSync(file.filepath);

  return UPLOAD_IMAGE_PATH + "/" + file.newFilename;
};

// The function to save json file on server
const saveJsonFile = (data: string) => {
  fs.writeFile(`${UPLOAD_JSON_PATH}/data.json`, JSON.parse(data), (err: any) => {
    if (err) throw err;
    console.log("File upload and save success!");
  });
  console.log("Save to server all data.");

  return UPLOAD_JSON_PATH + "/data.json";
};

// The function to upload image to IPFS
const pinFile = async (imageFile: string, jsonFile: string, callback: any) => {
  const readableStreamForFile = fs.createReadStream(imageFile);
  pinata
    .pinFileToIPFS(readableStreamForFile)
    .then((result: any) => {
      // read, change, write json file here
      fs.readFile(jsonFile, (err: any, data: any) => {
        if (err) throw err;
        let metaData = JSON.parse(data);
        metaData.image = PINATA_API_URL + result.IpfsHash;

        // add name & description to metadata
        metaData.name = TACVUE + " #" + metaData.eSignature;
        metaData.description = TACVUE + " #" + metaData.eSignature;

        // write change back to the json file.
        fs.writeFile(jsonFile, JSON.stringify(metaData), (err: any) => {
          if (err) throw err;
          console.log("Json data change written back to file " + jsonFile);
          callback();
        });
      });
    })
    .catch((err: any) => {
      console.log("Pin File: ", err);
    });
};

// The function to
const pinJson = async (jsonFile: string, callback: any) => {
  fs.readFile(jsonFile, (err: any, data: any) => {
    let metaData = JSON.parse(data);
    pinata
      .pinJSONToIPFS(metaData)
      .then((result: any) => {
        const ipfsHash = PINATA_API_URL + result.IpfsHash;
        callback(ipfsHash);
      })
      .catch((err: any) => {
        console.log("Pin Json: ", err);
      });
  });
};

export default upload;
