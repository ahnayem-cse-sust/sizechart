import { getTemplateById } from '../services/template.server';
import { getAllTemplateContent } from '../services/template.content.server';
import { authenticate } from '../shopify.server';

// Pure JSON resource route (no default export) — GET /app/template-preview/:id
// Used by the chart-create template picker to load a single template's
// content on demand, so a person can preview it before choosing it.
export async function loader({ request, params }) {
    await authenticate.admin(request);

    const id = Number(params.id);
    const templateResponse = await getTemplateById(id);
    const { template } = await templateResponse.json();
    if (!template) {
        throw new Response("Not found", { status: 404 });
    }

    const contentResponse = await getAllTemplateContent(id);
    const { templateContents } = await contentResponse.json();

    return Response.json({ template, templateContents });
}
