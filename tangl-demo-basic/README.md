# Basic application with an embedded viewer

![](https://slabstatic.com/prod/uploads/4ojndffx/posts/images/uFiXPQN2Lb_CaT-e1Zoxw_Rg.png)



Minimal browser-based application with an embedded Tangl viewer without any advanced features like UI, localization, extensions, work with element propertirs and so on.

## Details

- No any web framework.
- No any bundler
- Pure HTML and javascript

## Project structure

The structure of the project is very simple. The project folder will contain only three files:

```javascript
[tangl-demo-basic]
├─ index.html
├─ index.js
├─ functions.js
└─ package.json (optional)
```

- **index.html** - entry point, HTML markup and import of necessary libraries.
- **index.js -** basic code for initializing the viewer and loading the scene.
- **functions.js** - functions with requests to Tangl servers to get the necessary data.
- **package.json (optional)** - project description and dependencies for the development environment and syntax highlighting.

## Tutorial

You can find a tutorial in which this application is created and supplemented with comments:

[**Making a basic application with an embedded viewer in 5 steps**](https://docs.st.tangl.cloud/api/tangl-viewer/tangl-viewer-howto/making-app-basic/)
