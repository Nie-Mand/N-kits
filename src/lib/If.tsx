import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useId,
  useEffect,
} from 'react'

const IfContext = createContext<{
  c: boolean | boolean[]
  add: (id: string, c: boolean) => void
  isThePreviousConditionsTrue: (id: string) => boolean
}>({
  c: [true],
  add: () => {},
  isThePreviousConditionsTrue: () => false,
})

interface IElse {
  children: React.ReactNode
  c?: boolean
}

export function Else({ c = true, children }: IElse) {
  const { add, isThePreviousConditionsTrue } = useContext(IfContext)
  const [loading, setLoading] = useState(true)
  const elseId = useId()

  useEffect(() => {
    add(elseId, c)
    setLoading(false)
  }, [elseId])

  if (loading) return null
  if (!isThePreviousConditionsTrue(elseId)) {
    console.log('else', c)

    if (c) {
      return (
        <>
          {elseId}: {children}
        </>
      )
    }
    return null
  }

  return null
}

function resolveChildren(child: React.ReactNode) {
  const _child = child as JSX.Element

  if (_child.type === Else) {
    return _child
  }

  return null
}

function IfHandler({ c, children }: { c: boolean; children: React.ReactNode }) {
  if (c) return <>{children}</>

  if (children instanceof Array) {
    return <>{children.map(resolveChildren)}</>
  }
  return resolveChildren(children)
}

interface IIf {
  children: React.ReactNode
  c?: boolean
}

export function If({ c = true, children }: IIf) {
  const ifId = useId()
  const [cd, setCd] = useState(new Map<string, boolean>())

  console.log('map', cd)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (cd.size === 0) {
      console.log('add if', ifId, c)
      const _ = cd
      _.set(ifId, c)
      setCd(_)
      setLoading(false)
    }
  }, [])

  console.log('if', ifId)

  const isThePreviousConditionsTrue = useCallback((id: string) => {
    let isTrue = false
    const entries = cd.entries()
    for (const [key, value] of entries) {
      if (isTrue) break
      if (key === id) {
        break
      }
      isTrue = isTrue || value
    }

    return isTrue
  }, [])

  const add = useCallback((id: string, c: boolean) => {
    const _ = cd
    _.set(id, c)
    setCd(_)
  }, [])

  if (loading) return null
  return (
    <IfContext.Provider value={{ c, add, isThePreviousConditionsTrue }}>
      <IfHandler c={c}>{children}</IfHandler>
    </IfContext.Provider>
  )
}
If.Else = Else
