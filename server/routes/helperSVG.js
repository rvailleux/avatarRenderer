import { createHash } from 'crypto';
import fs from 'fs';
import { url } from 'inspector';
import { parse, stringify } from 'svgson';
import { inspect } from 'util';

class HelperSVG { }

/**
 * remove useless params 
 */
HelperSVG.getCleanReqQueryObject = function(reqQueryFromURL = {}){
    
    let features = {};

    Object.keys(reqQueryFromURL).forEach(function(key,index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object 
        if(reqQueryFromURL[key] !== null){
            features[key] = reqQueryFromURL[key]
        }
    });
    return features;
}

HelperSVG.getHash = function(input){
    return (createHash('sha1').update(inspect(input)).digest('hex'))
}

HelperSVG.getPathToImageFolder = function (publicURL = false) {

    if (publicURL)
        return new URL("./images/", "http://localhost:3030/");
    else
        return new URL("../public/images/", import.meta.url);
}


HelperSVG.getPathToSVGModel = function (publicURL = false) {
    return new URL(this.getPathToImageFolder(publicURL) + "avatarComposition.svg");
}

HelperSVG.getPathToCachedImageFolder = function (publicURL = false) {
    return new URL(this.getPathToImageFolder(publicURL) + "cache_rendered/");
}

HelperSVG.getPathToCachedImage = function (reqQueryObject, publicURL = false) {
    return new URL(this.getPathToCachedImageFolder(publicURL) + HelperSVG.getHash(reqQueryObject) + ".svg");
}

HelperSVG.getPublicURLToCachedImage = function (reqQueryObject) {
    return this.getPathToCachedImage(reqQueryObject, true);
}

HelperSVG.getSVGCachedFileIfExisting = function (reqQueryObject) {
    var pathToFile = this.getPathToCachedImage(reqQueryObject);

    try {
        if (fs.existsSync(pathToFile)) {
            //console.log("Exist " + pathToFile)
            return pathToFile;
        } else {
            //console.log("Don t Exist " + pathToFile)
            return null;
        }
    } catch (err) {
        console.error(err)
    }
}

HelperSVG.getFeaturesFromQuery = function (reqQueryObject) {
   return Object.values(HelperSVG.getCleanReqQueryObject(reqQueryObject));
}

HelperSVG.getSVGXMLFromQueryObject = function (reqQueryObject) {

    return new Promise((resolve, reject) => {
        var features = this.getFeaturesFromQuery(reqQueryObject);

        //Check that atleast one feature is passed in the req query
        if (features.length === 0) {
            throw ('No value in parameter. Please specify values for features.');
        }

        // load the original SVG image from the server's file system
        var svgImageXML = fs.readFileSync(this.getPathToSVGModel(), 'utf8');

        // use svgson to convert the SVG XML to a JSON object
        parse(svgImageXML).then(json => {

            // get the shape container that contains the paths to be manipulated
            json.children.map(feature => {
                if (feature.name == "g" && feature.attributes["inkscape:groupmode"] == "layer") {
                    feature.children.map((version, index) => {
                        if (version.name == "g" && features.includes(version.attributes["inkscape:label"])) {
                            version.attributes.style = "display:inline";
                        } else { 
                            version.attributes.style = "display:none";
                        }

                    });
                }
            });
            // convert JSON object back to SVG XML
            svgImageXML = stringify(json);

            resolve(svgImageXML);
        });
    });
}

HelperSVG.cacheNewAvatar = function (reqQueryObject, SVGXMLString) {
    return new Promise((resolve, reject) => {
        var pathToFile = this.getPathToCachedImage(reqQueryObject);
        // write on the filesystem
        fs.writeFile(pathToFile, SVGXMLString, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }

            resolve(pathToFile);
        });

    })
}

HelperSVG.getCachedFilePathFromQueryObject = function (reqQueryObject) {
    return new Promise((resolve, reject) => {

        var alreadyExistingCachedFilePath = HelperSVG.getSVGCachedFileIfExisting(reqQueryObject);

        if (alreadyExistingCachedFilePath !== null) {
           resolve(alreadyExistingCachedFilePath)
        //Need to create the avatar and to cache it
        } else {
            HelperSVG.getSVGXMLFromQueryObject(reqQueryObject)
                .then(svgImageXML => {
                    resolve(HelperSVG.cacheNewAvatar(reqQueryObject, svgImageXML));
                })
                .catch(err => {
                    reject(err);
                });
        }
    });
}


export default HelperSVG;