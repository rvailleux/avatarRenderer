import express from 'express'



/* GET pushtoETH 
@Params : 
@return : Hash:string
*/
const PushtoETH = express.Router();

PushtoETH.put('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    // send SVG XML in the response
    res.status(200).send(metadataHash);
});

export default PushtoETH;


