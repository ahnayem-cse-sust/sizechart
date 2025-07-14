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
import { Card, Text } from '@shopify/polaris';
import { useEffect } from 'react';
import * as content_constants from '../../services/constants/content';
import MeasurementComponent from './measurement';
import ImageUploadComponent from './image_upload';
import DescriptionComponent from './description';

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
    marginBottom: '1rem',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default function TemplateContentComponent({templateContents}) {
  // const [items, setItems] = useState([
  //   { id: 'block-1', type: 'text', content: 'This is a text block' },
  //   { id: 'block-2', type: 'image', content: 'https://via.placeholder.com/150' },
  //   { id: 'block-3', type: 'table', content: [['Size', 'Chest'], ['M', '38']] },
  // ]);
  const [items, setItems] = useState(templateContents);

  console.log(templateContents);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    console.log('Updated items:', items);
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
            <Card>
              {item.content_type === content_constants.CONTENT_TYPE_TABLE && <MeasurementComponent content={item} />}
              {item.content_type === content_constants.CONTENT_TYPE_DESCRIPTION && <DescriptionComponent content={item} />}
              {item.content_type === content_constants.CONTENT_TYPE_IMAGE && <ImageUploadComponent content={item} />}              
            </Card>
          </DraggableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
