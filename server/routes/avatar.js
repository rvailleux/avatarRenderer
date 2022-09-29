import express from 'express';
import path from 'path';
import fs from 'fs';
import { parse, stringify } from 'svgson';
import HelperSVG from './helperSVG.js';

const AvatarRouter = express.Router();

/* GET avatar. */
AvatarRouter.get('/', (req, res, next) => {

  HelperSVG.getCachedFilePathFromQueryObject(req.query).then(avatarfilePath => {
    fs.readFile(avatarfilePath, function (err, content) {
      res.setHeader('Content-Type', 'image/svg+xml');
      // send SVG XML in the response
      res.status(200).send(content);
    });

  }).catch(err =>{
    res.status(404).send("Cached image not found.");
  });
});

export default AvatarRouter;
