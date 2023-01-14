import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';

import { KanbanCardsContext } from '@src/contexts/KanbanCardsContext';

import { KanbanCardListData, KanbanCardList } from '../KanbanCardList';

import { Container } from './styles';

interface DropItem {
  cardIndex: number;
  columnIndex: number;
}

export type KanbanBoardProps = {
  taskStatuses: KanbanCardListData[];
};

interface DropItem {
  cardIndex: number;
  columnIndex: number;
}

const isDropInActualPosition = (
  source: DraggableLocation,
  target: DraggableLocation,
): boolean => {
  const isSameIndex = source.index === target.index;
  const isSameColumn = source.droppableId === target.droppableId;

  const isSameCard = isSameIndex && isSameColumn;
  return isSameCard;
};

export const KanbanBoard: FunctionComponent<KanbanBoardProps> = ({
  taskStatuses,
}) => {
  const [isWindowReady, setIsWindowReady] = useState(false);

  const [cardlists, setCardLists] = useState<KanbanCardListData[]>(
    taskStatuses as KanbanCardListData[],
  );

  const moveCard = useCallback(
    (
      from: DropItem,
      to: DropItem,
      cards: KanbanCardListData[] | undefined,
    ): void => {
      if (!cards) {
        return;
      }

      const newCardList = Array.from(cards);

      const dragged = newCardList[from.columnIndex].cards[from.cardIndex];
      if (!dragged) {
        return;
      }

      newCardList[from.columnIndex].cards.splice(from.cardIndex, 1);

      newCardList[to.columnIndex].cards.splice(to.cardIndex, 0, dragged);

      setCardLists(newCardList);
    },
    [],
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      if (isDropInActualPosition(source, destination)) {
        return;
      }

      console.debug('draggableId!', draggableId);

      const draggedItem = {
        cardIndex: source.index,
        columnIndex: Number(source.droppableId),
      };

      const droppedItem = {
        cardIndex: destination.index,
        columnIndex: Number(destination.droppableId),
      };

      moveCard(draggedItem, droppedItem, cardlists);
    },
    [cardlists, moveCard],
  );

  useEffect(() => {
    setIsWindowReady(true);
  }, []);

  const canRenderBoard = cardlists && cardlists.length > 0 && isWindowReady;

  return (
    <KanbanCardsContext.Provider value={{ cardlists, moveCard }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {canRenderBoard &&
            cardlists.map((cardList, index) => (
              <KanbanCardList
                index={index}
                key={cardList.title}
                cardList={cardList}
              />
            ))}
        </Container>
      </DragDropContext>
    </KanbanCardsContext.Provider>
  );
};
