/* 
algorithm
--> app run 
--> set default language
if cant find lang from local storage
  --> setLangToLocallStorage
else return promise

--> pipe translateLang from service by get lang from local storage
--> change language by setLangToLocallStorage then reload window

*/
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const LANG_KEY = "4330cbb8c7de67cb5ecfd025f1b08833";
@Injectable({
  providedIn: "root"
})
export class LangService {
  // defaultPathEN = `assets/i18n/en.json`;

  constructor(private http: HttpClient) {}
  setDefaultLang(langPath: string): Promise<string> {
    const localLang = this.getLangFromLocalStorage();
    if (!localLang) {
      return this.setLangToLocalStorage(langPath);
    } else {
      return new Promise<string>((resolve, reject) => {
        resolve("");
      });
    }
  }
  private setLangToLocalStorage(langPath: string): Promise<string> {
    localStorage.removeItem(LANG_KEY);
    return new Promise<string>((resolve, reject) => {
      this.getLangFromUrl(langPath).subscribe(
        (data) => {
          var lData: iDataLocal = { lang: langPath, dict: data };
          localStorage.setItem(LANG_KEY, JSON.stringify(lData));
          console.log("success from set", LANG_KEY);
          resolve("Setting language success!");
        },
        (error) => {
          reject("Error setting language!");
        }
      );
      // setTimeout(() => {
      // }, 500);
    });
  }
  changeLang(langPath) {
    return this.setLangToLocalStorage(langPath);
  }
  private getLangFromUrl(langPath: string): Observable<iDict> {
    // const langPath = `assets/i18n/${langPath}.json`;
    // console.log("path", langPath);
    return this.http.get<iDict>(langPath);
  }
  // async changeLang(lang: string) {
  //   await this.setLangToLocalStorage(lang);
  //   location.reload();
  // }
  private getLangFromLocalStorage(): iDataLocal {
    const localLanguage_ = JSON.parse(localStorage.getItem(LANG_KEY));
    // console.log("local lang", localLanguage_["dict"]);
    return localLanguage_;
  }

  getDictByComponent(componentName: string): { [word: string]: string } {
    const lang = this.getLangFromLocalStorage();
    console.log("lang getdict", lang);
    return lang ? lang["dict"][componentName] : null;
  }
}
export interface iDict {
  app?: { [word: string]: string };
}
export interface iDataLocal {
  lang: string;
  dict: iDict;
}
