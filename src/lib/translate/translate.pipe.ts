import { Pipe, PipeTransform } from "@angular/core";
import { LangService } from "./translate.service";

@Pipe({
  name: "translate",
  pure: true
})
export class TranslatePipe implements PipeTransform {
  constructor(private langService: LangService) {}
  transform(key: string, componentName: string): string {
    const dict = this.langService.getDictByComponent(componentName);
    // console.log("key,dict", key, dict);
    return dict ? dict[key.toLocaleLowerCase()] : null;
  }
}
