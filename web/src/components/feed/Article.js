import { format, parseISO } from 'date-fns'
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"

const Article = ({ article }) => {

    const shorten = (str, maxLen, separator = ' ') => {
        // check if string shorter than limit
        if (str.length <= maxLen) return str
        // cut that string
        str = str.substring(0, str.lastIndexOf(separator, maxLen))
        // if the string ends with '.' leave plain otherwise add '...'
        return (str.charAt(str.length - 1) !== '.') ? str + '...' : str
    }

    return (
            <article className="space-y-3 divide-y divide-teal-700 text-slate-800 bg-teal-50 rounded-lg py-3 px-5 hover:shadow-lg hover:bg-teal-100 hover:scale-105 ease-out duration-300">
                {format(parseISO(article.createdAt), 'dd.LL.yyyy')}
                <Link className="" to={`article/${article.id}`}>
                    <h3 className="text-lg font-medium">{article.title}</h3>
                    <ReactMarkdown className="text-md" children={shorten(article.description, 200)} />
                    <span className="text-blue-400 hover:text-blue-600">Read more</span>
                </Link>

                <div className="flex flex-row justify-between items-center pt-3">
                    <div className="flex flex-row items-center text-lg font-medium">
                        <img
                            className="w-10 rounded-full mr-3"
                            src={article.author.avatar}
                            alt={article.author.username}
                        />{' '}
                        {article.author.username}
                    </div>


                    Likes:{article.favoriteCount}{' '}
                </div>



            </article>
    )
}

export default Article