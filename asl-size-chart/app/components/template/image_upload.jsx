import { useState, useCallback, useEffect, useRef } from 'react';
import {
    Grid,
    DropZone,
    Text, ButtonGroup, Button,
    InlineStack
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { INTENT } from '../../services/constants/global';
import { CONTENT_TYPE_IMAGE, INTENT_IMAGE_CONTENT_DELETE } from '../../services/constants/content';

export default function ImageUploadComponent({ content, onFieldChange }) {
    const [file, setFile] = useState(null);
    const [invalidType, setInvalidType] = useState(false);
    const isFirstRender = useRef(true);

    const previousFileUrl = content.content_obj ? '/uploads/' + content.content_obj : null;

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    // Report a newly chosen file up to the page whenever it changes, so the
    // single top-level Save button can persist it. A block with no newly
    // picked file has nothing to report — the previously saved image stays
    // as-is.
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (file && validImageTypes.includes(file.type)) {
            onFieldChange?.(content.id, CONTENT_TYPE_IMAGE, file);
        }
    }, [file]);

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {
            if (acceptedFiles.length > 0) {
                const dropped = acceptedFiles[0]; // Only accept first file
                setFile(dropped);
                setInvalidType(!validImageTypes.includes(dropped.type));
            } else {
                setInvalidType(true);
            }
        },
        []
    );

    const handleBlockDelete = async (content_id) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        const formData = new FormData();
        formData.append(INTENT, INTENT_IMAGE_CONTENT_DELETE);
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
                        src={window.URL.createObjectURL(file)}
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
                {invalidType && (
                    <Text tone="critical" as="p">Uploaded file format not supported — this won't be saved.</Text>
                )}
            </Grid.Cell>
        </Grid>

    );
}
