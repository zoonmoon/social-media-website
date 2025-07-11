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
  return {
    title: post.post.caption
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