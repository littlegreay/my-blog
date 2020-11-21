import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '@/src/components/layout'
import "@/src/styles/markdown.less"
import "./index.less"
import { getArticleDetail, read } from '@/src/api'
import dayjs from 'dayjs'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { QuestionOutlined } from '@ant-design/icons'
const ArticleDetail = (props) => {
    async function readFn () {
        await read({
            id: props.article.id
        })
    }
    useEffect(() => {
        readFn()
    }, [])
    return (
        <Layout goTop >
            <div className="ww article-detail-wrapper">

                {
                    props?.article?.id ?
                        <>
                            <div className="top-div tc" style={{ paddingTop: '30px' }}>
                                {
                                    props.article.covery_img ?
                                        <img className='toutu' src={props.article.covery_img} alt="" />
                                        : ""
                                }
                                <div className="tit tc">
                                    {props.article.title}
                                </div>
                                <p className="fa">发布于 {dayjs(props.article.publish_time).format('YYYY-MM-DD HH-mm-ss')}
                             • 阅读量 {props.article.read_nums || 0}</p>
                            </div>
                            <div
                                className="markdown mark-div"
                                dangerouslySetInnerHTML={{ __html: props.article.content }}
                            ></div>
                        </>
                        :
                        <div className='no-article'>
                            <QuestionOutlined />
                            <br />
                            <br />
                            <span className='s'>不存在的文章</span>
                        </div>
                }
            </div>
        </Layout>


    )
}

// ArticleDetail.getInitialProps = async (ctx) => {
//     // const router = useRouter()
//     // const { pid } = router.query
//     const { id } = ctx.query;
//     const article = await getArticleDetail({ id });
//     return { article };
// };

export async function getServerSideProps (ctx) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()
    const { id } = ctx.query;
    const article = await getArticleDetail({ id });
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time

    if (article.id && article.content) {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        }
        );
        article.content = marked(article.content)
    }
    return {
        props: {
            article,
        },
    }
}

export default ArticleDetail