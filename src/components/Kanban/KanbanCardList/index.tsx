import { MdAdd } from 'react-icons/md';
import { Droppable } from 'react-beautiful-dnd';

import { KanbanCard, KanbanCardData } from '../KanbanCard';

import { Container } from './styles';

export interface KanbanCardListData {
  title: string;
  creatable: boolean;
  id: number;
  done?: boolean;
  cards: KanbanCardData[];
}

export interface KanbanCardListProps {
  cardList: KanbanCardListData;
  index: number;
}

export const KanbanCardList = ({ cardList, index }: KanbanCardListProps) => {
  return (
    <Container done={cardList.done ? cardList.done : false}>
      <header>
        <h2>{cardList.title}</h2>
        {cardList.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF" />
          </button>
        )}
      </header>
      <Droppable droppableId={String(index)}>
        {(provided) => (
          // isDraggingOver={snapshot.isDraggingOver}
          <ul ref={provided.innerRef}>
            {cardList.cards.map((card, index) => (
              <KanbanCard
                index={index}
                {...provided.droppableProps}
                key={card.id}
                card={card}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </Container>
  );
};
