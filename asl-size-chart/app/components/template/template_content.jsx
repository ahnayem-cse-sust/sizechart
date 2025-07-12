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

export default function TemplateContentComponent() {
  const [items, setItems] = useState([
    { id: 'block-1', type: 'text', content: 'This is a text block' },
    { id: 'block-2', type: 'image', content: 'https://via.placeholder.com/150' },
    { id: 'block-3', type: 'table', content: [['Size', 'Chest'], ['M', '38']] },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

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
              {item.type === 'text' && <Text>{item.content}</Text>}
              {item.type === 'image' && (
                <img src={item.content} alt="Uploaded" style={{ width: '100%' }} />
              )}
              {item.type === 'table' && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {item.content.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} style={{ border: '1px solid gray', padding: '4px' }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </DraggableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
