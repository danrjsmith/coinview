import { AnimatePresence, AnimatePresenceProps } from "framer-motion"
import React, { FC } from "react"
import { Switch, useLocation } from "react-router"

export const AnimatedSwitch: FC<AnimatePresenceProps> = ({
  children,
  exitBeforeEnter = true,
  initial = false,
  ...otherProps
}) => {
  const location = useLocation()

  return (
    <AnimatePresence
      exitBeforeEnter={exitBeforeEnter}
      initial={initial}
      {...otherProps}
    >
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  )
}
