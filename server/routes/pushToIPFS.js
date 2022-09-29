import express from 'express';
import fs from 'fs';
import util, { inspect } from 'util';
import pinataSDK from '@pinata/sdk';
import HelperSVG from './helperSVG.js';

/* GET pushtoIPFS 
@Params : same as avatar API
@return : Hash:string
*/
const PushToIPFSRouter = express.Router();

PushToIPFSRouter.get('/', (req, res, next) => {

    const pinata = pinataSDK('3a85e0eab57aeb01d5d5', '869d30b2ed202acc1e2d3b46f21241aab27fd030eac0703126170f3c47bf234a');

    const options = {
        pinataMetadata: {
            name: "TestName",
            keyvalues: req.query
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    pinata.testAuthentication().then((result) => {
        //handle successful authentication here
        console.log(result);

        HelperSVG.getCachedFilePathFromQueryObject(req.query).then(avatarFilePath => {
            console.log(util.inspect(avatarFilePath));

            var filestream = fs.createReadStream(avatarFilePath, 'utf8');

            pinata.pinFileToIPFS(filestream, options).then((result) => {
                //handle results here
                console.log(result);

                res.setHeader('Content-Type', 'application/json');

                res.status(200).send(result);

            }).catch((err) => {
                //handle error here
                console.log(err);
            });

        });

    }).catch((err) => {
        //handle error here
        console.log(err);
    });
});

export default PushToIPFSRouter;
