import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, Form } from '@remix-run/react';
import {
    Card,
    Text,
    Page,
    InlineStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateById, getTemplateCategoryList } from '../services/template.server';
import TemplateFormComponent from '../components/template/form';

import '../assets/style.css';

export async function loader({ params }) {
    const { id } = params;
    const templateResponse = await getTemplateById(Number(id));
    const { template } = await templateResponse.json();
    const templateCategories = await getTemplateCategoryList();
    return Response.json({ template, templateCategories });
}

export async function action({ request }) {


}


export default function TemplateViewComponent() {
    const { template, templateCategories } = useLoaderData();

    console.log(template);

    return (
        <Page>
            <Card>
                <InlineStack wrap={false}>
                    <Text variant="headingLg">Title: </Text>
                    <Text>{template.title}</Text>
                </InlineStack>

                <InlineStack wrap={false}>
                    <Text variant="headingLg">
                        Category:
                    </Text>
                    <Text>{template.category}</Text>
                </InlineStack>
                <TemplateFormComponent templateCategories={templateCategories} template={template} />
            </Card>
        </Page>
    );
}


