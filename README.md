# switch between language

make your site available in different language
for your angular 7+ app

## npm i uv-translate

## usage

### first import langService to your app.module.translate

    import { LangService } from "uv-translate";
    @NgModule({
        declarations: [AppComponent],
        imports: [...your modules],
        bootstrap: [AppComponent],
        providers: [LangService],
        entryComponents: []
    })

### in your app.component.ts first set your default language

    constructor(private langService: LangService) {}
    ngOnInit() {
        this.langService.setDefaultLang("assets/i18n/en.json").then(() => {
            this.loadSpinner = false;
        });
    }

### import TranslatePipeModule to a module where you want to translate

    import { TranslatePipeModule } from "uv-translate";
    @NgModule({
        declarations: [iComponents],
        imports: [CommonModule, RouterModule.forChild(routes), iModules]
    })

### now you can translate anywhere in your component template

    <span>{{'title' | translate: 'app'}}</span>

### change language and don't forget to reload your browser

    setLang(value) {
        const lang = `assets/i18n/${value}.json`;
        this.langService.changeLang(lang).then(() => {
            this.loadSpinner = false;
            location.reload();
        });
    }

### language json file should be in 'assets/i18n/en.json' folder

    {
        "app": {
            "title": "Translator"
        },
        "expense": {
            "title": "Expense",
            "mr": "Mr.",
            "mrs": "Mrs.",
        },
        "receive": {
            "title": "Income",
            "mr": "Mr.",
            "mrs": "Mrs.",
        }
    }

### other language 'assets/i18n/fr.json' folder

    {
        "app": {
            "title": "Traducteur"
        },
        "expense": {
            "title": "Frais",
            "mr": "Mr.",
            "mrs": "Mrs.",
        },
        "receive": {
            "title": "le revenu",
            "mr": "Mr.",
            "mrs": "Mrs.",
        }
    }
