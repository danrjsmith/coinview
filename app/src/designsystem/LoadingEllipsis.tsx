import React from "react";

interface LoadingEllipsisProps {
  size?: number;
}

const ellipsisSize = 80;

export function LoadingEllipsis({ size = 80 }: LoadingEllipsisProps) {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        width: ellipsisSize,
        height: ellipsisSize,
        alignSelf: "center",
        justifySelf: "center",
        transformOrigin: "top",
        transform: `scale(${size / ellipsisSize})`,
        opacity: 0.8,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0.4125 * ellipsisSize,
          width: 0.1625 * ellipsisSize,
          height: 0.1625 * ellipsisSize,
          borderRadius: "50%",
          background: "#fff",
          animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",
          left: 0.1 * ellipsisSize,
          animation: "lds-ellipsis1 0.6s infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0.4125 * ellipsisSize,
          width: 0.1625 * ellipsisSize,
          height: 0.1625 * ellipsisSize,
          borderRadius: "50%",
          background: "#fff",
          animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",
          left: 0.1 * ellipsisSize,
          animation: "lds-ellipsis2 0.6s infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0.4125 * ellipsisSize,
          width: 0.1625 * ellipsisSize,
          height: 0.1625 * ellipsisSize,
          borderRadius: "50%",
          background: "#fff",
          animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",
          left: 0.4 * ellipsisSize,
          animation: "lds-ellipsis2 0.6s infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0.4125 * ellipsisSize,
          width: 0.1625 * ellipsisSize,
          height: 0.1625 * ellipsisSize,
          borderRadius: "50%",
          background: "#fff",
          animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",
          left: 0.7 * ellipsisSize,
          animation: "lds-ellipsis3 0.6s infinite",
        }}
      />
    </div>
  );
}
