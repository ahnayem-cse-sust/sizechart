import { useState, useCallback } from 'react';
import {
    Grid,
    DropZone,
    Text,ButtonGroup,Button,
    InlineStack
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";

export default function ImageUploadComponent({ content }) {
    const [file, setFile] = useState(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {
            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]); // Only accept first file
            }
        },
        []
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !file && <DropZone.FileUpload actionTitle="Upload" actionHint="Accepts .gif, .jpeg, and .png" />;

    const uploadedFiles = file && (
        <div style={{ padding: '25px' }}>
            {validImageTypes.includes(file.type) ? (
                <div style={{ width: '30%', height: '150px', overflow: 'hidden', margin: 'auto' }}>
                    <img
                        src={
                            validImageTypes.includes(file.type)
                                ? window.URL.createObjectURL(file)
                                : NoteIcon
                        }
                        alt="Uploaded preview"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'var(--p-border-radius-base)',
                        }}
                    />
                </div>
            ) : (
                <div>
                    <Text alignment='center' tone="critical" variant="headingMd" as="h6">Uploaded file format not supported.</Text>
                </div>
            )}
            <DropZone.FileUpload actionTitle="Change" actionHint="Accepts .gif, .jpeg, and .png" />
        </div>
    );

    const handleBlockDelete = async (content_id) => {
        if (!confirm("Are you sure you want to delete this table?")) return;

        const formData = new FormData();
        formData.append("intent", "CONTENT_DELETE");
        formData.append("content_id", content_id);

        const res = await fetch("/app/templates/" + content.template_id, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            window.location.reload(); // Or use `navigate()` to refresh
        } else {
            alert("Failed to delete.");
        }
    };


    return (


        <Grid>
            <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingLg">
                        Upload Image:
                    </Text>
                    <ButtonGroup>
                        <Button disabled={isSaveDisabled} variant="primary">Save</Button>
                        <Button
                            tone="critical"
                            icon={DeleteIcon}
                            onClick={() => handleBlockDelete(content.id)}
                        ></Button>
                    </ButtonGroup>

                </InlineStack>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>

                <DropZone
                    allowMultiple={false}
                    onDrop={handleDropZoneDrop}>
                    {uploadedFiles}
                    {fileUpload}
                </DropZone>
            </Grid.Cell>
        </Grid>

    );
}


