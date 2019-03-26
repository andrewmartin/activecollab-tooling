import NextHead from 'next/head';

const Head = props => {
  return (
    <NextHead>
      <title key="title">{props.title}</title>
      {props.children}

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.15.2/antd.min.css" />
    </NextHead>
  );
};

Head.defaultProps = {
  title: 'Lemonade ActiveCollab Reporting App'
};

export default Head;
