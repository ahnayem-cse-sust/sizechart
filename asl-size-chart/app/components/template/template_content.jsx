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
import * as content_constants from '../../services/constants/content';
import * as global_constants from '../../services/constants/global';
import MeasurementComponent from './measurement';
import ImageUploadComponent from './image_upload';
import DescriptionComponent from './description';
import { DragHandleIcon } from '@shopify/polaris-icons';

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
      {children({ listeners })}
    </div>
  );
};

const ContentBlock = ({ item, listeners }) => {
  return (
    <Card>
      <div>
        <span style={{ cursor: 'move' }}><Button icon={DragHandleIcon} size="micro" {...listeners} /></span>
      </div>
      {item.content_type === content_constants.CONTENT_TYPE_TABLE && <MeasurementComponent content={item} />}
      {item.content_type === content_constants.CONTENT_TYPE_DESCRIPTION && <DescriptionComponent content={item} />}
      {item.content_type === content_constants.CONTENT_TYPE_IMAGE && <ImageUploadComponent content={item} />}
    </Card>
  );
};

export default function TemplateContentComponent({ templateContents }) {
  const [items, setItems] = useState(templateContents);
  const sensors = useSensors(useSensor(PointerSensor));

  const persistOrder = async (reordered, previous) => {
    const serialArray = reordered.map((item, index) => ({
      id: item.id,
      serial_no: index + 1,
    }));

    const formData = new FormData();
    formData.append(global_constants.INTENT, global_constants.INTENT_UPDATE_SERIAL);
    formData.append("serial_json", JSON.stringify(serialArray));

    try {
      const res = await fetch("/app/templates", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Request failed");
      // Local state already reflects the new order — no reload needed.
    } catch (error) {
      // Roll back the optimistic reorder so the UI doesn't drift from
      // what's actually saved.
      setItems(previous);
      alert("Couldn't save the new block order. Please try again.");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Dropped outside any sortable target, or dropped back in place.
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    const previous = items;
    const reordered = arrayMove(items, oldIndex, newIndex);

    setItems(reordered);
    persistOrder(reordered, previous);
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
