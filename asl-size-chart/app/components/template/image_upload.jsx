import { useState, useCallback } from 'react';
import {
    Grid,
    DropZone,
    Text, ButtonGroup, Button,
    InlineStack
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";

export default function ImageUploadComponent({ content }) {
    const [file, setFile] = useState(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const previousFileUrl = content.content_obj ? '/uploads/' + content.content_obj : null;

    // console.log(content);

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {
            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]); // Only accept first file
                setIsSaveDisabled(false);
            } else {
                setIsSaveDisabled(true);
            }
        },
        []
    );

    const handleBlockSave = async (content_id) => {
        const formData = new FormData();
        formData.append("intent", "SAVE_IMAGE_BLOCK");
        formData.append("content_id", content_id);
        formData.append("content_obj", file);

        const res = await fetch("/app/templates/" + content.template_id, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("Successfully saved.");
            setIsSaveDisabled(true);
        } else {
            alert("Failed to save.");
        }
    };

    const handleBlockDelete = async (content_id) => {
        if (!confirm("Are you sure you want to delete this table?")) return;

        const formData = new FormData();
        formData.append("intent", "IMAGE_CONTENT_DELETE");
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

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

    const fileUpload = (!file && !previousFileUrl) && <DropZone.FileUpload actionTitle="Upload" actionHint="Accepts .gif, .jpeg, .jpg and .png" />;

    const previousFile = (!file && previousFileUrl) && (
        <div style={{ padding: '25px' }}>
            <div style={{ width: '50%', height: '250px', overflow: 'hidden', margin: 'auto' }}>
                <img
                    src={previousFileUrl}
                    alt="Uploaded preview"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'var(--p-border-radius-base)',
                    }}
                />
            </div>
            <DropZone.FileUpload actionTitle="Change" actionHint="Accepts .gif, .jpeg, and .png" />
        </div>
    );

    const uploadedFiles = file && (
        <div style={{ padding: '25px' }}>
            {validImageTypes.includes(file.type) ? (
                <div style={{ width: '50%', height: '250px', overflow: 'hidden', margin: 'auto' }}>
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

    return (


        <Grid>
            <Grid.Cell columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <InlineStack align="space-between" blockAlign="center">
                    <Text as="h2" variant="headingLg">
                        Upload Image:
                    </Text>
                    <ButtonGroup>
                        <Button
                            disabled={isSaveDisabled}
                            variant="primary"
                            onClick={() => handleBlockSave(content.id)}
                        >
                            Save
                        </Button>
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
                    {previousFile}
                    {uploadedFiles}
                    {fileUpload}
                </DropZone>
            </Grid.Cell>
        </Grid>

    );
}


