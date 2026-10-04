# Design QA

final result: blocked

The production build, artifact validation and rendered HTML test passed. The
supplied About Us reference and the OfflineTTS image assets were inspected
directly. A browser rendering surface was not available in this session, so a
same-viewport visual comparison could not be completed.

## Calabi Yau update — 4 October 2026

- Requested reference: Cloudflare version `3d49f28a-4ae1-4f13-9a2d-7f7c3e1df5ee`, created 14 September 2026. Downloaded the version's Worker and compared its 25 compiled application sections with a clean build of the repository baseline; all matched exactly.
- Replaced only the hero instrument with the supplied Calabi Yau model. The GLB is byte-identical to the supplied file; creator and CC BY 4.0 attribution are present.
- Retained the existing chapter order and content, with small hero/grid/spacing adjustments and a revised technical-story heading that connects to the model's continuous form.
- Page and model backdrops are white. Existing graphite type, teal details, brand assets and dark product/technical panels remain legible.
- Created the white fallback by rendering the supplied model. The viewer supports drag, arrow keys, pause/resume and reduced motion, and suspends animation outside the viewport.
- Chromium checks passed at 1440, 1024, 768, 390 and 320px: no document overflow; tested reduced motion, drag, keyboard control, pause/resume, white section backgrounds and the failed-request fallback; no browser errors.
- Lint, production build, rendered HTML checks, unchanged emitted model/fallback checks and application TypeScript checks passed.


## Deployed hero model update — 4 October 2026

- Baseline recovered from the product-rail release worktree; its rendered text matches Cloudflare version `3d49f28a-4ae1-4f13-9a2d-7f7c3e1df5ee`.
- Hero uses the supplied Calabi Yau GLB unchanged, with monochrome materials applied in the renderer. Existing page sections, navigation, product strip, metadata and routes are retained.
- Verified 360, 390, 768, 1024, 1280 and 1440px: no horizontal overflow or overlap between hero text and model; Call and WhatsApp links have the requested destinations and accessible labels.
- Mobile does not request the GLB until “Explore in 3D” is selected. Desktop loads the renderer dynamically near the viewport. Reduced motion, pause/resume, keyboard rotation, missing model and unavailable WebGL fallback were verified.
- All existing public routes checked returned HTTP 200; no GLB requests on other routes. Browser reported no errors in normal use. Lint, production build, artifact validation and rendered HTML/model tests passed.
