import Header from "@/app/_components/_header"


export async function generateMetadata({params}) {
  const id = (await params).id
  // fetch post information
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://artxpress.art';
const url =  (new URL(`/api/post/${id}`, baseUrl)).href
    console.log("api url", url)

  const post = await fetch(url).then((res) =>
    res.json()
  )
//  console.log(post)
  if(post.success == false){
    return {
      title: '404 Not Found',
      description: 'The post has been deleted',
    }
  }

  return {
    title: post.post.posted_by_name + ' shares on ArtXpress.Art',
    description: post.post.caption,
    openGraph: {
      images: [post.post.media_type.includes('image') ? post.post.media_src: ''],
    },
  }
}

export default function DashboardLayout({ children }) {
    
    return( 
        <section>
            <Header />
            {children}
        </section>
    )
}