import("KiwiApp/KiwiPage").then((KiwiPageModule) => {
  console.log(KiwiPageModule);
  const KiwiPage = KiwiPageModule.default;
  const kiwiPage = new KiwiPage();
  kiwiPage.render();
});
import("HelloWorldApp/HelloWorldPage").then((HelloWorldPageModule) => {
  const HelloWorldPage = HelloWorldPageModule.default;
  const helloWorldPage = new HelloWorldPage();
  helloWorldPage.render();
});

console.log("dashboard");
console.log(window.location.pathname);
