var express = require('express');
var path = require('path');
var fs = require('fs');
var { 
  parse: svgsonParse,
  stringify: svgsonStringify
} = require('svgson');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
   // return SVG XML
   res.status(200).send("works");
});

function updatePathStyleById(containerElem, pathId, oldStyle, newStyle) {
pathElem = containerElem.children.find(elem => elem.attributes.id == pathId);
pathElem.attributes.style = pathElem.attributes.style.replace(oldStyle, 
 newStyle);
}

function loadSVGImageXML(filename) {
var svgImagePath = path.join(__dirname, '..', 'public', 'images', filename);
return fs.readFileSync(svgImagePath, 'utf8');
}

module.exports = router;
