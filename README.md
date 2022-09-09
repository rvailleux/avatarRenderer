- [Avatar Composition API](#avatar-composition-api)
  - [Installation](#installation)
  - [Start avatar composition server](#start-avatar-composition-server)
  - [Avatar composition API use & parameters](#avatar-composition-api-use--parameters)
  - [Adding a new feature or a new version](#adding-a-new-feature-or-a-new-version)
- [Web Client application](#web-client-application)
  - [Installation](#installation-1)
# Avatar Composition API
## Installation
`cd server`
`npm install`

## Start avatar composition server
`npm run start`

## Avatar composition API use & parameters
Here is the simplest exemple
[http://localhost:3030/avatar?skin=tone1](http://localhost:3030/avatar?skin=tone1)

|Query args|Type|Values|
|---|---|---|
|eyes_style   | string |undefined, "brush"|
|right_accessories| string  |undefined, "phone", "nabaztag", "pipe"|
| hair_style  | string  |undefined, "long_falling", "native_coiff", "top_notch", "short_bushy","long_curly", "short_curly"|
|  face_decoration |  string | undefined, "mustach", "beard"|
|clothes| string  |undefined, "dress_decoltee", "native_tunique", "wooly_jumper", "suit", "gentle_dress", "gentle_jumper"|
|   eyes| string  |undefined, "dark", "brown", "green", "blue"|
|   skin|  string |undefined, "tone1", "tone2", "tone3", "tone4"|


Those values are defined by the layers names contained in the /server/public/images/avatarComposition.svg file.
This file must be edited with [Inkscape](https://inkscape.org/).
Each layer correspond to a 'feature'. 
Each nested layer correspond to a 'version' of that feature.

Eg: You will find a layer named 'eyes' that groups nested layers "dark", "brown", "green", "blue".

A more complete example
[http://localhost:3030/avatar?skin=tone1&eyes=dark&clothes=native_tunique&face_decoration=mustach&hair_style=native_coiff](http://localhost:3030/avatar?skin=tone1&eyes=dark&clothes=native_tunique&face_decoration=mustach&hair_style=native_coiff)

## Adding a new feature or a new version
For extending the possibilities, you need to:
1. Open server/public/images/avatarComposition.svg with Inkscape. 
2. Add a new layer :
    . A top-level layer will represent a new feature
    . A layer nested under a top-level layer will represent a new version of the feature.
3. Rename the layer with a __plain text identifier__ (must be unique across all the layers). 
4. Draw the additionnal version. 

If you add a ne feature, then open /server/routes/avatar.js and add an entry in the `features` array declaration that check the query parameter for using the __plain text identifier__ to set a version (string value or undefined). 

# Web Client application
## Installation
`cd client` 
`npm install`