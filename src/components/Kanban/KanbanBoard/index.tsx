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

import { KanbanCardList, KanbanCardListData } from '../KanbanCardList';

import { Container } from './styles';
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

export const KanbanBoard: FunctionComponent = () => {
  const [cardlists, setCardLists] = useState<KanbanCardListData[]>();

  const moveCard = (
    from: DropItem,
    to: DropItem,
    cards: KanbanCardListData[] | undefined,
  ): void => {
    if (!cards) return;

    const newCardList = Array.from(cards);

    const dragged = newCardList[from.columnIndex].cards[from.cardIndex];

    newCardList[from.columnIndex].cards.splice(from.cardIndex, 1);

    newCardList[to.columnIndex].cards.splice(to.cardIndex, 0, dragged);

    console.log(newCardList);

    setCardLists(newCardList);
  };

  const getCardLists = async (): Promise<KanbanCardListData[]> => {
    const response = await fetch('/api/cards');
    const cardsLists = await response.json();
    return cardsLists;
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;

      if (isDropInActualPosition(source, destination)) return;

      console.log('draggableId!', draggableId);

      const draggedItem = {
        cardIndex: source.index,
        columnIndex: Number(source.droppableId),
      };

      const droppedItem = {
        cardIndex: destination.index,
        columnIndex: Number(destination.droppableId),
      };

      console.log('cardlists', cardlists);

      moveCard(draggedItem, droppedItem, cardlists);
    },
    [cardlists],
  );

  useEffect(() => {
    if (!cardlists)
      getCardLists().then((cardsLists) => setCardLists(cardsLists));
  }, [cardlists]);

  return (
    <KanbanCardsContext.Provider value={{ cardlists, moveCard }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {cardlists &&
            cardlists.length > 0 &&
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
