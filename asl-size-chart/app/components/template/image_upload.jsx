import { useState, useCallback, useEffect, useRef } from 'react';
import {
    DropZone,
    Text,
    Button,
    InlineStack,
    BlockStack,
} from "@shopify/polaris";
import { DeleteIcon, ImageIcon } from "@shopify/polaris-icons";
import { CONTENT_TYPE_IMAGE } from '../../services/constants/content';

export default function ImageUploadComponent({ content, onFieldChange, onDeleteBlock }) {
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

    // The actual delete request is deferred until the page-level Save
    // button is pressed — here we just remove it from the working draft.
    const handleBlockDelete = (content_id) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        onDeleteBlock?.(content_id, CONTENT_TYPE_IMAGE);
    };

    const currentImageUrl = file && validImageTypes.includes(file.type)
        ? window.URL.createObjectURL(file)
        : previousFileUrl;
    const hasImage = Boolean(currentImageUrl);

    return (
        <BlockStack gap="300">
            <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingSm">
                    Image
                </Text>
                <Button
                    tone="critical"
                    icon={DeleteIcon}
                    variant="tertiary"
                    accessibilityLabel="Delete image block"
                    onClick={() => handleBlockDelete(content.id)}
                />
            </InlineStack>

            {hasImage ? (
                <BlockStack gap="300">
                    <div className="asc-image-preview">
                        <img src={currentImageUrl} alt="Size guide upload preview" />
                    </div>
                    <DropZone
                        allowMultiple={false}
                        onDrop={handleDropZoneDrop}
                        variableHeight
                        outline={false}
                    >
                        <div className="asc-image-replace">
                            <Button icon={ImageIcon}>Replace image</Button>
                        </div>
                    </DropZone>
                </BlockStack>
            ) : (
                <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
                    <DropZone.FileUpload actionTitle="Upload image" actionHint="Accepts .gif, .jpeg, and .png" />
                </DropZone>
            )}

            {invalidType && (
                <Text tone="critical" as="p">Uploaded file format not supported — this won't be saved.</Text>
            )}
        </BlockStack>
    );
}
