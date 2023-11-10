import { getContent, ErrorResponse, OkResponse } from '../lib/fetcher';
import Layout from '../components/Layout';
import ErrorPage from 'next/error'
import { MetaCmsFields, map } from '../components/header/Meta';
import { PageCmsFields, map as MapTitle} from '../components/header/title';
import Renderer, { pageComponents, pageComponent }  from '../rendering/renderer';
import { PageComponent, buildPage } from '../rendering/pageBuilder';

type PageProps = {
  pageData?: PageCmsFields;
  metadata?: MetaCmsFields;
  statusCode: number;
  components?: PageComponent[];
}

type PageData = MetaCmsFields & OkResponse & PageCmsFields & {
  properties: {
    newsPageLayout: {
      items: pageComponents[]
    }
  }
}

export default function Page({metadata, statusCode, pageData, components}: PageProps) {  
  if (statusCode !== 200){
    return <ErrorPage statusCode={statusCode}/>
  }

  if (metadata === undefined || pageData === undefined) {
    return null;
  }

  const data = map(metadata);
  const title = MapTitle(pageData);
 
  return (
    <Layout metaProps={data} title={title}>
        <Renderer config={components} />
    </Layout>
  )
}

type getStaticPropsData = {
  params: {
    slug:string[];
  }
}

export async function getStaticProps(data:getStaticPropsData) {
  const path = `/${data.params.slug.join('/')}`;
  const rawData = await getContent<PageData>(path);
  if (rawData.status === 200)
  {
    const validResponse = rawData as PageData;
    const components = await buildPage(validResponse.properties.newsPageLayout.items);    
    const componentsToArray: PageComponent[] = [];
    for(let i = 0; i < components.length; i++){
      componentsToArray.push(components[i]);
    }
    const data: PageProps = {
      pageData: validResponse,
      metadata: validResponse,
      statusCode: 200,
      components: componentsToArray,
    }
    return {
      props: {      
        ...data
      },
    }
  }
  else
  {
    const data: PageProps = {
      statusCode: rawData.status,
    }
    return {
      props: {      
        ...data
      },
    }
  } 
}

export async function getStaticPaths() { 
  return {
    paths: [],
    fallback: true,
  }
}