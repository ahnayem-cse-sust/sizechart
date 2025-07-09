import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, Form } from '@remix-run/react';
import {
  Card,
  Layout,
  Page,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import '../assets/style.css';



export async function action({ request }) {


}


export default function TemplateViewComponent() {



  return (
    <Page>
      <TitleBar title="Template View" />
      <Layout>
        <Layout.Section>
          <Card>
          </Card>
        </Layout.Section>

      </Layout>
    </Page>
  );
}


