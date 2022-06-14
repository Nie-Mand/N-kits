# Niemand's Toolkits


## Conditions

### If, Else
```tsx
import { If, Else } from ''

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>hello world: {count}</h1>
      <button onClick={() => setCount(count + 1)}>increment</button>
      <br />

      <If c={count === 5}>
        x is 5
        <br />
        <Else c={count > 5}>
          x is greater than 5
          <br />
        </Else>
        <Else>x is less than 5</Else>
      </If>

      <br />
    </div>
  )
}
```


## For Loop

```tsx
import { For } from "ntkit"

const data = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Jane',
    age: 25,
  },
  {
    name: 'Joe',
    age: 20,
  },
]

export default function App() {
    return (
        <div>
            <For it={data}>
                {(item, idx) => <div key={idx}>{item.name}</div>}
            </For>
        </div>
    )
}
```