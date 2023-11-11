import { getContent } from '../lib/fetcher';

export default function Home(content:string) {
  return (
    <main>
      <h1>Made it</h1>
    </main>
  )
}

export async function getStaticProps() {
  const data = (await getContent('')) || []
  return {
    props: { data },
  }
}
