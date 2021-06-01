# EMagik

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
# Dsigner

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

## Udated to:

Angular CLI: 8.1.1
Node: 10.13.0
OS: win32 x64
Angular: 8.1.1
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.801.1
@angular-devkit/core         8.1.1
@angular-devkit/schematics   8.1.1
@schematics/angular          8.1.1
@schematics/update           0.801.1
rxjs                         6.5.2
typescript                   3.4.5

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Idea

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# LibTheme

# NexusFireApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## FIREBASE

`npm install firebase @angular/fire --save`
`npm install @angular/fire firebase --save`

## FIREBASE TOOLS

`npm i -g firebase-tools`

(https://www.npmjs.com/package/@angular/fire)

## Firebase 

`npm i --firebase @angular/fire`

## Toastr 

`npm install ngx-toastr --save`
`npm install @angular/animations --save`

## New Project

`ng new nexus-fire-app --prefix=nexus8 --skipTests=true --style=sass`

`npm install flatted`

`npm i nyc`


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# ms-diccionary-lib

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## Custom start w/server

Run `npm start` start with `proxyconfig`.

Cd src/test run `php -S localhost:3000` to run php server.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Build without hash

Run `ng build --prod --output-hashing none` to build the project.

## Define base href

`ng build --aot --prod --base-href ./`

`ng build --aot --prod --b-h ./`

## This will create a production version in "dist" folder

`ng build --prod`

### This will create a production version in a custom folder

`ng build --prod --output-path=custom`

<br />

## Library

Write: `ng g library nexus-lib -p nx` 
The `-p` option tells CLI to use the prefix `nx` for our selectors prefix, therefore, we will refer to our components as for example.
We can see that Angular CLI has created a directory of `'projects'`, and within this project directory `'nexus-lib'` has been created with an src directory.

## Compile the Library

Write: `cd angular-px` (app root)
then: `ng build nexus-lib` (library)

## Watch
Incremental builds can be run as a backround process in your dev environment. To take advantage of this feature add the `--watch` flag to the build command:

`ng build nexus-lib --watch`

## Installing the library

Write: `npm install dist/nexus-lib` to install as a dependency in node

## Implementing the library

To use the components in our library from the `'ms-diccionary'` application, make the following changes in `'nexus-lib/src/app/app.module.ts'`

`import {NexusLibLibModule} from 'ms-diccionary-lib';`

`imports: [NexusLibLibModule]`

## Create a component in our library

Type: `cd projects/nexus-lib/src/lib`.

then: `ng g c lib-button project=nexus-lib` 

or: `ng g c atoms/lib-button project=nexus-lib` if you want to add in `'atoms'` folder.

To make these components visible to consumers in our library (that is, our application) we need to export them.

Change `nexus-lib.module.ts` as follows:

```typescript
  exports: [
    NexusLibComponent,
    LibButtonComponent
  ]
```
<br />

To use the button component in our application, change `nexus-lib/src/app/app.component.html` and add:
`<nx-lib-button></ nx-lib-button>` (nx = prefix).

##Use TypeScript path mapping for peer dependencies

Angular libraries should list all @angular/* dependencies as peer dependencies. This insures that when modules ask for Angular, they all get the exact same module. If a library lists @angular/core in dependencies instead of peerDependencies, it might get a different Angular module instead, which would cause your application to break.

While developing a library, you must install all peer dependencies through devDependencies to ensure that the library compiles properly. A linked library will then have its own set of Angular libraries that it uses for building, located in its node_modules folder. However, this can cause problems while building or running your application.

To get around this problem you can use TypeScript path mapping to tell TypeScript that it should load some modules from a specific location. List all the peer dependencies that your library uses in the TypeScript configuration file ./tsconfig.json, and point them at the local copy in the app's node_modules folder.

```json
{
  "compilerOptions": {
    // ...
    // paths are relative to `baseUrl` path.
    "paths": {
      "@angular/*": [
        "../node_modules/@angular/*"
      ]
    }
  }
}
```
<br />


### This will create a production version in "dist" folder

`ng build --prod`


## Drag and Drop

Form: https://material.angular.io/guide/getting-started

`npm install --save @angular/material @angular/cdk @angular/animations`


### This will create a production version in a custom folder

`ng build --prod --output-path=custom`



ng g application lib-theme-tester --skipTests=true --style=scss

              "node_modules/aos/dist/aos.css",



HMR

https://codinglatte.com/posts/angular/enabling-hot-module-replacement-angular-6/


------------------
Creación de bibliotecas en angular 8

Creación de área de trabajo
Como primer paso vamos a crear un área de trabajo sin aplicación ejecutando:
ng new lib-components --create-application=false

Esto crea un área de trabajo angular que parece bastante vacío en comparación con lo que estamos acostumbrados. Aunque, tiene algunas cosas a tener en cuenta:

package.json
Incluye todas las dependencias habituales que necesitamos para Angular
angular.json
Está el archivo de configuración de Angular pero sin proyectos.

Como verán no hay ningún directorio src . Posteriormente, se agregará un directorio de proyectos cuando generemos una biblioteca o aplicación. Por lo tanto, si intentamos hacer algo como ng build o ng serve, obtenemos un error:
Could not determine a single project for the ‘build’ target.

Al crear un Área de trabajo con el nombre de nuestra biblioteca, se creó la aplicación inicial con el mismo nombre. Esto nos impediría usar ese nombre para nuestra biblioteca angular,  fue por esa razón que creamos el área de trabajo vacía en primer lugar.


Creación de biblioteca
Ahora podemos crear nuestra biblioteca:
ng g library lib-components --prefix=ng8

Esto agrega un directorio de proyectos que contiene una carpeta llamada lib-components.


Creacion de aplicacion de prueba
Finalmente, queremos una aplicación que podamos usar para llamar a nuestra biblioteca. Podemos usar esta aplicación para realizar pruebas y tal vez incluso para documentar ejemplos de cómo utilizar nuestra biblioteca Angular:
ng g application lib-components-tester

Esto agrega un directorio lib-components-tester en el directorio de proyectos para nuestra aplicación de prueba recién generada. Además, Angular CLI agrega un proyecto lib-components-tester-e2e para pruebas.

Construcción, servicio y pruebas
Ahora que tenemos nuestros proyectos implementados, podemos usar Angular CLI para build, serve y test.
Build
Para construir nuestra biblioteca ejecuta:
ng build lib-components

Para construir nuestra aplicación de test:
ng build lib-components-tester --prod

Serve
Para servir la aplicación:
ng serve lib-components-tester
Test
Podemos ejecutar pruebas unitarias tanto para nuestra biblioteca angular como para nuestra aplicación de prueba.
Para ejecutar las pruebas de la biblioteca:
ng test foo-lib

Para correr las pruebas de la aplicación:
ng test foo-tester
 
Usando la biblioteca en nuestra aplicación
Una de las ideas centrales de construir una biblioteca es que normalmente tenemos una aplicación que construimos junto con nuestra biblioteca para probarla.
En nuestro caso, tenemos nuestra aplicación de ejemplo lib-components-tester que usará nuestra biblioteca.
Hagamos una prueba simple usando nuestra biblioteca en la aplicación de prueba lib-components-tester. Para ello importamos nuestro módulo lib-components. Luego mostraremos el componente predeterminado que la CLI angular creó para nosotros en la biblioteca.
Importando el módulo lib-components
Modifiquemos nuestro AppModule en: src \ app \ app.module.ts
Agregue el LibComponentsModule . Su IDE podría pensar que lo está ayudando al intentar importar el archivo directamente. No confíes en ello. Importamos el módulo en la aplicación usando la biblioteca por su nombre así:
import { LibComponentsModule } from 'lib-components';
 
Esto funciona porque al importar una biblioteca por nombre, la CLI angular busca primero en las rutas tsconfig.json y luego en node_modules.
El archivo app.module.ts debería verse así:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LibComponentsModule } from 'lib-components';
 
@NgModule({
 declarations: [
   AppComponent
 ],
 imports: [
   BrowserModule,
   LibComponentsModule
 ],
 providers: [],
 bootstrap: [AppComponent]
})
export class AppModule { }
 
Mostrando el componente lib-components
Para simplificar las cosas, simplemente agregamos el componente generado de nuestra biblioteca a nuestra plantilla AppComponent en: src \ app \ app.component.html
<ng8-lib-components></ng8-lib-components>
 
Generando un componente de biblioteca
Cuando generamos un componente para nuestra biblioteca, usamos el flag --project para indicar a Angular CLI que queremos que genere el componente en nuestro proyecto de biblioteca y le decimos que lo ponga dentro de la carpeta molecules ya que es del tipo molécula y la llamamos button :
ng g component molecules/button --project=lib-components

Exportando el componente desde el módulo de nuestra biblioteca.
Necesitamos agregar el componente button a las exportaciones de nuestro módulo de la biblioteca. Si no lo hacemos, obtendremos un error de análisis de plantilla que nos indicará: "ng8-button" is not a known element cuándo intentamos incluir el componente en nuestra aplicación.
Así que en el archivo lib-components.module.ts agregue ButtonComponent a la exportación matriz. Tu LibComponentsModule ahora debería verse así:
 
import { NgModule } from '@angular/core';
import { LibComponentsComponent } from './lib-components.component';
import { ButtonComponent } from './modules/button/button.component';
 
@NgModule({
 declarations: [LibComponentsComponent, ButtonComponent],
 imports: [
 ],
 exports: [LibComponentsComponent, ButtonComponent]
})
export class LibComponentsModule { }
 
Añadiendo el componente al archivo de entrada.
Como notamos antes, nuestro proyecto de biblioteca tiene un archivo de entrada que define su API pública: 
projects\lib-components\src\public_api.ts
Necesitamos agregar la siguiente línea a nuestro archivo de entrada para decirle a ng-packagr que esta clase de componente debe estar expuesta a los usuarios de nuestra biblioteca:
export * from './lib/modules/button/button.component';
 
Probablemente estén pensando que esto es un poco redundante porque ya agregamos nuestro componente a las exportaciones en el módulo. Bueno, es verdad que el elemento <ng8-button></ng8-button> se puede usar en la plantilla de nuestra aplicación incluso sin agregarlo a nuestro archivo de entrada. Sin embargo, la clase ButtonComponent en sí no será exportada.
 
Usando nuestro nuevo componente de biblioteca
Finalmente, haga build de la biblioteca y agreguemos el elemento <ng8-button></ng8-button>como la última línea de su archivo app.component.html .  Corramos ng serve lib-components-tester.
 
ng g component modules/m-button --project=lib-components
build -t docker-ng-dev .
docker run -it --rm -p 4200:4200 -v ${pwd}/src:/app/src docker-ng-dev


To add project
$ firebase use --add
? Which project do you want to add? meister-argentina
? What alias do you want to use for this project? (e.g. staging) meister

Created alias meister for meister-argentina.
Now using alias meister (meister-argentina)

Update endpoint url (product-service.ts)
