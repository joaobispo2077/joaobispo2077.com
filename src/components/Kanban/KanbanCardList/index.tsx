import { Droppable } from 'react-beautiful-dnd';

import { KanbanCard, KanbanCardData } from '../KanbanCard';

import { Container } from './styles';

export interface KanbanCardListData {
  title: string;
  id: string;
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
      </header>
      <Droppable droppableId={String(index)}>
        {(provided) => (
          // isDraggingOver={snapshot.isDraggingOver}
          <ul ref={provided.innerRef}>
            {cardList.cards.map((card, index) => (
              <KanbanCard
                index={index}
                {...provided.droppableProps}
                key={String(card?.id)}
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
