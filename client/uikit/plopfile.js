module.exports = function(plop) {
  plop.setGenerator("UIKit", {
    description: "Generate UIKit component skeleton",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name please"
      }
    ],
    actions: [
      {
        type: "add",
        path: "./{{properCase name}}/index.js",
        templateFile: "./template/index.hbs"
      },
      {
        type: "add",
        path: "./{{properCase name}}/readme.md",
        templateFile: "./template/readme.hbs"
      },
      {
        type: "add",
        path: "./{{properCase name}}/stories.js",
        templateFile: "./template/stories.hbs"
      },
      {
        type: "add",
        path: "./{{properCase name}}/{{lowerCase name}}.test.js",
        templateFile: "./template/test.hbs"
      }
    ]
  });
};
