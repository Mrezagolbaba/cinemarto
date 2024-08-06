const Tags =()=>{

    const tags = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming']
    const handleClick = (tag:string) => {
        console.log(tag)
    }
    return(
        <div>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index} onClick={() => handleClick(tag)}>
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Tags;