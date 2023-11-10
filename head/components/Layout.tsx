import Meta, { MetaProps } from './header/Meta';
import Title from './header/title';

type LayoutProps = {
    children?: any;
    metaProps: MetaProps;
    title: string;
}

export default function Layout(props: LayoutProps) {
    return (
        <>
            <Title title={props.title}  />
            <Meta {...props.metaProps}/>
            <main>
                {props.children}
            </main>
        </>
)}