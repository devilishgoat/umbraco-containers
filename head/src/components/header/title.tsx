import Head from 'next/head';
type PageProps = {
    title: string;
}
export type PageCmsFields = {
  properties: {
    page_Title: string;    
  }  
}

export const map = (input: PageCmsFields): string => {
  return input.properties.page_Title;
}

export default function Title(props: PageProps) {
    return (      
      <Head>
        <title>{props.title}</title>
      </Head>
)}