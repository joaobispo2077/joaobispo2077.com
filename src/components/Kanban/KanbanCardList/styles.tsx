import styled from '@emotion/styled';

export interface KanbanCardListContainerProps {
  done?: boolean;
}

export const Container = styled.section<KanbanCardListContainerProps>`
  padding: 0 4px;
  height: 100%;
  opacity: ${(props) => (props.done ? 0.6 : 1)};
  flex: 1;

  & + section {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
      color: white;
    }

    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
    }
  }

  ul {
    margin-top: 30px;
    list-style: none;
  }
`;
