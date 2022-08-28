import React, { FunctionComponent } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { Container, Label, CloneContainer } from './styles';

export interface KanbanCardData {
  id: number;
  content: string;
  labels?: string[];
  user?: string;
}

export interface KanbanCardList {
  title: string;
  creatable: boolean;
  id: number;
  done?: boolean;
  cards: KanbanCardData[];
}

interface KanbanCardItemProps {
  card: KanbanCardData;
  index: number;
}

export const KanbanCard: FunctionComponent<KanbanCardItemProps> = ({
  card,
  index,
}: KanbanCardItemProps) => {
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided, snapshot) => (
        <>
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <header>
              {card.labels &&
                card.labels.map((label) => <Label key={label} color={label} />)}
            </header>
            <p>{card.content}</p>
            {card.user && <img src={card.user} alt="User" />}
          </Container>
          {snapshot.isDragging && (
            <CloneContainer isDragging={snapshot.isDragging}>
              {' '}
              <header>
                {card.labels &&
                  card.labels.map((label) => (
                    <Label key={label} color={label} />
                  ))}
              </header>
              <p>{card.content}</p>
              {card.user && <img src={card.user} alt="User" />}
            </CloneContainer>
          )}
        </>
      )}
    </Draggable>
  );
};
