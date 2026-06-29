import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, Form } from '@remix-run/react';
import {
    Card,
    Text,
    Page,
    InlineStack,
    BlockStack,
    Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateById } from '../services/template.server';
import TemplateFormComponent from '../components/template/form';
import TemplatePreviewComponent from '../components/template/template_preview';
import BlockButtonComponent from '../components/template/block_button';
import TemplateContentComponent from '../components/template/template_content';
import { getAllTemplateContent, contentFactory } from '../services/template.content.server';

import { TEMPLATE_CATEGORIES } from '../services/utils/defines';

export async function loader({ params }) {
    const { id } = params;
    const templateResponse = await getTemplateById(Number(id));
    const { template } = await templateResponse.json();
    const templateContentsResponse = await getAllTemplateContent(Number(id));
    const { templateContents } = await templateContentsResponse.json();
    return Response.json({ template, templateContents });
}

export async function action({ request }) {
    return await contentFactory({ request });
}


export default function TemplateView() {
    const { template, templateContents } = useLoaderData();

    return (
        <Page>
            <BlockStack gap="400">
                <Card>
                    <InlineStack wrap={false}>
                        <Text variant="headingLg">Template Title: </Text>
                        <Text>{template.title}</Text>
                    </InlineStack>

                    <InlineStack wrap={false}>
                        <Text variant="headingLg">
                            Template Category:
                        </Text>
                        <Text>{template.category}</Text>
                    </InlineStack>
                    <TemplateFormComponent templateCategories={TEMPLATE_CATEGORIES} template={template} />
                </Card>
                <Card>
                    <InlineStack align="space-between" blockAlign="center">
                        <Text></Text>
                        <Text variant="heading2xl" as="h3">
                            {template.title} Size Guide
                        </Text>
                        <TemplatePreviewComponent template={template} templateContents={templateContents} />
                    </InlineStack>
                    <br/>
                    <TemplateContentComponent templateContents={templateContents} />
                    <div className='mr-top-10'>
                        <BlockButtonComponent btnText={'+ Add New Block'} templateId={template.id} />
                    </div>

                </Card>
            </BlockStack>
        </Page>
    );
}





