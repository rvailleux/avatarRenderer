import express from 'express';
import fs from 'fs';
import util, { inspect } from 'util';
import pinataSDK from '@pinata/sdk';
import HelperSVG from './helperSVG.js';
import HelperIPFS from './helperIPFS.js';

/* GET pushtoIPFS 
@Params : same as avatar API
@return : Hash:string
*/
const PushToIPFSRouter = express.Router();

PushToIPFSRouter.get('/', (req, res, next) => {
    
    const reqQueryCleaned = HelperSVG.getCleanReqQueryObject(req.query);

    HelperSVG.getCachedFilePathFromQueryObject(reqQueryCleaned)
        .then(avatarFilePath => {
            HelperIPFS.uploadFileToIPFS(avatarFilePath, "testfile", reqQueryCleaned)
                .then(avatarHashObject => {
                    console.log("Avatar pinned : " + util.inspect(avatarHashObject));

                    HelperIPFS.uploadJSONToIPFS(
                        HelperIPFS.getMetaDataJSONObject(
                            "testName",
                            "testdescription",
                            reqQueryCleaned,
                            avatarHashObject.IpfsHash),
                        HelperSVG.getHash({ traits: reqQueryCleaned, metadatafile: "JSON" })
                    )
                    .then(metadataHash => {
                        
                        console.log(util.inspect(metadataHash));

                        res.set('Access-Control-Allow-Origin', '*');
                        res.setHeader('Content-Type', 'application/json');
                        // send SVG XML in the response
                        res.status(200).send(metadataHash);
                    })
                    .catch(err =>{
                        console.error(err);
                    });
                })
                .catch((err) => {
                    //handle error here
                    console.error(err);
                });
        }).catch((err) => {
            //handle error here
            console.error(err);
        });
});

export default PushToIPFSRouter;
