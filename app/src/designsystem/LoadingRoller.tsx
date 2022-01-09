import { makeStyles } from "@material-ui/styles";
import React from "react";

interface LoadingRollerProps {
  size?: number;
}

const rollerSize = 80;

const useStyles = makeStyles({
  r1: {
    "&::after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.7875 * rollerSize,
      left: 0.7875 * rollerSize,
    },
  },
  r2: {
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.85 * rollerSize,
      left: 0.7 * rollerSize,
    },
  },
  r3: {
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.8875 * rollerSize,
      left: 0.6 * rollerSize,
    },
  },
  r4: {
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.9 * rollerSize,
      left: 0.5 * rollerSize,
    },
  },
  r5: {
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.8875 * rollerSize,
      left: 0.4 * rollerSize,
    },
  },
  r6: {
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.85 * rollerSize,
      left: 0.3 * rollerSize,
    },
  },
  r7: {
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.7875 * rollerSize,
      left: 0.2125 * rollerSize,
    },
  },
  r8: {
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      width: 0.0875 * rollerSize,
      height: 0.0875 * rollerSize,
      borderRadius: "50%",
      background: "#fff",
      margin: `-${0.05 * rollerSize}px 0 0 -${0.05 * rollerSize}px`,
      top: 0.7 * rollerSize,
      left: 0.15 * rollerSize,
    },
  },
});

export function LoadingRoller({ size = 80 }: LoadingRollerProps) {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        width: rollerSize,
        height: rollerSize,
        alignSelf: "center",
        justifySelf: "center",
        transformOrigin: "top",
        transform: `scale(${size / rollerSize})`,
        opacity: 0.8,
      }}
    >
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.036s",
        }}
        className={classes.r1}
      />
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.072s",
        }}
        className={classes.r2}
      />
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.108s",
        }}
        className={classes.r3}
      />
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.144s",
        }}
        className={classes.r4}
      />
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.18s",
        }}
        className={classes.r5}
      />
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.216s",
        }}
        className={classes.r6}
      />
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.252s",
        }}
        className={classes.r7}
      />
      <div
        style={{
          animation: "lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
          transformOrigin: `${0.5 * rollerSize}px ${0.5 * rollerSize}px`,
          animationDelay: "-0.288s",
        }}
        className={classes.r8}
      />
    </div>
  );
}
