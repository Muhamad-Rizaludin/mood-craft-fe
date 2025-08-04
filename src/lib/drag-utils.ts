export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface DragState {
  isDragging: boolean;
  dragStart: Position;
  initialPosition: Position;
}

export const constrainToParent = (
  position: Position,
  size: Size,
  parentSize: Size
): Position => {
  return {
    x: Math.max(0, Math.min(position.x, parentSize.width - size.width)),
    y: Math.max(0, Math.min(position.y, parentSize.height - size.height)),
  };
};

export const getRelativePosition = (
  event: MouseEvent | React.MouseEvent,
  container: HTMLElement
): Position => {
  const rect = container.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

export const calculateNewPosition = (
  currentPosition: Position,
  dragStart: Position,
  mousePosition: Position
): Position => {
  return {
    x: currentPosition.x + (mousePosition.x - dragStart.x),
    y: currentPosition.y + (mousePosition.y - dragStart.y),
  };
};

export const detectCollision = (
  rect1: { position: Position; size: Size },
  rect2: { position: Position; size: Size }
): boolean => {
  return !(
    rect1.position.x + rect1.size.width < rect2.position.x ||
    rect2.position.x + rect2.size.width < rect1.position.x ||
    rect1.position.y + rect1.size.height < rect2.position.y ||
    rect2.position.y + rect2.size.height < rect1.position.y
  );
};

export const snapToGrid = (position: Position, gridSize = 10): Position => {
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
  };
};
