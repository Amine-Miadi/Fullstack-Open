const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let result = blogs.reduce((acc,blog) =>{
        return acc + blog.likes
    },0)
    return result
}

const favoriteBlog = (blogs) => {
    let maxIndex = 0
    for(var i = 0; i < blogs.length; ++i){
        if(blogs[i].likes > blogs[maxIndex].likes)
            maxIndex = i;
    }
    return {
        title: blogs[maxIndex].title,
        author: blogs[maxIndex].author,
        likes: blogs[maxIndex].likes
    }
}

const mostBlogs = (blogs) => {
    let blogsCount = []
    let highestIndex = 0
    for(var i = 0; i < blogs.length; ++i){
        var found = blogsCount.findIndex(blog => blog.author === blogs[i].author)
        //if the name of the author is not found, add author to list
        if(found === -1){blogsCount.push(
            {
                author: blogs[i].author,
                blogs:1
            }
        )}
        //if the name of the author is found, increment blogscount for them, and check if its current highest
        else{
            blogsCount[found].blogs += 1
            if(blogsCount[found].blogs > blogsCount[highestIndex].blogs){highestIndex = found;}
        }
    }

    return blogsCount[highestIndex]
}

const mostLikes = (blogs) => {
    let likesCount = []
    let highestIndex = 0
    for(var i = 0; i < blogs.length; ++i){
        var found = likesCount.findIndex(blog => blog.author === blogs[i].author)
        //if the name of the author is not found, add author to list
        if(found === -1){likesCount.push(
            {
                author: blogs[i].author,
                likes: blogs[i].likes
            }
        )}
        //if the name of the author is found, increment blogs likes for them, and check if its current highest
        else{
            likesCount[found].likes += blogs[i].likes
            if(likesCount[found].likes > likesCount[highestIndex].likes){highestIndex = found;}
        }
    }

    return likesCount[highestIndex]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}