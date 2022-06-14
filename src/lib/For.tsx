interface IFor<T> {
  children: (item: T, idx: number, arr: T[]) => React.ReactNode
  it: T[]
}

export function For<T>({ children, it }: IFor<T>) {
  return <>{it.map((...args) => children(...args))}</>
}
