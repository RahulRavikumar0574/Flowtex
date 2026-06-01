# Flowtex product images

Add photos for any product by creating a folder named after the product **slug** (same as the URL on `/products/...`).

## Folder structure

```
public/images/products/
  flowtex-1000-litre-3-layer-water-tank/
    main.png      ← required (card + detail hero)
    view-2.png    ← optional gallery
    view-3.png
    view-4.png
  flowtex-500-litre-3-layer-water-tank/
    main.png
    view-2.png
    ...
```

## Finding the slug

Open **Products** on the site → click **View Details** on a tank.  
The URL path is the slug, e.g. `/products/flowtex-500-litre-3-layer-water-tank`.

Or match the product name from `src/data/products.ts` (lowercase, hyphens instead of spaces).

## File names

| File        | Use                          |
|------------|------------------------------|
| `main.png` | Product cards, primary image |
| `view-2.png` | Gallery thumbnail 2        |
| `view-3.png` | Gallery thumbnail 3        |
| `view-4.png` | Gallery thumbnail 4        |

Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp` — use `main.png` as the default name.

## Behaviour

- If `main.png` exists, it appears automatically (no code changes).
- Missing files show the placeholder until you add them.
- Gallery only shows thumbnails for images that actually exist.

No need to edit TypeScript when adding new product photos—only add files under this folder.
