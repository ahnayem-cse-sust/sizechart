import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Card, Button } from '@shopify/polaris';
import { useEffect } from 'react';
import * as content_constants from '../../services/constants/content';
import MeasurementComponent from './measurement';
import ImageUploadComponent from './image_upload';
import DescriptionComponent from './description';
import {
  DragHandleIcon
} from '@shopify/polaris-icons';

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '1rem',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} >
      {/* <div style={{ position: 'relative', top: 8, left: 8, zIndex: 10 }}>
        <Button icon={DragHandleIcon} size="micro" {...listeners} />
      </div> */}
      {children({ listeners })}
    </div>
  );
};

const ContentBlock = ({ item, listeners }) => {
  return (
    <Card>
      <div>
        <span style={{cursor:'move'}}><Button icon={DragHandleIcon} size="micro" {...listeners} /></span>
      </div>
      {item.content_type === content_constants.CONTENT_TYPE_TABLE && <MeasurementComponent content={item} />}
      {item.content_type === content_constants.CONTENT_TYPE_DESCRIPTION && <DescriptionComponent content={item} />}
      {item.content_type === content_constants.CONTENT_TYPE_IMAGE && <ImageUploadComponent content={item} />}
    </Card>
  );
};

export default function TemplateContentComponent({ templateContents }) {
  // const [items, setItems] = useState([
  //   { id: 'block-1', type: 'text', content: 'This is a text block' },
  //   { id: 'block-2', type: 'image', content: 'https://via.placeholder.com/150' },
  //   { id: 'block-3', type: 'table', content: [['Size', 'Chest'], ['M', '38']] },
  // ]);
  const [items, setItems] = useState(templateContents);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    console.log('Updated items:', items);
    let serialArray = [];
    let serial = 0;
    items.forEach(element => {
      serialArray.push({
        id: element.id,
        serial_no: ++serial
      });
    });
    console.log(serialArray);
    
    // const formData = new FormData();
    // formData.append("intent", "SAVE_BLOCK");
    // formData.append("content_id", content_id);
    // formData.append("content_obj", JSON.stringify(description));

    // const res = await fetch("/app/templates/" + content.template_id, {
    //   method: "POST",
    //   body: formData,
    // });

    // if (res.ok) {
    //   alert("Successfully saved.");
    //   setIsSaveDisabled(true);
    // } else {
    //   alert("Failed to save.");
    // }
  }, [items]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id}>
            
              {({ listeners }) => (
                <ContentBlock item={item} listeners={listeners} />
              )}
          </DraggableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
