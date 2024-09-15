import { inject, Injectable } from "@angular/core";
import { ComponentData } from "../../models/Data";
import { ExampleData } from "../../models/ExampleData";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { MaintainAllComponentData } from "../components/editor/data-maintainer";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {

  httpClient = inject(HttpClient);

  async loadData(dataKey: string): Promise<ComponentData | undefined> {
    //let string = `{"userId":"1","type":"container","css":"container","classes":[],"slot":[{"userId":"2","type":"text","css":"","classes":[],"text":"Hello, World!","path":"1.2"},{"userId":"component-2","type":"image","css":"","classes":[],"src":"https://via.placeholder.com/300","path":"1.component-2"},{"userId":"component-1","type":"text","css":"","classes":[],"text":"New Text","path":"1.component-1"},{"userId":"5","type":"image","css":"","classes":[],"src":"https://via.placeholder.com/150","path":"1.5"},{"userId":"component","type":"text","css":"","classes":[],"text":"New Text","path":"1.component"},{"userId":"5","type":"container","css":"","classes":[],"slot":[{"userId":"4","type":"text","css":"","classes":[],"text":"Hello, World!","path":"1.5.4"}],"path":"1.5"},{"userId":"3","type":"image","css":"","classes":[],"src":"https://via.placeholder.com/150","path":"1.3"}],"path":"1"}`

    //let string = await fetch(`https://kuktaimages.blob.core.windows.net/foodimages/to-azure-example.txt`).then(res => res.text());
    let string = await firstValueFrom(this.httpClient.get(`https://kuktaimages.blob.core.windows.net/foodimages/to-azure-example.txt`, { responseType: 'text' }));
    let data = JSON.parse(string);

    return data;
  }

  dataState: { [key: string]: ComponentData } = {};

  public data$ = new BehaviorSubject<{ [key: string]: ComponentData }>({});


  constructor() { }

  saveLocalData(key: string, data: ComponentData) {
    localStorage.setItem(key, JSON.stringify(data));
    console.log("Saved data", key);
  }

  locaLodalData(key: string) {
    let data = localStorage.getItem(key);
    data ??= JSON.stringify(ExampleData);
    if (data) {
      let parsedData = JSON.parse(data);
      MaintainAllComponentData(parsedData);
      this.dataState[key] = parsedData;
      console.log("Loaded data", this.dataState[key]);
      this.data$?.next(JSON.parse(JSON.stringify(this.dataState)));
    }
  }


  getData(dataKey: string): ComponentData | undefined {
    if (!this.dataState[dataKey]) {
      console.log("Loading data from local storage");
      this.locaLodalData(dataKey);
    }
    return this.dataState[dataKey];
  }

}
