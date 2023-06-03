export function ParentVariants(duration: number, staggerDuration: number) {
  const variants = {
    hidden: {
      opacity: 0,
      x: -100,
      transition: {
        when: "beforeChildren",
        staggerChildren: staggerDuration,
        duration,
        ease: "easeOut",
        type: "tween",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration,
        ease: "easeOut",
        type: "tween",
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      transition: {
        duration,
        ease: "easeOut",
        type: "tween",
      },
    },
  };

  return variants;
}
