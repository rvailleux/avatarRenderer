import React from "react";

class Helper {};

Helper.addParentCategoryIdToChildren = (children, propertiesToAdd) => {
    
    return React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, propertiesToAdd);
    }
    return child;
  });
};

Helper.avatarURLForge = (versionsObject) => {
    var querystring = "";

    for (var key in versionsObject) {
        if (versionsObject.hasOwnProperty(key)) {
            querystring+=key+"="+versionsObject[key]+"&";
        }
    }

    return process.env.REACT_APP_AVATAR_GENERATOR_BASEURL +
      "?" + querystring;
  };

export default Helper;