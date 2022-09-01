import { useQuery, gql } from "@apollo/client"
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import Markdown from "react-markdown"

import Article from "../components/feed/Article"

const GET_ARTICLE = gql`
    query article($id: ID!) {
        article(id: $id) {
            id
            createdAt
            title
            description
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }`

const ArticlePage = () => {
    // store the id found in the url as a variable
    const {id} = useParams()
    // query hook, passing the id value as a variable
    const {loading, error, data} = useQuery(GET_ARTICLE, {variables: {id}})
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error! Article not found</p>
    // if the data is successful, display the data in our UI
    if (!loading && !error && data.article) return (
        <>
            <section id="intro" className="py-6">
                <h1 className="w-1/2 text-6xl text-slate-50 font-semibold mb-24">{data.article.title}</h1>
                <div className="w-1/3 mx-auto">
                    <span className="block mb-10 text-lg text-slate-50">{data.article.description}</span>
                    <table className="mx-auto text-center text-slate-50 text-xl">
                        <tbody>
                        <tr>
                            <td className="border-y px-8 py-1.5">Published</td>
                            <td className="border-y px-8 py-1.5">{format(parseISO(data.article.createdAt), "HH:mm dd.LL.yy")}</td>
                        </tr>
                        <tr>
                            <td className="border-b px-8 py-1.5">Author</td>
                            <td className="border-b px-8 py-1.5">{data.article.author.username}</td>
                        </tr>
                        <tr>
                            <td className="px-8 py-1.5">Time to read</td>
                            <td className="px-8 py-1.5">10 min</td>
                        </tr>
                        <tr>
                            <td className="px-8 py-1.5">Likes</td>
                            <td className="px-8 py-1.5">{data.article.favoriteCount}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>


            </section>
            <section id="content" className="bg-white rounded-lg py-6 px-4">
                <Markdown>{data.article.content}</Markdown>
            </section>
        </>
    )
}

export default ArticlePage