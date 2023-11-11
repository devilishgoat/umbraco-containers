import Head from 'next/head';

export type MetaProps = {
    title: string;
    description: string;
}

export type MetaCmsFields = {
  properties: {
    metadata_Title: string;
    metadata_Description: string;
  }  
}

export const map = (input: MetaCmsFields): MetaProps => {
  return {
    title: input.properties?.metadata_Title,
    description: input.properties?.metadata_Description,
  }
}

export default function Meta(props: MetaProps) {
    return (      
      <Head>
        <meta name="title" content={props.title} />
      </Head>
)}