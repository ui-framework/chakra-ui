import * as React from "react";
import { SerializedStyles } from "@emotion/core";
import CSSTransition, {
  TransitionStatus,
} from "react-transition-group/Transition";
import { animationStyles } from "./animations";

interface Prop {
  state: TransitionStatus;
  styles: SerializedStyles;
}

export interface TransitionProps {
  isOpen: boolean;
  children: ({ state, styles }: Prop) => React.ReactNode;
  onOpenComplete: () => void;
  onCloseComplete: () => void;
}

// TODO: Add support for Fade, Slide animations

function Transition({
  isOpen,
  children,
  onCloseComplete,
  onOpenComplete,
}: TransitionProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  const onExited = () => {
    setIsExiting(false);
    onCloseComplete && onCloseComplete();
  };

  return (
    <CSSTransition
      appear
      unmountOnExit
      timeout={200}
      in={isOpen && !isExiting}
      onExited={onExited}
      onEntered={onOpenComplete}
    >
      {state => children({ state, styles: animationStyles })}
    </CSSTransition>
  );
}

export default Transition;