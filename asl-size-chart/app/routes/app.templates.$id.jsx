import { useLoaderData } from '@remix-run/react';
import {
    Card,
    Text,
    Page,
    InlineStack,
    BlockStack,
    Box,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateById } from '../services/template.server';
import TemplateFormComponent from '../components/template/form';
import TemplatePreviewComponent from '../components/template/template_preview';
import BlockButtonComponent from '../components/template/block_button';
import TemplateContentComponent from '../components/template/template_content';
import EditableTitleComponent from '../components/template/editable_title';
import { getAllTemplateContent, contentFactory } from '../services/template.content.server';

import { TEMPLATE_CATEGORIES } from '../services/utils/defines';
import { TEMPLATE_BASE_URL } from '../services/constants/routes';
import { authenticate } from '../shopify.server';

export async function loader({ request, params }) {
    await authenticate.admin(request);

    const { id } = params;
    const templateResponse = await getTemplateById(Number(id));
    const { template } = await templateResponse.json();
    if (!template) {
        throw new Response("Not found", { status: 404 });
    }
    const templateContentsResponse = await getAllTemplateContent(Number(id));
    const { templateContents } = await templateContentsResponse.json();
    return Response.json({ template, templateContents });
}

export async function action({ request }) {
    await authenticate.admin(request);
    return await contentFactory({ request });
}


export default function TemplateView() {
    const { template, templateContents } = useLoaderData();

    return (
        <Page
            backAction={{ content: "Templates", url: TEMPLATE_BASE_URL }}
            title={template.title}
            primaryAction={
                <TemplatePreviewComponent template={template} templateContents={templateContents} />
            }
        >
            <TitleBar title={`Size Chart \\ ${template.title}`} />
            <BlockStack gap="400">
                <Card>
                    <BlockStack gap="200">
                        <InlineStack wrap={false} gap="200">
                            <Text variant="headingSm" as="h3" tone="subdued">Category:</Text>
                            <Text as="span">{template.category}</Text>
                        </InlineStack>
                        <Box>
                            <TemplateFormComponent templateCategories={TEMPLATE_CATEGORIES} template={template} />
                        </Box>
                    </BlockStack>
                </Card>
                <Card>
                    <BlockStack gap="400">
                        <EditableTitleComponent template={template} suffix=" Size Guide" />
                        <TemplateContentComponent templateContents={templateContents} />
                        <Box>
                            <BlockButtonComponent btnText={'+ Add New Block'} templateId={template.id} />
                        </Box>
                    </BlockStack>
                </Card>
            </BlockStack>
        </Page>
    );
}
