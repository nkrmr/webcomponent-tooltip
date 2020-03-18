import { DireflowComponent } from "direflow-component";
import App from "./App";

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: "webcomponent-tooltip"
  }
  // plugins: [
  //   {
  //     name: "external-loader",
  //     options: {
  //       paths: ["https://unpkg.com/@reach/tooltip@0.9.0/styles.css"]
  //     }
  //   }
  // ]
});
