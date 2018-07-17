import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

class IndexRoute extends React.Component {
  render() {
    const items = [];
    const { title, subtitle } = this.props.data.site.siteMetadata;
    const posts = this.props.data.allMarkdownRemark.edges;
    posts.forEach((post) => {
      items.push(<Post data={post} key={post.node.fields.slug} />);
    });

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={subtitle} />
        </Helmet>
        <Sidebar {...this.props} />
        <div className="content">
          <div className="content__inner">
            {/*記事一覧*/}
            {/*{items}*/}
            <div className="page">
              <h1 className="page__title">About me</h1>
              <p>m4ppi(まっぴ)</p>
              <p>Tokyo</p>
              <p>1994/09/09</p>
              <p>2017年10月からエンジニアとして働き始めました。</p>
              <p>業務では、最近はphpを書いてます。
                以前はjavaをメインに書いていていましたが、最近はほぼ触ってないです。
                node.js(Express)でのプロジェクトも携わっていましたが、非同期処理あたりがまだ苦手です。</p>
              <p>最近はGo言語にハマっていて、簡単なツールはGo言語で書いています。</p>
              <h2>Contact</h2>
              <ul>
                <li><a href="https://www.twitter.com/m4ppi">twitter</a></li>
                <li><a href="https://www.github.com/m4ppi">GitHub</a></li>
              </ul>
              <p><img src="https://source.unsplash.com/random/800x600" alt="unsplash random" /></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexRoute;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
