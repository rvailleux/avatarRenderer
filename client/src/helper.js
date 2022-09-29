import React from "react";
import util from "util";

class Helper { };

Helper.addPropertyToChildren = (children, propertiesToAdd) => {

  return React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, propertiesToAdd);
    }
    return child;
  });
};


// Get the version in queryParams for all possible features.
// queryParams not described in allPossibleVersion are ignored
// urlsSearchParamsObject : URLSearchParams
// allPossibleVersions : {feature : string => versions : string[]}
Helper.queryParamsToVersionsObject = (urlsSearchParamsObject, allPossibleVersions) => {
  
  const versionObject = {};

  // For each entry (feature) of all possible Versions, 
  // get the value from the queryParams
  Object.keys(allPossibleVersions).forEach(function (feature) {

    if (urlsSearchParamsObject.get(feature) !== null) {
      versionObject[feature] = urlsSearchParamsObject.get(feature);
      console.log(feature + " : " + versionObject[feature])
    }
  });


    return versionObject;
};

//versionsObject {featureName : string => versionName : string}
Helper.avatarQueryParamsForge = (versionsObject) => {
  var querystring = "";

  for (var featureName in versionsObject) {
    if (versionsObject.hasOwnProperty(featureName)) {
      querystring += featureName + "=" + versionsObject[featureName] + "&";
    }
  }

  return querystring;
}

Helper.avatarURLForge = (versionsObject) => {

  return process.env.REACT_APP_AVATAR_GENERATOR_BASEURL +
    "?" + Helper.avatarQueryParamsForge(versionsObject);
};

export default Helper;