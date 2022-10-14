import pinataSDK from "@pinata/sdk"
import fs from "fs";

class HelperIPFS {

}

HelperIPFS.getMetaDataJSONObject = function(name, description, reqQueryCleaned, avatarIpfsHash){

    return {
        "name": name,
        "description": description, 
        "external_url": "", 
        "image": "ipfs://" + avatarIpfsHash, 
        "attributes": Object.entries(reqQueryCleaned).map((keyvaluePairsArray) => {
            return {
                "trait_type" : keyvaluePairsArray[0], 
                "value" : keyvaluePairsArray[1]
            }
        })
      }
    
}

HelperIPFS.uploadJSONToIPFS = function (jsonObject, filename, keyvalues = null) {
    return new Promise((resolve, reject) => {

        const pinata = pinataSDK(process.env.PINATA_APIKEY, process.env.PINATA_SECRET);
        
        const options = {
            pinataMetadata: {
                name: filename,
                keyvalues: keyvalues
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        pinata.pinJSONToIPFS(jsonObject, options).then(result => {
            resolve(result);

        }).catch(err => {
            //handle error here
            console.error(err);
        });
    });
}

HelperIPFS.uploadFileToIPFS = function (filePath, filename, keyvalues = null) {
    return new Promise((resolve, reject) => {

        const pinata = pinataSDK(process.env.PINATA_APIKEY, process.env.PINATA_SECRET);

        const options = {
            pinataMetadata: {
                name: filename,
                keyvalues: keyvalues
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        pinata.testAuthentication().then((result) => {

            var filestream = fs.createReadStream(filePath, 'utf8');

            pinata.pinFileToIPFS(filestream, options).then((result) => {
                resolve(result);

            }).catch((err) => {
                //handle error here
                console.error(err);
            });
        })
            .catch(err => {
                console.error(err);
            });
    });
}

export default HelperIPFS