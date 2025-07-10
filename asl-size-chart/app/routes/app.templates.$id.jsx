import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, Form } from '@remix-run/react';
import {
    Card,
    Text,
    Page,
    InlineStack,
    BlockStack,
    EmptyState,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateById } from '../services/template.server';
import TemplateFormComponent from '../components/template/form';
import MeasurementComponent from '../components/template/measurement';
import ImageUploadComponent from '../components/template/image_upload';
import DescriptionComponent from '../components/template/description';
import BlockButtonComponent from '../components/template/block_button';
import {
    getAllTemplateContent, addBlockByTemplateId,
    deleteContentByContentId, saveContent
} from '../services/template.content.server';

import {
    TEMPLATE_CATEGORIES,
    CONTENT_TYPE_DESCRIPTION,
    CONTENT_TYPE_TABLE,
    CONTENT_TYPE_IMAGE
} from '../services/utils/defines';

export async function loader({ params }) {
    const { id } = params;
    const templateResponse = await getTemplateById(Number(id));
    const { template } = await templateResponse.json();
    const templateContentsResponse = await getAllTemplateContent(Number(id));
    const { templateContents } = await templateContentsResponse.json();
    return Response.json({ template, templateContents });
}

export async function action({ request }) {
    const form = await request.formData();
    const intent = form.get("intent");

    let response;

    switch (intent) {
        case "ADD_BLOCK":
            response = await addBlockByTemplateId(form.get("content_type"), Number(form.get("template_id")));
            break;

        case "SAVE_BLOCK":
            response = await saveContent(Number(form.get("content_id")), form.get("content_obj"));
            break;

        case "CONTENT_DELETE":
            response = await deleteContentByContentId(Number(form.get("content_id")));
            break;

        default:
            response = Response.json({ error: "Invalid intent" }, { status: 400 });
            break;
    }

    return response;

}


export default function TemplateView() {
    const { template, templateContents } = useLoaderData();

    return (
        <Page>
            <BlockStack gap="400">
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
                    <TemplateFormComponent templateCategories={TEMPLATE_CATEGORIES} template={template} />
                </Card>
                <Card>
                    {templateContents.length < 1 && (<EmptyState
                        heading="Manage your size guide"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                        <p>No content available.Add contents to presizely guide your customers.</p>
                        <div className='mr-top-10'>
                            <BlockButtonComponent btnText={'+ Add Content'} templateId={template.id} />
                        </div>
                    </EmptyState>)}
                    {templateContents.map((content, index) => {
                        switch (content.content_type) {
                            case CONTENT_TYPE_TABLE:
                                return <MeasurementComponent key={index} content={content} />;
                            case CONTENT_TYPE_DESCRIPTION:
                                return <DescriptionComponent key={index} content={content} />;
                            case CONTENT_TYPE_IMAGE:
                                return <ImageUploadComponent key={index} content={content} />;

                            default:
                                return;
                        }
                    })}

                    {templateContents.length > 0 && (
                        <div className='mr-top-10'>
                            <BlockButtonComponent btnText={'+ Add New Block'} templateId={template.id} />
                        </div>
                    )}

                </Card>
            </BlockStack>
        </Page>
    );
}





