import Article from './Article'

const ArticleFeed = ({articles}) => {

    let feed = [[], [], []]

    articles.forEach((article, index) => {
        feed[index % 3].push(article)
    })

    return (
        <div className="flex flex-row space-x-4 ">

            {feed.map((items, index) => {
                return (
                    <div key={index} className="flex flex-col w-full space-y-3">
                        {items.map((article) => {
                            return (<Article key={article.id} article={article}/>)
                        })}
                    </div>
                )
            })}

        </div>
    )
}

export default ArticleFeed