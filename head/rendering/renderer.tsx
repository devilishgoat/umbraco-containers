import { Fragment } from 'react';
import { getComponent } from './componentFactory'
import { PageComponent } from "./pageBuilder";
export type pageComponent = {
    id: string;
    name: string;
    properties?: {};
    childComponents?: pageComponent[];
}

export type pageComponents = {    
    areas: pageComponents[]    
    content: {
        contentType: string,
        id: string,
        properties: {}
    }
}

type RendererProps = {
  config: PageComponent[];
}
export default function Renderer({config}: RendererProps) {
  if (!config) {
    throw new Error('You are calling Renderer with no config.');
  }
  const renderComponents = (items:PageComponent[]) => {
    return items.map(item => {
      const Component = getComponent(item.name);
      const {  data } = item;
      return (
        <Fragment key={item.id}>       
            <Component data={data}  />          
        </Fragment>
      );
    })
  }

  return renderComponents(config)
};