# .NET Convenience

## ☕ Support the project / Apoya el proyecto

.NET Convenience is an independent side project. If it helped you, a **$1 USD** coffee goes a long way — and, honestly, it also helps with a few personal goals (like my mortgage 😁).

👉 [Buy me a coffee (PayPal)](https://paypal.me/SIPTecMX)

⭐ A review on the Marketplace or a star on GitHub also makes a big difference.

---

Extension for **Visual Studio Code** and **Cursor** that adds shortcuts for common **.NET** workflows (complements C# Dev Kit and the SDK).

**Author:** [Johnny Sánchez](https://www.johnnycsh.com) · [CreateIT](https://www.createit.com.mx) · [JohnnyC-SH](https://github.com/JohnnyC-SH)  
Repository: [github.com/JohnnyC-SH/DotNet_convenience](https://github.com/JohnnyC-SH/DotNet_convenience)

UI strings follow your editor language: **English** by default, **Spanish** when the display language is `es` (see `package.nls.*` and `l10n/bundle.l10n.*`).

---

## English

### Screenshots

Paths are **relative to the package** so they load on the Marketplace page and when installing from a VSIX.

![Command Palette with .NET prefix — includes project reference and new project in solution](docs/screenshots/en/command-palette.jpg)

![Explorer context menu on a folder](docs/screenshots/en/explorer-folder.jpg)

![Explorer context menu on a .csproj — Add project reference](docs/screenshots/en/explorer-csproj.jpg)

![Explorer context menu on a .sln — New project in solution](docs/screenshots/en/explorer-sln.jpg)

### Requirements

- [.NET SDK](https://dotnet.microsoft.com/download) installed and on your `PATH`.
- Node.js only if you **compile** or **package** the extension from source.

### Commands (palette: `Cmd+Shift+P` / `Ctrl+Shift+P`)

Search for the **`.NET:`** prefix.

| Command | Short description |
|--------|-------------------|
| Add C# class | Creates a `.cs` with inferred namespace. |
| Add C# interface | Creates an interface in the project namespace. |
| Add Razor component | Creates a `.razor` with `@namespace`. |
| Add Razor page with `@page` | Creates a page with a configurable route. |
| Add controller (API or MVC) | Web API (`ControllerBase`) or MVC (`Controller`). |
| Add project reference | Runs `dotnet add … reference …`. Right-click a folder or `.csproj`. |
| New project in solution | `dotnet new` and `dotnet sln add`. Right-click a folder or `.sln`. |

Explorer **context menu**:

- Folders and `.cs` / `.razor` files: class, interface, Razor, controller.
- Folders and `.csproj`: add project reference (the clicked project is preselected).
- Folders and `.sln`: new project in the solution (the clicked solution is used).

### Development

```bash
git clone https://github.com/JohnnyC-SH/DotNet_convenience.git
cd DotNet_convenience
npm install
npm run compile
npm test
```

Package as `.vsix`:

```bash
npx @vscode/vsce package
```

Install in Cursor/VS Code:

```bash
cursor --install-extension dotnet-convenience-0.2.8.vsix
# or: code --install-extension …
```

If you previously installed a build with publisher **`local`**, uninstall the duplicate (different extension id):

```bash
cursor --uninstall-extension local.dotnet-convenience
```

*(Adjust the `.vsix` filename to the current `package.json` version.)*

### Contributing

- **Issues:** [bugs and ideas](https://github.com/JohnnyC-SH/DotNet_convenience/issues).
- **Pull requests:** fork the repo, branch your change, and open a PR against `main` (or the repo default branch).

### More projects by Johnny Sánchez

| Project | What it is |
|---|---|
| [johnnycsh.com](https://www.johnnycsh.com) | Author site — projects, services, contact |
| [JohnnyMsgBox](https://github.com/JohnnyC-SH/JohnnyMsgBox) | MessageBox / dialogs / toasts for Blazor & HTML |
| [JohnnyIconMaker](https://github.com/JohnnyC-SH/JohnnyIconMaker) | App icon packing (Windows, macOS, mobile) |
| [create.it](https://www.createit.com.mx) | CreateIT website & brand |

### License

MIT — see `LICENSE` in this folder.

---

## Español

Extensión para **Visual Studio Code** y **Cursor** que añade atajos para flujos habituales de **.NET** (complementa C# Dev Kit y el SDK).

**Autor:** [Johnny Sánchez](https://www.johnnycsh.com) · [CreateIT](https://www.createit.com.mx) · [JohnnyC-SH](https://github.com/JohnnyC-SH)  
Repositorio: [github.com/JohnnyC-SH/DotNet_convenience](https://github.com/JohnnyC-SH/DotNet_convenience)

*(En instalaciones por `.vsix`, Cursor/VS Code a veces **no muestra** el botón “Sponsor” del `package.json`; el enlace de PayPal del inicio es el que siempre funciona.)*

Los textos de la interfaz respetan el idioma del editor: **inglés** por defecto y **español** con idioma de visualización `es`.

### Capturas

Las rutas son **relativas al paquete** para que carguen en la ficha de Marketplace y al instalar desde VSIX.

![Paleta de comandos con prefijo .NET — incluye referencia y proyecto nuevo en la solución](docs/screenshots/es/paleta-comandos.jpg)

![Menú contextual en una carpeta](docs/screenshots/es/menu-carpeta.jpg)

![Menú contextual en un .csproj — Agregar referencia a otro proyecto](docs/screenshots/es/menu-csproj.jpg)

![Menú contextual en un .sln — Nuevo proyecto en la solución](docs/screenshots/es/menu-sln.jpg)

### Requisitos

- [.NET SDK](https://dotnet.microsoft.com/download) instalado y en el `PATH`.
- Node.js solo si vas a **compilar** o **empaquetar** la extensión desde el código fuente.

### Comandos (paleta: `Cmd+Shift+P` / `Ctrl+Shift+P`)

Busca el prefijo **`.NET:`**.

| Comando | Descripción breve |
|--------|-------------------|
| Agregar clase C# | Crea un `.cs` con namespace inferido. |
| Agregar interfaz C# | Crea una interfaz en el namespace del proyecto. |
| Agregar componente Razor | Crea un `.razor` con `@namespace`. |
| Agregar página Razor con `@page` | Crea una página con ruta configurable. |
| Agregar controller (API o MVC) | Web API (`ControllerBase`) o MVC (`Controller`). |
| Agregar referencia a otro proyecto | Ejecuta `dotnet add … reference …`. Clic derecho en carpeta o `.csproj`. |
| Nuevo proyecto en la solución | `dotnet new` y `dotnet sln add`. Clic derecho en carpeta o `.sln`. |

Menú **contextual** del explorador:

- Carpetas y archivos `.cs` / `.razor`: clase, interfaz, Razor, controller.
- Carpetas y `.csproj`: agregar referencia (el proyecto clicado queda preseleccionado).
- Carpetas y `.sln`: nuevo proyecto en la solución (se usa la solución clicada).

### Desarrollo

```bash
git clone https://github.com/JohnnyC-SH/DotNet_convenience.git
cd DotNet_convenience
npm install
npm run compile
npm test
```

Empaquetar como `.vsix`:

```bash
npx @vscode/vsce package
```

Instalar en Cursor/VS Code:

```bash
cursor --install-extension dotnet-convenience-0.2.8.vsix
# o: code --install-extension …
```

Si antes instalaste la versión con publisher **`local`**, desinstala el duplicado (es otro id de extensión):

```bash
cursor --uninstall-extension local.dotnet-convenience
```

*(Ajusta el nombre del archivo `.vsix` a la versión actual del `package.json`.)*

### Colaboración

- **Issues:** [problemas y ideas](https://github.com/JohnnyC-SH/DotNet_convenience/issues).
- **Pull requests:** bifurca el repo, crea una rama con tu cambio y abre un PR contra `main` (o la rama por defecto del repo).

### Más proyectos de Johnny Sánchez

| Proyecto | Qué es |
|---|---|
| [johnnycsh.com](https://www.johnnycsh.com) | Sitio del autor — proyectos, servicios, contacto |
| [JohnnyMsgBox](https://github.com/JohnnyC-SH/JohnnyMsgBox) | MessageBox / diálogos / toasts para Blazor y HTML |
| [JohnnyIconMaker](https://github.com/JohnnyC-SH/JohnnyIconMaker) | Generación / empaquetado de iconos (Win, Mac, móvil) |
| [create.it](https://www.createit.com.mx) | Sitio y marca CreateIT |

### Licencia

MIT — ver `LICENSE` en esta carpeta.
