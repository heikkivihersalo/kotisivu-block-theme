# Vite Multi-Block Plugin

A powerful Vite plugin specifically designed for building multiple WordPress Gutenberg blocks with modern JavaScript tooling. This plugin provides seamless integration between Vite's build system and WordPress block development, supporting TypeScript, React, and advanced path mapping capabilities for organized block libraries.

## Features

- **🚀 Fast Development**: Leverages Vite's lightning-fast HMR for rapid block development
- **📦 Multi-Block Architecture**: Built specifically for managing multiple blocks in organized directory structures
- **🗺️ Path Mapping Support**: Configure custom path mappings for organized block libraries (required)
- **🔍 Automatic Block Discovery**: Automatically discovers blocks from configured directories
- **⚡ TypeScript Ready**: Full TypeScript support out of the box
- **📱 React Integration**: Built-in React support with JSX transformation
- **🎯 WordPress Integration**: Seamless integration with WordPress block.json configuration
- **👀 File Watching**: Automatic rebuilds when PHP template files change
- **🔧 Flexible Configuration**: Extensive configuration options for various project structures

## Installation

The plugin is included as part of this WordPress block theme. It's automatically imported in the `vite.config.js` file:

```javascript
import { viteBlocks } from './.vite/index.ts';
```

**⚠️ Important**: This plugin requires path mappings to be configured - it does not support single block builds.

## Usage

### Required Configuration with Path Mappings

The plugin requires path mappings to discover and build blocks. Configure it in your Vite setup:

```javascript
viteBlocks({
  outDir: 'build',
  dependencies: [''],
  pathMappings: {
    'blocks/custom': 'resources/widgets/block-library/custom',
    'blocks/parts': 'resources/widgets/block-library/parts',
    'template-parts': 'resources/widgets/template-parts',
    'page-templates': 'resources/widgets/page-templates',
  },
  watch: ['./resources/widgets/**/*.php'],
})
```

## Configuration Options

### `PluginConfig`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outDir` | `string` | `null` | Output directory for built assets |
| `dependencies` | `string[]` | `[]` | External dependencies to include |
| `pathMappings` | `Record<string, string>` | `{}` | Custom path mappings for block discovery |
| `watch` | `string[]` | `['./src/template.php', './src/render.php']` | Files to watch for changes |

### Path Mappings

Path mappings allow you to organize your blocks in custom directory structures. Each mapping consists of:

- **Key**: The output path where blocks will be built
- **Value**: The source directory containing your block files

Example:
```javascript
pathMappings: {
  'blocks/custom': 'src/blocks/custom',     // Custom blocks
  'blocks/core': 'src/blocks/core',         // Core block variations  
  'components': 'src/components',           // Reusable components
}
```

## Block Structure

The plugin expects WordPress blocks to follow the standard block.json structure:

```json
{
  "name": "theme/example-block",
  "title": "Example Block",
  "category": "text",
  "script": "file:./index.js",
  "editorScript": "file:./editor.js",
  "style": "file:./style.css",
  "editorStyle": "file:./editor.css"
}
```

### Supported Block Assets

The plugin processes the following block.json properties:

- `script` - Frontend JavaScript
- `editorScript` - Editor JavaScript  
- `viewScript` - View JavaScript
- `style` - Frontend CSS
- `editorStyle` - Editor CSS
- `viewStyle` - View CSS

## File Discovery

The plugin automatically discovers blocks using path mappings only. It does not support single block builds.

### Discovery Requirements

- **Path mappings must be configured** - The plugin will not work without them
- Recursively searches directories specified in `pathMappings`
- Each mapping should point to directories containing `block.json` files

### Discovery Rules

- Searches up to 10 levels deep (configurable)
- Skips common directories: `node_modules`, `.git`, `dist`, `build`
- Processes files with extensions: `.js`, `.jsx`, `.ts`, `.tsx`

## Development Workflow

1. **Configure Path Mappings**: Set up your `pathMappings` in the plugin configuration (required)
2. **Create Blocks**: Add your block files with `block.json` configurations in the mapped directories
3. **Start Development**: Run `npm run dev` to start the Vite dev server
4. **Watch Changes**: The plugin automatically rebuilds when files change

**Note**: The plugin will display a warning if no blocks are discovered, indicating that path mappings need to be configured correctly.

## Asset Processing

### JavaScript/TypeScript

- Supports ES2020 target
- JSX transformation for React components
- TypeScript compilation
- Code splitting and optimization

### CSS/SCSS

- PostCSS processing
- SCSS/Sass compilation
- CSS optimization and minification
- Automatic vendor prefixing

## Integration with WordPress

The plugin seamlessly integrates with WordPress by:

- Reading block.json configurations
- Processing WordPress-specific asset declarations
- Maintaining compatibility with WordPress asset loading
- Supporting WordPress coding standards

## File Watching

The plugin watches specified files for changes and triggers rebuilds:

```javascript
watch: [
  './src/template.php',      // PHP templates
  './src/render.php',        // Render functions
  './resources/widgets/**/*.php', // All PHP files in widgets
]
```

## Error Handling

The plugin includes comprehensive error handling:

- Validates block.json files
- Reports missing dependencies
- Handles malformed configurations
- Provides detailed error messages

## Performance

- **Fast Builds**: Leverages Vite's optimized build pipeline
- **Efficient Watching**: Only rebuilds changed assets
- **Code Splitting**: Automatic code splitting for better performance
- **Tree Shaking**: Removes unused code from bundles

## TypeScript Support

Full TypeScript support with proper type definitions:

```typescript
import type { PluginConfig } from './.vite/types';

const config: PluginConfig = {
  outDir: 'build',
  pathMappings: {
    'blocks': 'src/blocks'
  }
};
```

## Examples

### Simple Block

```
src/
  block.json
  index.tsx
  style.css
```

### Complex Block Library

```
resources/
  widgets/
    block-library/
      custom/
        hero/
          block.json
          index.tsx
          style.scss
        testimonial/
          block.json
          index.tsx
          style.scss
      parts/
        header/
          block.json
          index.tsx
```

## Contributing

This plugin is part of the Kotisivu Block Theme. Contributions should follow the project's coding standards and include appropriate tests.

## License

GPL-2.0-or-later

## Changelog

### 1.0.0
- Initial release
- Block discovery with path mappings
- TypeScript and React support
- Asset processing pipeline
- File watching capabilities
