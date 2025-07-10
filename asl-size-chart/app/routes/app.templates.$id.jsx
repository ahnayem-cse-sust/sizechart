import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, Form } from '@remix-run/react';
import {
    Card,
    Text,
    Page,
    InlineStack,
    BlockStack, Button,
    EmptyState, Popover, ActionList
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getTemplateById } from '../services/template.server';
import TemplateFormComponent from '../components/template/form';
import MeasurementComponent from '../components/template/measurement';
import { getAllTemplateContent } from '../services/template.content.server';

import {
    TEMPLATE_CATEGORIES,
    CONTENT_TYPE_DESCRIPTION,
    CONTENT_TYPE_TABLE,
    CONTENT_TYPE_IMAGE,
    CONTENT_TYPE_LIST
} from '../services/utils/defines';

import '../assets/style.css';

export async function loader({ params }) {
    const { id } = params;
    const templateResponse = await getTemplateById(Number(id));
    const { template } = await templateResponse.json();
    const templateContentsResponse = await getAllTemplateContent(Number(id));
    const { templateContents } = await templateContentsResponse.json();
    return Response.json({ template, templateContents });
}

export async function action({ request }) {


}


export default function TemplateViewComponent() {
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
                            <AddBlockPopoverButton btnText={'+ Add New Content'} templateId={template.id} />
                        </div>
                    </EmptyState>)}
                </Card>
            </BlockStack>
        </Page>
    );
}


function AddBlockPopoverButton({ btnText, templateId }) {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button variant='primary' onClick={togglePopoverActive} disclosure>
            {btnText}
        </Button>
    );

    const addTableBlock = (templateId)=>{
        console.log(templateId);
    }

    return (
        <div>
            <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <ActionList
                    actionRole="menuitem"
                    items={[{ content: 'Advanced Table', onAction:() => addTableBlock(templateId)}, { content: 'Text' }]}
                />
            </Popover>
        </div>
    );
}


