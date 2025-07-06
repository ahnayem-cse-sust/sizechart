import { useState, useCallback } from 'react';
import {
    Grid,
    DropZone,
    Text
} from "@shopify/polaris";


export default function ImageUploadComponent() {
    const [file, setFile] = useState(null);

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


    return (


        <Grid>
            <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
                <Text variant="headingMd" as="h6">
                    Upload Image:
                </Text>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>

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


