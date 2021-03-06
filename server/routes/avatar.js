var express = require('express');
var path = require('path');
var fs = require('fs');
var { 
  parse: svgsonParse,
  stringify: svgsonStringify
} = require('svgson');


var router = express.Router();

/* GET avatar. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type',  'image/svg+xml');
  //res.setHeader('Content-Type',  'text/plain;charset=utf-8');
//   res.sendFile(path.resolve('public/images/avatarComposition.svg'));
// });

//getting the features to activate or defining the default ones
var features = [];
features.push(req.query.eyes_style == undefined ? "" : req.query.eyes_style);
features.push(req.query.right_accessories == undefined ? "" : req.query.right_accessories);
features.push(req.query.hair_style == undefined ? "" : req.query.hair_style);
features.push(req.query.face_decoration == undefined ? "" : req.query.face_decoration);
features.push(req.query.clothes == undefined ? "" : req.query.clothes);
features.push(req.query.eyes == undefined ? "" : req.query.eyes);
features.push(req.query.skin == undefined ? "" : req.query.skin);


 // load the original SVG image from the server's file system
 var svgImageXML = loadSVGImageXML('avatarComposition.svg');

 // use svgson to convert the SVG XML to a JSON object
 svgsonParse(svgImageXML).then(json => {

    // get the shape container that contains the paths to be manipulated
   json.children.map(feature => {
      if(feature.name == "g" && feature.attributes["inkscape:groupmode"] == "layer") {
        feature.children.map(version => {
          if(version.name == "g" && features.includes(version.attributes["inkscape:label"])){
            version.attributes.style = "display:inline";
          } else {
            version.attributes.style = "display:none";
          }
          
        });
      }
   });

   // convert JSON object back to SVG XML
   svgImageXML = svgsonStringify(json);

   // return SVG XML
   res.status(200).send(svgImageXML);
 });
});

function loadSVGImageXML(filename) {
var svgImagePath = path.join(__dirname, '..', 'public', 'images', filename);
return fs.readFileSync(svgImagePath, 'utf8');
}

module.exports = router;
