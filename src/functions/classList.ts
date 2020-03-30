const cl = (classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export default cl
