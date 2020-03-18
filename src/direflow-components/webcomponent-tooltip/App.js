import React, { cloneElement } from "react";
import { useTooltip, TooltipPopup } from "@reach/tooltip";
import Portal from "@reach/portal";

const App = () => {
  // Center the tooltip, but collisions will win
  const centered = (triggerRect, tooltipRect) => {
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const left = triggerCenter - tooltipRect.width / 2;
    const maxLeft = window.innerWidth - tooltipRect.width - 2;
    return {
      left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
      top: triggerRect.bottom + 8 + window.scrollY
    };
  };
  function TriangleTooltip({ children, label, ariaLabel }) {
    // get the props from useTooltip
    const [trigger, tooltip] = useTooltip();
    // destructure off what we need to position the triangle
    const { isVisible, triggerRect } = tooltip;
    return (
      <>
        {cloneElement(children, trigger)}
        {isVisible && (
          // The Triangle. We position it relative to the trigger, not the popup
          // so that collisions don't have a triangle pointing off to nowhere.
          // Using a Portal may seem a little extreme, but we can keep the
          // positioning logic simpler here instead of needing to consider
          // the popup's position relative to the trigger and collisions
          <Portal>
            <div
              style={{
                position: "absolute",
                left:
                  triggerRect && triggerRect.left - 10 + triggerRect.width / 2,
                top: triggerRect && triggerRect.bottom + window.scrollY,
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid black"
              }}
            />
          </Portal>
        )}
        <TooltipPopup
          {...tooltip}
          label={label}
          ariaLabel={ariaLabel}
          style={{
            position: "absolute",
            left: triggerRect && triggerRect.left - 10 + triggerRect.width / 2,
            top: triggerRect && triggerRect.bottom + window.scrollY,
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "3px",
            padding: "0.5em 1em",
            zIndex: 2000
          }}
          position={centered}
        />
      </>
    );
  }
  return (
    <div
      style={{
        display: "inline-block",
        borderBottom: "1px dotted black",
        cursor: "pointer"
      }}
    >
      <TriangleTooltip label="Notifications Really Long to Trigger Collision">
        <span aria-hidden>Text de test</span>
      </TriangleTooltip>
    </div>
  );
};

export default App;
