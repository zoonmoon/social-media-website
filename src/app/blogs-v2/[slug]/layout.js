import Header from "@/app/_components/_header"


export async function generateMetadata({params}) {
  const slug = (await params).slug
  // fetch post information
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourarton.com';
const url =  (new URL(`/api/admin/blogs-v2/${slug}`, baseUrl)).href
    console.log("api url", url)

  const posts = await fetch(url).then((res) =>
    res.json()
  )

  



//  console.log(post)
  if(posts.length == 0){
    return {
      title: '404 Not Found',
      description: 'The blog has been deleted',
    }
  }

  let blogPost = posts[0]

  let post = blogPost
//   let ogImage = ''
  let thumbnail = post?.thumbnail

 
  
  return {
    title: post?.meta_title || post?.title,
    description: post?.meta_description,
    openGraph: {
      images: [thumbnail],
    },
  }
}

export default function BlogLayout({ children }) {
    
    return( 
        <section>
            <Header />
            {children}
        </section>
    )
}