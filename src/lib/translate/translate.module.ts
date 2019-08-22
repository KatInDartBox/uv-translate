import { NgModule } from "@angular/core";
import { TranslatePipe } from "./translate.pipe";

const myPipes = [TranslatePipe];

@NgModule({
  declarations: [myPipes],
  imports: [],
  exports: [myPipes]
})
export class TranslatePipeModule {}
