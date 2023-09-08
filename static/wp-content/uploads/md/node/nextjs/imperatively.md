# Imperatively



**Examples**

`next/link` should be able to cover most of your routing needs, but you can also do client-side navigations without it, take a look at the [documentation for `next/router` following example shows how to do basic page navigations with `useRouter` { useRouter } from 'next/router'

export default function ReadMore() {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/about')}>
 Click here to read more
 </button>
  )
}

```



