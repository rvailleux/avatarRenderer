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
    return process.env.REACT_APP_AVATAR_GENERATOR_BASEURL +
      "?skin=" + versionsObject.skin +
      "&eyes=" + versionsObject.eyes +
      "&hair_style=" + versionsObject.hair_style;
  };

export default Helper;