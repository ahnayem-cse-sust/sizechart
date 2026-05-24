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
  const [loaded, setLoaded] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (loaded) {
      let serialArray = [];
      let serial = 0;
      items.forEach(element => {
        serialArray.push({
          id: element.id,
          serial_no: ++serial
        });
      });

      const formData = new FormData();
      formData.append(global_constants.INTENT, global_constants.INTENT_UPDATE_SERIAL);
      formData.append("serial_json", JSON.stringify(serialArray));

      fetch("/app/templates", {
        method: "POST",
        body: formData,
      }).then(res => {
        console.log(res);
        if (res.ok) {
          console.log("Serial updated successfully");
          window.location.reload();
        } else {
          console.log("Something went wrong!! Serial not updated.")
          // window.location.reload();
        }
      });
    }

  }, [items]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
    setLoaded(true);
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
