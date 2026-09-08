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

const ContentBlock = ({ item, listeners, onFieldChange, onDeleteBlock }) => {
  return (
    <Card>
      <div>
        <span style={{ cursor: 'move' }}><Button icon={DragHandleIcon} size="micro" {...listeners} /></span>
      </div>
      {item.content_type === content_constants.CONTENT_TYPE_TABLE && <MeasurementComponent content={item} onFieldChange={onFieldChange} onDeleteBlock={onDeleteBlock} />}
      {item.content_type === content_constants.CONTENT_TYPE_DESCRIPTION && <DescriptionComponent content={item} onFieldChange={onFieldChange} onDeleteBlock={onDeleteBlock} />}
      {item.content_type === content_constants.CONTENT_TYPE_IMAGE && <ImageUploadComponent content={item} onFieldChange={onFieldChange} onDeleteBlock={onDeleteBlock} />}
    </Card>
  );
};

// `items`/`setItems` are owned by the parent page now (rather than local
// state here) so that adding/removing blocks — which the parent handles
// locally until Save — is reflected immediately without a page reload.
export default function TemplateContentComponent({ items, setItems, onFieldChange, onDeleteBlock }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const persistOrder = async (reordered, previous) => {
    // Blocks the user just added aren't persisted yet (no real id), so
    // there's nothing on the server to reorder for them — they'll simply
    // land at the end once Save creates them.
    const serialArray = reordered
      .filter((item) => typeof item.id === 'number')
      .map((item) => ({
        id: item.id,
        serial_no: reordered.indexOf(item) + 1,
      }));

    if (serialArray.length === 0) return;

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
              <ContentBlock item={item} listeners={listeners} onFieldChange={onFieldChange} onDeleteBlock={onDeleteBlock} />
            )}
          </DraggableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
